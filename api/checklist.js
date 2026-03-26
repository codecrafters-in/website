import nodemailer from 'nodemailer'

const escape = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, source } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

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
    subject: `Checklist request — ${escape(source || 'Website')}`,
    html: `
      <h2 style="color:#131313">New Checklist / Lead Magnet Request</h2>
      <p style="font-family:sans-serif;font-size:14px">
        <strong>Email:</strong> ${escape(email)}<br>
        <strong>Source:</strong> ${escape(source || 'Website')}
      </p>
    `,
  })

  return res.status(200).json({ ok: true })
}
