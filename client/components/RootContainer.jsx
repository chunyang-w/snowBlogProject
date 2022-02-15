import { useRoutes } from 'react-router-dom'
import routes from '../router/routes'

export default function RootContainer() {
  const elements = useRoutes(routes)
  return elements
}