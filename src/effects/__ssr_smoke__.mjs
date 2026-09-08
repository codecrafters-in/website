// SSR smoke test: render each effect with react-dom/server in plain Node
// (no window / document). Run via esbuild bundle -> node. Not part of the app.
import { createElement as h } from 'react'
import { renderToString } from 'react-dom/server'
import Reveal, { RevealGroup } from './Reveal.jsx'
import SplitText from './SplitText.jsx'
import Counter from './Counter.jsx'
import HeroScene from './HeroScene.jsx'
import ScrollScene from './ScrollScene.jsx'
import ParticleField from './ParticleField.jsx'
import GrainOverlay from './GrainOverlay.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import SmoothScroll from './SmoothScroll.jsx'
import MagneticWrap from './MagneticWrap.jsx'
import * as effects from './index.js'
import * as hooks from '../hooks/index.js'
import * as motion from '../lib/motion.js'
import * as g from '../lib/gsap.js'

const results = []
let failed = 0
function check(name, fn, asserts = []) {
  try {
    const html = fn()
    const problems = []
    if (/opacity:\s*0(?![.\d])/.test(html)) problems.push('contains opacity:0')
    for (const [label, ok] of asserts) if (!ok(html)) problems.push(`assert failed: ${label}`)
    if (problems.length) {
      failed += 1
      results.push(`FAIL ${name}: ${problems.join('; ')}\n      html=${html.slice(0, 300)}`)
    } else {
      results.push(`ok   ${name}  (${html.length} chars) ${html.slice(0, 110).replace(/\s+/g, ' ')}${html.length > 110 ? '…' : ''}`)
    }
  } catch (err) {
    failed += 1
    results.push(`FAIL ${name}: threw ${err && err.stack ? err.stack.split('\n').slice(0, 3).join(' | ') : err}`)
  }
}

console.log('typeof window =', typeof window, '| typeof document =', typeof document)
console.log('effects exports:', Object.keys(effects).join(', '))
console.log('hooks exports:', Object.keys(hooks).join(', '))
console.log('motion exports:', Object.keys(motion).join(', '))
console.log('gsap exports:', Object.keys(g).join(', '))

check('Reveal', () => renderToString(h(Reveal, { as: 'section', delay: 120, className: 'x' }, h('p', null, 'Hello reveal'))), [
  ['has data-reveal', (s) => s.includes('data-reveal')],
  ['has --reveal-delay', (s) => s.includes('--reveal-delay:120ms')],
  ['contains text', (s) => s.includes('Hello reveal')],
])
check('RevealGroup', () => renderToString(h(RevealGroup, null, h('p', null, 'A'), h('p', null, 'B'))), [
  ['contains children', (s) => s.includes('>A<') && s.includes('>B<')],
])
check('SplitText', () => renderToString(h(SplitText, { text: 'Forge molten products', as: 'h1' })), [
  ['contains words', (s) => s.includes('Forge') && s.includes('molten') && s.includes('products')],
  ['has split-word', (s) => s.includes('split-word')],
  ['no transform hidden', (s) => !s.includes('translate')],
])
check('Counter', () => renderToString(h(Counter, { value: 1234567.891, decimals: 1, prefix: '$', suffix: '+' })), [
  ['formatted final value', (s) => s.includes('1,234,567.9')],
  ['prefix/suffix', (s) => s.includes('$') && s.includes('+')],
])
check('HeroScene', () => renderToString(h(HeroScene, { className: 'hero' })), [
  ['has hero-glow placeholder', (s) => s.includes('hero-glow')],
  ['no canvas on server', (s) => !s.includes('<canvas')],
  ['css mode', (s) => s.includes('data-hero-scene="css"')],
])
check('HeroScene lite', () => renderToString(h(HeroScene, { lite: true })), [['has hero-glow', (s) => s.includes('hero-glow')]])
check('ScrollScene', () => renderToString(h(ScrollScene, { progressRef: { current: 0.5 } })), [
  ['no canvas on server', (s) => !s.includes('<canvas')],
])
// ParticleField is a Canvas child (uses useFrame) and is never server-rendered on
// its own; it must refuse to render outside a Canvas rather than touch window.
try {
  renderToString(h(ParticleField, { count: 0 }))
  failed += 1
  results.push('FAIL ParticleField: rendered outside a Canvas without throwing')
} catch (err) {
  const ok = /within the Canvas/.test(String(err && err.message))
  if (!ok) failed += 1
  results.push(`${ok ? 'ok  ' : 'FAIL'} ParticleField outside Canvas -> throws R3F guard (expected): ${String(err && err.message).slice(0, 70)}`)
}
check('GrainOverlay', () => renderToString(h(GrainOverlay)), [
  ['aria-hidden', (s) => s.includes('aria-hidden')],
  ['z-grain + animate-grain', (s) => s.includes('z-grain') && s.includes('animate-grain')],
  ['feTurbulence', (s) => s.includes('feTurbulence')],
])
check('GrainOverlay hidden', () => renderToString(h(GrainOverlay, { hidden: true })), [['empty', (s) => s === '']])
check('ScrollProgress', () => renderToString(h(ScrollProgress)), [
  ['z-progress + bg-molten', (s) => s.includes('z-progress') && s.includes('bg-molten')],
])
check('SmoothScroll', () => renderToString(h(SmoothScroll, null, h('main', null, 'content'))), [
  ['passes children through', (s) => s.includes('<main>content</main>')],
])
check('MagneticWrap', () => renderToString(h(MagneticWrap, { strength: 0.3 }, h('button', null, 'Press'))), [
  ['contains child', (s) => s.includes('Press')],
])
check('Whole tree', () =>
  renderToString(
    h(SmoothScroll, null,
      h('div', null,
        h(GrainOverlay), h(ScrollProgress),
        h('section', { className: 'relative' }, h(HeroScene), h(SplitText, { text: 'We forge software' }), h(Counter, { value: 120, suffix: '+' })),
        h(RevealGroup, null, h(MagneticWrap, null, h('a', { href: '#' }, 'Go'))),
      ),
    ),
  ),
  [['contains everything', (s) => s.includes('We') && s.includes('120') && s.includes('hero-glow') && s.includes('Go')]],
)

console.log(results.join('\n'))
console.log(failed ? `\n${failed} FAILED` : '\nALL PASSED')
if (typeof window !== 'undefined') { console.log('window leaked!'); process.exitCode = 1 }
process.exitCode = failed ? 1 : 0
