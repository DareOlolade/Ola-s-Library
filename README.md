# mdblog

A minimal, monochrome markdown blog. Drop a `.md` file into `posts/`, it shows up — no build step, no database, no CMS.

## Run it

```bash
npm install
npm start
```

Visit `http://localhost:3000`.

For auto-restart while you edit the server itself:

```bash
npm run dev
```

(You never need to restart just to add a post — the posts folder is read fresh on every request.)

## Writing a post

Create `posts/my-post-slug.md`:

```markdown
---
title: My Post Title
date: 2026-08-28
tags: [os, notes]
---

Your markdown content goes here.
```

- The filename (minus `.md`) becomes the URL: `posts/my-post-slug.md` → `/post/my-post-slug`
- `title`, `date`, and `tags` are optional frontmatter. If you skip `date`, it falls back to the file's last-modified time.
- `excerpt` is auto-generated from the first ~160 characters of your content, or you can set it manually in frontmatter.
- Posts are sorted newest first automatically.

## Structure

```
mdblog/
├── server.js         # reads /posts, renders pages
├── posts/            # your markdown files live here
├── views/             # EJS templates (index, post, 404)
└── public/style.css   # the entire look — monochrome, no gradients
```

## Deploying

This is a plain Node/Express app, so it runs anywhere Node runs: a VPS, Render, Railway, Fly.io, a Raspberry Pi, whatever. Just make sure the `posts/` folder persists (or is part of your deploy) since that's where the content lives. If you want posts to survive redeploys cleanly, consider making `posts/` its own git repo or syncing it separately from the app code.

## Customizing the look

Everything visual is in `public/style.css`. The whole palette is three CSS variables at the top (`--bg`, `--fg`, `--muted`) — change those and the whole site follows. No frameworks, no build tooling.
