import { useState, useEffect } from 'react'

export default function useLiveCounter(min = 32, max = 120) {
  const [count, setCount] = useState(Math.floor(Math.random() * (max - min) / 2) + min)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => {
        const delta = Math.random() < 0.5 ? -1 : 1
        return Math.max(min, Math.min(max, c + delta))
      })
    }, 7000)
    return () => clearInterval(timer)
  }, [min, max])

  return count
}
