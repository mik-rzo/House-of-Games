import { useState, useContext } from 'react'
import { UserContext } from '../../contexts/User.jsx'
import { Alert } from '../common/Alert.jsx'
import { getUserByUsername, postComment } from '../../api.js'
import { formatDate } from '../../utils/formatDate.js'

export function CommentForm({ setComments, reviewID, setReview }) {
  const { userLogin } = useContext(UserContext)
  const [newComment, setNewComment] = useState('')
  const [displaySuccessAlert, setDisplaySuccessAlert] = useState(false)
  const [displayFailureAlert, setDisplayFailureAlert] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const comment = {
      username: userLogin.username,
      body: newComment
    }
    setNewComment('')
    postComment(reviewID, comment)
      .then((apiResponse) => {
        return Promise.all([getUserByUsername(userLogin.username), apiResponse.data.comment])
      })
      .then(([response, comment]) => {
        comment.created_at = formatDate(comment.created_at)
        comment.avatar_url = response.user.avatar_url
        setComments((comments) => [comment, ...comments])
        setReview((currReview) => {
          const review = { ...currReview }
          review.comment_count += 1
          return review
        })
        setDisplaySuccessAlert(true)
      })
      .catch(() => {
        setDisplayFailureAlert(true)
      })
  }

  return (
    <>
      <form className='comment-form' onSubmit={handleSubmit}>
        <label htmlFor='comment-form'></label>
        <textarea
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          id='comment-form'></textarea>
        <br></br>
        <button type='submit'>Post comment</button>
      </form>
      <span>
        {displaySuccessAlert ? (
          <Alert severity='success' crud='Post' setDisplayAlert={setDisplaySuccessAlert} />
        ) : displayFailureAlert ? (
          <Alert severity='error' crud='Post' setDisplayAlert={setDisplayFailureAlert} />
        ) : (
          <></>
        )}
      </span>
    </>
  )
}
