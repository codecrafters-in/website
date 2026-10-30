// Confirmation email sent to a candidate after they apply on /careers.
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
const MUTED = '#54504a'
const GOLD = '#f5c518'
const GOLD_TEXT = '#8a6d00'
const SURFACE = '#f7f5f1'
const LINE = '#e7e2d8'

const STEPS = [
  ['We read it', 'An engineer on the team reviews your application and resume — not a keyword filter.'],
  ['We reach out', 'If there is a fit, we will email you to set up a conversation about the work you have done.'],
  ['Meanwhile', 'Have a look at what we build, so you know the kind of problems you would be working on.'],
]

/**
 * @param {{ name: string, role: string, roleUrl: string,
 *   details: [string, string][], resumeName: string }} p
 */
export function applyConfirmationHtml({ name, role, roleUrl, details, resumeName }) {
  const first = escape(String(name).trim().split(/\s+/)[0] || name)

  const detailRows = [...details, ['Resume', resumeName]]
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:9px 0;border-bottom:1px solid ${LINE};font-family:${FONT};font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${MUTED};width:38%;vertical-align:top">${escape(label)}</td>
          <td style="padding:9px 0;border-bottom:1px solid ${LINE};font-family:${FONT};font-size:14px;color:${INK};vertical-align:top;word-break:break-word">${escape(value)}</td>
        </tr>`,
    )
    .join('')

  const steps = STEPS.map(
    ([title, body], i) => `
        <tr>
          <td style="padding:0 14px 18px 0;vertical-align:top;width:32px">
            <div style="width:28px;height:28px;line-height:28px;border-radius:14px;background:${GOLD};color:${INK};font-family:${FONT};font-size:13px;font-weight:700;text-align:center">${i + 1}</div>
          </td>
          <td style="padding:2px 0 18px;vertical-align:top;font-family:${FONT}">
            <div style="font-size:15px;font-weight:700;color:${INK}">${title}</div>
            <div style="font-size:14px;line-height:1.6;color:${MUTED};margin-top:2px">${body}</div>
          </td>
        </tr>`,
  ).join('')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>Application received</title>
</head>
<body style="margin:0;padding:0;background:${SURFACE}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">Your application for ${escape(role)} reached us. Here is what happens next.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SURFACE}">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">

          <tr>
            <td style="padding:0 4px 20px">
              <a href="${BASE_URL}" style="text-decoration:none">
                <img src="${BASE_URL}/images/light_logo.png" width="150" height="38" alt="CodeCrafters" style="display:block;border:0;height:38px;width:150px;font-family:sans-serif;font-size:20px;font-weight:700;color:#131313">
              </a>
            </td>
          </tr>

          <tr>
            <td style="background:#ffffff;border-radius:12px;border:1px solid ${LINE};overflow:hidden">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="height:6px;background:${GOLD};font-size:0;line-height:0">&nbsp;</td></tr>
                <tr>
                  <td style="padding:36px 36px 8px">
                    <div style="display:inline-block;padding:6px 12px;border-radius:999px;background:#fdf6d8;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${GOLD_TEXT}">&#10003;&nbsp; Application received</div>
                    <h1 style="margin:20px 0 0;font-family:${FONT};font-size:26px;line-height:1.25;font-weight:700;color:${INK}">Thanks for applying, ${first}.</h1>
                    <p style="margin:14px 0 0;font-family:${FONT};font-size:15px;line-height:1.65;color:${MUTED}">
                      Your application for <strong style="color:${INK}">${escape(role)}</strong> has reached the CodeCrafters team, along with your resume. We are glad you are interested in building with us.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 36px 4px">
                    <div style="font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${GOLD_TEXT};margin-bottom:6px">What you sent us</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows}</table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:28px 36px 4px">
                    <div style="font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${GOLD_TEXT};margin-bottom:16px">What happens next</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps}</table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:4px 36px 36px">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="border-radius:8px;background:${GOLD}">
                          <a href="${BASE_URL}/work" style="display:inline-block;padding:13px 22px;font-family:${FONT};font-size:14px;font-weight:700;color:${INK};text-decoration:none">See what we build &rarr;</a>
                        </td>
                        <td style="width:12px">&nbsp;</td>
                        <td style="border-radius:8px;border:1px solid ${LINE}">
                          <a href="${roleUrl}" style="display:inline-block;padding:12px 20px;font-family:${FONT};font-size:14px;font-weight:600;color:${INK};text-decoration:none">View the role</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 36px;background:${SURFACE};border-top:1px solid ${LINE};font-family:${FONT};font-size:13px;line-height:1.6;color:${MUTED}">
                    Need to update something or add a link? Just reply to this email — it comes straight to us.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 4px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:#8b867c">
              Warm regards,<br>
              <strong style="color:${INK}">The CodeCrafters team</strong><br>
              <a href="${BASE_URL}" style="color:${GOLD_TEXT};text-decoration:none">codecrafters.in</a> &nbsp;·&nbsp; Ahmedabad, India
              <div style="margin-top:14px;color:#a39e93">You received this email because you applied for a role on codecrafters.in.</div>
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
export function applyConfirmationText({ name, role, roleUrl, details, resumeName }) {
  const first = String(name).trim().split(/\s+/)[0] || name
  return [
    `Hi ${first},`,
    '',
    `Thanks for applying for the ${role} role at CodeCrafters. Your application and resume have reached the team.`,
    '',
    'WHAT YOU SENT US',
    ...[...details, ['Resume', resumeName]].map(([l, v]) => `  ${l}: ${v}`),
    '',
    'WHAT HAPPENS NEXT',
    ...STEPS.map(([t, b], i) => `  ${i + 1}. ${t} — ${b}`),
    '',
    `See what we build: ${BASE_URL}/work`,
    `View the role: ${roleUrl}`,
    '',
    'Need to update something? Just reply to this email.',
    '',
    'Warm regards,',
    'The CodeCrafters team',
    'codecrafters.in · Ahmedabad, India',
  ].join('\n')
}
