import { useCallback, useEffect, useRef, useState } from 'react'
import { CREW, EPILOGUE, INTERLUDES, OPS, PROLOGUE } from './ops.js'
import { CrewScene, PixelHead } from './crew.jsx'

/**
 * AI//RUN — a four-job story you play through.
 *
 * It runs as chapters: a cold open, four jobs, an epilogue. Each job opens as a
 * cutscene — the crew talk it through in the main console, one line at a time —
 * and only then does the terminal hand you the controls. While you work, the
 * last thing anyone said stays pinned above the console, so the story never
 * disappears behind the mechanics.
 *
 * GHOST hands you the job. WREN asks the questions you were about to ask, which
 * is how the explanation arrives as conversation rather than a lecture. Nobody
 * ever says "in this lesson we will learn".
 *
 * The arc is the argument: crack a weak password, exploit a SQL injection, then
 * run the same attack against an AI agent. Prompt injection is SQL injection
 * with a new coat of paint, and watching it happen is what makes that land.
 *
 * Everything is scripted. No network, no real target, no model call.
 */

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
const rnd = () => CHARS[Math.floor(Math.random() * CHARS.length)]

const TONE = {
  lead: 'text-primary-container',
  crew: 'text-on-surface',
  you: 'text-on-surface-variant',
  sys: 'text-outline',
}

const PROLOGUE_INDEX = -1

/* ── comms ───────────────────────────────────────────────────────────── */

/**
 * A chat channel that types. Lines are queued and delivered one at a time with
 * a pause proportional to their length, so the crew reads as people rather than
 * as a wall of text that appeared at once.
 */
function useComms() {
  const [lines, setLines] = useState([])
  const [typing, setTyping] = useState(null)
  const [idle, setIdle] = useState(true)
  const queue = useRef([])
  const timer = useRef(0)
  // The drain is self-recursive, so it lives in a ref rather than a useCallback.
  const drain = useRef(null)

  useEffect(() => {
    let alive = true
    const step = () => {
      if (!alive) return
      const line = queue.current.shift()
      if (!line) {
        // Clearing the handle is what lets the next say() restart the drain.
        timer.current = 0
        setTyping(null)
        setIdle(true)
        return
      }
      // Your own lines, narration and machine output do not "type".
      if (line.who === 'you' || line.who === 'sys' || line.who === 'narration') {
        setLines((prev) => [...prev, line])
        timer.current = setTimeout(step, line.who === 'narration' ? 900 : 280)
        return
      }
      setTyping(line.who)
      timer.current = setTimeout(() => {
        if (!alive) return
        setLines((prev) => [...prev, line])
        setTyping(null)
        timer.current = setTimeout(step, 260)
      }, Math.min(1200, 340 + line.text.length * 13))
    }
    drain.current = step
    return () => {
      alive = false
      drain.current = null
      clearTimeout(timer.current)
    }
  }, [])

  const say = useCallback((batch) => {
    const arr = Array.isArray(batch) ? batch : [batch]
    if (!arr.length) return
    queue.current.push(...arr)
    setIdle(false)
    // A drain already in flight will pick these up on its next tick.
    if (!timer.current) drain.current?.()
  }, [])

  /** Dump everything pending, for the player who does not want to wait. */
  const flush = useCallback(() => {
    clearTimeout(timer.current)
    timer.current = 0
    const rest = queue.current.splice(0)
    if (rest.length) setLines((prev) => [...prev, ...rest])
    setTyping(null)
    setIdle(true)
  }, [])

  const reset = useCallback(() => {
    clearTimeout(timer.current)
    timer.current = 0
    queue.current = []
    setLines([])
    setTyping(null)
    setIdle(true)
  }, [])

  return { lines, typing, idle, say, flush, reset }
}

/* ── the story, on screen ────────────────────────────────────────────── */

