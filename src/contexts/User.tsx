import { createContext, useState, ReactNode, ReactElement } from 'react'

interface UserLoginI {
	username?: string
	name?: string
	avatar_url?: string
}

interface UserContextI {
	userLogin: UserLoginI, setUserLogin: (userLogin: UserLoginI) => void
}

export const UserContext = createContext<UserContextI>({} as UserContextI)

interface UserProviderProps {
	children: ReactNode
}

export function UserProvider({ children }: UserProviderProps): ReactElement {
	const [userLogin, setUserLogin] = useState<UserLoginI>({})
	return <UserContext.Provider value={{ userLogin, setUserLogin }}>{children}</UserContext.Provider>
}
