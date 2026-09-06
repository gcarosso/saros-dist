// The app is one 6 MB HTML file, which link-preview crawlers abandon before they finish reading it.
// Serve those crawlers a small document that carries the same title, description and card, and
// let every real browser fall through to the app. Only the app path is affected.
const BOTS = /LinkedInBot|facebookexternalhit|Facebot|Twitterbot|Slackbot|Discordbot|WhatsApp|TelegramBot|Applebot|Embedly|Pinterest|SkypeUriPreview|Google-PageRenderer|iMessageLinkPreview/i;

const TITLE = 'SAROS — clinical trial readout calendar, 2026–2028';
const DESC = 'SAROS is a clinical trial readout calendar: every industry Phase 1–3 trial on ClinicalTrials.gov with a primary-completion date in 2026–2028, joined to sponsor cash and runway, specialist holders, insider trades, FDA dates and private funding from SEC EDGAR. Public sources only, refreshed weekly.';
const URL_ = 'https://saros.gcarosso.bio/';
const IMG = 'https://saros.gcarosso.bio/og-saros.png';

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const ua = request.headers.get('user-agent') || '';
  if ((url.pathname === '/' || url.pathname === '/index.html') && BOTS.test(ua)) {
    const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>${TITLE}</title>
<meta name="description" content="${DESC}">
<link rel="canonical" href="${URL_}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="SAROS">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${DESC}">
<meta property="og:url" content="${URL_}">
<meta property="og:image" content="${IMG}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${TITLE}">
<meta name="twitter:description" content="${DESC}">
<meta name="twitter:image" content="${IMG}">
</head><body><h1>${TITLE}</h1><p>${DESC}</p><p><a href="${URL_}">Open the calendar</a> · <a href="${URL_}method">Method</a></p></body></html>`;
    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=600', 'vary': 'User-Agent' } });
  }
  return next();
}
