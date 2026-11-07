// Pings IndexNow (Bing, Yandex, Seznam, Naver) with every URL in the live sitemap.
// Run after a deploy:  npm run indexnow
// The key file public/3bdd309307f088ce7c2d8081e95566f4.txt must be live at the site root for this to be accepted.
const HOST = 'www.codecrafters.in'
const KEY = '3bdd309307f088ce7c2d8081e95566f4'

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urlList.length) {
  console.error('indexnow: no URLs found in the live sitemap')
  process.exit(1)
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})
console.log(`indexnow: submitted ${urlList.length} URLs → HTTP ${res.status}`)
process.exit(res.ok ? 0 : 1)
