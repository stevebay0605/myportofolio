import dynamic from "next/dynamic"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"

// Dynamically import the 3D scene with no SSR for client-side only rendering
const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-background">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(51, 153, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(255, 107, 26, 0.1) 0%, transparent 50%),
            hsl(240 10% 4%)
          `,
        }}
      />
    </div>
  ),
})

export default function PortfolioPage() {
  return (
    <>
      {/* 3D Background Scene - Hero section only */}
      <HeroScene />

      {/* Noise texture overlay for cinematic feel */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Main content layer above 3D canvas */}
      <div className="content-layer">
        {/* Navigation */}
        <Header />

        {/* Main content */}
        <main>
          {/* SEO-friendly sr-only H1 */}
          <h1 className="sr-only">
            Steve Bayonne - Developpeur Frontend et Full Stack specialise en React, Django et Tailwind CSS
          </h1>

          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Projects Section */}
          <Projects />

          {/* Skills Section */}
          <Skills />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
