// HostLink — Types TypeScript partagés

export type Role = "PROPRIETAIRE" | "CONCIERGE" | "ADMIN";
export type StatutBien = "ACTIF" | "INACTIF" | "ALERTE";
export type FrequenceVersement = "HEBDOMADAIRE" | "MENSUEL" | "TRIMESTRIEL";

export interface User {
  id: string;
  email: string;
  prenom: string;
  nom: string;
  telephone?: string;
  role: Role;
  createdAt: Date;
}

export interface Bien {
  id: string;
  nom: string;
  type: string;
  ville: string;
  superficie: number;
  statut: StatutBien;
  proprietaireId: string;
  conciergeId?: string;
  createdAt: Date;
}

export interface Concierge {
  id: string;
  nom: string;
  zone: string;
  score: number;
  occupation: number;
  revenuMoy: number;
  reponse: string;
  nbBiens: number;
  verifie: boolean;
  experience: string;
}

export interface Transaction {
  id: string;
  bienId: string;
  montantBrut: number;
  commissionConcierge: number;
  commissionHostlink: number;
  montantNet: number;
  statut: string;
  createdAt: Date;
}

export interface Wallet {
  id: string;
  bienId: string;
  iban: string;
  solde: number;
  frequence: FrequenceVersement;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
