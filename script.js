// ===========================
// HERO SLIDER
// ===========================

const slides = document.querySelectorAll('.hero-slider .slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Cambiar de imagen cada 5 segundos
setInterval(nextSlide, 5000);

// ===========================
// MOBILE MENU TOGGLE
// ===========================

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ===========================
// SUBMENU TOGGLE (Mobile)
// ===========================

const submenuItems = document.querySelectorAll('.has-submenu');

submenuItems.forEach(item => {
    const link = item.querySelector('a');
    
    link.addEventListener('click', (e) => {
        // Solo en móvil (cuando el menú está en modo columna)
        if (window.innerWidth <= 968) {
            // Si el item tiene submenú, prevenir navegación y toggle
            if (item.querySelector('.submenu')) {
                e.preventDefault();
                
                // Cerrar otros submenus del mismo nivel
                const parent = item.parentElement;
                const siblings = parent.querySelectorAll('.has-submenu');
                siblings.forEach(sibling => {
                    if (sibling !== item) {
                        sibling.classList.remove('active');
                    }
                });
                
                // Toggle el submenu actual
                item.classList.toggle('active');
            }
        }
    });
});

// Close menu when clicking on a link without submenu
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Solo cerrar si no es un item con submenu
        const parentLi = link.parentElement;
        if (!parentLi.classList.contains('has-submenu') || window.innerWidth > 968) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Cerrar todos los submenus
            submenuItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
});

// ===========================
// SMOOTH SCROLL
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// HEADER SCROLL EFFECT
// ===========================

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
const cards = document.querySelectorAll('.service-card, .product-card, .event-card, .info-card');

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===========================
// ACTIVE NAVIGATION
// ===========================

const sections = document.querySelectorAll('section[id]');

function activateNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = 'var(--primary-color)';
            } else {
                navLink.style.color = 'var(--text-dark)';
            }
        }
    });
}

window.addEventListener('scroll', activateNavigation);

// ===========================
// WHATSAPP BUTTON ANIMATION
// ===========================

const whatsappButton = document.querySelector('.whatsapp-float');

setInterval(() => {
    whatsappButton.style.animation = 'pulse 1s ease';
    setTimeout(() => {
        whatsappButton.style.animation = '';
    }, 1000);
}, 5000);

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);
// ===========================
// CARGAR FOOTER Y HEADER DINÁMICAMENTE
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Buscar el placeholder del footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el footer');
                }
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Error al cargar el footer:', error);
            });
    }

    // Buscar el placeholder del header-marca
    const headerPlaceholder = document.getElementById('header-placeholder');
    
    if (headerPlaceholder) {
        fetch('header-marca.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el header');
                }
                return response.text();
            })
            .then(data => {
                headerPlaceholder.innerHTML = data;
                // Reinicializar eventos del menú después de cargar el header
                initializeMenuEvents();
            })
            .catch(error => {
                console.error('Error al cargar el header:', error);
            });
    }
});

// ===========================
// INICIALIZAR EVENTOS DEL MENÚ
// ===========================

function initializeMenuEvents() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const submenuItems = document.querySelectorAll('.has-submenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    submenuItems.forEach(item => {
        const link = item.querySelector('a');
        
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 968) {
                    if (item.querySelector('.submenu')) {
                        e.preventDefault();
                        
                        const parent = item.parentElement;
                        const siblings = parent.querySelectorAll('.has-submenu');
                        siblings.forEach(sibling => {
                            if (sibling !== item) {
                                sibling.classList.remove('active');
                            }
                        });
                        
                        item.classList.toggle('active');
                    }
                }
            });
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const parentLi = link.parentElement;
            if (!parentLi.classList.contains('has-submenu') || window.innerWidth > 968) {
                if (menuToggle && navMenu) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                submenuItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    });
}
