import React from 'react'
import { Suspense, lazy } from "react"
import Guard from './Guard.jsx'

export function loadAsync (fn, meta) {
  const Element = lazy(fn)
  const ElementAsync = (
    <Suspense fallback={
      <div>loading...</div>
    }>
      <Element _meta = { meta }/>
    </Suspense>
  )
  return <Guard element = { ElementAsync } meta = { meta }/>
}

export function load(element, meta) {
  return <Guard element = { element } meta = { meta } />
}