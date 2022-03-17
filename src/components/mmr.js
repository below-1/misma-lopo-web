import { stem2 } from '../serv/stem'
import { bfs } from '../serv/bfs'

export function runMmr({ data }) {
  function process_word(w) {
    const stemResult = stem2(w.toLowerCase())
    const bfsResult = bfs(stemResult)
    return bfsResult
  }

  const words = data.map(d => d[0].toLowerCase())

  const n = words.length
  // We send signal for each
  const eachNSignal = Math.floor(n < 100 ? 1 : n / 100)

  const result = words.map((w, index) => {
    if ((index % eachNSignal) == 1) {
      postMessage({
        type: 'progress',
        progress: (index + 1) / n
      })
    }
    return process_word(w)
  })

  let totalMmr = 0
  const mmr_test_result = result.map((wresult, index) => {
    const total_point = wresult.map(pair => pair[1] ? 1 : 0).reduce((a, b) => a + b, 0)
    const normalized_words = wresult.map(pair => pair[0])
    const mmr = (wresult.length == 0) ? 0 : total_point / wresult.length
    totalMmr += mmr
    const word = words[index]
    return {
      word,
      normalized_words,
      mmr
    }
  })
  const total_words = words.length
  const avgMmr = totalMmr / total_words

  return {
    items: mmr_test_result,
    total: total_words,
    avgMmr
  }
}

onmessage = function (message) {
  console.log('got message from main thread')
  console.log(message)
  if (message.data.type == 'start') {
    const result = runMmr({ data: message.data.data })
    postMessage({
      type: 'done',
      data: result
    })
  }
}
