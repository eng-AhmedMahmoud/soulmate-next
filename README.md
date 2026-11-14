This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Hosting

Production is a static export (`output: "export"` in `next.config.ts`) on the
Cloudflare Pages project `soulmate-next` (https://soulmate-next.pages.dev),
serving `www.soulmatebeautysalon.com` through a CNAME at Hostinger. The bare
`soulmatebeautysalon.com` points at the Devya VPS, which answers with a 301 to
`https://www.soulmatebeautysalon.com`, because Pages cannot serve an apex domain
whose DNS is outside Cloudflare. The site left Vercel after the account pause of
2026-11-13.

- Merge gate: Jenkins `continuous-integration/jenkins/pr-head`, which runs
  `bash scripts/ci-local.sh` (lint, build). Run the same script locally when
  Jenkins is down.
- Deploy: `npm run deploy` (`scripts/deploy.sh`) from a clean `main`. A push
  does not deploy.
