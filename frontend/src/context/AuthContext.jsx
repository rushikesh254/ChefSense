import dummyuser from '@/Dummydata/user'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUser(dummyuser)
    setLoading(false)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
