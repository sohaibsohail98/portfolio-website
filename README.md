# portfolio-website

My official portfolio website. Single page, no build step, no dependencies
beyond Google Fonts.

Live: https://sohaibsohail98.github.io/portfolio-website/

## Structure

`index.html` — the whole site. Inline CSS and JS by design; it is one page and
a build pipeline would cost more than it saves.

## Before sharing this with anyone

- [ ] `Sohaib-Sohail-CV.pdf` in the repo root (linked twice from the page)
- [ ] `og.png` at 1200x630 — this is the LinkedIn and Slack preview card, and
      often a recruiter's actual first impression
- [ ] Set the real domain in `og:url` and `<link rel="canonical">`
- [ ] Replace the Medium row with real post titles, dates and URLs
- [ ] Run Lighthouse against the deployed URL, not a local file

## Deployed demos linked from the page

- SRE investigation agent — https://sre-agent-sohaibsohail.workers.dev
- MCP context inspector — https://mcp-inspector.sohaibsohail.workers.dev

The "Ask the agent" console on the page is a scripted walkthrough and says so.
The two links above are the real thing. Keep that distinction accurate: if
either worker goes down, change the copy rather than leaving a dead
"Open the live agent" link on the page.
