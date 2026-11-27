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

https://soulmate.devya.dev — the static export (`output: "export"` → `out/`) served by
nginx on the Devya VPS (`/home/devya/projects/soulmate/current`, site
`deploy/nginx/soulmate.conf`, TLS by certbot). It left Vercel after the account pause of
2026-11-13 (Cloudflare Pages `soulmate-next.pages.dev` until 2026-11-27).

- **Deploy:** `bash scripts/deploy-vps.sh` builds origin/main on the Mac (nothing builds
  on the VPS), ships `out/` to `releases/<sha>` and points `current` at it. First time:
  `--setup` installs the nginx site and the certificate.
- **Client domain:** `www.soulmatebeautysalon.com` and `soulmatebeautysalon.com` are in the
  client's Hostinger account and still point at the paused Vercel team. To serve them from
  here, the client sets `A @ 72.61.81.59` and `A www 72.61.81.59` (TTL 300); the VPS
  already 301s the bare domain to www, the nginx site already answers for www, and
  `pending-certs` issues its certificate within 15 minutes of the record resolving.
- **Merge gate:** Jenkins `continuous-integration/jenkins/pr-head`, which runs
  `bash scripts/ci-local.sh` (lint, build). Run the same script locally when Jenkins is down.
