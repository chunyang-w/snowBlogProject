import { useNavigate, useRoutes } from 'react-router-dom'
import routes from '../router/routes'
import store from '@client/store/index'
import React from 'react'

export default function RootContainer() {
  const navigate = useNavigate()
  store.subscribe(() => {
    const needLogin = store.getState().adminLogin.needLogin
    if (needLogin) {
      navigate('/adminLogin')
    }
  })
  const elements = useRoutes(routes)
  return elements
}