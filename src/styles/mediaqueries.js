import { jsx, css } from '@emotion/core'

const bp = {
  small: 500,
  large: 1200,
}

const mq = n => {
  const bpArray = Object.keys(bp).map(key => [key, bp[key]])

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (min-width: ${size}px)`]
    return acc
  }, [])

  return result
}
