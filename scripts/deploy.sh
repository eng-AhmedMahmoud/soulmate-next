#!/usr/bin/env bash
# Production deploy (static export) to Cloudflare Pages (the site left Vercel after the
# 2026-11-13 account pause). Builds from a clean install, uploads the static
# output to the Pages project, then checks every public host.
#   bash scripts/deploy.sh
# Needs a wrangler login on the Cloudflare account that owns the project
# (`npx wrangler@4.156.0 whoami`).
set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT="soulmate-next"
OUT_DIR="out"
HOSTS=(www.soulmatebeautysalon.com soulmatebeautysalon.com)
WRANGLER=(npx --yes wrangler@4.156.0)

if [ -n "$(git status --porcelain)" ]; then
  echo "deploy: working tree is dirty; commit or stash first" >&2
  exit 1
fi

npm ci --no-audit --no-fund
npm run build

"${WRANGLER[@]}" pages project list | grep -q "\b$PROJECT\b" \
  || "${WRANGLER[@]}" pages project create "$PROJECT" --production-branch main --force
"${WRANGLER[@]}" pages deploy "$OUT_DIR" --project-name "$PROJECT" --branch main \
  --commit-hash "$(git rev-parse HEAD)" --commit-message "$(git log -1 --format=%s)"

status=0
for host in "$PROJECT.pages.dev" "${HOSTS[@]}"; do
  code="$(curl -s -o /dev/null -m 15 -w '%{http_code}' "https://$host/" || true)"
  echo "deploy: https://$host/ -> $code"
  [ "$host" = "$PROJECT.pages.dev" ] && [ "$code" != 200 ] && status=1
done
exit "$status"
