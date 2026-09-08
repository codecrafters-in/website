import { useEffect, useState } from 'react'

export default function GameOverCountdown() {
  const [n, setN] = useState(9)
  useEffect(() => {
    if (n <= 0) return undefined
    const t = setTimeout(() => setN((v) => v - 1), 1000)
    return () => clearTimeout(t)
  }, [n])
  return <span aria-live="off">{n}</span>
}
