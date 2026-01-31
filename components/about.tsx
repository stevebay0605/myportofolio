"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle } from "lucide-react"

const skills = [
  "Frontend moderne avec React & Tailwind CSS",
  "Backend robuste avec Django & Python",
  "Gestion de bases de donnees MySQL & PostgreSQL",
  "Developpement d'APIs REST & test avec Postman",
  "Versioning avec Git & collaboration sur GitHub",
]

const techBadges = [
  { name: "HTML5", icon: "fab fa-html5", color: "#e34f26" },
  { name: "CSS3", icon: "fab fa-css3-alt", color: "#1572b6" },
  { name: "JavaScript", icon: "fab fa-js-square", color: "#f7df1e" },
  { name: "React", icon: "fab fa-react", color: "#61dafb" },
  { name: "GitHub", icon: "fab fa-github", color: "#ffffff" },
]

interface StatProps {
  value: number
  label: string
  suffix?: string
}

function AnimatedStat({ value, label, suffix = "" }: StatProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary text-glow-blue">
        {count}
        {suffix}
      </div>
      <div className="text-muted-foreground text-sm mt-2">{label}</div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="apropos" className="relative py-24 bg-card/50">
      {/* Section background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <span className="text-primary font-bold text-lg">01</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 gradient-text">A propos de moi</h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Developpeur Full Stack passionne par la creation d&apos;applications web completes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div
            className={`space-y-8 ${isVisible ? "animate-slide-in-left delay-200" : "opacity-0"}`}
            style={{ animationFillMode: "both" }}
          >
            {/* Introduction */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Developpeur Full Stack passionne</h3>
              <p className="text-muted-foreground leading-relaxed">
                Developpeur Full Stack Junior specialise dans la creation d&apos;applications web modernes et
                performantes. Je maitrise aussi bien le frontend avec React et Tailwind CSS que le backend avec Django
                et les bases de donnees MySQL/PostgreSQL. Mon objectif est de concevoir des solutions completes, de
                l&apos;interface utilisateur jusqu&apos;a l&apos;API et la base de donnees.
              </p>
            </div>

            {/* Skills List */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Competences Full Stack</h4>
              <ul className="space-y-3">
                {skills.map((skill, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-3 text-muted-foreground ${
                      isVisible ? "animate-fade-in" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${400 + index * 100}ms`, animationFillMode: "both" }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
              <AnimatedStat value={6} label="Projets Full Stack" />
              <AnimatedStat value={11} label="Technologies" />
              <AnimatedStat value={100} label="Motivation" suffix="%" />
            </div>
          </div>

          {/* Visual Side */}
          <div
            className={`relative ${isVisible ? "animate-fade-in delay-300" : "opacity-0"}`}
            style={{ animationFillMode: "both" }}
          >
            {/* Image container */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/30 rounded-lg" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-accent/30 rounded-lg" />

              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
                <img
                  src="/images/cv2.jpg"
                  alt="Steve Bayonne au travail"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Tech badges floating */}
              <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                {techBadges.map((badge, index) => (
                  <div
                    key={badge.name}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium ${
                      isVisible ? "animate-slide-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${600 + index * 100}ms`, animationFillMode: "both" }}
                  >
                    <i className={badge.icon} style={{ color: badge.color }} />
                    <span className="text-foreground">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
