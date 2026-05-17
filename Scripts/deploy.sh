#!/bin/bash

echo "🚀 HostLink — Déploiement automatique"
echo "======================================"

BRANCH=$(git branch --show-current)
echo "📌 Branche actuelle : $BRANCH"

echo "📦 Ajout des fichiers..."
git add .

echo "💬 Message de commit (laisser vide pour 'update') :"
read MSG
if [ -z "$MSG" ]; then
  MSG="update: $(date '+%Y-%m-%d %H:%M')"
fi

git commit -m "$MSG"

echo "⬆️  Push vers GitHub..."
git push origin main

echo ""
echo "✅ Déployé avec succès !"
echo "🌐 Site : https://hostlink-eta.vercel.app"
