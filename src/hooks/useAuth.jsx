import { useEffect, useState } from "react"

export function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = localStorage.getItem("user")
    setUser(u ? JSON.parse(u) : null)
  }, [])

  return { user }
}
