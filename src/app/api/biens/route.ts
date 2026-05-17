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
      include: { concierge: { include: { user: true } }, wallet: true, transactions: { orderBy: { createdAt: "desc" }, take: 5 } },
    });

    return NextResponse.json({ biens });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: "Non autorise." }, { status: 401 });

    const { nom, type, ville, superficie } = await req.json();
    if (!nom || !type || !ville) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    const proprietaire = await prisma.proprietaire.findUnique({ where: { userId: user.userId } });
    if (!proprietaire) return NextResponse.json({ error: "Proprietaire introuvable." }, { status: 404 });

    const bien = await prisma.bien.create({
      data: {
        nom,
        type,
        ville,
        superficie: parseFloat(superficie) || 0,
        proprietaireId: proprietaire.id,
      },
    });

    await prisma.wallet.create({
      data: {
        bienId: bien.id,
        iban: `FR76 3000 4000 0300 ${Math.random().toString().slice(2,16)}`,
        solde: 0,
      },
    });

    return NextResponse.json({ success: true, bien }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
