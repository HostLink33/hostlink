import { matcherConcierges, simulerCA, detecterAlertes } from "@/lib/ia/matching";

const BIEN_TEST = {
  type: "Appartement",
  ville: "Paris",
  superficie: 45,
  standing: "Premium",
  revenuCible: 3000,
  budgetCommission: "20-25%",
};

const CONCIERGES_TEST = [
  { id: "1", nom: "Excellence Paris", zone: "Paris", score: 9.4, occupation: 94, revenuMoy: 3400, reponse: "< 2h", nbBiens: 47, experience: "+ 5 ans", specialites: ["Appartements"], verifie: true, nbAvis: 128, litiges: 0 },
  { id: "2", nom: "Lyon Prestige", zone: "Lyon", score: 8.5, occupation: 85, revenuMoy: 2800, reponse: "< 2h", nbBiens: 28, experience: "3 à 5 ans", specialites: ["Studios"], verifie: true, nbAvis: 72, litiges: 1 },
];

describe("Moteur de Matching IA", () => {
  test("doit retourner des résultats triés par compatibilité", () => {
    const resultats = matcherConcierges(BIEN_TEST, CONCIERGES_TEST);
    expect(resultats).toHaveLength(2);
    expect(resultats[0].compatibilite).toBeGreaterThanOrEqual(resultats[1].compatibilite);
  });

  test("le concierge Paris doit avoir une meilleure compatibilité que Lyon", () => {
    const resultats = matcherConcierges(BIEN_TEST, CONCIERGES_TEST);
    expect(resultats[0].concierge.nom).toBe("Excellence Paris");
  });

  test("la compatibilité doit être entre 0 et 100", () => {
    const resultats = matcherConcierges(BIEN_TEST, CONCIERGES_TEST);
    resultats.forEach(r => {
      expect(r.compatibilite).toBeGreaterThanOrEqual(0);
      expect(r.compatibilite).toBeLessThanOrEqual(100);
    });
  });

  test("doit inclure une estimation de revenu", () => {
    const resultats = matcherConcierges(BIEN_TEST, CONCIERGES_TEST);
    resultats.forEach(r => {
      expect(r.estimationRevenu.min).toBeGreaterThan(0);
      expect(r.estimationRevenu.max).toBeGreaterThan(r.estimationRevenu.min);
    });
  });
});

describe("Simulation de CA", () => {
  test("doit retourner une fourchette de revenus valide", () => {
    const simulation = simulerCA(BIEN_TEST);
    expect(simulation.fourchette.min).toBeGreaterThan(0);
    expect(simulation.fourchette.max).toBeGreaterThan(simulation.fourchette.min);
  });

  test("doit retourner un taux d'occupation entre 0 et 100", () => {
    const simulation = simulerCA(BIEN_TEST);
    expect(simulation.tauxOccupation).toBeGreaterThan(0);
    expect(simulation.tauxOccupation).toBeLessThanOrEqual(100);
  });

  test("doit retourner un prix par nuit positif", () => {
    const simulation = simulerCA(BIEN_TEST);
    expect(simulation.prixNuit).toBeGreaterThan(0);
  });
});

describe("Détection d'alertes KPI", () => {
  test("doit détecter un taux d'occupation trop bas", () => {
    const biens = [{ nom: "Appart Paris", occupation: 50, score: 8, tendance: "+5%", revenuMois: 2000 }];
    const alertes = detecterAlertes(biens);
    expect(alertes.some(a => a.type === "occupation")).toBe(true);
  });

  test("doit détecter un score trop bas", () => {
    const biens = [{ nom: "Appart Lyon", occupation: 80, score: 5, tendance: "+2%", revenuMois: 1800 }];
    const alertes = detecterAlertes(biens);
    expect(alertes.some(a => a.type === "score")).toBe(true);
  });

  test("doit détecter une tendance négative", () => {
    const biens = [{ nom: "Villa Nice", occupation: 75, score: 8, tendance: "-10%", revenuMois: 3000 }];
    const alertes = detecterAlertes(biens);
    expect(alertes.some(a => a.type === "tendance")).toBe(true);
  });

  test("ne doit pas créer d'alertes si tout va bien", () => {
    const biens = [{ nom: "Studio Paris", occupation: 90, score: 9, tendance: "+8%", revenuMois: 2500 }];
    const alertes = detecterAlertes(biens);
    expect(alertes).toHaveLength(0);
  });
});
