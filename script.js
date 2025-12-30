// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Smooth cursor movement with GSAP
    gsap.to(cursorDot, { duration: 0, left: posX, top: posY });
    gsap.to(cursorOutline, { duration: 0.3, left: posX, top: posY });
});

// Enhanced Cursor Hover Effects
const hoverTargets = document.querySelectorAll('a, button, .project-card, input, textarea');
hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        gsap.to(cursorOutline, {
            scale: 1.5,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'transparent',
            duration: 0.3
        });
        gsap.to(cursorDot, { scale: 0, duration: 0.3 });
    });
    target.addEventListener('mouseleave', () => {
        gsap.to(cursorOutline, {
            scale: 1,
            backgroundColor: 'transparent',
            borderColor: 'var(--text-secondary)',
            duration: 0.3
        });
        gsap.to(cursorDot, { scale: 1, duration: 0.3 });
    });
});

// Theme Toggle with Animation
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

themeToggle.addEventListener('click', () => {
    // Rotate animation on toggle
    gsap.to(themeToggle, { rotation: '+=360', duration: 0.6, ease: 'back.out(1.7)' });

    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.removeItem('theme');
    }
});

// Sticky Navbar with Animation
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        gsap.to(navbar, { y: -100, duration: 0.3, ease: 'power2.out' });
    } else {
        gsap.to(navbar, { y: 0, duration: 0.3, ease: 'power2.out' });
    }

    lastScroll = currentScroll;
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Enhanced Hero Animations with Stagger
const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTimeline
    .from(".eyebrow", {
        y: 30,
        opacity: 0,
        duration: 0.8
    })
    .from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1
    }, "-=0.4")
    .from(".text-reveal", {
        backgroundPosition: "0% 100%",
        backgroundSize: "0% 100%",
        duration: 1.2,
        ease: "power2.inOut"
    }, "-=0.8")
    .from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 1
    }, "-=0.6")
    .from(".cta-container a", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    }, "-=0.5")
    .from(".abstract-shape", {
        scale: 0.5,
        opacity: 0,
        rotation: 180,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
    }, "-=1.2");

// Parallax Effect on Hero
gsap.to(".abstract-shape", {
    y: 200,
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

// Section Headers with Split Animation
gsap.utils.toArray('.section-header').forEach(header => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: header,
            start: "top 85%",
        }
    });

    tl.from(header.querySelector('.section-tag'), {
        x: -30,
        opacity: 0,
        duration: 0.6
    })
        .from(header.querySelector('.section-title'), {
            y: 40,
            opacity: 0,
            duration: 0.8
        }, "-=0.3");
});

// About Text Lines Animation
gsap.from(".about-text p", {
    scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});

// Stats Animation with Scale
gsap.utils.toArray('.stat-item').forEach((stat, index) => {
    gsap.from(stat, {
        scrollTrigger: {
            trigger: stat,
            start: "top 90%",
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "back.out(1.7)"
    });
});

// Stats Counter Animation
const statsNumbers = document.querySelectorAll('.stat-number');
statsNumbers.forEach(stat => {
    const rawValue = stat.innerText.replace('+', '');
    const endValue = parseInt(rawValue);

    gsap.from(stat, {
        scrollTrigger: {
            trigger: stat,
            start: "top 90%",
        },
        innerText: 0,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power1.out",
        onUpdate: function () {
            stat.innerText = Math.ceil(this.targets()[0].innerText) + "+";
        }
    });
});

// Skill Tags Float In
gsap.from(".skills-wrapper h3", {
    scrollTrigger: {
        trigger: ".skills-wrapper",
        start: "top 95%",
    },
    y: 20,
    duration: 0.8,
    ease: "power3.out"
});

gsap.from(".skill-tags span", {
    scrollTrigger: {
        trigger: ".skill-tags",
        start: "top 95%",
    },
    y: 10,
    scale: 0.95,
    duration: 0.6,
    stagger: 0.05,
    ease: "power2.out"
});

// Portfolio Cards Enhanced Animation
gsap.utils.toArray(".project-card").forEach((card, index) => {
    // Entrance animation
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
        },
        y: 80,
        opacity: 0,
        rotation: index % 2 === 0 ? 5 : -5,
        duration: 1,
        ease: "power3.out"
    });

    // Parallax on scroll
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        y: -30
    });
});

