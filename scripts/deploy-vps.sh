#!/usr/bin/env bash
# Production deploy of the Soul Mate site to the Devya VPS: https://soulmate.devya.dev
# (and www.soulmatebeautysalon.com once the client points its DNS here).
#
# Nothing builds on the VPS. This builds the static export (`output: "export"` ->
# out/) here from a clean checkout of origin/main, ships it to releases/<sha> on the
# VPS and points `current` at it; nginx serves that directory (deploy/nginx/soulmate.conf).
#
#   bash scripts/deploy-vps.sh           deploy origin/main
#   bash scripts/deploy-vps.sh --setup   also install deploy/nginx/soulmate.conf, issue
#                                        the soulmate.devya.dev certificate and queue the
#                                        www.soulmatebeautysalon.com one in pending-certs
set -euo pipefail
ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

HOST="${DEVYA_VPS:-root@72.61.81.59}"
VPS_IP=72.61.81.59
DIR=/home/devya/projects/soulmate
DOMAIN=soulmate.devya.dev
CLIENT_HOST=www.soulmatebeautysalon.com
URL="https://$DOMAIN"
KEEP=3
SETUP=0
for arg in "$@"; do
  case "$arg" in
    --setup) SETUP=1 ;;
    *) echo "usage: $0 [--setup]" >&2; exit 2 ;;
  esac
done

git fetch -q origin main
SHA="$(git rev-parse --short origin/main)"
echo "deploy: soulmate at origin/main $SHA"

# Build from a clean checkout of origin/main, never from the working tree.
WORK="$(mktemp -d "${TMPDIR:-/tmp}/soulmate-build.XXXXXX")"
trap 'git -C "$ROOT" worktree remove --force "$WORK/src" >/dev/null 2>&1 || true; rm -rf "${WORK:?}"' EXIT
git worktree add -q --detach "$WORK/src" origin/main
cd "$WORK/src"
export NEXT_TELEMETRY_DISABLED=1
npm ci --no-audit --no-fund
npm run build
test -f out/index.html || { echo "deploy: out/index.html missing" >&2; exit 1; }

# COPYFILE_DISABLE + --no-xattrs: no macOS ._* files or xattr headers in the release.
COPYFILE_DISABLE=1 tar --no-xattrs -C out -czf "$WORK/release.tgz" .
echo "deploy: built $(du -h "$WORK/release.tgz" | cut -f1) release"
cd "$ROOT"

ssh -o BatchMode=yes "$HOST" "mkdir -p $DIR/releases/$SHA" </dev/null
ssh -o BatchMode=yes "$HOST" "tar -xzf - -C $DIR/releases/$SHA" < "$WORK/release.tgz"
ssh -o BatchMode=yes "$HOST" "set -e; cd $DIR
  chown -R root:root releases/$SHA
  find releases/$SHA -type d -exec chmod 755 {} +
  find releases/$SHA -type f -exec chmod 644 {} +
  ln -sfn releases/$SHA current.new && mv -T current.new current
  ls -1t releases | tail -n +$((KEEP + 1)) | while read -r old; do rm -rf \"releases/\$old\"; done" </dev/null

if [ "$SETUP" = 1 ]; then
  git show "origin/main:deploy/nginx/soulmate.conf" | ssh -o BatchMode=yes "$HOST" "set -e
    if [ ! -e /etc/nginx/sites-available/soulmate ]; then
      cat > /etc/nginx/sites-available/soulmate
      ln -sf /etc/nginx/sites-available/soulmate /etc/nginx/sites-enabled/soulmate
      nginx -t && systemctl reload nginx
    else
      cat >/dev/null
      echo 'deploy: nginx site soulmate already installed (certbot edits it in place); left as is'
    fi"
  if [ "$(dig +short A "$DOMAIN" @1.1.1.1 | tail -1)" != "$VPS_IP" ]; then
    echo "deploy: $DOMAIN does not resolve to $VPS_IP yet; add the DNS record, then rerun --setup" >&2
    exit 1
  fi
  ssh -o BatchMode=yes "$HOST" "certbot --nginx -n --agree-tos --redirect --cert-name $DOMAIN -d $DOMAIN
    pending-certs add $CLIENT_HOST $CLIENT_HOST" </dev/null
fi

# A 200 page is not a working page: every asset it references must load too.
status=0
for path in / /404.html; do
  code="$(curl -s -o /dev/null -m 20 -w '%{http_code}' "$URL$path" || true)"
  echo "deploy: $URL$path -> $code"
  [ "$code" = 200 ] || status=1
done
missing=0 total=0
for asset in $(curl -s -m 20 "$URL/" | grep -oE '(src|href)="/_next/static/[^"]+' | cut -d'"' -f2 | sort -u); do
  total=$((total + 1))
  code="$(curl -s -o /dev/null -m 20 -w '%{http_code}' "$URL$asset" || true)"
  [ "$code" = 200 ] || { echo "deploy: $asset -> $code" >&2; missing=$((missing + 1)); }
done
echo "deploy: $URL/ references $total static assets, $missing missing"
[ "$total" -gt 0 ] && [ "$missing" = 0 ] || status=1
exit "$status"
