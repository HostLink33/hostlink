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
      include: { biens: { include: { wallet: true } } }
    });
    const wallets = proprietaire?.biens.map(b => b.wallet).filter(Boolean) || [];
    await prisma.$disconnect();
    return NextResponse.json({ wallets });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
