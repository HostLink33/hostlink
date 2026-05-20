export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "hostlink-secret-key-2025";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("hostlink-token")?.value;
    if (!token) return NextResponse.json({ error: "Non connecte." }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, prenom: true, nom: true, role: true },
    });

    if (!user) return NextResponse.json({ error: "Utilisateur introuvable." }, { status: 404 });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Token invalide." }, { status: 401 });
  }
}
