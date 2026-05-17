// HostLink — Moteur de Matching IA

export interface BienProfile {
  type: string;
  ville: string;
  superficie: number;
  standing: string;
  revenuCible: number;
  budgetCommission: string;
}

export interface ConciergeProfile {
  id: string;
  nom: string;
  zone: string;
  score: number;
  occupation: number;
  revenuMoy: number;
  reponse: string;
  nbBiens: number;
  experience: string;
  specialites: string[];
  verifie: boolean;
  nbAvis: number;
  litiges: number;
}

export interface MatchResult {
  concierge: ConciergeProfile;
  compatibilite: number;
  details: {
    critere: string;
    score: number;
    poids: number;
    note: string;
  }[];
  estimationRevenu: { min: number; max: number };
  recommandation: string;
}

// Poids de chaque critère (total = 100)
const POIDS = {
  zone: 20,
  score: 15,
  occupation: 15,
  experience: 10,
  revenu: 10,
  reponse: 10,
  verifie: 8,
  nbBiens: 7,
  litiges: 5,
};

function scoreZone(bien: BienProfile, concierge: ConciergeProfile): number {
  const villeNorm = bien.ville.toLowerCase();
  const zoneNorm = concierge.zone.toLowerCase();
  if (zoneNorm.includes(villeNorm) || villeNorm.includes(zoneNorm)) return 100;
  const regions: Record<string, string[]> = {
    "paris": ["idf", "île-de-france", "banlieue"],
    "lyon": ["rhône", "auvergne"],
    "marseille": ["paca", "bouches-du-rhône"],
    "nice": ["paca", "côte d'azur", "riviera"],
    "bordeaux": ["gironde", "nouvelle-aquitaine"],
  };
  const villeRegions = regions[villeNorm] || [];
  if (villeRegions.some(r => zoneNorm.includes(r))) return 70;
  return 20;
}

function scoreExperience(experience: string): number {
  const scores: Record<string, number> = {
    "moins d'1 an": 40,
    "1 à 3 ans": 65,
    "3 à 5 ans": 85,
    "+ 5 ans": 100,
  };
  return scores[experience.toLowerCase()] || 50;
}

function scoreReponse(reponse: string): number {
  if (reponse.includes("1h") || reponse.includes("< 1")) return 100;
  if (reponse.includes("2h") || reponse.includes("< 2")) return 85;
  if (reponse.includes("3h") || reponse.includes("< 3")) return 70;
  if (reponse.includes("4h") || reponse.includes("< 4")) return 55;
  return 40;
}

function estimerRevenu(bien: BienProfile, concierge: ConciergeProfile): { min: number; max: number } {
  const baseParM2: Record<string, number> = {
    "appartement": 45, "studio": 55, "maison": 35,
    "villa": 30, "loft": 50, "chalet": 40,
  };
  const base = (baseParM2[bien.type.toLowerCase()] || 40) * bien.superficie;
  const facteurOccupation = concierge.occupation / 100;
  const facteurScore = concierge.score / 10;
  const revenuEstime = base * facteurOccupation * facteurScore;
  return {
    min: Math.round(revenuEstime * 0.85),
    max: Math.round(revenuEstime * 1.15),
  };
}

