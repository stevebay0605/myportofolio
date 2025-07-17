// Configuration et variables globales
const CONFIG = {
    ANIMATION_DURATION: 300,
    SCROLL_THRESHOLD: 100,
    TYPING_SPEED: 100,
    INTERSECTION_THRESHOLD: 0.1
};

// État de l'application
const AppState = {
    currentTheme: 'light',
    isMenuOpen: false,
    activeSection: 'accueil',
    isScrolling: false
};

// Utilitaires
const Utils = {
    // Debounce function pour optimiser les performances
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function pour les événements de scroll
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Animation de compteur
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    },

    // Smooth scroll vers une section
    smoothScrollTo(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
};

// Gestionnaire de thème
const ThemeManager = {
    init() {
        this.loadTheme();
        this.bindEvents();
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    },

    setTheme(theme) {
        AppState.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Mettre à jour l'icône du bouton
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 
                theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'
            );
        }
    },

    toggle() {
        const newTheme = AppState.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }
    }
};

// Gestionnaire de navigation
const NavigationManager = {
    init() {
        this.bindEvents();
        this.updateActiveLink();
    },

    bindEvents() {
        // Navigation desktop
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                Utils.smoothScrollTo(targetId);
                this.setActiveLink(link);
            });
        });

        // Navigation mobile
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                Utils.smoothScrollTo(targetId);
                this.closeMobileMenu();
            });
        });

        // Toggle menu mobile
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Fermer le menu mobile en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            
            if (AppState.isMenuOpen && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    },

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        AppState.isMenuOpen = !AppState.isMenuOpen;
        
        mobileMenu.classList.toggle('active', AppState.isMenuOpen);
        mobileMenuToggle.classList.toggle('active', AppState.isMenuOpen);
        
        // Empêcher le scroll du body quand le menu est ouvert
        document.body.style.overflow = AppState.isMenuOpen ? 'hidden' : '';
    },

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        AppState.isMenuOpen = false;
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    },

    setActiveLink(activeLink) {
        // Retirer la classe active de tous les liens
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Ajouter la classe active au lien cliqué
        activeLink.classList.add('active');
    },

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        if (currentSection && currentSection !== AppState.activeSection) {
            AppState.activeSection = currentSection;
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }
};

// Gestionnaire de scroll
const ScrollManager = {
    init() {
        this.bindEvents();
        this.updateScrollProgress();
    },

    bindEvents() {
        const throttledScroll = Utils.throttle(() => {
            this.updateScrollProgress();
            this.updateHeaderState();
            NavigationManager.updateActiveLink();
        }, 16);

        window.addEventListener('scroll', throttledScroll);
    },

    updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    },

    updateHeaderState() {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > CONFIG.SCROLL_THRESHOLD) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
};

// Gestionnaire de cursor personnalisé
const CursorManager = {
    init() {
        if (window.innerWidth > 768) {
            this.createCursor();
            this.bindEvents();
        }
    },

    createCursor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        
        if (!this.cursor || !this.cursorFollower) return;
        
        this.cursorPos = { x: 0, y: 0 };
        this.followerPos = { x: 0, y: 0 };
    },

    bindEvents() {
        if (!this.cursor || !this.cursorFollower) return;

        document.addEventListener('mousemove', (e) => {
            this.cursorPos.x = e.clientX;
            this.cursorPos.y = e.clientY;
            
            this.cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        });

        // Animation du follower avec délai
        const animateFollower = () => {
            this.followerPos.x += (this.cursorPos.x - this.followerPos.x) * 0.1;
            this.followerPos.y += (this.cursorPos.y - this.followerPos.y) * 0.1;
            
            this.cursorFollower.style.transform = 
                `translate(${this.followerPos.x - 15}px, ${this.followerPos.y - 15}px)`;
            
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Effets sur les éléments interactifs
        const interactiveElements = document.querySelectorAll('a, button, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform += ' scale(1.5)';
                this.cursorFollower.style.transform += ' scale(1.2)';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = this.cursor.style.transform.replace(' scale(1.5)', '');
                this.cursorFollower.style.transform = this.cursorFollower.style.transform.replace(' scale(1.2)', '');
            });
        });
    }
};

// Gestionnaire d'animations
const AnimationManager = {
    init() {
        this.setupIntersectionObserver();
        this.animateCounters();
        this.animateSkillBars();
        this.setupTypingEffect();
    },

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: CONFIG.INTERSECTION_THRESHOLD,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observer tous les éléments avec la classe fade-in
        const animatedElements = document.querySelectorAll('.fade-in');
        animatedElements.forEach(el => {
            this.observer.observe(el);
        });

        // Ajouter la classe fade-in aux éléments qui doivent être animés
        const elementsToAnimate = document.querySelectorAll(
            '.section-header, .project-card, .skill-category, .contact-method'
        );
        elementsToAnimate.forEach(el => {
            el.classList.add('fade-in');
            this.observer.observe(el);
        });
    },

    animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    Utils.animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    },

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 200);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    },

    setupTypingEffect() {
        const typingElement = document.querySelector('.subtitle-text');
        if (!typingElement) return;

        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, CONFIG.TYPING_SPEED);
            }
        };

        // Démarrer l'effet après un délai
        setTimeout(typeWriter, 1000);
    }
};

// Gestionnaire de projets
const ProjectManager = {
    init() {
        this.bindFilterEvents();
        this.setupProjectModals();
    },

    bindFilterEvents() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Mettre à jour les boutons actifs
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filtrer les projets
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    const shouldShow = filter === 'all' || category === filter;
                    
                    if (shouldShow) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.classList.add('hidden');
                        }, CONFIG.ANIMATION_DURATION);
                    }
                });
            });
        });
    },

    setupProjectModals() {
        // Les modals seront gérées par les fonctions globales
        // pour maintenir la compatibilité avec le HTML existant
    }
};

