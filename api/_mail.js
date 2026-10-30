import nodemailer from 'nodemailer'

// One place that sends mail for every API route.
//
// hello@codecrafters.in is a Cloudflare Email Routing address that forwards
// into the same Gmail account the site used to send from. Gmail drops the
// forwarded copy of a message it already holds in Sent, so notifications sent
// that way never reached the inbox. Two modes avoid that:
//
// - RESEND_API_KEY set: send through Resend from MAIL_FROM. The message did not
//   originate in Gmail, so the forwarded copy lands in the inbox normally.
// - Otherwise: Gmail SMTP, with owner notifications addressed straight to the
//   Gmail account instead of looping through the forwarding address.

const viaResend = () => Boolean(process.env.RESEND_API_KEY)

const fromAddress = () =>
  viaResend() ? process.env.MAIL_FROM || 'hello@codecrafters.in' : process.env.GMAIL_USER

/**
 * Where notifications for the team go. `configured` is the public address
 * (e.g. CAREERS_EMAIL); in Gmail mode it is bypassed for the reason above.
 */
export function ownerInbox(configured) {
  if (viaResend()) return configured || 'hello@codecrafters.in'
  return process.env.GMAIL_USER || configured
}

let transporter
function gmail() {
  transporter ||= nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  })
  return transporter
}

/**
 * @param {{ fromName: string, to: string, replyTo?: string, subject: string,
 *   text?: string, html?: string,
 *   attachments?: { filename: string, content: Buffer, contentType?: string }[] }} msg
 */
export async function sendMail({ fromName, to, replyTo, subject, text, html, attachments }) {
  const from = `"${fromName}" <${fromAddress()}>`

  if (!viaResend()) {
    return gmail().sendMail({ from, to, replyTo, subject, text, html, attachments })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
      html,
      attachments: attachments?.map((a) => ({
        filename: a.filename,
        content: a.content.toString('base64'),
        content_type: a.contentType,
      })),
    }),
  })
  if (!res.ok) throw new Error(`resend ${res.status}: ${(await res.text()).slice(0, 200)}`)
  return res.json()
}
