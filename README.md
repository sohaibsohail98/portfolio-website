# portfolio-website

Personal site for Sohaib Sohail — Cloud & AI Platform Engineer.

**Production:** https://portfolio-website-bef.pages.dev (Cloudflare Pages)

## Why it's built this way

One page, no framework, no `node_modules`. The build is a 40-line Node script
that resolves `@include` and `@bundle` directives into a single self-contained
`index.html`. That is deliberate: the site is 44KB, a bundler would add a
dependency tree to audit and a lockfile to maintain, and there is nothing here
that needs one. CSS is minified at build time; JS is left readable, because it
gzips to very little and anyone opening devtools should be able to follow it.

```
src/
  index.html            shell with @include / @bundle directives
  partials/             head, nav, hero, console, cases, work, experience, writing, footer
  styles/               tokens.css (palette + themes), layout.css, components.css
  scripts/              data.repos.js, cases.js, console.js, main.js
public/                 copied verbatim to dist: _headers, _redirects, CV, og.png
build.mjs               resolves directives -> dist/index.html
check.mjs               assertions run in CI (see below)
Dockerfile, nginx.conf  optional Cloud Run path
```

## Commands

```sh
npm run build     # -> dist/
npm run check     # build, then assert. what CI runs.
npm run dev       # rebuild on change, serve on :8080
npm run deploy    # check, then wrangler pages deploy
```

## CI/CD

| Workflow | Trigger | Does |
|---|---|---|
| `deploy.yml` | push to `main`, any PR | build, run `check.mjs`, deploy to Cloudflare Pages. PRs get a preview URL commented on the PR. |
| `audit.yml` | after a successful deploy, weekly Monday 09:00 | Lighthouse against the deployed URL with a perf budget, plus a link check on the two live demos. |
| `cloudrun.yml` | manual only | builds the container and deploys to Cloud Run via Workload Identity Federation. Not the primary host. |

### What `check.mjs` asserts

Beyond "did it build" — these exist because they are mistakes that would
otherwise ship quietly:

- **Honesty guarantees.** The "Ask the agent" console is a *scripted*
  walkthrough. CI fails if the `Scripted walkthrough` badge or the "scripted,
  not live" prose is removed, and fails if the two live demo links go missing.
  The page must never imply the trace is real telemetry.
- Every section id still present after a refactor.
- All social meta tags, canonical URL, and JSON-LD present — the LinkedIn
  preview card is often a recruiter's first impression.
- Accessibility floor: skip link, `lang`, reduced-motion, labelled theme toggle.
- Page under 90KB.

`audit.yml` will **fail if either worker returns >=400**. That is intentional:
the page tells visitors those demos are live, so if they stop being live the
claim is false and someone should know.

## Secrets required

Cloudflare Pages (`deploy.yml`):

| Secret | Where to get it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | dash.cloudflare.com → My Profile → API Tokens → Create → template **Edit Cloudflare Workers**, or a custom token with `Account: Cloudflare Pages: Edit` |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard sidebar, or `wrangler whoami` |

Cloud Run (`cloudrun.yml`, optional): `GCP_WIF_PROVIDER`,
`GCP_SERVICE_ACCOUNT`, `GCP_PROJECT_ID`, `GCP_REGION_HOST`
(e.g. `europe-west2-docker.pkg.dev`).

## Outstanding

- [ ] `public/Sohaib-Sohail-CV.pdf` — linked twice from the page; `check.mjs` warns while missing
- [ ] `public/og.png` at 1200x630
- [ ] Custom domain, then update `og:url` and `<link rel="canonical">` in `src/partials/head.html`
- [ ] Replace the Medium row in `src/partials/writing.html` with real post titles and URLs

## Linked demos

- SRE investigation agent — https://sre-agent-sohaibsohail.workers.dev ([source](https://github.com/sohaibsohail98/sre-investigation-agent))
- MCP context inspector — https://mcp-inspector.sohaibsohail.workers.dev ([source](https://github.com/sohaibsohail98/mcp-context-inspector))
