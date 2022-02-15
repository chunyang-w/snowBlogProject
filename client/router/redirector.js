import { Navigate } from "react-router-dom"

// Route redirecting:
export function redirect (path) {
  return <Navigate to={path} />
}