export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const bcrypt = await import("bcryptjs");

    const { email, password, prenom, nom, telephone, role, typeBien, ville, superficie, zone, experience, siret } = await req.json();

    if (!email || !password || !prenom || !nom) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email deja utilise." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.default.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email, password: hashedPassword, prenom, nom, telephone,
        role: role === "concierge" ? "CONCIERGE" : "PROPRIETAIRE",
      },
    });

    if (role === "concierge") {
      await prisma.concierge.create({
        data: { userId: user.id, nom: `${prenom} ${nom}`, zone: zone || "", experience: experience || "", siret: siret || "" },
      });
    } else {
      const proprietaire = await prisma.proprietaire.create({ data: { userId: user.id } });
      if (typeBien && ville) {
        await prisma.bien.create({
          data: { nom: `${typeBien} ${ville}`, type: typeBien, ville, superficie: parseFloat(superficie) || 0, proprietaireId: proprietaire.id },
        });
      }
    }

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
