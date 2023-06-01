import { useState, useContext } from 'react'
import { UserContext } from '../contexts/User.jsx'
import { getUserByUsername, postComment } from '../api.js'
import { formatDate } from '../utils/formatDate.js'

export function CommentForm({ setComments, reviewID, setReview }) {
  const { userLogin } = useContext(UserContext)
  const [newComment, setNewComment] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const comment = {
      username: userLogin.username,
      body: newComment
    }
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
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='comment-form'></label>
      <input value={newComment} onChange={(event) => setNewComment(event.target.value)} id='comment-form'></input>
      <button type='submit'>Post comment</button>
    </form>
  )
}
