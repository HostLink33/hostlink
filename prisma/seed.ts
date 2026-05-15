import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  // Nettoyer
  await prisma.avis.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.bien.deleteMany();
  await prisma.concierge.deleteMany();
  await prisma.proprietaire.deleteMany();
  await prisma.user.deleteMany();

  // Créer propriétaire
  const hash = await bcrypt.hash("Hostlink2025", 10);

  const userProp = await prisma.user.create({
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
                transactions: { create: [
                  { montantBrut: 3800, commissionConcierge: 836, commissionHostlink: 190, montantNet: 2774, statut: "verse" },
                ]}
              },
              { nom: "Studio Lyon Presquile", type: "Studio", ville: "Lyon", superficie: 25, statut: "ACTIF",
                wallet: { create: { iban: "FR76300040000300000123456782", solde: 1575, frequence: "MENSUEL" } },
              },
              { nom: "Villa Cote d'Azur", type: "Villa", ville: "Nice", superficie: 120, statut: "ALERTE",
                wallet: { create: { iban: "FR76300040000300000123456783", solde: 1875, frequence: "MENSUEL" } },
              },
            ]
          }
        }
      }
    }
  });

  // Créer concierge
  const userConc = await prisma.user.create({
    data: {
      email: "excellence@hostlink.fr",
      password: hash,
      prenom: "Excellence",
      nom: "Conciergerie",
      role: "CONCIERGE",
      concierge: {
        create: {
          nom: "Excellence Conciergerie Paris",
          zone: "Paris",
          experience: "3 à 5 ans",
          score: 9.4,
          occupation: 94,
          reponse: "< 2h",
          nbBiens: 47,
          verifie: true,
          avis: {
            create: [
              { auteur: "Sophie M.", note: 5, commentaire: "Gestion impeccable, revenus en hausse de 15%." },
              { auteur: "Thomas R.", note: 5, commentaire: "Tres reactif et transparent." },
              { auteur: "Camille D.", note: 4, commentaire: "Excellent service globalement." },
            ]
          }
        }
      }
    }
  });

  console.log("✅ Seed termine !");
  console.log("📧 Proprietaire : anas@hostlink.fr / Hostlink2025");
  console.log("📧 Concierge : excellence@hostlink.fr / Hostlink2025");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
