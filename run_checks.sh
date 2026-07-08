#!/usr/bin/env bash
# Full check script — every check must pass before an increment is "done".
set -e

echo "== 1/3 Tests =="
npm test -- --watchAll=false

echo "== 2/3 Typecheck =="
npx tsc -b

echo "== 3/3 Production build =="
npm run build

echo ""
echo "ALL CHECKS PASSED"
