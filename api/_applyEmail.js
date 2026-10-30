// Confirmation email sent to a candidate after they apply on /careers.
// Deliberately generic: it confirms receipt and sets expectations, without
// echoing back details the candidate already knows.
//
// Table layout and inline styles only: email clients ignore <style> blocks,
// flexbox and CSS variables, so this is what renders the same in Gmail,
// Outlook and Apple Mail.

const BASE_URL = 'https://codecrafters.in'

const escape = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"
const INK = '#131313'
const BODY = '#3d3a35'
const MUTED = '#8b867c'
const GOLD = '#f5c518'
const SURFACE = '#f7f5f1'
const LINE = '#e7e2d8'

// public/images/light_logo.png is 440×182 — keep that ratio or it distorts.
const LOGO_W = 170
const LOGO_H = Math.round((LOGO_W * 182) / 440)

const firstName = (name) => String(name ?? '').trim().split(/\s+/)[0] || ''

// `roleHtml` is the role name as it should appear: bold markup in HTML, plain in text.
const paragraphs = (roleHtml) => [
  `Thank you for taking the time to apply for the ${roleHtml} position.`,
  'We appreciate your interest in the opportunity and the time you have invested in sharing your profile and experience with us.',
  'We have successfully received your application. Our team will review your profile and evaluate your experience against the role requirements. Once the initial review is complete, we will get back to you with an update regarding the next steps.',
  'Thank you for your patience and interest. We look forward to connecting with you.',
]

/** @param {{ name: string, role: string }} p */
export function applyConfirmationHtml({ name, role }) {
  const first = firstName(name)
  const body = paragraphs(`<strong style="color:${INK}">${escape(role)}</strong>`)
    .map((p) => `<p style="margin:0 0 16px;font-family:${FONT};font-size:15px;line-height:1.7;color:${BODY}">${p}</p>`)
    .join('')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>Application received</title>
</head>
<body style="margin:0;padding:0;background:${SURFACE}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">We have received your application for ${escape(role)}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SURFACE}">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border:1px solid ${LINE};border-radius:12px">
          <tr><td style="height:5px;background:${GOLD};border-radius:12px 12px 0 0;font-size:0;line-height:0">&nbsp;</td></tr>

          <tr>
            <td align="center" style="padding:32px 36px 24px;border-bottom:1px solid ${LINE}">
              <a href="${BASE_URL}" style="text-decoration:none">
                <img src="${BASE_URL}/images/light_logo.png" width="${LOGO_W}" height="${LOGO_H}" alt="CodeCrafters"
                  style="display:block;border:0;outline:none;width:${LOGO_W}px;height:${LOGO_H}px;font-family:${FONT};font-size:22px;font-weight:700;color:${INK}">
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 36px 12px">
              <p style="margin:0 0 20px;font-family:${FONT};font-size:16px;line-height:1.6;color:${INK}">Hi${first ? ` ${escape(first)}` : ''},</p>
              ${body}
              <p style="margin:28px 0 0;font-family:${FONT};font-size:15px;line-height:1.6;color:${BODY}">
                Best regards,<br>
                <strong style="color:${INK}">Hiring Team</strong><br>
                CodeCrafters
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 36px 28px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${LINE}">
                <tr>
                  <td style="padding-top:18px;font-family:${FONT};font-size:12px;line-height:1.6;color:${MUTED}">
                    <a href="${BASE_URL}" style="color:${INK};text-decoration:none;font-weight:600">codecrafters.in</a> &nbsp;·&nbsp; Ahmedabad, India<br>
                    You are receiving this email because you applied for a role on our website.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** Plain-text twin for clients that do not render HTML. */
export function applyConfirmationText({ name, role }) {
  const first = firstName(name)
  return [
    `Hi${first ? ` ${first}` : ''},`,
    '',
    ...paragraphs(role).flatMap((p) => [p, '']),
    'Best regards,',
    'Hiring Team',
    'CodeCrafters',
    '',
    'codecrafters.in · Ahmedabad, India',
  ].join('\n')
}
