import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HostLink — Gérez votre bien, librement",
  description: "L'infrastructure complète de délégation locative. Matching IA, scoring concierges, paiements centralisés.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
