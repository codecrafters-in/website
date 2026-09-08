import nodemailer from 'nodemailer'

const escape = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// First-touch attribution sent by src/lib/attribution.js. Allow-listed so a
// crafted payload cannot inject arbitrary keys into the notification email.
const ATTRIBUTION_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'fbclid', 'msclkid', 'li_fat_id',
  'referrer', 'landing_page',
]

function attributionRows(body) {
  return ATTRIBUTION_KEYS
    .map((k) => [k, body?.[k]])
    .filter(([, v]) => typeof v === 'string' && v.trim())
    .map(([k, v]) => [k, String(v).slice(0, 200)])
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, company, budget, interest, message, botcheck } = req.body || {}
  const attribution = attributionRows(req.body)

  // Honeypot — silently succeed so bots think it worked
  if (botcheck) return res.status(200).json({ ok: true })

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (!EMAIL_RE.test(String(email))) {
    return res.status(400).json({ error: 'Invalid email' })
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ error: 'Message too long' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"CodeCrafters Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ''}${interest ? ` — ${interest}` : ''}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || 'N/A'}`,
        `Interest: ${interest || 'N/A'}`,
        `Budget: ${budget || 'N/A'}`,
        '',
        attribution.length
          ? `Source:\n${attribution.map(([k, v]) => `  ${k}: ${v}`).join('\n')}`
          : 'Source: direct / unknown',
        '',
        `Message:\n${message}`,
      ].join('\n'),
      html: `
        <h2 style="color:#131313">New Contact Form Submission</h2>
        <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
          <tr><td><strong>Name</strong></td><td>${escape(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escape(email)}</td></tr>
          <tr><td><strong>Company</strong></td><td>${escape(company || 'N/A')}</td></tr>
          <tr><td><strong>Interest</strong></td><td>${escape(interest || 'N/A')}</td></tr>
          <tr><td><strong>Budget</strong></td><td>${escape(budget || 'N/A')}</td></tr>
        </table>
        <h3 style="color:#131313">Message</h3>
        <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escape(message)}</p>
        <h3 style="color:#131313">Where this lead came from</h3>
        <table cellpadding="6" style="font-family:sans-serif;font-size:13px;color:#54504a">
          ${
            attribution.length
              ? attribution
                  .map(([k, v]) => `<tr><td><strong>${escape(k)}</strong></td><td>${escape(v)}</td></tr>`)
                  .join('')
              : '<tr><td colspan="2">Direct or unknown \u2014 no campaign parameters on the landing page.</td></tr>'
          }
        </table>
      `,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact: mail failed', err?.message)
    return res.status(502).json({ error: 'Could not send right now. Please email hello@codecrafters.in.' })
  }
}
