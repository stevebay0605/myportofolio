import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Steve Bayonne - Developpeur Frontend & Full Stack | React - Django - Tailwind CSS",
  description:
    "Portfolio de Steve Bayonne - Developpeur Frontend & Full Stack specialise en React, Django et Tailwind CSS. Decouvrez mes projets web innovants.",
  keywords: [
    "Developpeur Frontend",
    "Developpeur Full Stack",
    "React",
    "Django",
    "Tailwind CSS",
    "Portfolio",
    "JavaScript",
    "Python",
    "Steve Bayonne",
  ],
  authors: [{ name: "Steve Bayonne" }],
  creator: "Steve Bayonne",
  openGraph: {
    type: "website",
    url: "https://stevebay.cg",
    title: "Steve Bayonne - Developpeur Frontend & Full Stack",
    description:
      "Developpeur passionne specialise en React, Django et Tailwind CSS. Explorez mes projets web modernes et innovants.",
    siteName: "Steve Bayonne Portfolio",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steve Bayonne - Developpeur Frontend & Full Stack",
    description: "Developpeur passionne specialise en React, Django et Tailwind CSS.",
    creator: "@stevebayonne",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0f",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Steve Bayonne",
              jobTitle: "Developpeur Frontend & Full Stack",
              description: "Developpeur passionne specialise en React, Django et Tailwind CSS",
              url: "https://stevebay.cg",
              email: "bayonnestevekelly@gmail.com",
              telephone: "+242069339097",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Brazzaville",
                addressCountry: "CG",
              },
              sameAs: [
                "https://github.com/stevebay0605",
                "https://www.linkedin.com/in/steve-bayonne",
                "https://www.facebook.com/steve.bayonne.54",
              ],
              knowsAbout: [
                "React",
                "Django",
                "Tailwind CSS",
                "JavaScript",
                "Python",
                "HTML5",
                "CSS3",
                "Frontend Development",
                "Full Stack Development",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
