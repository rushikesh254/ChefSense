import dummyuser from "@/data/user";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // this useEffect is just for dummy data , later we will use it for real api call

  useEffect(() => {
    setUser(dummyuser);
    setLoading(false);
  }, []);

  // return the user context
  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
}

// custom hook to use the user context
export function useUser() {
  // return the user context
  return useContext(UserContext);
}
