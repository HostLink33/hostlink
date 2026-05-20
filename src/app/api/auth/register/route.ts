export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "hostlink-secret-key-2025";

export async function POST(req: NextRequest) {
  try {
    const { email, password, prenom, nom, telephone, role, typeBien, ville, superficie, zone, experience, siret } = await req.json();

    if (!email || !password || !prenom || !nom) return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Email deja utilise." }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, prenom, nom, telephone, role: role === "concierge" ? "CONCIERGE" : "PROPRIETAIRE" },
    });

    if (role === "concierge") {
      await prisma.concierge.create({
        data: { userId: user.id, nom: prenom+" "+nom, zone: zone||"", experience: experience||"", siret: siret||"" },
      });
    } else {
      const prop = await prisma.proprietaire.create({ data: { userId: user.id } });
      if (typeBien && ville) {
        const bien = await prisma.bien.create({
          data: { nom: typeBien+" "+ville, type: typeBien, ville, superficie: parseFloat(superficie)||0, proprietaireId: prop.id },
        });
        await prisma.wallet.create({
          data: { bienId: bien.id, iban: "FR76 3000 4000 0300 "+Math.random().toString().slice(2,16), solde: 0 },
        });
      }
    }

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, prenom: user.prenom, nom: user.nom, role: user.role } }, { status: 201 });

    response.cookies.set("hostlink-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
