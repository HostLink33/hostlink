// HostLink — Configuration centrale

export const config = {
  app: {
    name: "HostLink",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://hostlink-eta.vercel.app",
    email: "contact@hostlink.fr",
    version: "1.0.0",
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || "hostlink-secret-key-2025",
    jwtExpiry: "7d",
    cookieName: "hostlink-token",
  },
  db: {
    url: process.env.DATABASE_URL || "",
  },
  paiements: {
    commissionHostlink: 5,
    commissionConciergeDefaut: 20,
    frequenceDefaut: "MENSUEL",
    devises: "EUR",
  },
  ia: {
    seuilCompatibiliteMin: 50,
    seuilAlertOccupation: 65,
    seuilAlertScore: 7,
    nbResultatsMax: 10,
  },
  seo: {
    title: "HostLink — Gérez votre bien, librement",
    description: "L'infrastructure complète de délégation locative. Matching IA, scoring concierges, paiements centralisés.",
    keywords: ["location courte durée", "conciergerie", "airbnb", "gestion locative", "matching"],
  },
};

export default config;
