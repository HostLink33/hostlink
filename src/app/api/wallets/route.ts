export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "hostlink-secret-key-2025";

function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get("hostlink-token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: "Non autorise." }, { status: 401 });

    const proprietaire = await prisma.proprietaire.findUnique({ where: { userId: user.userId } });
    if (!proprietaire) return NextResponse.json({ error: "Proprietaire introuvable." }, { status: 404 });

    const biens = await prisma.bien.findMany({
      where: { proprietaireId: proprietaire.id },
      include: { wallet: true },
    });

    const wallets = biens.map(b => ({
      bienId: b.id,
      bienNom: b.nom,
      iban: b.wallet?.iban,
      solde: b.wallet?.solde || 0,
      frequence: b.wallet?.frequence || "MENSUEL",
    }));

    const totalSolde = wallets.reduce((a, w) => a + w.solde, 0);

    return NextResponse.json({ wallets, totalSolde });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: "Non autorise." }, { status: 401 });

    const { bienId, frequence } = await req.json();

    const wallet = await prisma.wallet.update({
      where: { bienId },
      data: { frequence },
    });

    return NextResponse.json({ success: true, wallet });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
