interface AvatarProps {
  avatarUrl: string
}

export function Avatar({ avatarUrl }: AvatarProps) {
  return <img className="avatar flex-center" src={avatarUrl} alt="user avatar" />
}
