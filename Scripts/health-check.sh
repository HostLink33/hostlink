#!/bin/bash

echo "🏥 HostLink — Health Check"
echo "=========================="

URL="https://hostlink-eta.vercel.app"

echo "🌐 Vérification du site..."
STATUS=$(curl -o /dev/null -s -w "%{http_code}" $URL)

if [ "$STATUS" = "200" ]; then
  echo "✅ Site en ligne ! (HTTP $STATUS)"
else
  echo "❌ Site hors ligne ! (HTTP $STATUS)"
fi

echo ""
echo "📊 Résumé :"
echo "  URL : $URL"
echo "  Status : $STATUS"
echo "  Date : $(date)"
