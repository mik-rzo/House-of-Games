import { useState } from 'react'
import { voteReview } from '../api.js'

export function VoteButton({ reviewID, setReview, setDisplayAlert }) {
  function vote(incVote) {
    const req = { inc_votes: incVote }
    setReview((review) => {
      // optimistic rendering
      const updatedReview = { ...review }
      updatedReview.votes += incVote
      return updatedReview
    })
    voteReview(reviewID, req)
      .then(() => {
        return
      })
      .catch(() => {
        setReview((review) => {
          // undo optimistic rendering
          const updatedReview = { ...review }
          updatedReview.votes -= incVote
          return updatedReview
        })
        setDisplayAlert(true)
      })
  }

  return (
    <>
      <button onClick={() => vote(1)} className='vote'>
        <svg
          id='upvote'
          fill='#000000'
          width='40px'
          height='40px'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z' />
        </svg>
      </button>
      <button onClick={() => vote(-1)} className='vote'>
        <svg
          id='downvote'
          fill='#000000'
          width='40px'
          height='40px'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059z' />
        </svg>
      </button>
    </>
  )
}
