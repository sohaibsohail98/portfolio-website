# Portfolio — working guide for making changes

This is the context and the playbook for changing Sohaib Sohail's portfolio
(**sohaibsohail.pages.dev**) from a chat. Read it before touching anything.

---

## What this is

Personal portfolio for **Sohaib Sohail**, Cloud & AI Platform Engineer, Preston UK,
open to senior / staff / principal roles (product companies first, consultancies
second, finance last — he avoids riba-based orgs, so banks are proof-of-rigour,
never the pitch).

- **Live:** https://sohaibsohail.pages.dev (Cloudflare Pages)
- **Repo:** github.com/sohaibsohail98/portfolio-website, default branch `main`
- **Stack:** Astro + Tailwind, static output. Deploys via GitHub Actions on push to main.

---

## Repo layout (everything lives in `astro/`)

```
astro/
  src/
    data/                  <- EDIT COPY HERE
      site.js              nav, socials, stats, tech stack
      projects.js          featured[2] + grid[5] + moreRepos[2]
      content.js           intro, cases[4], roles[4], testimonial, posts[3], consult, background
    components/
      Icon.astro           social/nav SVG paths (github, linkedin, medium, calendar, mail)
      Section.astro        shared shell: number + title + intro + slot
      ProjectCard.astro    one project card; `big` prop adds screenshot + details expander
      RepoRow.astro        compact text row for non-featured repos
      AgentConsole.astro   the scripted console (client-side island)
      sections/            ONE FILE PER SECTION:
        Hero  Console  Work  Cases  Experience  Consult  Writing  Background  Footer
    layouts/Base.astro     <head>, sticky top bar, slide-in right sidebar + scrim
    pages/index.astro      28 lines: imports the sections and lists render order
    scripts/client.js      theme toggle, hamburger sidebar, scroll reveals, accordions
    styles/global.css      CSS design tokens (light/dark) + a few base rules
  tests/build.test.mjs     34 assertions run after every build
  public/                  previews/, img/, CV pdfs, og.png, _headers, _redirects
```

**Golden rule:** copy is data. To change wording, edit `src/data/*`. To change a
section's layout, edit its file in `src/components/sections/`. `index.astro` only
decides which sections appear and in what order — don't stuff markup into it.

---

## How to make a change (the loop)

```bash
cd astro
npm install          # first time only
# ...edit files...
npm run check        # = astro build + npm test. MUST pass before pushing.
```

Then commit and push to `main`. CI re-runs build + test and deploys on green.
A failing test blocks the deploy, by design.

### Pushing from a container/chat
Requires a GitHub token with repo write. Cloudflare deploy is automatic via CI
(secrets already set in the repo: `CLOUDFLARE_API_TOKEN`, `vars.CLOUDFLARE_ACCOUNT_ID`).
After pushing, poll the `deploy.yml` workflow run until `completed success`.

---

## The tests (`npm test`) — what they enforce

Run against `dist/` after build. If you change content you may need to update an
assertion. Categories:

- **Honesty:** the console must stay labelled "Scripted walkthrough" + carry the
  "scripted, not live" line; demo URLs must be the working ones. **Do not remove
  these** — they are the credibility backbone of the site.
- **Structure:** all 8 sections present (proof, work, cases, experience, consult,
  writing, background, contact).
- **Content:** intro, both photos, testimonial 45%, LinkedIn card, consulting,
  tech badges.
- **SEO/social:** og:title/description/image, twitter:card, canonical, JSON-LD.
- **A11y:** skip link, html lang, prefers-reduced-motion, aria labels.
- **Budget:** html under 120KB.

---

## Voice and style rules (important — he checks)

- **British English.** No em-dashes, ever. Use commas or brackets. (There is one
  en-dash inside an SVG path; that's fine, it isn't prose.)
- Contractions, direct, concrete numbers. **No parallel triads** ("x, y and z"
  as a rhetorical flourish — he dislikes these).
- Keep it **condensed and readable**, not a wall of text. Current static copy is
  ~1450 words across the whole page; that's the ceiling, not a target to beat.
- Never fabricate: no invented metrics, quotes, or employer detail.

---

## Content facts (verified — don't contradict these)

- **Headline:** "I take *AI agents* from prototype to production, and build the
  platform they run on." (serif italic on "AI agents").
- **Intro:** starts "Salam, and hi, I'm Sohaib..." (in `content.js`).
- **Stats (3):** 200+ engineers on the AI platform he ran / 3 clouds in prod /
  2024 Google GenAI Award. (Dropped "45 repos" — volume, not seniority.)
- **Career:** Capgemini DevOps (2021-22) -> PwC Senior DevOps (2023-25, led K8s
  workstream, mentored juniors, AI compliance app into 3 tier-one banks) ->
  LSEG Senior Cloud & AI (2025-26, ran enterprise AI platform used by **200+
  engineers** end to end: DevOps + deployments + agentic + MCP, unblocked
  onboarding teams, escalated to Microsoft AI Product team, demoed to CTO) ->
  Veracross Senior AI Platform Engineer (2026, dated "2026" not "2026 →").
- **Case studies (4):** de-branded on purpose (say "Enterprise AI platform",
  "Multi-agent LLM platform in a regulated sector", not employer names).
  Employer names appear ONLY in the Experience table.
- **Testimonial (real):** "...increase productivity by 45%", attributed
  "An engineer who onboarded onto the platform, 2026".

### Live demos (correct URLs — verify before changing)
- SRE agent: `https://sre-agent.sohaibsohail.workers.dev` (DOT not hyphen; the
  hyphen form was a dead link that got shipped once — the test guards against it)
