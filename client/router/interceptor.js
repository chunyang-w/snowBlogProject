let routeInterceptor = null

export function setRouteInterceptor (fn) {
  routeInterceptor = fn
}

export function getRoutInterceptor () {
  return routeInterceptor
}