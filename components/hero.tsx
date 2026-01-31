"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Download, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Tech icons that float around
const techIcons = [
  { name: "React", icon: "fab fa-react", color: "#61dafb" },
  { name: "JavaScript", icon: "fab fa-js", color: "#f7df1e" },
  { name: "HTML5", icon: "fab fa-html5", color: "#e34f26" },
  { name: "CSS3", icon: "fab fa-css3-alt", color: "#1572b6" },
  { name: "Git", icon: "fab fa-git-alt", color: "#f05032" },
  { name: "GitHub", icon: "fab fa-github", color: "#ffffff" },
]

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const fullText = "Developpeur Full Stack Junior"
  const typingIndexRef = useRef(0)

  // Typing animation effect
  useEffect(() => {
    const typeText = () => {
      if (typingIndexRef.current < fullText.length) {
        setDisplayText(fullText.slice(0, typingIndexRef.current + 1))
        typingIndexRef.current++
        setTimeout(typeText, 80)
      } else {
        setIsTypingComplete(true)
      }
    }

    const timeout = setTimeout(typeText, 1000)
    return () => clearTimeout(timeout)
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden"
    >
      {/* Mobile background fallback */}
      <div className="md:hidden absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(51, 153, 255, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(255, 107, 26, 0.15) 0%, transparent 50%),
              hsl(240 10% 4%)
            `,
          }}
        />
        {/* Animated gradient orbs for mobile */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent/15 rounded-full blur-3xl animate-pulse-slow delay-500" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Greeting */}
            <p className="text-primary font-medium text-lg opacity-0 animate-fade-in delay-200">Bonjour, je suis</p>

            {/* Name */}
            <div className="space-y-2">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground opacity-0 animate-slide-up delay-300">
                Steve
              </h2>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text opacity-0 animate-slide-up delay-400">
                Bayonne
              </h2>
            </div>

            {/* Title with typing effect */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xl md:text-2xl text-muted-foreground opacity-0 animate-fade-in delay-500">
              <span>{displayText}</span>
              <span
                className={`w-0.5 h-6 bg-primary ${isTypingComplete ? "animate-pulse" : ""}`}
                style={{ animationDuration: "1s" }}
              />
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0 animate-fade-in delay-600">
              Passionne par le developpement web moderne, je cree des experiences utilisateur exceptionnelles avec les
              dernieres technologies frontend et backend.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 opacity-0 animate-slide-up delay-700">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-blue group"
              >
                <a href="#projets" onClick={(e) => handleScroll(e, "projets")}>
                  <span>Voir mes projets</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
              >
                <a href="#contact" onClick={(e) => handleScroll(e, "contact")}>
                  <Mail className="mr-2 w-4 h-4" />
                  <span>Me contacter</span>
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                <a href="/documents/CV_Steve_Bayonne.pdf" download>
                  <Download className="mr-2 w-4 h-4" />
                  <span>Telecharger CV</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Visual/Image Side */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Profile image with glow effect */}
            <div className="relative">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl scale-110 animate-pulse-slow" />

              {/* Image container */}
              <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
                <img
                  src="/images/cv3.JPG"
                  alt="Steve Bayonne - Developpeur Full Stack"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>

              {/* Floating tech badges */}
              {techIcons.map((tech, index) => {
                const angle = (index / techIcons.length) * Math.PI * 2
                const radius = 180
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                return (
                  <div
                    key={tech.name}
                    className="absolute w-14 h-14 rounded-xl glass flex items-center justify-center shadow-lg animate-float"
                    style={{
                      left: `calc(50% + ${x}px - 28px)`,
                      top: `calc(50% + ${y}px - 28px)`,
                      animationDelay: `${index * 0.3}s`,
                      animationDuration: `${4 + index * 0.5}s`,
                    }}
                    title={tech.name}
                  >
                    <i className={`${tech.icon} text-2xl`} style={{ color: tech.color }} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in delay-800">
          <span className="text-muted-foreground text-sm font-medium">Defiler vers le bas</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center pt-2">
            <ChevronDown className="w-4 h-4 text-muted-foreground animate-scroll-indicator" />
          </div>
        </div>
      </div>
    </section>
  )
}
