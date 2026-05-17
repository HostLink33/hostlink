export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { matcherConcierges, simulerCA } from "@/lib/ia/matching";

const CONCIERGES_DEMO = [
  { id: "1", nom: "Excellence Conciergerie Paris", zone: "Paris", score: 9.4, occupation: 94, revenuMoy: 3400, reponse: "< 2h", nbBiens: 47, experience: "+ 5 ans", specialites: ["Appartements", "Studios"], verifie: true, nbAvis: 128, litiges: 0 },
  { id: "2", nom: "Paris Premium Stay", zone: "Paris & IDF", score: 8.9, occupation: 89, revenuMoy: 3100, reponse: "< 3h", nbBiens: 31, experience: "3 à 5 ans", specialites: ["Appartements"], verifie: true, nbAvis: 89, litiges: 0 },
  { id: "3", nom: "Lyon Prestige", zone: "Lyon", score: 8.5, occupation: 85, revenuMoy: 2800, reponse: "< 2h", nbBiens: 28, experience: "3 à 5 ans", specialites: ["Studios", "Lofts"], verifie: true, nbAvis: 72, litiges: 1 },
  { id: "4", nom: "Riviera Hosting", zone: "Nice & Côte d'Azur", score: 8.2, occupation: 82, revenuMoy: 3200, reponse: "< 4h", nbBiens: 35, experience: "+ 5 ans", specialites: ["Villas", "Appartements"], verifie: false, nbAvis: 95, litiges: 2 },
  { id: "5", nom: "Bordeaux Sejours", zone: "Bordeaux", score: 7.8, occupation: 78, revenuMoy: 2400, reponse: "< 3h", nbBiens: 19, experience: "1 à 3 ans", specialites: ["Maisons", "Appartements"], verifie: true, nbAvis: 45, litiges: 0 },
];

export async function POST(req: NextRequest) {
  try {
    const bien = await req.json();
    const resultats = matcherConcierges(bien, CONCIERGES_DEMO);
    const simulation = simulerCA(bien);
    return NextResponse.json({ resultats, simulation });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
