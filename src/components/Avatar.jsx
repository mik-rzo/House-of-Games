import { useState, useEffect } from 'react'
import { getUserByUsername } from '../api.js'

export function Avatar({ username }) {
  const [isLoading, setIsLoading] = useState(true)
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    getUserByUsername(username).then((data) => {
      setAvatarUrl(data.user.avatar_url)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return <img className="avatar" src={avatarUrl} alt="user avatar" />
}
