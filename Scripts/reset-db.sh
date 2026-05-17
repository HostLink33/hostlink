#!/bin/bash

echo "⚠️  Reset de la base de données HostLink"
echo "========================================="
echo "Cette action va supprimer toutes les données !"
echo "Confirmer ? (oui/non)"
read CONFIRM

if [ "$CONFIRM" = "oui" ]; then
  echo "🗑️  Suppression des tables..."
  cd ~/hostlink
  npx prisma db push --force-reset
  echo "🌱 Seeding..."
  npx prisma db seed
  echo "✅ Base de données réinitialisée !"
else
  echo "❌ Annulé."
fi