export function matcherConcierges(bien: BienProfile, concierges: ConciergeProfile[]): MatchResult[] {
  return concierges
    .map(concierge => {
      const criteres = [
        {
          critere: "Zone géographique",
          score: scoreZone(bien, concierge),
          poids: POIDS.zone,
          note: `${concierge.zone} — ${scoreZone(bien, concierge) >= 70 ? "Compatible" : "Éloigné"}`,
        },
        {
          critere: "Score global",
          score: concierge.score * 10,
          poids: POIDS.score,
          note: `${concierge.score}/10`,
        },
        {
          critere: "Taux d'occupation",
          score: concierge.occupation,
          poids: POIDS.occupation,
          note: `${concierge.occupation}%`,
        },
        {
          critere: "Expérience",
          score: scoreExperience(concierge.experience),
          poids: POIDS.experience,
          note: concierge.experience,
        },
        {
          critere: "Revenu généré",
          score: Math.min((concierge.revenuMoy / 5000) * 100, 100),
          poids: POIDS.revenu,
          note: `${concierge.revenuMoy.toLocaleString()} €/mois`,
        },
        {
          critere: "Délai de réponse",
          score: scoreReponse(concierge.reponse),
          poids: POIDS.reponse,
          note: concierge.reponse,
        },
        {
          critere: "Vérifié HostLink",
          score: concierge.verifie ? 100 : 0,
          poids: POIDS.verifie,
          note: concierge.verifie ? "✓ Vérifié" : "Non vérifié",
        },
        {
          critere: "Nombre de biens gérés",
          score: Math.min((concierge.nbBiens / 50) * 100, 100),
          poids: POIDS.nbBiens,
          note: `${concierge.nbBiens} biens`,
        },
        {
          critere: "Incidents / Litiges",
          score: Math.max(100 - (concierge.litiges * 20), 0),
          poids: POIDS.litiges,
          note: `${concierge.litiges} litige(s)`,
        },
      ];

      const compatibilite = Math.round(
        criteres.reduce((total, c) => total + (c.score * c.poids) / 100, 0)
      );

      const estimation = estimerRevenu(bien, concierge);

      let recommandation = "";
      if (compatibilite >= 85) recommandation = "Excellente compatibilité — Recommandé fortement";
      else if (compatibilite >= 70) recommandation = "Bonne compatibilité — Recommandé";
      else if (compatibilite >= 55) recommandation = "Compatibilité moyenne — À considérer";
      else recommandation = "Faible compatibilité — Chercher d'autres options";

      return { concierge, compatibilite, details: criteres, estimationRevenu: estimation, recommandation };
    })
    .sort((a, b) => b.compatibilite - a.compatibilite);
}

// Simulation de CA basée sur les données du marché
export function simulerCA(bien: BienProfile): {
  fourchette: { min: number; max: number };
  tauxOccupation: number;
  prixNuit: number;
  performanceMarche: number;
} {
  const prixParM2: Record<string, number> = {
    "paris": 3.2, "lyon": 2.1, "marseille": 1.8,
    "nice": 2.5, "bordeaux": 2.0, "toulouse": 1.7,
  };
  const facteurType: Record<string, number> = {
    "appartement": 1.0, "studio": 1.2, "maison": 0.9,
    "villa": 0.8, "loft": 1.1, "chalet": 1.3,
  };
  const prixBase = (prixParM2[bien.ville.toLowerCase()] || 2.0) * bien.superficie;
  const prixNuit = Math.round(prixBase * (facteurType[bien.type.toLowerCase()] || 1.0));
  const tauxOccupation = bien.standing === "Luxe" ? 75 : bien.standing === "Premium" ? 82 : 88;
  const revenuMensuel = (prixNuit * 30 * tauxOccupation) / 100;
  const benchmark = revenuMensuel * 0.95;

  return {
    fourchette: {
      min: Math.round(revenuMensuel * 0.85),
      max: Math.round(revenuMensuel * 1.15),
    },
    tauxOccupation,
    prixNuit,
    performanceMarche: Math.round(((revenuMensuel - benchmark) / benchmark) * 100),
  };
}

// Détection des alertes KPI
export function detecterAlertes(biens: Array<{
  nom: string;
  occupation: number;
  score: number;
  tendance: string;
  revenuMois: number;
}>): Array<{ bien: string; type: string; message: string; action: string }> {
  const alertes = [];
  for (const bien of biens) {
    if (bien.occupation < 65) {
      alertes.push({
        bien: bien.nom,
        type: "occupation",
        message: `Taux d'occupation trop bas : ${bien.occupation}%`,
        action: "Changer de concierge ou ajuster la tarification",
      });
    }
    if (bien.score < 7) {
      alertes.push({
        bien: bien.nom,
        type: "score",
        message: `Score concierge insuffisant : ${bien.score}/10`,
        action: "Évaluer un changement de conciergerie",
      });
    }
    if (bien.tendance.startsWith("-")) {
      alertes.push({
        bien: bien.nom,
        type: "tendance",
        message: `Tendance négative des revenus : ${bien.tendance}`,
        action: "Analyser les causes et optimiser la stratégie",
      });
    }
  }
  return alertes;
}
