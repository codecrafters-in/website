const KEY = 'cc.arcade.scores.v1'
const MAX = 10

function read() {
  try {
    if (typeof localStorage === 'undefined') return []
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const list = JSON.parse(raw)
    return Array.isArray(list) ? list.filter((e) => e && typeof e.score === 'number') : []
  } catch {
    return []
  }
}

function write(list) {
  try {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    /* storage unavailable or full — scores are best-effort */
  }
}

function sortDesc(list) {
  return list.slice().sort((a, b) => b.score - a.score || (b.wave || 0) - (a.wave || 0)).slice(0, MAX)
}

/** @returns {{ initials: string, score: number, wave: number, date: string }[]} top 10, highest first */
export function getHighScores() {
  return sortDesc(read())
}

export function isHighScore(score) {
  if (!(score > 0)) return false
  const list = getHighScores()
  return list.length < MAX || score > list[list.length - 1].score
}

export function addHighScore(entry) {
  const clean = {
    initials: String(entry && entry.initials ? entry.initials : 'AAA').toUpperCase().slice(0, 3).padEnd(3, 'A'),
    score: Math.max(0, Math.floor(Number(entry && entry.score) || 0)),
    wave: Math.max(1, Math.floor(Number(entry && entry.wave) || 1)),
    date: entry && entry.date ? entry.date : new Date().toISOString(),
  }
  const list = sortDesc(read().concat(clean))
  write(list)
  return list
}
