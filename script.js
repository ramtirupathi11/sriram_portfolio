// Wait for the DOM to be fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) with enhanced settings
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
        disable: 'mobile' // Disable animations on mobile for better performance
    });

    // Custom Cursor - DISABLED
    // createCustomCursor();

    // Particle Effects
    createParticles();

    // Loading Screen
    showLoadingScreen();

    // Skill Progress Animation with enhanced effects
    const progressBars = document.querySelectorAll('.progress');
    
    // Function to animate progress bars with glow effect
    function animateProgressBar(progressBar) {
        const value = progressBar.getAttribute('data-value');
        progressBar.style.width = `${value}%`;
        
        // Add glow effect based on percentage
        if (value >= 90) {
            progressBar.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.5)';
        } else if (value >= 80) {
            progressBar.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.5)';
        } else if (value >= 70) {
            progressBar.style.boxShadow = '0 0 10px rgba(6, 182, 212, 0.5)';
        }
    }

    // Observe progress bars and animate when they come into view
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateProgressBar(entry.target);
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    // Start observing each progress bar
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Enhanced Mobile Menu Toggle with animations
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuBtn.querySelector('i');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
        
        // Add rotation animation to menu icon
        menuIcon.style.transform = isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        // Add glow effect to menu button
        if (isMenuOpen) {
            menuBtn.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.5)';
        } else {
            menuBtn.style.boxShadow = 'none';
        }
    }

    if (menuBtn && navLinks) {
        // Handle both click and touch events
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        // Close menu when clicking/touching outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                toggleMenu();
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });

        // Handle touch events on nav links with enhanced feedback
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (isMenuOpen) {
                    toggleMenu();
                }
            });

            // Add enhanced touch feedback
            item.addEventListener('touchstart', () => {
                item.style.transform = 'scale(0.95)';
                item.style.opacity = '0.8';
            });

            item.addEventListener('touchend', () => {
                item.style.transform = 'scale(1)';
                item.style.opacity = '1';
            });
        });
    }

    // Enhanced Smooth scroll for navigation with parallax effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (isMenuOpen) {
                    toggleMenu();
                }
                
                // Smooth scroll with offset for header
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Add click effect to the clicked link
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Enhanced Scroll to Top functionality with glow effect
    const scrollTopButton = document.getElementById('scroll-top');
    if (scrollTopButton) {
        // Show/hide scroll to top button with enhanced animation
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollTopButton.style.display = 'flex';
                setTimeout(() => {
                    scrollTopButton.style.opacity = '1';
                    scrollTopButton.style.transform = 'translateY(0)';
                }, 10);
            } else {
                scrollTopButton.style.opacity = '0';
                scrollTopButton.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (scrollTopButton.style.opacity === '0') {
                        scrollTopButton.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Enhanced smooth scroll to top with particle trail
        scrollTopButton.addEventListener('click', () => {
            createScrollParticles();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Enhanced Sticky Navigation with glow effects
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let scrollTimeout;

    if (navbar) {
        window.addEventListener('scroll', () => {
            // Throttle scroll events for better performance
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    const currentScroll = window.pageYOffset;
                    
                    if (currentScroll > 50) {
                        navbar.classList.add('sticky');
                        
                        // Add glow effect based on scroll position
                        const glowIntensity = Math.min(currentScroll / 1000, 1);
                        navbar.style.boxShadow = `0 0 ${20 + glowIntensity * 10}px rgba(139, 92, 246, ${0.3 + glowIntensity * 0.2})`;
                        
                        // Only hide navbar if menu is closed
                        if (!isMenuOpen) {
                            if (currentScroll > lastScroll && currentScroll > 300) {
                                navbar.style.transform = 'translateY(-100%)';
                            } else {
                                navbar.style.transform = 'translateY(0)';
                            }
                        }
                    } else {
                        navbar.classList.remove('sticky');
                        navbar.style.boxShadow = 'none';
                    }
                    
                    lastScroll = currentScroll;
                    scrollTimeout = null;
                }, 50);
            }
        }, { passive: true });
    }

    // Enhanced Typing Animation for Hero Section with cursor effect
    const typeText = document.querySelector('.bio');
    if (typeText) {
        const text = typeText.textContent;
        typeText.textContent = '';
        typeText.style.borderRight = '2px solid var(--neon-purple)';

        let i = 0;
        function type() {
            if (i < text.length) {
                typeText.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typeText.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing after a delay
        setTimeout(type, 1000);
    }

    // Enhanced Project Filter with animations
    const filterButtons = document.querySelectorAll('.filter-item');
    const projects = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Animate projects
                projects.forEach(project => {
                    project.style.transform = 'scale(0.8)';
                    project.style.opacity = '0';
                    
                    setTimeout(() => {
                        if (filter === 'all' || project.classList.contains(filter)) {
                            project.style.display = 'block';
                            project.style.transform = 'scale(1)';
                            project.style.opacity = '1';
                        } else {
                            project.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }

    // Enhanced Form Handling with animations
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add submission animation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.style.background = 'var(--neon-green)';
            submitBtn.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.5)';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'var(--neon-green)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.boxShadow = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Enhanced Skill Cards with hover effects
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced Project Cards with 3D effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Parallax Effect for Background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body::before');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Enhanced Tech Icons with floating animation
    const techIcons = document.querySelectorAll('.tech-icons i');
    techIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('floating');
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Handle device orientation changes
    window.addEventListener('orientationchange', () => {
        // Reset any necessary styles or states
        if (isMenuOpen) {
            toggleMenu();
        }
        
        // Force AOS to refresh
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    });

    // Add touch ripple effect to buttons
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', (e) => {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${e.touches[0].clientX - rect.left}px`;
            ripple.style.top = `${e.touches[0].clientY - rect.top}px`;
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
});

// Custom Cursor Function - DISABLED
/*
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}
*/

// Particle Effects Function
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and animation delay
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Random color
        const colors = ['var(--neon-purple)', 'var(--neon-blue)', 'var(--neon-green)', 'var(--neon-pink)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Scroll Particles Function
function createScrollParticles() {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--neon-purple)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        // Random position around scroll button
        const scrollBtn = document.getElementById('scroll-top');
        const rect = scrollBtn.getBoundingClientRect();
        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const animation = particle.animate([
            { 
                transform: 'translateY(0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translateY(-${Math.random() * 200 + 100}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
}

// Loading Screen Function
function showLoadingScreen() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
    
    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1000);
    });
}

// Add floating animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .floating {
        animation: floating 3s ease-in-out infinite;
    }
    
    .tech-icons i {
        transition: all 0.3s ease;
    }
    
    .tech-icons i:hover {
        animation: none;
        transform: scale(1.3) rotate(15deg);
    }
`;
document.head.appendChild(style); 