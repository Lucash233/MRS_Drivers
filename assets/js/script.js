// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Inicializar funcionalidades
    initNavigation();
    initSmoothScroll();
    initScrollEffects();
    initMobileMenu();
    initLoadingAnimations();
    initContactButtons();
});

// Navegación y scroll suave
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Efecto de scroll en navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Resaltar enlace activo en navegación
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll suave para enlaces internos
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Altura del navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// Efectos de scroll adicionales
function initScrollEffects() {
    // Parallax effect para hero section
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Animación de contadores en la sección historia
    const statItems = document.querySelectorAll('.stat-item h3');
    let animated = false;
    
    function animateCounters() {
        if (animated) return;
        
        const historiaSection = document.getElementById('historia');
        const rect = historiaSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animated = true;
            
            statItems.forEach(item => {
                const finalValue = parseInt(item.textContent.replace('+', ''));
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(counter);
                    }
                    item.textContent = Math.floor(currentValue) + (finalValue >= 10 ? '+' : '');
                }, 30);
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
}

// Menú móvil
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Cerrar menú al redimensionar ventana
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Animaciones de carga
function initLoadingAnimations() {
    // Agregar clase loading a elementos que deben animarse
    const animatedElements = document.querySelectorAll('.section-title, .hero-content, .card, .btn-primary');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('loading');
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animación de escritura para el título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 500);
            }
        }, 100);
    }
}

// Funcionalidad de botones de contacto
function initContactButtons() {
    // Tracking de clics en WhatsApp
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí se puede agregar tracking analytics si es necesario
            console.log('WhatsApp button clicked');
            
            // Efecto visual de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Efecto hover mejorado para botones
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-whatsapp');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Funciones de utilidad
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimización de scroll events
const optimizedScroll = debounce(function() {
    // Aquí van las funciones que se ejecutan en scroll
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Lazy loading para imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading si hay imágenes con data-src
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Manejo de errores de imágenes
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Error loading image:', e.target.src);
    }
}, true);

// Funcionalidad de formularios (si se agregan en el futuro)
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Aquí se procesaría el formulario
                console.log('Form submitted successfully');
                
                // Mostrar mensaje de éxito
                showNotification('Mensaje enviado correctamente', 'success');
            } else {
                showNotification('Por favor completa todos los campos', 'error');
            }
        });
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.background = '#27ae60';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
    } else {
        notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar salida y remover
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Detección de dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Optimizaciones para móvil
if (isMobile()) {
    // Reducir animaciones en móvil para mejor rendimiento
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    
    // Deshabilitar parallax en móvil
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = 'none';
    }
}

// Manejo de orientación en móvil
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        // Recalcular dimensiones después del cambio de orientación
        AOS.refresh();
    }, 500);
});

// Preloader (opcional)
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
}

// Inicializar preloader si existe
initPreloader();

// Funciones de accesibilidad
function initAccessibility() {
    // Navegación por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Inicializar accesibilidad
initAccessibility();

// Performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
                
                // Si el tiempo de carga es muy alto, mostrar sugerencia
                if (loadTime > 3000) {
                    console.warn('Page load time is high. Consider optimizing images and resources.');
                }
            }, 0);
        });
    }
}

// Inicializar monitoreo de rendimiento
initPerformanceMonitoring();

// Exportar funciones para uso global si es necesario
window.MRSRacing = {
    showNotification,
    isMobile,
    initForms
};