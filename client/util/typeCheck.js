function isInteger(input) {
  if (typeof input === 'number' && input % 1 === 0) {
    return true
  } else {
    return false
  }
}

export {
  isInteger
}