// HostLink — Utilitaires partagés

// Formatage des montants
export function formatMontant(montant: number, devise = "€"): string {
  return `${montant.toLocaleString("fr-FR")} ${devise}`;
}

// Formatage des dates
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

// Calcul du split de paiement
export function calculerSplit(montantBrut: number, tauxConcierge: number, tauxHostlink = 5) {
  const commissionConcierge = Math.round(montantBrut * tauxConcierge / 100);
  const commissionHostlink = Math.round(montantBrut * tauxHostlink / 100);
  const netProprietaire = montantBrut - commissionConcierge - commissionHostlink;
  return { commissionConcierge, commissionHostlink, netProprietaire };
}

// Calcul du score moyen
export function calculerScoreMoyen(avis: { note: number }[]): number {
  if (!avis.length) return 0;
  return Math.round((avis.reduce((a, b) => a + b.note, 0) / avis.length) * 10) / 10;
}

// Statut du bien
export function getStatutBien(occupation: number, score: number): "actif" | "alerte" | "critique" {
  if (occupation < 50 || score < 6) return "critique";
  if (occupation < 65 || score < 7) return "alerte";
  return "actif";
}

// Truncate texte
export function truncate(texte: string, longueur = 100): string {
  if (texte.length <= longueur) return texte;
  return texte.slice(0, longueur) + "...";
}
