import { check } from './stem'

export function bfs(word) {
  let istart = 0
  let iend = word.length
  let result = []

  while (iend != istart) {
    let w = word.substring(istart, iend)
    if (check(w)) {
      result.push([w, true])
      if (iend != word.length) {
        istart = iend
        iend = word.length
        continue
      } else {
        break
      }
    }
    iend -= 1
  }
  // console.log('bfs result')
  // console.log(result)
  return result

}