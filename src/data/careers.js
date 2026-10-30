// Open roles for the Careers page. Add a role here and it gets a listing card,
// its own /careers/:slug page with the apply form, and a sitemap entry.
export const careers = [
  {
    slug: 'junior-full-stack-ai-product-engineer',
    title: 'Junior Full-Stack AI Product Engineer',
    team: 'Engineering',
    experience: '1–2 years',
    type: 'Full-time',
    location: 'Ahmedabad, India',
    posted: '2026-10-30',
    summary:
      'Build modern web apps and AI-powered products end to end: React and Next.js on the front, APIs and Supabase on the back, and LLM workflows and agents in between.',
    about: [
      'We are looking for a Full-Stack AI Product Engineer who is passionate about building modern web applications and AI-powered solutions.',
      'The ideal candidate has a good understanding of frontend and backend development, along with practical knowledge of AI technologies, LLMs, AI workflows and agentic systems.',
      'You will be involved in building applications from the ground up, integrating AI into existing systems, designing intelligent workflows and converting business requirements into working software products.',
      'We are looking for someone who thinks beyond writing code, understands the problem they are solving and enjoys building useful products.',
    ],
    responsibilities: [
      {
        title: 'Full-Stack Development',
        items: [
          'Develop modern web applications using React, Next.js and TypeScript.',
          'Build reusable, responsive and maintainable frontend components.',
          'Develop backend APIs, business logic and third-party integrations.',
          'Work with Supabase, PostgreSQL and database architecture.',
          'Implement authentication, authorization and role-based access.',
          'Deploy, monitor and maintain production applications.',
        ],
      },
      {
        title: 'AI Engineering',
        items: [
          'Integrate LLMs such as OpenAI, Anthropic Claude and Gemini.',
          'Build AI-powered workflows, automation systems and intelligent pipelines.',
          'Develop AI agents capable of using tools, processing information and executing actions.',
          'Implement function calling, structured outputs and multi-step reasoning workflows.',
          'Work with RAG systems, embeddings and vector databases.',
          'Build reliable AI pipelines with validation, error handling and retry mechanisms.',
          'Understand context management, prompt engineering and AI evaluation.',
        ],
      },
      {
        title: 'System Design & Architecture',
        items: [
          'Understand application architecture and scalable system design.',
          'Design efficient database schemas and relationships.',
          'Work with REST APIs, webhooks and asynchronous processing.',
          'Understand background jobs, queues, caching and application performance.',
          'Write clean, reusable and maintainable code.',
          'Follow security and software development best practices.',
        ],
      },
      {
        title: 'Business & Product Understanding',
        items: [
          'Understand business requirements and translate them into technical solutions.',
          'Identify opportunities to automate manual and repetitive business processes.',
          'Think about how software can solve real business problems.',
          'Participate in product discussions and technical decision-making.',
          'Take ownership of features from understanding requirements to deployment.',
          'Focus on building solutions that are practical, reliable and useful for end users.',
        ],
      },
    ],
    required: [
      'Good knowledge of JavaScript and TypeScript.',
      'Hands-on experience with React and Next.js.',
      'Understanding of frontend and backend development.',
      'Working knowledge of Supabase and PostgreSQL.',
      'Understanding of REST APIs, webhooks and integrations.',
      'Experience integrating LLM APIs such as OpenAI, Claude or Gemini.',
      'Understanding of AI workflows, prompt engineering and structured outputs.',
      'Basic knowledge of system design and database architecture.',
      'Familiarity with Git and GitHub.',
    ],
    niceToHave: [
      'Experience with LangChain, LangGraph or Vercel AI SDK.',
      'Knowledge of agentic AI and multi-agent workflows.',
      'Experience with RAG and vector databases.',
      'Familiarity with n8n or other workflow automation tools.',
      'Understanding of Redis, queues and background workers.',
      'Experience building SaaS applications.',
      'Knowledge of Docker and cloud deployment.',
      'Experience using AI-assisted development tools such as Claude Code, Cursor or GitHub Copilot.',
    ],
    lookingFor: [
      'Strong logical thinking and problem-solving abilities.',
      'Interest in AI technologies and their practical applications.',
      'Ability to understand business problems, not just follow technical instructions.',
      'Curiosity to experiment with new technologies and approaches.',
      'Ability to take ownership and work independently.',
      'Good communication and collaboration skills.',
      'A product-oriented mindset with an interest in building complete solutions.',
    ],
    note: 'We value practical implementation, problem-solving and the ability to build working products more than certifications or theoretical knowledge.',
  },
]

export const careerBySlug = Object.fromEntries(careers.map((c) => [c.slug, c]))

export default careers
