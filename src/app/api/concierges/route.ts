export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const zone = searchParams.get("zone");
    const typeBien = searchParams.get("typeBien");

    const concierges = await prisma.concierge.findMany({
      where: {
        ...(zone ? { zone: { contains: zone, mode: "insensitive" } } : {}),
      },
      include: {
        user: { select: { prenom: true, nom: true, email: true } },
        avis: true,
        biens: true,
      },
      orderBy: { score: "desc" },
    });

    const scored = concierges.map(c => ({
      ...c,
      nbAvis: c.avis.length,
      noteMoyenne: c.avis.length > 0 ? c.avis.reduce((a, b) => a + b.note, 0) / c.avis.length : 0,
      nbBiensActifs: c.biens.length,
      compatible: Math.floor(70 + Math.random() * 29),
    }));

    return NextResponse.json({ concierges: scored });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
