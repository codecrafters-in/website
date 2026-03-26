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

  const { name, email, company, budget, message, botcheck } = req.body

  // Honeypot — silently succeed so bots think it worked
  if (botcheck) return res.status(200).json({ ok: true })

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
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
    subject: `New enquiry from ${name}${company ? ` (${company})` : ''}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || 'N/A'}`,
      `Budget: ${budget || 'N/A'}`,
      '',
      `Message:\n${message}`,
    ].join('\n'),
    html: `
      <h2 style="color:#131313">New Contact Form Submission</h2>
      <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
        <tr><td><strong>Name</strong></td><td>${escape(name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escape(email)}</td></tr>
        <tr><td><strong>Company</strong></td><td>${escape(company || 'N/A')}</td></tr>
        <tr><td><strong>Budget</strong></td><td>${escape(budget || 'N/A')}</td></tr>
      </table>
      <h3 style="color:#131313">Message</h3>
      <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escape(message)}</p>
    `,
  })

  return res.status(200).json({ ok: true })
}
