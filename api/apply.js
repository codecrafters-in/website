import { sendMail, ownerInbox } from './_mail.js'

const escape = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Vercel caps request bodies at 4.5 MB; 3 MB of file is ~4 MB once base64'd.
const MAX_RESUME_BYTES = 3 * 1024 * 1024
const RESUME_TYPES = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

const FIELDS = [
  ['role', 'Role'],
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['location', 'Current city'],
  ['experience', 'Experience'],
  ['notice', 'Notice period'],
  ['linkedin', 'LinkedIn'],
  ['portfolio', 'GitHub / portfolio'],
]

const clip = (v, n = 300) => String(v ?? '').trim().slice(0, n)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body || {}

  // Honeypot — silently succeed so bots think it worked
  if (body.botcheck) return res.status(200).json({ ok: true })

  const { name, email, phone, experience, message, role, resume } = body
  if (!name || !email || !phone || !experience || !message || !role) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (!EMAIL_RE.test(String(email))) {
    return res.status(400).json({ error: 'Invalid email' })
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ error: 'Message too long' })
  }

  const ext = String(resume?.name || '').split('.').pop().toLowerCase()
  if (!resume?.content || !RESUME_TYPES[ext]) {
    return res.status(400).json({ error: 'Resume must be a PDF or Word file' })
  }
  const file = Buffer.from(String(resume.content), 'base64')
  if (!file.length || file.length > MAX_RESUME_BYTES) {
    return res.status(400).json({ error: 'Resume must be 3 MB or smaller' })
  }
  const safeName = `${clip(name, 60).replace(/[^\w-]+/g, '_')}_resume.${ext}`

  const rows = FIELDS.map(([k, label]) => [label, clip(body[k]) || 'N/A'])

  try {
    // 1. The application itself, to the team inbox. This is the send that must work.
    await sendMail({
      fromName: 'CodeCrafters Careers',
      to: ownerInbox(process.env.CAREERS_EMAIL || process.env.CONTACT_EMAIL),
      replyTo: email,
      subject: `Job application: ${clip(role, 120)} — ${clip(name, 80)}`,
      text: [...rows.map(([l, v]) => `${l}: ${v}`), '', `About their work:\n${message}`, '', `Resume attached: ${safeName}`].join('\n'),
      html: `
        <h2 style="color:#131313">New job application</h2>
        <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
          ${rows.map(([l, v]) => `<tr><td><strong>${escape(l)}</strong></td><td>${escape(v)}</td></tr>`).join('')}
        </table>
        <h3 style="color:#131313">About their work</h3>
        <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escape(message)}</p>
        <p style="font-family:sans-serif;font-size:13px;color:#54504a">Resume attached: ${escape(safeName)}</p>
      `,
      attachments: [{ filename: safeName, content: file, contentType: RESUME_TYPES[ext] }],
    })

    // 2. Confirmation to the applicant. Best-effort: the application is already
    //    with the team, so a failure here must not report the submission failed.
    try {
      await sendMail({
        fromName: 'CodeCrafters Careers',
        to: email,
        replyTo: process.env.CAREERS_EMAIL || 'hello@codecrafters.in',
        subject: `We received your application — ${clip(role, 120)}`,
        text: [
          `Hi ${clip(name, 80)},`,
          '',
          `Thanks for applying for the ${clip(role, 120)} role at CodeCrafters. Your application and resume reached us.`,
          'We read every application ourselves and will get back to you if there is a fit.',
          '',
          '— The CodeCrafters team',
        ].join('\n'),
        html: `
          <div style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#131313">
            <p>Hi ${escape(clip(name, 80))},</p>
            <p>Thanks for applying for the <strong>${escape(clip(role, 120))}</strong> role at CodeCrafters. Your application and resume reached us.</p>
            <p>We read every application ourselves and will get back to you if there is a fit.</p>
            <p style="color:#54504a">— The CodeCrafters team</p>
          </div>
        `,
      })
    } catch (ackErr) {
      console.error('apply: applicant confirmation failed', ackErr?.message)
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('apply: mail failed', err?.message)
    return res.status(502).json({ error: 'Could not send right now. Please email hello@codecrafters.in.' })
  }
}
