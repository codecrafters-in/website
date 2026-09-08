import {
  ArrowRight, ArrowUpRight, ArrowUp, ArrowLeft, X, Menu, Check, Mail, Calendar, MessageCircle,
  ChevronDown, ChevronRight, Play, Gamepad2, Copy, ExternalLink, Sparkles, Zap,
  Brain, Layers, Cloud, ShieldCheck, ChartLine, PenTool, Search, DraftingCompass, Hammer, Rocket,
  Clock, Database, TrendingDown, TrendingUp, Receipt, UserX, EyeOff, Inbox, ServerCrash, FileText,
  Bot, HeartPulse, Lock, Users, MapPin, Phone, Globe, Quote, Star, CircleCheck, Volume2, VolumeX,
  BookOpen, Award, GraduationCap, Briefcase, Cpu, Workflow, Boxes, Building2, Plus, Minus,
} from 'lucide-react'

// Brand marks are not shipped by lucide-react 1.x, so they live here as inline SVGs.
function BrandSvg({ size, className, children, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...rest}>
      {children}
    </svg>
  )
}
const Github = (props) => (
  <BrandSvg {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </BrandSvg>
)
const Linkedin = (props) => (
  <BrandSvg {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </BrandSvg>
)

const ICONS = {
  'arrow-right': ArrowRight, 'arrow-up-right': ArrowUpRight, 'arrow-up': ArrowUp, 'arrow-left': ArrowLeft,
  x: X, close: X, menu: Menu, check: Check, mail: Mail, calendar: Calendar, 'message-circle': MessageCircle,
  github: Github, linkedin: Linkedin, 'chevron-down': ChevronDown, 'chevron-right': ChevronRight, play: Play,
  gamepad: Gamepad2, copy: Copy, 'external-link': ExternalLink, sparkles: Sparkles, zap: Zap,
  brain: Brain, layers: Layers, cloud: Cloud, 'shield-check': ShieldCheck, shield: ShieldCheck,
  'chart-line': ChartLine, chart: ChartLine, 'bar-chart-3': ChartLine, 'pen-tool': PenTool, pen: PenTool,
  search: Search, 'drafting-compass': DraftingCompass, hammer: Hammer, rocket: Rocket,
  clock: Clock, database: Database, 'trending-down': TrendingDown, 'trending-up': TrendingUp, receipt: Receipt,
  'user-x': UserX, 'eye-off': EyeOff, inbox: Inbox, 'server-crash': ServerCrash, 'file-text': FileText,
  bot: Bot, 'heart-pulse': HeartPulse, lock: Lock, users: Users, 'map-pin': MapPin, phone: Phone, globe: Globe,
  quote: Quote, star: Star, 'circle-check': CircleCheck, 'volume-2': Volume2, 'volume-x': VolumeX,
  'book-open': BookOpen, award: Award, 'graduation-cap': GraduationCap, briefcase: Briefcase, cpu: Cpu,
  workflow: Workflow, boxes: Boxes, building: Building2, plus: Plus, minus: Minus,
}

export default function Icon({ name, size = 18, strokeWidth = 1.75, className = '', ...rest }) {
  const Cmp = ICONS[name] || Sparkles
  return <Cmp size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" {...rest} />
}

export const iconNames = Object.keys(ICONS)
