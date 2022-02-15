import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getRoutInterceptor } from './interceptor'

let temp = null // 用于防止重复渲染

function Guard ({ element, meta }) {
  const location = useLocation()
  const { pathname } = location
  meta = meta || {}

  const routeInterceptor = getRoutInterceptor()
  if (routeInterceptor) {
    if (temp === element) {
      return element
    }
    const newPath = routeInterceptor({ pathname, meta })
    if (newPath && newPath !== pathname) {
      element = <Navigate to={ newPath } />
    }
  }
  temp = element
  return element
}

export default Guard