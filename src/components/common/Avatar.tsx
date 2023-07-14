interface AvatarProps {
  avatarUrl: string
}

export function Avatar({ avatarUrl }: AvatarProps) {
  return <img className="avatar" src={avatarUrl} alt="user avatar" />
}
