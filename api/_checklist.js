// The AI Readiness Checklist, delivered to anyone who asks for it.
//
// These are the same 14 questions published at
// /insights/ai-readiness-audit-14-questions — the article is the long form with
// the reasoning; this is the scoreable version people asked to be sent.

export const CHECKLIST_GROUPS = [
  {
    title: 'Data',
    questions: [
      'Can you name the system of record for every field the automation will read?',
      'Is the same thing called the same thing everywhere?',
      'Do you know the error rate of the data today?',
      'Can the automation reach the data through an API or a database, not a screen?',
    ],
  },
  {
    title: 'Process',
    questions: [
      'Can someone write the process on one page?',
      'Does the process have a defined "done"?',
      'What happens on the exception path today?',
      'Is the volume high enough to matter?',
    ],
  },
  {
    title: 'People',
    questions: [
      'Who owns the output after go-live?',
      'Will the people whose work changes help design it?',
      'Who reviews what the model got wrong, and how often?',
    ],
  },
  {
    title: 'Risk',
    questions: [
      'What does one wrong action cost?',
      'Where does customer or employee data go when it hits the model?',
      'Can you switch it off in under five minutes?',
    ],
  },
]

export const SCORING = [
  ['0–12', 'Not ready. You have a data or process project. Do that first — it is cheaper, and it makes the AI project real later.'],
  ['13–21', 'Pilot with guardrails. Pick one high-volume process, keep the model in recommend-only mode, put a human on every write for the first month.'],
  ['22–28', 'Automate. Build the pipeline and set confidence thresholds from your own measured baseline.'],
]

const BASE_URL = 'https://codecrafters.in'

/** Plain-text body, for clients that do not render HTML. */
export function checklistText() {
  let n = 0
  const lines = [
    'The AI Readiness Checklist',
    '',
    'Score every question 0 (no), 1 (partly) or 2 (yes, and we can prove it).',
    'Do it with your ops lead and your engineering lead in the same room —',
    'a disagreement on a score is itself a finding.',
    '',
  ]
  for (const g of CHECKLIST_GROUPS) {
    lines.push(g.title.toUpperCase(), '')
    for (const q of g.questions) lines.push(`  ${++n}. [ ] ${q}`)
    lines.push('')
  }
  lines.push('SCORING (28 possible)', '')
  for (const [band, meaning] of SCORING) lines.push(`  ${band}  ${meaning}`)
  lines.push(
    '',
    `The long version, with the reasoning behind each question:`,
    `${BASE_URL}/insights/ai-readiness-audit-14-questions`,
    '',
    'Reply to this email if you want us to run it with you. No pitch.',
    '',
    '— Jaimin Shah, CodeCrafters',
  )
  return lines.join('\n')
}

/** HTML body. Deliberately plain so it renders the same everywhere. */
export function checklistHtml() {
  let n = 0
  const groups = CHECKLIST_GROUPS.map(
    (g) => `
      <h3 style="font-family:sans-serif;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#8a6d00;margin:28px 0 10px">${g.title}</h3>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-family:sans-serif;font-size:14px;line-height:1.6;color:#26251f">
        ${g.questions
          .map(
            (q) =>
              `<tr><td style="padding:5px 10px 5px 0;vertical-align:top;color:#8a6d00;width:26px">${++n}.</td><td style="padding:5px 0">${q}</td></tr>`,
          )
          .join('')}
      </table>`,
  ).join('')

  const scoring = SCORING.map(
    ([band, meaning]) =>
      `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;font-weight:700;white-space:nowrap">${band}</td><td style="padding:6px 0">${meaning}</td></tr>`,
  ).join('')

  return `
  <div style="max-width:620px;margin:0 auto;padding:8px 4px">
    <h2 style="font-family:sans-serif;font-size:22px;color:#131313;margin:0 0 6px">The AI Readiness Checklist</h2>
    <p style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#54504a;margin:0 0 4px">
      Score every question <strong>0</strong> (no), <strong>1</strong> (partly) or <strong>2</strong> (yes, and we can prove it).
      Do it with your ops lead and your engineering lead in the same room — a disagreement on a score is itself a finding.
    </p>
    ${groups}
    <h3 style="font-family:sans-serif;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#8a6d00;margin:28px 0 10px">Scoring — 28 possible</h3>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-family:sans-serif;font-size:14px;line-height:1.6;color:#26251f">${scoring}</table>
    <p style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#54504a;margin:28px 0 0">
      The long version, with the reasoning behind each question:<br>
      <a href="${BASE_URL}/insights/ai-readiness-audit-14-questions" style="color:#8a6d00">${BASE_URL}/insights/ai-readiness-audit-14-questions</a>
    </p>
    <p style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#54504a;margin:16px 0 0">
      Reply to this email if you want us to run it with you. No pitch.<br><br>
      — Jaimin Shah, CodeCrafters
    </p>
  </div>`
}
