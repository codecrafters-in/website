import { Navigate } from 'react-router-dom'
import Layout from './Layout.jsx'
import RouteError from './components/RouteError.jsx'
import { redirects } from './data/redirects.js'

// Static path helpers are resolved lazily so the data layer is only loaded at build time.
const solutionPaths = async () => (await import('./data/solutions.js')).solutions.map((s) => `solutions/${s.slug}`)
const workPaths = async () => (await import('./data/work.js')).work.filter((w) => w.body).map((w) => `work/${w.slug}`)
const insightPaths = async () => (await import('./data/insights.js')).insights.map((a) => `insights/${a.slug}`)

export const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, lazy: () => import('./pages/Home.jsx') },
      { path: 'solutions', lazy: () => import('./pages/Solutions.jsx') },
      { path: 'solutions/:slug', lazy: () => import('./pages/SolutionDetail.jsx'), getStaticPaths: solutionPaths },
      { path: 'work', lazy: () => import('./pages/Work.jsx') },
      { path: 'work/:slug', lazy: () => import('./pages/CaseStudy.jsx'), getStaticPaths: workPaths },
      { path: 'about', lazy: () => import('./pages/About.jsx') },
      { path: 'insights', lazy: () => import('./pages/Insights.jsx') },
      { path: 'insights/:slug', lazy: () => import('./pages/Article.jsx'), getStaticPaths: insightPaths },
      { path: 'contact', lazy: () => import('./pages/Contact.jsx') },
      { path: 'privacy', lazy: () => import('./pages/Privacy.jsx') },
      { path: 'terms', lazy: () => import('./pages/Terms.jsx') },
      { path: '404', lazy: () => import('./pages/NotFound.jsx') },
      ...redirects.map((r) => ({ path: r.from.replace(/^\//, ''), element: <Navigate to={r.to} replace /> })),
      { path: '*', lazy: () => import('./pages/NotFound.jsx') },
    ],
  },
]

export default routes