// Project Image Zoom on Hover
document.querySelectorAll('.project-card').forEach(card => {
    const image = card.querySelector('.project-image');

    card.addEventListener('mouseenter', () => {
        gsap.to(image, {
            scale: 1.1,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(image, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
        });
    });
});

// Testimonials with Rotation
gsap.utils.toArray(".testimonial-card").forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        y: 60,
        opacity: 0,
        rotation: (index - 1) * 3,
        duration: 1,
        delay: index * 0.15,
        ease: "power3.out"
    });
});

// Quote Fade In
gsap.from(".quote", {
    scrollTrigger: {
        trigger: ".testimonials-grid",
        start: "top 80%",
    },
    opacity: 0,
    duration: 1.2,
    stagger: 0.2
});

// Contact Form Animation
const formGroups = document.querySelectorAll('.form-group');
gsap.from(formGroups, {
    scrollTrigger: {
        trigger: ".contact-form-clean",
        start: "top 85%",
    },
    x: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
});

// Contact Header Slide In
gsap.from(".contact-header", {
    scrollTrigger: {
        trigger: ".contact-wrapper",
        start: "top 85%",
    },
    x: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Button Magnetic Effect
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
        });
    });
});

// Scroll Progress Bar
const progressBar = document.querySelector('.scroll-progress-bar');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
});

// Footer Fade In
gsap.from("footer", {
    scrollTrigger: {
        trigger: "footer",
        start: "top 95%",
    },
    y: 50,
    opacity: 0,
    duration: 1
});

// Social Links Stagger
gsap.from(".social-links a", {
    scrollTrigger: {
        trigger: ".social-links",
        start: "top 95%",
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1
});

// Floating Animation for Shape
gsap.to(".shape-inner", {
    y: 20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Add hover tilt effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

console.log('🎨 Professional portfolio with enhanced animations loaded!');

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: target,
                    offsetY: 80 // Account for navbar height
                },
                ease: "power3.inOut"
            });
        }
    });
});

// Page Load Fade In
gsap.from('body', {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
});

// Add subtle parallax to sections
gsap.utils.toArray('.section-container').forEach(section => {
    gsap.to(section, {
        y: -50,
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
});

// Navbar menu toggle for mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const hamburger = menuToggle.querySelector('.hamburger');
        if (hamburger) {
            hamburger.classList.toggle('active');
        }
    });
}

// Track scroll direction for subtle effects
let scrollDirection = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.scrollY;
            scrollDirection = currentScroll > lastScroll ? 1 : -1;
            ticking = false;
        });
        ticking = true;
    }
});

// Add loading state cleanup
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✅ Portfolio fully loaded and ready!');
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loader').style.display = 'inline';

        // Hide previous status
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';

        try {
            // Submit to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success!
                showFormStatus('success', '✅ Message sent successfully! I\'ll get back to you soon.');
                contactForm.reset();

                // Celebrate with animation
                gsap.from(formStatus, {
                    scale: 0.8,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
            } else {
                // Error from Formspree
                const data = await response.json();
                const errorMsg = data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong.';
                showFormStatus('error', '❌ ' + errorMsg);
            }
        } catch (error) {
            // Network error
            showFormStatus('error', '❌ Network error. Please check your connection and try again.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').style.display = 'inline';
            submitBtn.querySelector('.btn-loader').style.display = 'none';
        }
    });
}

function showFormStatus(type, message) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';

    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            gsap.to(formStatus, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    formStatus.style.display = 'none';
                    formStatus.style.opacity = 1;
                }
            });
        }, 5000);
    }
}
