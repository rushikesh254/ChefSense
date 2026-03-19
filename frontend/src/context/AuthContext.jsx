import dummyuser from '@/Dummydata/user'
import React, { useEffect, useState } from 'react'

export const AuthContext = React.createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(dummyuser)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
