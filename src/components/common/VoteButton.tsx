import { patchReviewVote, patchCommentVote } from '../../api.ts'

import './VoteButton.css'

interface VoteButtonProps {
  id: number
  type: string
  setVoteCount: React.Dispatch<React.SetStateAction<number>>
  setDisplayAlert: React.Dispatch<React.SetStateAction<boolean>>
}

export function VoteButton({ id, type, setVoteCount, setDisplayAlert }: VoteButtonProps) {
  function changeVote(incVote: number) {
    const req = { inc_votes: incVote }
    if (type === 'review') {
      setVoteCount((reviewVoteCount) => {
        return reviewVoteCount + incVote
      })
      patchReviewVote(id.toString(), req).catch(() => {
        setVoteCount((reviewVoteCount) => {
          return reviewVoteCount - incVote
        })
        setDisplayAlert(true)
      })
    } else if (type === 'comment') {
      setVoteCount((commentVoteCount) => {
        return commentVoteCount + incVote
      })
      patchCommentVote(id.toString(), req).catch(() => {
        setVoteCount((commentVoteCount) => {
          return commentVoteCount - incVote
        })
        setDisplayAlert(true)
      })
    }
  }

  return (
    <>
      <button onClick={() => changeVote(1)} className='vote' id='upvote'>
        <svg
          id='upvote'
          fill='#000000'
          width='25px'
          height='25px'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z' />
        </svg>
      </button>
      <button onClick={() => changeVote(-1)} className='vote' id='downvote'>
        <svg
          id='downvote'
          fill='#000000'
          width='25px'
          height='25px'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059z' />
        </svg>
      </button>
    </>
  )
}
