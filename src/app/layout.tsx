import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HostLink — La location courte durée, aussi flexible que votre portefeuille',
  description: 'HostLink connecte propriétaires et conciergeries certifiées.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>
      </head>
      <body>{children}</body>
    </html>
  )
}