// Gestionnaire de formulaire
const FormManager = {
    init() {
        this.bindFormEvents();
    },

    bindFormEvents() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }

        // Animation des labels de formulaire
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    },

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Désactiver le bouton pendant l'envoi
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Envoi en cours...</span><i class="fas fa-spinner fa-spin"></i>';
        
        try {
            // Simuler l'envoi du formulaire
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Afficher un message de succès
            this.showNotification('Message envoyé avec succès !', 'success');
            form.reset();
            
        } catch (error) {
            this.showNotification('Erreur lors de l\'envoi du message.', 'error');
        } finally {
            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Envoyer le message</span><i class="fas fa-paper-plane"></i>';
        }
    },

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styles inline pour la notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Suppression automatique
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

// Configuration du graphique des compétences
const ctx = document.getElementById('skillsChart').getContext('2d');
const skillsChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Git', 'Bootstrap'],
        datasets: [{
            label: 'Niveau de compétence',
            data: [85, 80, 65, 75, 60, 55],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
        }]
    },
    options: {
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: 'rgba(255, 255, 255, 0.2)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)'
                },
                pointLabels: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    font: {
                        size: 12,
                        family: 'Inter'
                    }
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 20,
                    color: 'rgba(255, 255, 255, 0.6)',
                    backdropColor: 'transparent'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }
});

// Fonctions globales pour les modals (compatibilité avec le HTML)
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    
    // Contenu des modals selon le projet
    const projectContent = {
        pressing: `
            <h2>Gestion de Pressing</h2>
            <img src="images/projet1.png" 
                 alt="Gestion de Pressing" style="width: 100%; border-radius: 8px; margin: 20px 0;">
            <p>Application web complète pour la gestion d'un pressing avec système de suivi des commandes, 
               gestion des clients et facturation automatisée.</p>
            <h3>Fonctionnalités principales :</h3>
            <ul>
                <li>Gestion des commandes clients</li>
                <li>Suivi en temps réel des vêtements</li>
                <li>Système de facturation</li>
                <li>Interface d'administration</li>
            </ul>
            <div style="margin-top: 20px;">
                <a href="https://www.stevepressing.infy.uk/" target="_blank" class="btn btn-primary">
                    Voir le projet
                </a>
            </div>
        `,
        ecommerce: `
            <h2>Boutique en ligne</h2>
            <img src="images/projet3.png" 
                 alt="E-commerce" style="width: 100%; border-radius: 8px; margin: 20px 0;">
            <p>Plateforme e-commerce moderne avec panier d'achat, système de paiement intégré et 
               interface d'administration pour la gestion des produits.</p>
            <h3>Fonctionnalités principales :</h3>
            <ul>
                <li>Catalogue de produits dynamique</li>
                <li>Panier d'achat interactif</li>
                <li>Système de paiement sécurisé</li>
                <li>Gestion des commandes</li>
            </ul>
            <div style="margin-top: 20px;">
                <a href="https://steveshop.free.nf/" target="_blank" class="btn btn-primary">
                    Voir le projet
                </a>
            </div>
        `,
        immobilier: `
            <h2>Site Immobilier</h2>
            <img src="images/projet4.png" 
                 alt="Site immobilier" style="width: 100%; border-radius: 8px; margin: 20px 0;">
            <p>Plateforme de vente immobilière avec recherche avancée, galerie interactive et 
               système de contact intégré pour les agents immobiliers.</p>
            <h3>Fonctionnalités principales :</h3>
            <ul>
                <li>Recherche avancée par critères</li>
                <li>Galerie photos interactive</li>
                <li>Géolocalisation des biens</li>
                <li>Système de contact agents</li>
            </ul>
            <div style="margin-top: 20px;">
                <a href="https://stevebay0605.github.io/immo/" target="_blank" class="btn btn-primary">
                    Voir le projet
                </a>
            </div>
        `
    };
    
    modalBody.innerHTML = projectContent[projectId] || '<p>Projet non trouvé</p>';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Gestionnaire principal de l'application
const App = {
    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    },

    start() {
        console.log('🚀 Initialisation de l\'application...');
        
        // Initialiser tous les gestionnaires
        ThemeManager.init();
        NavigationManager.init();
        ScrollManager.init();
        CursorManager.init();
        AnimationManager.init();
        ProjectManager.init();
        FormManager.init();
        
        // Événements globaux
        this.bindGlobalEvents();
        
        console.log('✅ Application initialisée avec succès !');
    },

    bindGlobalEvents() {
        // Gestion du redimensionnement de la fenêtre
        window.addEventListener('resize', Utils.debounce(() => {
            // Réinitialiser le cursor sur mobile/desktop
            if (window.innerWidth <= 768) {
                const cursor = document.querySelector('.cursor');
                const cursorFollower = document.querySelector('.cursor-follower');
                if (cursor) cursor.style.display = 'none';
                if (cursorFollower) cursorFollower.style.display = 'none';
            } else {
                const cursor = document.querySelector('.cursor');
                const cursorFollower = document.querySelector('.cursor-follower');
                if (cursor) cursor.style.display = 'block';
                if (cursorFollower) cursorFollower.style.display = 'block';
            }
        }, 250));

        // Gestion des touches clavier
        document.addEventListener('keydown', (e) => {
            // Fermer les modals avec Escape
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    closeProjectModal();
                }
                
                // Fermer le menu mobile
                if (AppState.isMenuOpen) {
                    NavigationManager.closeMobileMenu();
                }
            }
        });

        // Gestion des erreurs d'images
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                e.target.src = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400';
            }
        }, true);
    }
};

// Démarrer l'application
App.init();

// Exposer certaines fonctions globalement pour la compatibilité
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;