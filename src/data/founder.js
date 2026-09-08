// Founder profile for the About page.
export const founder = {
  name: 'Jaimin Shah',
  role: 'Founder & Principal Engineer',
  tagline: 'Research rigour, applied to production systems.',
  // Shown as "who you actually work with", not as a resume header.
  standfirst: 'Small, senior, and accountable to the thing still running a year later.',
  // Company voice, not a CV. Credentials appear where they explain how the work
  // gets done — not as a career history.
  bio: [
    'CodeCrafters exists because most enterprise software is fragile, and the reason is almost never the software. It is the depth of thinking behind it. We were built out of years spent inside a major ERP vendor watching rollouts that technically shipped and never actually landed.',
    'So we work the other way round. Every engagement is scoped and architected by the person who will build it, and that person stays on the account until it is running. No discovery team handing a deck to a delivery team. No handoffs.',
    'The research background matters here in a practical way: peer-reviewed machine learning work means we know the difference between a model that demos well and one that holds up against real data. That is the same judgement we apply to an ERP rollout or an AI agent going near production.',
  ],
  // NOTE (owner to verify): schools come from the index.html JSON-LD `alumniOf` list.
  // The Master's is assigned to MSU (which runs an M.E. in Automatic Control & Robotics)
  // and the undergraduate degree to Adani Institute; confirm degree names and years.
  education: [
    { degree: "Master's in Automatic Control & Robotics", school: 'The Maharaja Sayajirao University of Baroda' },
    { degree: "Bachelor's in Engineering", school: 'Adani Institute of Infrastructure Engineering' },
  ],
  // NOTE (owner to verify): sources conflict on which paper is the Elsevier one.
  // The portfolio Achievements section labels the EMG paper "Elsevier", while the old
  // website and the DOI point to the stock-prediction paper as Elsevier (Intelligent
  // Systems with Applications). The EMG paper is listed as Taylor & Francis per the
  // About section; confirm publisher, journal and DOI before publishing.
  publications: [
    {
      title: 'Hybrid deep learning for stock market prediction on Nifty50',
      publisher: 'Elsevier',
      journal: 'Intelligent Systems with Applications',
      year: 2022,
      doi: '10.1016/j.iswa.2022.200111',
      url: 'https://doi.org/10.1016/j.iswa.2022.200111',
    },
    {
      title: 'Noise-filtered EMG gesture recognition with CNNs',
      publisher: 'Taylor & Francis',
      year: 2022,
      note: 'verify',
    },
  ],
  achievements: [
    {
      icon: 'file-text',
      category: 'Research',
      title: 'Peer-Reviewed Publication',
      subtitle: 'EMG Gesture Recognition · 2022',
      description:
        'Co-authored a peer-reviewed paper on noise-filtered EMG signal processing for hand gesture recognition, reaching 95% classification accuracy with CNN architectures.',
      tags: ['TensorFlow', 'CNN', 'Signal Processing', 'Python'],
    },
    {
      icon: 'bot',
      category: 'AI Engineering',
      title: 'LLM Email Intelligence Pipeline',
      subtitle: 'Zod-validated structured outputs · 2026',
      description:
        'Independently architected a production Gmail intelligence system that classifies emails into structured life events using multi-provider LLM routing via Vercel AI Gateway.',
      tags: ['LLM', 'Zod', 'Next.js', 'Vercel AI Gateway'],
    },
    {
      icon: 'heart-pulse',
      category: 'Healthcare Tech',
      title: 'OHIP Insurance Automation Platform',
      subtitle: 'MCEDT Integration · Ontario, Canada',
      description:
        'Built a real-time healthcare insurance platform with OHIP verification, automated XML/EDI claims processing and MCEDT integration, handling end-to-end medical billing workflows.',
      tags: ['OHIP API', 'MCEDT', 'XML/EDI', 'Python'],
    },
    {
      icon: 'lock',
      category: 'Security',
      title: 'Server-Side AES-256-GCM Token Encryption',
      subtitle: 'Replacing a browser-side E2EE model',
      description:
        'Redesigned a SaaS auth model by migrating from browser-passphrase E2EE to server-side AES-256-GCM encryption, eliminating a class of client-side key exposure vulnerabilities.',
      tags: ['AES-256', 'PKCE', 'OAuth', 'Supabase RLS'],
    },
    {
      icon: 'trending-up',
      category: 'Data & ML',
      title: 'Sales Forecasting Dashboard',
      subtitle: '+45% inventory planning accuracy · 2023',
      description:
        'Built a Python + OWL time-series forecasting dashboard that cut inventory discrepancies by 60% and lifted planning accuracy by 45% across multi-warehouse operations.',
      tags: ['Python', 'OWL', 'Chart.js', 'Time-Series ML'],
    },
    {
      icon: 'users',
      category: 'Mentorship',
      title: 'Mentored 8 Junior Developers',
      subtitle: '50+ technical interviews conducted',
      description:
        'Led onboarding, code reviews and growth paths for 8 junior developers and conducted 50+ technical interviews, building a scalable hiring and knowledge-transfer culture.',
      tags: ['Leadership', 'Code Review', 'Technical Interviewing'],
    },
  ],
  stats: [
    { value: '8+', label: 'AI systems in production' },
    { value: '120+', label: 'Custom modules shipped' },
    { value: '30+', label: 'Projects delivered' },
    { value: '2', label: 'Peer-reviewed papers behind the work' },
  ],
  // Skill names only (no emoji). Platform-specific module names generalised to "ERP".
  skills: {
    rows: [
      ['Python', 'TypeScript', 'Next.js', 'React', 'PostgreSQL', 'Supabase', 'Claude MCP', 'OWL Framework', 'Stripe API', 'OHIP API', 'Accounting', 'ERP Sales & eCommerce', 'Vercel AI Gateway', 'Git'],
      ['LLM Pipelines', 'Agent Pipelines', 'OpenAI / Gemini', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'Time-Series ML', 'Docker', 'DigitalOcean', 'Plaid API', 'Twilio VoIP', 'Flask', 'React Native', 'SQL', 'CRM', 'ERP Inventory & HRMS'],
      ['B2B Commerce', 'SaaS Monetisation', 'OCR Automation', 'ETL Frameworks', 'AES-256 Encryption', 'OAuth / PKCE', 'RLS Policies', 'XML / EDI', 'Server Actions', 'GSAP Animations', 'HTML / CSS', 'JavaScript ES6+', 'Postman'],
    ],
  },
}

export default founder