/** One spoken line with its pixel head. Narration gets neither head nor handle. */
function Spoken({ line, size = 20, big = false }) {
  if (line.who === 'narration') {
    return (
      <p className={`italic text-outline ${big ? 'py-1 text-[13px]' : 'text-[12px]'}`}>
        {line.text}
      </p>
    )
  }
  if (line.who === 'sys') {
    return <p className="text-[12px] text-outline">— {line.text}</p>
  }
  return (
    <div className="flex gap-2.5">
      <PixelHead who={line.who} size={size} className="mt-0.5 shrink-0" />
      <p className={`min-w-0 ${big ? 'text-[14px] leading-relaxed' : 'text-[12px] leading-snug'}`}>
        <span className={TONE[CREW[line.who]?.tone] || 'text-on-surface'}>
          {CREW[line.who]?.handle}
        </span>
        <span className="text-outline"> › </span>
        <span className={line.who === 'you' ? 'text-on-surface-variant' : 'text-on-surface'}>
          {line.text}
        </span>
      </p>
    </div>
  )
}

function TypingLine({ who, size = 20 }) {
  return (
    <div className="flex items-center gap-2.5 text-[12px] text-outline">
      <PixelHead who={who} size={size} talking className="shrink-0" />
      <span>
        <span className={TONE[CREW[who]?.tone]}>{CREW[who]?.handle}</span> is typing
        <span className="animate-blink"> …</span>
      </span>
    </div>
  )
}

/**
 * The cutscene. During a story beat this fills the console with the last few
 * lines; the rest of the time it collapses to a single pinned line above the
 * controls, so whatever was last said stays on screen while you work.
 */
