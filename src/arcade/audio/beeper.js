// Zero-asset WebAudio chiptune helper. Context is created lazily on the first user gesture.
const STORE_KEY = 'cc.arcade.sound'
const MASTER = 0.15

function readMuted() {
  try {
    if (typeof localStorage === 'undefined') return true
    const v = localStorage.getItem(STORE_KEY)
    return v === null ? true : v !== 'on'
  } catch {
    return true
  }
}

function writeMuted(muted) {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORE_KEY, muted ? 'off' : 'on')
  } catch {
    /* ignore */
  }
}

export function createBeeper() {
  let ctx = null
  let master = null
  let noiseBuf = null
  let muted = readMuted()
  let broken = false

  function ensure() {
    if (ctx || broken) return ctx
    try {
      const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)
      if (!AC) {
        broken = true
        return null
      }
      ctx = new AC()
      master = ctx.createGain()
      master.gain.value = MASTER
      master.connect(ctx.destination)
    } catch {
      broken = true
      ctx = null
    }
    return ctx
  }

  /** Call from a user gesture (pointerdown/keydown) so browsers allow playback. */
  function unlock() {
    const c = ensure()
    if (c && c.state === 'suspended') c.resume().catch(() => {})
  }

  function ready() {
    return !muted && ctx && ctx.state === 'running'
  }

  function beep(freq, ms, type = 'square', slideTo) {
    if (!ready()) return
    try {
      const t0 = ctx.currentTime
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(freq, t0)
      if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t0 + ms / 1000)
      g.gain.setValueAtTime(1, t0)
      g.gain.exponentialRampToValueAtTime(0.001, t0 + ms / 1000)
      osc.connect(g)
      g.connect(master)
      osc.start(t0)
      osc.stop(t0 + ms / 1000 + 0.02)
    } catch {
      /* ignore audio failures */
    }
  }

  function noise(ms) {
    if (!ready()) return
    try {
      if (!noiseBuf) {
        const len = Math.floor(ctx.sampleRate * 0.5)
        noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate)
        const data = noiseBuf.getChannelData(0)
        for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
      }
      const t0 = ctx.currentTime
      const src = ctx.createBufferSource()
      src.buffer = noiseBuf
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.8, t0)
      g.gain.exponentialRampToValueAtTime(0.001, t0 + ms / 1000)
      src.connect(g)
      g.connect(master)
      src.start(t0)
      src.stop(t0 + ms / 1000 + 0.02)
    } catch {
      /* ignore */
    }
  }

  function arpeggio(notes, step, ms, type) {
    if (!ready()) return
    notes.forEach((f, i) => setTimeout(() => beep(f, ms, type), i * step))
  }

  return {
    unlock,
    beep,
    noise,
    shoot: () => beep(880, 70, 'square', 220),
    hit: () => beep(200, 60, 'sawtooth', 120),
    explode: () => {
      noise(220)
      beep(110, 240, 'triangle', 40)
    },
    pickup: () => arpeggio([660, 990], 60, 90, 'square'),
    waveClear: () => arpeggio([523.25, 659.25, 783.99, 1046.5], 90, 140, 'square'),
    gameOver: () => arpeggio([392, 349.23, 311.13, 261.63], 180, 260, 'triangle'),
    setMuted(v) {
      muted = !!v
      writeMuted(muted)
      if (!muted) unlock()
    },
    isMuted: () => muted,
  }
}
