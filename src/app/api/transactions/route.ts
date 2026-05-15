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

    const biens = await prisma.bien.findMany({ where: { proprietaireId: proprietaire.id }, select: { id: true } });
    const bienIds = biens.map(b => b.id);

    const transactions = await prisma.transaction.findMany({
      where: { bienId: { in: bienIds } },
      include: { bien: true },
      orderBy: { createdAt: "desc" },
    });

    const totalMois = transactions
      .filter(t => new Date(t.createdAt).getMonth() === new Date().getMonth())
      .reduce((a, t) => a + t.montantNet, 0);

    return NextResponse.json({ transactions, totalMois });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { bienId, montantBrut, commissionConcierge, commissionHostlink } = await req.json();

    if (!bienId || !montantBrut) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    const montantNet = montantBrut - commissionConcierge - commissionHostlink;

    const transaction = await prisma.transaction.create({
      data: {
        bienId,
        montantBrut,
        commissionConcierge,
        commissionHostlink,
        montantNet,
        statut: "verse",
      },
    });

    await prisma.wallet.updateMany({
      where: { bienId },
      data: { solde: { increment: montantNet } },
    });

    return NextResponse.json({ success: true, transaction }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
