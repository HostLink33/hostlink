export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "hostlink-secret-key-2025";

export async function GET(req: NextRequest) {
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    const token = req.cookies.get("hostlink-token")?.value;
    if (!token) return NextResponse.json({ error: "Non connecte." }, { status: 401 });
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const proprietaire = await prisma.proprietaire.findUnique({
      where: { userId: decoded.userId },
      include: {
        biens: {
          include: { wallet: true, concierge: { include: { user: true } } }
        }
      }
    });
    await prisma.$disconnect();
    return NextResponse.json({ biens: proprietaire?.biens || [] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    const token = req.cookies.get("hostlink-token")?.value;
    if (!token) return NextResponse.json({ error: "Non connecte." }, { status: 401 });
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const { nom, type, ville, superficie } = await req.json();
    const proprietaire = await prisma.proprietaire.findUnique({ where: { userId: decoded.userId } });
    if (!proprietaire) return NextResponse.json({ error: "Proprietaire introuvable." }, { status: 404 });
    const bien = await prisma.bien.create({
      data: { nom, type, ville, superficie: parseFloat(superficie), proprietaireId: proprietaire.id }
    });
    await prisma.wallet.create({
      data: { bienId: bien.id, iban: "FR76 3000 4000 " + Math.random().toString().slice(2, 18), solde: 0 }
    });
    await prisma.$disconnect();
    return NextResponse.json({ bien }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
