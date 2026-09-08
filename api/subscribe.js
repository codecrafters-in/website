import nodemailer from 'nodemailer'
import { checklistHtml, checklistText } from './_checklist.js'

const escape = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, source, botcheck } = req.body || {}

  // Honeypot — silently succeed so bots think it worked
  if (botcheck) return res.status(200).json({ ok: true })

  if (!email || !EMAIL_RE.test(String(email))) {
    return res.status(400).json({ error: 'A valid email is required' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // 1. Deliver the checklist to the person who asked for it. The UI promises
    //    "check your inbox", so this send is the one that must not be skipped.
    await transporter.sendMail({
      from: `"Jaimin Shah — CodeCrafters" <${process.env.GMAIL_USER}>`,
      to: email,
      replyTo: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      subject: 'Your AI Readiness Checklist',
      text: checklistText(),
      html: checklistHtml(),
    })

    // 2. Notify the owner. Best-effort: if this fails the subscriber already
    //    has what they asked for, so do not fail the request.
    try {
      await transporter.sendMail({
        from: `"CodeCrafters Website" <${process.env.GMAIL_USER}>`,
        to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
        replyTo: email,
        subject: `Subscribe / checklist request — ${escape(source || 'Website')}`,
        html: `
        <h2 style="color:#131313">New subscriber</h2>
        <p style="font-family:sans-serif;font-size:14px">
          <strong>Email:</strong> ${escape(email)}<br>
          <strong>Source:</strong> ${escape(source || 'Website')}
        </p>
      `,
      })
    } catch (notifyErr) {
      console.error('subscribe: owner notification failed', notifyErr?.message)
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('subscribe: mail failed', err?.message)
    return res.status(502).json({ error: 'Could not send right now. Please try again shortly.' })
  }
}
