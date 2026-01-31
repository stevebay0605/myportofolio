"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  category: string
  categoryLabel: string
  image: string
  technologies: string[]
  liveUrl: string
  features?: string[]
}

const projects: Project[] = [
  {
    id: "pressing",
    title: "Gestion de Pressing",
    description: "Application web complete pour la gestion d'un pressing avec systeme de suivi des commandes.",
    fullDescription:
      "Application web complete pour la gestion d'un pressing permettant de suivre les commandes clients, gerer l'inventaire et automatiser les processus de nettoyage.",
    category: "web",
    categoryLabel: "Application Web",
    image: "/images/projet1.png",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://www.stevepressing.infy.uk/",
    features: [
      "Systeme de suivi des commandes en temps reel",
      "Gestion des clients et historique",
      "Interface intuitive et responsive",
    ],
  },
  {
    id: "ecommerce",
    title: "Boutique en ligne",
    description: "Plateforme e-commerce moderne avec panier d'achat et systeme de paiement integre.",
    fullDescription:
      "Plateforme e-commerce complete avec catalogue produits, panier d'achat dynamique, gestion des commandes et interface d'administration.",
    category: "web",
    categoryLabel: "E-commerce",
    image: "/images/projet3.png",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://steveshop.free.nf/",
    features: ["Catalogue produits dynamique", "Panier d'achat interactif", "Systeme de filtrage avance"],
  },
  {
    id: "immobilier",
    title: "Site Immobilier",
    description: "Plateforme de vente immobiliere avec recherche avancee et galerie interactive.",
    fullDescription:
      "Site immobilier professionnel permettant la consultation d'annonces, recherche avancee par criteres et visualisation des biens.",
    category: "web",
    categoryLabel: "Immobilier",
    image: "/images/projet4.png",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://stevebay0605.github.io/immo/",
    features: ["Recherche avancee multi-criteres", "Galerie photos interactive", "Formulaire de contact integre"],
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    description: "Application de gestion de taches moderne developpee avec React pour une productivite optimale.",
    fullDescription:
      "Application de gestion de taches et productivite construite avec React. Interface moderne et intuitive pour organiser vos projets efficacement.",
    category: "web",
    categoryLabel: "Application React",
    image: "/images/projet5.png",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    liveUrl: "https://stevetaskflow.netlify.app/",
    features: ["Drag & drop des taches", "Categories et priorites", "Interface moderne et responsive"],
  },
  {
    id: "ecommerce-v2",
    title: "E-commerce v2",
    description: "Plateforme e-commerce avancee avec frontend React et backend Django, stylisee avec Tailwind CSS.",
    fullDescription:
      "Version avancee de la plateforme e-commerce avec architecture Full Stack. Frontend React moderne couple a un backend Django robuste.",
    category: "web",
    categoryLabel: "Full Stack",
    image: "/images/projet6.png",
    technologies: ["React", "Django", "Tailwind CSS"],
    liveUrl: "https://stevecom.netlify.app/",
    features: ["Architecture Full Stack", "API REST Django", "Authentification utilisateur"],
  },
]

const categories = [
  { id: "all", label: "Tous" },
  { id: "web", label: "Web" },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section ref={sectionRef} id="projets" className="relative py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <span className="text-primary font-bold text-lg">02</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 gradient-text">Mes Projets</h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Decouvrez mes realisations et experimentations
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex justify-center gap-4 mb-12 ${isVisible ? "animate-fade-in delay-200" : "opacity-0"}`}
          style={{ animationFillMode: "both" }}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              onClick={() => setActiveFilter(category.id)}
              className={
                activeFilter === category.id
                  ? "bg-primary text-primary-foreground glow-blue"
                  : "border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50"
              }
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`group relative rounded-2xl overflow-hidden glass border border-border/50 hover:border-primary/50 transition-all duration-500 ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${300 + index * 100}ms`, animationFillMode: "both" }}
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
                    aria-label={`Voir le projet ${project.title}`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center text-accent-foreground hover:bg-accent transition-colors"
                    aria-label={`Details du projet ${project.title}`}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary px-3 py-1 rounded-full bg-primary/10">
                    {project.categoryLabel}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass border-border/50 max-w-2xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedProject.categoryLabel}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Project Image */}
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Description */}
                <p className="text-muted-foreground">{selectedProject.fullDescription}</p>

                {/* Features */}
                {selectedProject.features && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Fonctionnalites</h4>
                    <ul className="space-y-1">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-blue">
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 w-4 h-4" />
                    Voir le projet en ligne
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
