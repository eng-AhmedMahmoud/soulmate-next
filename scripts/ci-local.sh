#!/usr/bin/env bash
# The merge gate, step for step what Jenkins runs (Jenkinsfile). Run it from
# anywhere: bash scripts/ci-local.sh
set -euo pipefail
cd "$(dirname "$0")/.."

npm ci --no-audit --no-fund
npm run lint
npm run build    # next build = typecheck + static export to out/
# What scripts/deploy-vps.sh ships: nginx serves out/ (try_files $uri $uri.html).
test -f out/index.html && test -f out/404.html
! grep -rlE "[a-z0-9-]+\.vercel\.app" out --include=*.html >/dev/null || { echo "ci-local: a page links *.vercel.app" >&2; exit 1; }
echo "ci-local: all steps passed"