- MCP inspector: `https://mcp-inspector.sohaibsohail.workers.dev`
- Halal calc: `https://halalmortgagecalculator.org.uk`
- Calendly: `https://calendly.com/techwithsohaib/chat-with-sohaib`
- Medium: `https://medium.com/@sohaibsohailengineer`
- LinkedIn: `https://linkedin.com/in/sohaibsohail` (link-out only; LinkedIn blocks
  scraping, so the "Latest from LinkedIn" card is a link, never quoted posts)

### The two flagship projects (facts pulled from the repos, safe to cite)
- **sre-investigation-agent:** 5 SRE tools on Bedrock AgentCore, streams each tool
  call over SSE, 8/8 eval scenarios incl. a false-premise test, deterministic
  mocks, public demo replays recorded runs at zero cost.
- **mcp-context-inspector:** MCP server, 300 tests, 3 storage backends
  (SQLite/DynamoDB/Firestore) behind one data layer, OTLP ingestion from Claude
  Code + Copilot, RFC 9728 OAuth discovery + Google sign-in. NOT on PyPI (runs
  from source — don't call it "pip-installable"). Token counts are labelled
  estimates, not exact.

---

## Design system (don't drift from this)

- Palette: paper/off-white background, near-black ink, **indigo accent (#3A2FE0
  light / #9D96FF dark)**. Light + dark via `data-theme`, toggle top-right.
- Fonts: Schibsted Grotesk (sans), Instrument Serif (the italic accent), IBM Plex
  Mono (labels/meta).
- Tokens are CSS variables in `global.css`; Tailwind maps to them
  (`text-acc`, `bg-surf`, `border-hair`, etc). Use the tokens, not raw hex.
- Contrast: `--low` is the lightest text and is tuned to pass WCAG AA (5.05:1
  light / 5.86:1 dark). If you introduce lighter text, re-check contrast.
- Nav is a slide-in **right sidebar** via hamburger (all breakpoints), with scrim
  + Escape to close.

---

## Decisions already made (don't re-litigate unless asked)

- **Astro, not raw React/SPA.** Chosen to keep static output, ~100 Lighthouse,
  and the "no framework tax" signal that suits a platform engineer.
- **No horizontal slide decks.** Suggested in LinkedIn feedback; declined because
  they fight keyboard/screen-reader nav and hide content behind interaction.
  Condensing is done by cutting words + using detail expanders, not hiding sections.
- **Tech shown as rounded pills**, not circular logo stickers (logos would add an
  icon-set dependency). Offer Simple Icons only if he asks for the logo look.
- **LinkedIn = link-out card.** No scraped/quoted posts.

---

## Credentials — how to authenticate (no secrets in this file, on purpose)

This file is committed to a public repo, so it contains **no tokens**. Here is how
a chat authenticates to make and ship changes. Two credentials are involved and
they're handled very differently.

### Cloudflare (deploy) — already wired, nothing to supply
The deploy is fully automated in CI. The Cloudflare credentials live in **GitHub
repo settings**, encrypted, never in tracked files:
- `secrets.CLOUDFLARE_API_TOKEN`
- `vars.CLOUDFLARE_ACCOUNT_ID`
You never paste these into a chat. Push to `main`, and `.github/workflows/deploy.yml`
builds, tests, and deploys on its own. If the token ever needs rolling, reissue a
Pages-scoped token in the Cloudflare dashboard and update the repo secret in
GitHub Settings → Secrets and variables → Actions.

### GitHub (push) — supply one per session, minimal blast radius
The only thing a chat needs from you is a token to push the commit. Use a
**fine-grained PAT scoped to this one repo**, not a classic account-wide one:

1. GitHub → Settings → Developer settings → **Fine-grained tokens** → Generate new.
2. **Repository access:** Only select repositories → `portfolio-website`.
3. **Permissions:** Repository → **Contents: Read and write** (that's all that's
   needed; add Workflows: Read and write only if editing `.github/workflows/`).
4. **Expiration:** set a short one (7–30 days). Let it lapse rather than reusing.
5. Paste it into the chat when it's ready to push. Rotate/delete after the session.

Why fine-grained: if it leaks, the damage is confined to this repo and expires by
itself, unlike a classic PAT which can write across the whole account.

### Rules for any chat handling these
- **Never** write either credential into a tracked file (this doc, README, source),
  into project memory, or anywhere it persists and re-surfaces. Secrets belong only
  in GitHub's encrypted secret store (Cloudflare) or pasted per-session and then
  discarded (GitHub).
- After pushing, poll the `deploy.yml` run until `completed success`.
- Redact tokens from any command echoed back (`sed "s/$TOKEN/[redacted]/g"`).

---

## Known follow-ups / open items

- **Custom domain** not yet attached (still on the .pages.dev subdomain). Needs
  Cloudflare dashboard access — do it locally, then update og:url + canonical in
  `Base.astro`, and the branch name in the deploy step if needed.
- **Verify demo URLs in a browser** periodically — the container can't reach
  `workers.dev`, so a human should confirm they load.
- **Rotate the old credentials:** earlier chats exposed a GitHub PAT and a
  Cloudflare token in transcript. If they're still live, revoke them and reissue
  per the Credentials section above (fine-grained repo PAT; Pages-scoped CF token).

---

## Quick recipes

**Change a project blurb** -> `src/data/projects.js`, edit `blurb`. `npm run check`.
**Add a project** -> add an object to `grid` (needs a `previews/<name>.jpg`, 760x300).
**Reorder sections** -> reorder the components in `pages/index.astro`, fix the
  `num=` on each `<Section>`.
**Change the intro** -> `src/data/content.js`, `intro`.
**Add a Medium post** -> `src/data/content.js`, `posts` array (date, read, title, url, blurb).
**Swap a photo** -> replace file in `public/img/`, keep the filename or update the
  `<img src>` in `Background.astro`.
