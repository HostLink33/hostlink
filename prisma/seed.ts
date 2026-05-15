import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  await prisma.avis.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.bien.deleteMany();
  await prisma.concierge.deleteMany();
  await prisma.proprietaire.deleteMany();
  await prisma.user.deleteMany();

  const hash = await bcrypt.hash("Hostlink2025", 10);

  await prisma.user.create({
    data: {
      email: "anas@hostlink.fr",
      password: hash,
      prenom: "Anas",
      nom: "Proprietaire",
      role: "PROPRIETAIRE",
      proprietaire: {
        create: {
          biens: {
            create: [
              { nom: "Appartement Paris 11e", type: "Appartement", ville: "Paris", superficie: 38, statut: "ACTIF",
                wallet: { create: { iban: "FR76300040000300000123456781", solde: 2774, frequence: "MENSUEL" } },
              },
              { nom: "Studio Lyon Presquile", type: "Studio", ville: "Lyon", superficie: 25, statut: "ACTIF",
                wallet: { create: { iban: "FR76300040000300000123456782", solde: 1575, frequence: "MENSUEL" } },
              },
            ]
          }
        }
      }
    }
  });

  console.log("Seed termine !");
}

main().catch(console.error).finally(() => prisma.$disconnect());