function Stage({ lines, typing, big }) {
  const endRef = useRef(null)
  useEffect(() => {
    if (big) endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [lines, typing, big])

  if (!big) {
    const last = lines[lines.length - 1]
    return (
      <div className="mb-5 min-h-[2.5rem] rounded border border-outline-variant bg-surface-container-low px-3 py-2">
        {typing ? (
          <TypingLine who={typing} size={18} />
        ) : last ? (
          <Spoken line={last} size={18} />
        ) : null}
      </div>
    )
  }

  return (
    <div className="flex min-h-[250px] flex-col justify-end gap-3">
      {lines.slice(-6).map((l, k) => (
        <Spoken key={`${lines.length}-${k}`} line={l} big />
      ))}
      {typing && <TypingLine who={typing} />}
      <div ref={endRef} />
    </div>
  )
}

/** The running log, with the crew's faces above it. */
function Comms({ lines, typing, idle, onSkip }) {
  const endRef = useRef(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [lines, typing])

  // Whoever spoke last stays lit, so the scene never goes fully dim between lines.
  const lastSpeaker = [...lines].reverse().find((l) => CREW[l.who]?.handle)?.who

  return (
    <aside className="flex min-h-[220px] flex-col overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low md:min-h-0">
      <CrewScene typing={typing} last={lastSpeaker} />

      <div className="flex items-center justify-between border-b border-outline-variant px-3 py-1.5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-outline">crew · secure</span>
        {!idle && (
          <button
            type="button"
            onClick={onSkip}
            className="text-[10px] uppercase tracking-[0.15em] text-outline transition hover:text-primary-container"
          >
            skip ▸
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 md:max-h-[300px]">
        <ul className="flex flex-col gap-2.5">
          {lines.map((l, k) => (
            <li key={k}>
              <Spoken line={l} size={18} />
            </li>
          ))}
        </ul>
        <div ref={endRef} />
      </div>
    </aside>
  )
}

/* ── host ────────────────────────────────────────────────────────────── */

export default function AiRun() {
  // -1 is the prologue, OPS.length the epilogue, everything between is a job.
  const [i, setI] = useState(PROLOGUE_INDEX)
  const [take, setTake] = useState(0)
  const [phase, setPhase] = useState('story') // story | act | run | debrief
  const op = i >= 0 && i < OPS.length ? OPS[i] : null
  const comms = useComms()
  const { say, reset } = comms
  const firedBeats = useRef(new Set())

  // Chapter changes land a render before the effect below resets `phase`, so
  // for one frame the old phase is paired with the new chapter. Tracking which
  // chapter comms actually holds keeps that frame from rendering a job screen
  // with no job — which is how the epilogue used to crash.
  const chapterKey = `${i}:${take}`
  const [loadedKey, setLoadedKey] = useState(null)
  const ready = loadedKey === chapterKey
  // The prologue and epilogue have no job, so they are always a story beat.
  const view = op ? phase : 'story'

  // Every chapter opens with its scene on comms.
  useEffect(() => {
    reset()
    firedBeats.current = new Set()
    setPhase('story')
    if (i < 0) say(PROLOGUE)
    else if (i >= OPS.length) say(EPILOGUE)
    else say([...(INTERLUDES[OPS[i].id] || []), ...OPS[i].brief])
    setLoadedKey(`${i}:${take}`)
  }, [i, take, say, reset])

  const onBeat = useCallback(
    (n) => {
      if (!op) return
      const beats = (op.runChat || []).filter((c) => c.at === n && !firedBeats.current.has(c))
      beats.forEach((c) => firedBeats.current.add(c))
      if (beats.length) say(beats)
    },
    [op, say],
  )

  // These are passed into effect dependency arrays downstream, so they have to
  // be stable. An inline arrow would change identity on every comms tick and
  // restart the timers that advance the game.
  const toRun = useCallback(() => setPhase('run'), [])
  const toDebrief = useCallback(() => {
    setPhase('debrief')
    if (op?.debrief.chat) say(op.debrief.chat)
  }, [op, say])

  const chapter = i < 0 ? 'prologue' : i >= OPS.length ? 'epilogue' : `${op.num} ${op.title}`

  return (
    <div className="w-[min(96vw,980px)] font-mono text-[13px] leading-relaxed">
      {/* chapter rail — where you are in the story */}
      <ol className="mb-2 flex items-stretch gap-1.5" aria-label="Chapters">
        <RailItem label="Prologue" short="◀" state={i < 0 ? 'now' : 'done'} narrow />
        {OPS.map((o, k) => (
          <RailItem
            key={o.id}
            label={`${o.num} ${o.title}`}
            short={o.num}
            state={i > k || i >= OPS.length ? 'done' : i === k ? 'now' : 'next'}
          />
        ))}
        <RailItem label="End" short="▶" state={i >= OPS.length ? 'now' : 'next'} narrow />
      </ol>

      <div className="grid gap-3 md:grid-cols-[1fr_300px]">
        {/* console */}
        <div className="min-w-0">
          <div className="flex items-center justify-between rounded-t-lg border border-outline-variant bg-surface-container-low px-4 py-2">
            <span className="text-[11px] text-primary-container">ai//run</span>
            <span className="truncate pl-3 text-[11px] uppercase tracking-[0.15em] text-outline">
              {chapter}
            </span>
          </div>

          <div className="min-h-[380px] rounded-b-lg border border-t-0 border-outline-variant bg-surface-container p-4 md:p-5">
            <Stage lines={comms.lines} typing={comms.typing} big={view === 'story'} />

            {ready && view === 'story' && (
              <StoryControls
                ready={comms.idle}
                ending={i >= OPS.length}
                onSkip={comms.flush}
                onContinue={() => (i < 0 ? setI(0) : setPhase('act'))}
                onRestart={() => {
                  setI(PROLOGUE_INDEX)
                  setTake((t) => t + 1)
                }}
              />
            )}

            {ready && op && view === 'act' && <Act op={op} say={say} onDone={toRun} />}
            {ready && op && view === 'run' && (
              <Run op={op} onBeat={onBeat} onDone={toDebrief} />
            )}
            {ready && op && view === 'debrief' && (
              <Debrief op={op} onNext={() => setI(i + 1)} />
            )}
          </div>
        </div>

        <Comms lines={comms.lines} typing={comms.typing} idle={comms.idle} onSkip={comms.flush} />
      </div>

      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-outline">
        Simulated. No real system is contacted.
      </p>
    </div>
  )
}

function RailItem({ label, short, state, narrow }) {
  return (
    <li
      aria-current={state === 'now' ? 'step' : undefined}
      className={`rounded-sm border px-2 py-1 text-[9px] uppercase tracking-[0.15em] transition ${
        narrow ? 'shrink-0' : 'flex-1'
      } ${
        state === 'done'
          ? 'border-primary-container/50 bg-brand-tint text-primary-container'
          : state === 'now'
            ? 'border-primary-container text-primary-container'
            : 'border-outline-variant text-outline'
      }`}
    >
      <span className="sm:hidden">{short}</span>
      <span className="hidden sm:inline">{label}</span>
    </li>
  )
}

/** The cutscene's own controls: skip the typing, or move the story on. */
function StoryControls({ ready, ending, onSkip, onContinue, onRestart }) {
  if (!ready) {
    return (
      <Btn onClick={onSkip} className="mt-6" ghost>
        SKIP ▸
      </Btn>
    )
  }
  if (ending) return <EndCard onRestart={onRestart} />
  return (
    <Btn onClick={onContinue} className="mt-6">
      CONTINUE ▸
    </Btn>
  )
}

/**
 * The payoff. Three doors recapped side by side so the shared root cause is
 * visible at a glance, then the two pieces of real work behind the story.
 */
function EndCard({ onRestart }) {
  const doors = [
    { n: '01', name: 'A password', was: 'looked up, not guessed' },
    { n: '02', name: 'A query', was: 'input became syntax' },
    { n: '03', name: 'An agent', was: 'input became instructions' },
  ]
  return (
    <div className="mt-6">
      <p className="text-[11px] uppercase tracking-[0.2em] text-outline">Session complete</p>
      <p className="mt-3 text-[16px] font-semibold text-on-surface">
        Three doors. One mistake.
      </p>

      <ul className="mt-5 grid gap-2 sm:grid-cols-3">
        {doors.map((d) => (
          <li
            key={d.n}
            className="rounded border border-outline-variant bg-surface-container-low p-3"
          >
            <p className="text-[10px] tracking-[0.2em] text-outline">{d.n}</p>
            <p className="mt-1.5 text-[13px] text-on-surface">{d.name}</p>
            <p className="mt-1 text-[11px] leading-snug text-on-surface-variant">{d.was}</p>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[12px] leading-relaxed text-on-surface-variant">
        Every one of them was untrusted input allowed to become an instruction. None of them were
        fixed inside the thing being attacked — they were fixed at the boundary around it.{' '}
        <span className="text-on-surface">That boundary is most of what we do.</span>
      </p>

      <div className="mt-5 flex flex-col gap-2">
        <EndLink
          to="/insights/prompt-injection-hardening-enterprise-agents"
          label="How we harden agents against this"
          note="The long version, with the parts you cannot defend against"
        />
        <EndLink
          to="/work/conversational-ai-agent-erp"
          label="The same pattern, in production"
          note="An ERP agent that proposes; a deterministic layer that decides"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Btn onClick={onRestart}>RUN AGAIN</Btn>
        <a
          href="/contact"
          className="rounded border border-outline-variant px-3 py-2 text-[11px] uppercase tracking-[0.15em] text-on-surface-variant transition hover:border-primary-container hover:text-primary-container"
        >
          Talk to us
        </a>
      </div>
    </div>
  )
}

function EndLink({ to, label, note }) {
  return (
    <a
      href={to}
      className="group flex items-baseline gap-2 rounded border border-outline-variant px-3 py-2 transition hover:border-primary-container"
    >
      <span className="text-primary-container transition-transform group-hover:translate-x-0.5">
        →
      </span>
      <span className="min-w-0">
        <span className="text-[12px] text-on-surface">{label}</span>
        <span className="block text-[11px] leading-snug text-on-surface-variant">{note}</span>
      </span>
    </a>
  )
}

/* ── you act ─────────────────────────────────────────────────────────── */

function Act({ op, say, onDone }) {
  if (op.choice) return <Choice op={op} say={say} onDone={onDone} />
  if (op.build) return <Build op={op} say={say} onDone={onDone} />
  if (op.quiz) return <Quiz op={op} say={say} onDone={onDone} />
  return <Btn onClick={onDone}>CONTINUE</Btn>
}

/** Options are things you say on comms, not answers to a question. */
function Choice({ op, say, onDone }) {
  const [picked, setPicked] = useState(null)

  const pick = (o, n) => {
    setPicked(n)
    say([{ who: 'you', text: o.say }, o.reply])
    if (o.ok) setTimeout(onDone, 1600)
    else setTimeout(() => setPicked(null), 1600)
  }

  return (
    <>
      <p className="text-[14px] text-on-surface">{op.task}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {op.choice.options.map((o, n) => (
          <li key={o.label}>
            <button
              type="button"
              disabled={picked !== null}
              onClick={() => pick(o, n)}
              className={`w-full rounded border px-3 py-2 text-left text-[12px] transition disabled:cursor-default ${
                picked === n
                  ? o.ok
                    ? 'border-primary-container text-primary-container'
                    : 'border-error text-on-surface-variant'
                  : 'border-outline-variant hover:border-primary-container hover:text-primary-container'
              }`}
            >
              <span className="text-outline">{n + 1}</span> {o.label}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

/** Payload assembly. The query above rewrites itself as you add fragments. */
function Build({ op, say, onDone }) {
  const [chosen, setChosen] = useState([])
  const [wrong, setWrong] = useState(0)
  const want = op.build.answer
  const done = chosen.length === want.length && chosen.every((c, n) => c === want[n])

  const settled = useRef(false)
  useEffect(() => {
    if (!done || settled.current) return undefined
    settled.current = true
    if (op.build.doneChat) say(op.build.doneChat)
    const t = setTimeout(onDone, 1800)
    return () => clearTimeout(t)
  }, [done, onDone, op.build.doneChat, say])

  const add = (f) => {
    if (done) return
    const attempt = [...chosen, f]
    if (!attempt.every((c, n) => c === want[n])) {
      setWrong((w) => w + 1)
      setChosen([])
      if (op.build.wrongChat) say(op.build.wrongChat)
      return
    }
    setChosen(attempt)
  }

  return (
    <>
      <p className="text-[14px] text-on-surface">{op.task}</p>

      {op.query ? (
        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-all rounded border border-outline-variant bg-surface-container-low p-3 text-[12px]">
          <span className="text-on-surface-variant">{op.query.before.split('{input}')[0]}</span>
          <span className={done ? 'text-error' : 'text-primary-container'}>
            {chosen.length ? chosen.join('') : op.query.safe}
          </span>
          <span className={done ? 'text-outline line-through' : 'text-on-surface-variant'}>
            {op.query.before.split('{input}')[1]?.replace('{pass}', '••••••')}
          </span>
        </pre>
      ) : (
        <pre className="mt-4 min-h-[3.5rem] whitespace-pre-wrap rounded border border-outline-variant bg-surface-container-low p-3 text-[12px] text-on-surface-variant">
          <span className="text-outline">ticket #4471 › </span>
          <span className={done ? 'text-error' : 'text-on-surface'}>
            {chosen.join(' ') || 'empty'}
          </span>
        </pre>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {op.build.fragments.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => add(f)}
            className="rounded border border-outline-variant px-2.5 py-1.5 text-[12px] transition hover:border-primary-container hover:text-primary-container"
          >
            {f}
          </button>
        ))}
      </div>

      {wrong > 1 && (
        <p className="mt-4 text-[12px] text-on-surface-variant">
          <span className="text-outline">hint — </span>
          {op.build.hintAfterFails}
        </p>
      )}
    </>
  )
}

/** The PATCH job: Wren asks, you answer, Ghost weighs in. */
function Quiz({ op, say, onDone }) {
  const [n, setN] = useState(0)
  const [picked, setPicked] = useState(null)
  const q = op.quiz[n]

  useEffect(() => {
    say({ who: q.who, text: q.q })
  }, [q, say])

  const pick = (o, k) => {
    setPicked(k)
    say([{ who: 'you', text: o.label }, q.why])
    setTimeout(() => {
      if (n + 1 < op.quiz.length) {
        setN(n + 1)
        setPicked(null)
      } else onDone()
    }, 3000)
  }

  return (
    <>
      <p className="text-[11px] uppercase tracking-[0.2em] text-outline">
        reply {n + 1} of {op.quiz.length}
      </p>
      <p className="mt-3 text-[14px] text-on-surface">{q.q}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {q.options.map((o, k) => (
          <li key={o.label}>
            <button
              type="button"
              disabled={picked !== null}
              onClick={() => pick(o, k)}
              className={`w-full rounded border px-3 py-2 text-left text-[12px] transition disabled:cursor-default ${
                picked === null
                  ? 'border-outline-variant hover:border-primary-container hover:text-primary-container'
                  : o.ok
                    ? 'border-primary-container text-primary-container'
                    : k === picked
                      ? 'border-error text-on-surface-variant'
                      : 'border-outline-variant opacity-40'
              }`}
            >
              {o.label}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

/* ── it lands ────────────────────────────────────────────────────────── */

function Run({ op, onBeat, onDone }) {
  const skip = !op.secret && !op.dump && !op.trace
  useEffect(() => {
    if (!skip) return undefined
    const t = setTimeout(onDone, 300)
    return () => clearTimeout(t)
  }, [skip, onDone])

  if (op.secret) return <Cracker op={op} onBeat={onBeat} onDone={onDone} />
  if (op.dump) return <Dump op={op} onBeat={onBeat} onDone={onDone} />
  if (op.trace) return <Trace op={op} onBeat={onBeat} onDone={onDone} />
  return null
}

/** Characters scramble until they lock, left to right. */
function Cracker({ op, onBeat, onDone }) {
  const target = op.secret
  const [locked, setLocked] = useState(0)
  const [noise, setNoise] = useState(() => target.split('').map(rnd))
  const [tries, setTries] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    onBeat(locked)
  }, [locked, onBeat])

  useEffect(() => {
    const scramble = setInterval(() => {
      setNoise((prev) => prev.map((c, k) => (k < locked ? target[k] : rnd())))
      setTries((t) => t + Math.floor(Math.random() * 900) + 300)
    }, 45)
    const lock = setInterval(() => {
      setLocked((l) => (l >= target.length ? l : l + 1))
    }, 420)
    return () => {
      clearInterval(scramble)
      clearInterval(lock)
    }
  }, [locked, target])

  useEffect(() => {
    if (locked < target.length || doneRef.current) return
    doneRef.current = true
    setTries(op.attempts)
    setTimeout(onDone, 1800)
  }, [locked, target.length, onDone, op.attempts])

  return (
    <>
      <Line prompt>hydra -l admin -P rockyou.txt {op.target}</Line>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {noise.map((c, k) => (
          <span
            key={k}
            className={`inline-flex h-9 w-7 items-center justify-center rounded border text-[15px] transition-colors ${
              k < locked
                ? 'border-primary-container bg-brand-tint text-primary-container'
                : 'border-outline-variant text-outline'
            }`}
          >
            {k < locked ? target[k] : c}
          </span>
        ))}
      </div>
      <p className="mt-6 text-[12px] text-on-surface-variant">
        attempts <span className="text-on-surface">{tries.toLocaleString()}</span>
        {'   '}locked{' '}
        <span className="text-primary-container">
          {locked}/{target.length}
        </span>
        {locked >= target.length && <span className="text-error">{'   '}ACCESS GRANTED</span>}
      </p>
    </>
  )
}

/** Rows print out like a dump scrolling past. */
function Dump({ op, onBeat, onDone }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    onBeat(n)
  }, [n, onBeat])
  useEffect(() => {
    if (n >= op.dump.length) {
      const t = setTimeout(onDone, 1600)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setN(n + 1), 340)
    return () => clearTimeout(t)
  }, [n, op.dump.length, onDone])

  return (
    <>
      <Line ok>bypassed — password check commented out</Line>
      <pre className="mt-4 overflow-x-auto rounded border border-error/40 bg-surface-container-low p-3 text-[12px] text-on-surface">
        {op.dump.slice(0, n).join('\n')}
        {n < op.dump.length && <span className="text-primary-container">▊</span>}
      </pre>
    </>
  )
}

/** The agent reasoning out loud, until it does the thing. */
function Trace({ op, onBeat, onDone }) {
  const [n, setN] = useState(0)
  const tone = {
    read: 'text-on-surface-variant',
    think: 'text-primary-container',
    tool: 'text-on-surface',
    bad: 'text-error',
  }
  useEffect(() => {
    onBeat(n)
  }, [n, onBeat])
  useEffect(() => {
    if (n >= op.trace.length) {
      const t = setTimeout(onDone, 1800)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setN(n + 1), 680)
    return () => clearTimeout(t)
  }, [n, op.trace.length, onDone])

  return (
    <>
      <Line prompt>agent trace — live</Line>
      <ul className="mt-4 flex flex-col gap-1.5">
        {op.trace.slice(0, n).map((l, k) => (
          <li key={k} className={`text-[12px] ${tone[l.t]}`}>
            <span className="text-outline">{String(k + 1).padStart(2, '0')}</span>{' '}
            {l.t === 'tool' && <span className="text-error">⚡ </span>}
            {l.text}
          </li>
        ))}
      </ul>
    </>
  )
}

/* ── the lesson ──────────────────────────────────────────────────────── */

function Debrief({ op, onNext }) {
  return (
    <>
      <p className="text-[11px] uppercase tracking-[0.2em] text-outline">What just happened</p>
      <p className="mt-3 text-[15px] font-semibold text-on-surface">{op.debrief.headline}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {op.debrief.points.map((pt) => (
          <li key={pt} className="flex gap-2.5 text-[12px] leading-relaxed text-on-surface-variant">
            <span className="text-error">›</span>
            {pt}
          </li>
        ))}
      </ul>
      <p className="mt-5 rounded border border-primary-container/40 bg-brand-tint/40 p-3 text-[12px] leading-relaxed text-on-surface">
        <span className="text-primary-container">the fix — </span>
        {op.debrief.fix}
      </p>
      {op.debrief.link && (
        <a
          href={op.debrief.link}
          className="mt-3 inline-block text-[12px] text-primary-container underline underline-offset-4"
        >
          {op.debrief.linkLabel} →
        </a>
      )}
      <Btn onClick={onNext} className="mt-6">
        CONTINUE ▸
      </Btn>
    </>
  )
}

/* ── bits ────────────────────────────────────────────────────────────── */

function Line({ children, prompt, ok }) {
  return (
    <p className="text-[12px]">
      <span className={prompt ? 'text-primary-container' : 'text-outline'}>
        {prompt ? '$ ' : '· '}
      </span>
      <span className={ok ? 'text-on-surface' : 'text-on-surface-variant'}>{children}</span>
    </p>
  )
}

function Btn({ children, onClick, className = '', ghost }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded border px-3 py-2 text-[11px] uppercase tracking-[0.15em] transition ${
        ghost
          ? 'border-outline-variant text-on-surface-variant hover:border-primary-container hover:text-primary-container'
          : 'border-primary-container text-primary-container hover:bg-brand hover:text-on-primary-fixed'
      } ${className}`}
    >
      {children}
    </button>
  )
}
