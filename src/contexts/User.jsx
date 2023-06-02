import { createContext, useState } from 'react'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [userLogin, setUserLogin] = useState({})
  return <UserContext.Provider value={{ userLogin, setUserLogin }}>
    {children}
  </UserContext.Provider>
}
