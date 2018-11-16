export const timeMe = fn => (...args) => {
  console.time(fn.name)
  const result = fn(...args)
  console.timeEnd(fn.name)
  return result
}

export const timeMeAsync = fn => async (...args) => {
  console.time(fn.name)
  const result = await fn(...args)
  console.timeEnd(fn.name)
  return result
}
