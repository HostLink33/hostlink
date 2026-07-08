export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "hostlink-secret-key-2025";

export async function GET(req: NextRequest) {
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    const concierges = await prisma.concierge.findMany({
      include: { user: { select: { email: true, prenom: true, nom: true } }, avis: true, biens: true }
    });
    await prisma.$disconnect();
    return NextResponse.json({ concierges });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    const token = req.cookies.get("hostlink-token")?.value;
    if (!token) return NextResponse.json({ error: "Non connecte." }, { status: 401 });
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const { zone, experience, siret, reponse } = await req.json();
    const concierge = await prisma.concierge.update({
      where: { userId: decoded.userId },
      data: { zone, experience, siret, reponse },
    });
    await prisma.$disconnect();
    return NextResponse.json({ concierge });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
