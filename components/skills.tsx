"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Server, Wrench, Rocket } from "lucide-react"

interface Skill {
  name: string
  percentage: number
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: <Code className="w-6 h-6" />,
    skills: [
      { name: "HTML5", percentage: 90 },
      { name: "CSS3", percentage: 85 },
      { name: "JavaScript", percentage: 70 },
      { name: "Tailwind CSS", percentage: 80 },
      { name: "React", percentage: 65 },
    ],
  },
  {
    title: "Backend & Database",
    icon: <Server className="w-6 h-6" />,
    skills: [
      { name: "Django", percentage: 60 },
      { name: "Python", percentage: 70 },
      { name: "MySQL", percentage: 65 },
      { name: "PostgreSQL", percentage: 65 },
      { name: "Django REST Framework", percentage: 65 },
      { name: "API REST", percentage: 65 },
    ],
  },
  {
    title: "Outils",
    icon: <Wrench className="w-6 h-6" />,
    skills: [
      { name: "Git & GitHub", percentage: 75 },
      { name: "Postman", percentage: 70 },
      { name: "Responsive Design", percentage: 85 },
      { name: "VS Code", percentage: 85 },
      { name: "npm / pip", percentage: 70 },
    ],
  },
]

const learningGoals = [
  { name: "TypeScript", progress: 30 },
  { name: "Next.js", progress: 25 },
  { name: "Node.js", progress: 20 },
  { name: "Docker", progress: 15 },
]

function SkillBar({ name, percentage, delay }: { name: string; percentage: number; delay: number }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setWidth(percentage)
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [percentage, delay])

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{name}</span>
        <span className="text-primary">{percentage}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
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
    <section ref={sectionRef} id="competences" className="relative py-24 bg-card/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <span className="text-primary font-bold text-lg">03</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 gradient-text">Mes Competences</h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Stack technique complete : Frontend, Backend, Database & Outils
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`glass rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${200 + catIndex * 100}ms`, animationFillMode: "both" }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                    delay={400 + catIndex * 100 + skillIndex * 100}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Learning Path */}
        <div
          className={`glass rounded-2xl p-8 border border-border/50 ${
            isVisible ? "animate-fade-in delay-500" : "opacity-0"
          }`}
          style={{ animationFillMode: "both" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Prochaines etapes</h3>
              <p className="text-muted-foreground text-sm">Technologies en cours d&apos;apprentissage</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningGoals.map((goal, index) => (
              <div
                key={goal.name}
                className="relative p-4 rounded-xl bg-secondary/50 border border-border/30 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-foreground">{goal.name}</span>
                  <span className="text-xs text-accent">{goal.progress}%</span>
                </div>
                <div className="h-1.5 bg-background/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent/50 to-accent rounded-full transition-all duration-1000"
                    style={{ width: isVisible ? `${goal.progress}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
