# sohaibsohail.pages.dev

Personal portfolio. Astro + Tailwind, static output, deployed to Cloudflare Pages.

## Structure

Every section is its own component. Content is data, kept separate from markup.

```
astro/
  src/
    data/
      site.js         nav, socials, stats, tech stack
      projects.js     featured + grid + archive repos
      content.js      intro, cases, roles, testimonial, posts, consulting, background
    components/
      Icon.astro          social/nav SVGs
      Section.astro       shared section shell (number, title, intro)
      ProjectCard.astro   one card, `big` variant adds the details expander
      RepoRow.astro       compact text row
      AgentConsole.astro  the scripted console island
      sections/
        Hero, Console, Work, Cases, Experience,
        Consult, Writing, Background, Footer     one file each
    layouts/Base.astro   head, sticky nav, slide-in sidebar
    pages/index.astro    assembles the sections, nothing else
    scripts/client.js    theme toggle, sidebar, reveals, accordions
    styles/global.css    design tokens + a few base rules
  tests/build.test.mjs   post-build assertions
  public/                previews, photos, CV, og.png
```

To change copy, edit the relevant file in `src/data`. To change a section's
layout, edit its file in `src/components/sections`. The page file itself only
lists which sections render and in what order.

## Commands

```
cd astro
npm install
npm run dev      # local dev server
npm run build    # -> dist/
npm test         # assertions against dist/ (run after build)
npm run check    # build + test in one
```

## Tests

`tests/build.test.mjs` runs after every build, locally and in CI. It checks the
honesty labels (scripted-console disclaimer, working demo URLs), that every
section and image is present, SEO/social meta, accessibility basics, and the
page-size budget. Same command both places, so a regression fails locally before
it reaches CI.

## Deploy

`.github/workflows/deploy.yml`: build, test, then deploy `astro/dist` to
Cloudflare Pages on push to main. A failing test blocks the deploy.
