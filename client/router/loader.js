import React from 'react'
import { Suspense, lazy } from "react"
import Guard from './Guard.jsx'
import Loading from '@client/components/Loading/Loading.jsx'

export function loadAsync (fn, meta) {
  const Element = lazy(fn)
  const ElementAsync = (
    <Suspense fallback={
      // <div>loading</div>
      <Loading/>
    }>
      <Element _meta = { meta }/>
    </Suspense>
  )
  return <Guard element = { ElementAsync } meta = { meta }/>
}

export function load(element, meta) {
  return <Guard element = { element } meta = { meta } />
}