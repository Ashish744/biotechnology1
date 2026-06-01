// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
const scrollToTopBtn = document.getElementById('scrollToTop');
const scrollProgressBar = document.createElement('div');
scrollProgressBar.className = 'scroll-progress-bar';
document.body.appendChild(scrollProgressBar);
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');
const heroImage = document.querySelector('.hero-image-placeholder');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
    scrollProgressBar.style.width = `${progress}%`;

    if (heroTitle) {
        heroTitle.style.transform = `translateY(${Math.min(scrollTop * 0.12, 24)}px)`;
    }
    if (heroSubtitle) {
        heroSubtitle.style.transform = `translateY(${Math.min(scrollTop * 0.18, 32)}px)`;
    }
    if (heroImage) {
        heroImage.style.transform = `translateY(${Math.min(scrollTop * 0.07, 18)}px)`;
    }

    if (scrollToTopBtn) {
        scrollToTopBtn.classList.toggle('show', scrollTop > 500);
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const animateTargets = document.querySelectorAll('section, .hero-content, .section-header, .stat-card, .process-step, .team-card, .news-card, .faq-item, .cta-content, .contact-container, .footer-container');
animateTargets.forEach(target => target.classList.add('animate-on-scroll'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.16,
    rootMargin: '0px 0px -80px 0px'
});

animateTargets.forEach(target => revealObserver.observe(target));

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards and research cards
document.querySelectorAll('.service-card, .research-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Button Click Effects
const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        
        // Add animation
        this.style.opacity = '0.5';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 200);
    });
}

// Service Card Hover Effects with Mouse Tracking
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        // Only apply 3D effect on larger screens
        if (window.innerWidth > 768) {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Placeholder boxes interactive effect
const placeholders = document.querySelectorAll('.placeholder-box');

placeholders.forEach(placeholder => {
    placeholder.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.6s ease-in-out';
    });
    
    placeholder.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy Load Images when added
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

// Add staggered animation to cards
const allCards = document.querySelectorAll('.service-card, .research-card');

allCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Animate Counter Numbers
function animateCounters() {
    const statCards = document.querySelectorAll('.stat-number');
    const speed = 2000; // 2 seconds

    statCards.forEach(card => {
        const target = parseInt(card.getAttribute('data-target'));
        const increment = target / (speed / 16);
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                card.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                card.textContent = target + '+';
            }
        };

        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(card);
            }
        });
        observer.observe(card);
    });
}

animateCounters();

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// News Card Read More Links
const readMoreLinks = document.querySelectorAll('.read-more');

readMoreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Show modal or navigate to full article
        const title = link.closest('.news-card').querySelector('h3').textContent;
        alert('Article: ' + title + '\n\nFull article content would load here.');
    });
});

// Team Card Hover Effects
const teamCards = document.querySelectorAll('.team-card');

teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.6s ease-in-out';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
});

// Testimonial Carousel
class TestimonialCarousel {
    constructor() {
        this.currentIndex = 0;
        this.cards = document.querySelectorAll('.testimonial-card-carousel');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevTestimonial');
        this.nextBtn = document.getElementById('nextTestimonial');
        this.autoRotateInterval = null;
        
        this.init();
    }
    
    init() {
        // Set initial active card
        this.showCard(0);
        
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevCard());
        this.nextBtn.addEventListener('click', () => this.nextCard());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showCard(index));
        });
        
        // Start auto-rotation
        this.startAutoRotate();
        
        // Pause on hover
        document.querySelector('.testimonial-carousel').addEventListener('mouseenter', () => {
            this.stopAutoRotate();
        });
        
        document.querySelector('.testimonial-carousel').addEventListener('mouseleave', () => {
            this.startAutoRotate();
        });
    }
    
    showCard(index) {
        // Remove active class from all cards
        this.cards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Remove active class from all dots
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to current card and dot
        this.currentIndex = index;
        this.cards[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    }
    
    nextCard() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.showCard(this.currentIndex);
        this.resetAutoRotate();
    }
    
    prevCard() {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.showCard(this.currentIndex);
        this.resetAutoRotate();
    }
    
    startAutoRotate() {
        this.autoRotateInterval = setInterval(() => {
            this.nextCard();
        }, 5000); // Change every 5 seconds
    }
    
    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
    }
    
    resetAutoRotate() {
        this.stopAutoRotate();
        this.startAutoRotate();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.testimonial-carousel')) {
        new TestimonialCarousel();
    }

    // Generate team avatars from names if no images provided
    document.querySelectorAll('.team-card').forEach(card => {
        const nameEl = card.querySelector('h3');
        const imgPlaceholder = card.querySelector('.team-image-placeholder');
        if (!nameEl || !imgPlaceholder) return;

        // if an <img> already exists inside use it; otherwise generate avatar
        const existingImg = imgPlaceholder.querySelector('img');
        if (existingImg) return;

        const fullName = nameEl.textContent.trim();
        const parts = fullName.split(' ').filter(Boolean);
        let initials = parts.length >= 2 ? (parts[0][0] + parts[parts.length-1][0]) : fullName.slice(0,2);
        initials = initials.toUpperCase();

        // simple color hash based on name
        let hash = 0;
        for (let i=0;i<fullName.length;i++) hash = fullName.charCodeAt(i) + ((hash<<5)-hash);
        const hue = Math.abs(hash) % 360;
        const bg = `linear-gradient(135deg,hsl(${hue} 80% 45%), hsl(${(hue+40)%360} 80% 55%))`;

        const avatar = document.createElement('div');
        avatar.className = 'team-avatar';
        avatar.textContent = initials;
        avatar.style.background = bg;

        // clear placeholder content and append avatar
        imgPlaceholder.innerHTML = '';
        imgPlaceholder.appendChild(avatar);
    });
});

// Process Steps Sequential Animation
const processSteps = document.querySelectorAll('.process-step');

processSteps.forEach((step, index) => {
    step.style.animationDelay = `${index * 0.15}s`;
});

// Add staggered animation to news cards
const newsCards = document.querySelectorAll('.news-card');

newsCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add staggered animation to FAQ items
const faqItemsAnim = document.querySelectorAll('.faq-item');

faqItemsAnim.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Team Cards with Stagger
const teamCardsAnim = document.querySelectorAll('.team-card');

teamCardsAnim.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Testimonial Cards with Stagger
const testimonialCardsAnim = document.querySelectorAll('.testimonial-card');

testimonialCardsAnim.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// Enhanced Signup Modal with Advanced Animations
// Wait for DOM to load before accessing elements
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSignupModal);
} else {
    initSignupModal();
}

function initSignupModal() {
    const signupModal = document.getElementById('signupModal');
    const signinModal = document.getElementById('signinModal');
    const navSignupBtn = document.getElementById('navSignupBtn');
    const closeModal = document.getElementById('closeModal');
    const closeSigninModal = document.getElementById('closeSigninModal');
    const signupForm = document.getElementById('signupForm');
    const signinForm = document.getElementById('signinForm');
    const signinPassword = document.getElementById('signinPassword');
    const toggleSigninPassword = document.getElementById('toggleSigninPassword');
    const signupToSigninLinks = document.querySelectorAll('.switch-to-signin');
    const signinToSignupLinks = document.querySelectorAll('.switch-to-signup');
    
    // Check if elements exist
    if (!signupModal || !navSignupBtn || !closeModal || !signinModal || !closeSigninModal) {
        console.error('Signup or Signin modal elements not found!');
        return;
    }

    function showModal(modal) {
        if (!modal) return;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        if (modal === signupModal) {
            addParticleEffects();
        }
    }

    function hideModal(modal) {
        if (!modal) return;
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        clearAllErrors();
    }

    // Ripple Effect on Button Click
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Open signup modal with animation
    navSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        createRipple(e);
        setTimeout(() => {
            showModal(signupModal);
        }, 300);
    });

    signupToSigninLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(signupModal);
            showModal(signinModal);
        });
    });

    signinToSignupLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(signinModal);
            showModal(signupModal);
        });
    });

    // Close signup modal
    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(signupModal);
    });

    // Close signin modal
    closeSigninModal.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(signinModal);
    });

    // Close modals when clicking on overlay
    document.querySelectorAll('.modal-overlay').forEach((overlay) => {
        overlay.addEventListener('click', () => {
            hideModal(signupModal);
            hideModal(signinModal);
        });
    });

    // Particle Effects for Modal
    function addParticleEffects() {
        const brandSection = document.querySelector('.signup-brand-section');
        if (!brandSection) return;
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: floatParticle ${3 + Math.random() * 2}s ease-in-out infinite;
                animation-delay: ${i * 0.1}s;
                z-index: 2;
            `;
            brandSection.appendChild(particle);
            
            // Remove after animation completes
            setTimeout(() => particle.remove(), 8000);
        }
    }

    const floatKeyframes = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
            }
        }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.textContent = floatKeyframes;
    document.head.appendChild(styleSheet);

    // Password visibility toggle with icon animation
    const togglePassword1 = document.getElementById('togglePassword1');
    const togglePassword2 = document.getElementById('togglePassword2');
    const spassword = document.getElementById('spassword');
    const cpassword = document.getElementById('cpassword');

    if (togglePassword1 && spassword) {
        togglePassword1.addEventListener('click', (e) => {
            e.preventDefault();
            const isPassword = spassword.type === 'password';
            spassword.type = isPassword ? 'text' : 'password';
            togglePassword1.style.animation = 'none';
            setTimeout(() => {
                togglePassword1.style.animation = '';
            }, 10);
            togglePassword1.innerHTML = `<i class="fas fa-eye${isPassword ? '-slash' : ''}" style="animation: iconFlip 0.4s ease-out;"></i>`;
        });
    }

    if (togglePassword2 && cpassword) {
        togglePassword2.addEventListener('click', (e) => {
            e.preventDefault();
            const isPassword = cpassword.type === 'password';
            cpassword.type = isPassword ? 'text' : 'password';
            togglePassword2.style.animation = 'none';
            setTimeout(() => {
                togglePassword2.style.animation = '';
            }, 10);
            togglePassword2.innerHTML = `<i class="fas fa-eye${isPassword ? '-slash' : ''}" style="animation: iconFlip 0.4s ease-out;"></i>`;
        });
    }

    // Icon flip animation
    const iconFlipStyle = document.createElement('style');
    iconFlipStyle.textContent = `
        @keyframes iconFlip {
            0% { transform: rotateY(0deg); }
            50% { transform: rotateY(90deg); }
            100% { transform: rotateY(0deg); }
        }
    `;
    document.head.appendChild(iconFlipStyle);

    // Real-time form validation with visual feedback
    const formInputs = document.querySelectorAll('.modern-signup-form input[type="text"], .modern-signup-form input[type="email"], .modern-signup-form input[type="password"], .modern-signup-form input[type="tel"]');

    formInputs.forEach((input, index) => {
        input.addEventListener('blur', () => {
            validateField(input);
            if (input.value.trim() !== '') {
                addSuccessAnimation(input);
            }
        });
        
        input.addEventListener('focus', () => {
            clearFieldError(input);
            input.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('input', () => {
            input.style.transform = 'scale(1)';
        });
    });

    // Add success animation to field
    function addSuccessAnimation(field) {
        field.style.animation = 'none';
        setTimeout(() => {
            field.style.animation = '';
        }, 10);
    }

    // Validate individual field
    function validateField(field) {
        let isValid = true;
        let errorMsg = '';
        
        if (field.id === 'fname') {
            if (field.value.trim().length < 2) {
                isValid = false;
                errorMsg = 'Full name must be at least 2 characters';
            }
        } else if (field.id === 'company') {
            if (field.value.trim().length < 2) {
                isValid = false;
                errorMsg = 'Company name must be at least 2 characters';
            }
        } else if (field.id === 'semail') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMsg = 'Please enter a valid email address';
            }
        } else if (field.id === 'spassword') {
            if (field.value.length < 8) {
                isValid = false;
                errorMsg = 'Password must be at least 8 characters';
            }
        } else if (field.id === 'cpassword') {
            const password = document.getElementById('spassword').value;
            if (field.value !== password) {
                isValid = false;
                errorMsg = 'Passwords do not match';
            }
        }
        
        if (!isValid) {
            showFieldError(field, errorMsg);
        } else {
            clearFieldError(field);
        }
        
        return isValid;
    }

    // Show field error with animation
    function showFieldError(field, message) {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            field.style.borderColor = '#ff006e';
            field.style.boxShadow = '0 0 0 4px rgba(255, 0, 110, 0.1)';
        }
    }

    // Clear field error
    function clearFieldError(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }

    // Clear all errors
    function clearAllErrors() {
        document.querySelectorAll('.form-error').forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
        document.querySelectorAll('.modern-signup-form input').forEach(input => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
    }

    // Form submission with advanced feedback
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fname = document.getElementById('fname');
            const company = document.getElementById('company');
            const semail = document.getElementById('semail');
            const spassword = document.getElementById('spassword');
            const cpassword = document.getElementById('cpassword');
            const terms = document.getElementById('terms');
            const submitBtn = signupForm.querySelector('.submit-btn');
            
            // Validate all fields
            let isFormValid = true;
            
            [fname, company, semail, spassword, cpassword].forEach(field => {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });
            
            if (!terms.checked) {
                isFormValid = false;
            }
            
            if (isFormValid) {
                // Show loading state
                submitBtn.classList.add('loading');
                submitBtn.innerHTML = 'Creating Account...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                    submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                    submitBtn.disabled = true;
                    
                    // Success animation
                    signupForm.style.animation = 'successPulse 0.6s ease-out';
                    
                    setTimeout(() => {
                        alert(`Welcome to Stackly, ${fname.value}!\\n\\nA confirmation email has been sent to ${semail.value}.`);
                        
                        // Reset form
                        signupForm.reset();
                        signupForm.style.animation = '';
                        submitBtn.innerHTML = '<span>Create Account</span><i class="fas fa-arrow-right"></i>';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        
                        // Close modal
                        signupModal.classList.remove('show');
                        document.body.style.overflow = 'auto';
                        clearAllErrors();
                    }, 1500);
                }, 2000);
            } else {
                // Shake animation on error
                submitBtn.style.animation = 'shake 0.4s ease-out';
                setTimeout(() => {
                    submitBtn.style.animation = '';
                }, 400);
            }
        });
    }

    // Add shake and success pulse animations
    const formAnimations = document.createElement('style');
    formAnimations.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        @keyframes successPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(formAnimations);

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModal(signupModal);
            hideModal(signinModal);
        }
    });
}

// Changing Word Animation in Hero Section
const changingWord = document.getElementById('changingWord');
const words = ['Healthcare', 'Research', 'Innovation', 'Medicine', 'Solutions', 'Science'];
let wordIndex = 0;

if (changingWord) {
    setInterval(() => {
        wordIndex = (wordIndex + 1) % words.length;
        changingWord.style.opacity = '0';
        setTimeout(() => {
            changingWord.textContent = words[wordIndex];
            changingWord.style.opacity = '1';
        }, 150);
    }, 2000);
    
    // Add smooth transition
    changingWord.style.transition = 'opacity 0.15s ease-in-out';
}

console.log('Stackly website loaded successfully!');

// Hero Canvas Animation
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let animationFrame = 0;
    const particles = [];
    
    // Initialize particles
    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    initParticles();
    
    function drawBackground() {
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(0.5, '#764ba2');
        gradient.addColorStop(1, '#667eea');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function drawDNAHelix() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const time = animationFrame * 0.02;
        
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
        ctx.lineWidth = 2;
        
        // Draw DNA-like spiral
        for (let i = 0; i < 100; i++) {
            const angle = (i * 0.1 + time) % (Math.PI * 2);
            const x = centerX + Math.cos(angle) * 150;
            const y = centerY - 300 + (i * 6) + Math.sin(time * 2) * 50;
            
            if (i === 0) {
                ctx.beginPath();
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
    
    function drawParticles() {
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            // Keep in bounds
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
            
            // Draw particle
            ctx.fillStyle = `rgba(100, 200, 255, ${particle.opacity})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    function animate() {
        drawBackground();
        drawDNAHelix();
        drawParticles();
        
        animationFrame++;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize canvas when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroCanvas);
} else {
    initHeroCanvas();
}

// Newsletter form submission handling (footer)
(function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const notice = document.querySelector('.newsletter-notice');
    const submitBtn = newsletterForm.querySelector('button[type="submit"], .newsletter-btn');

    function showNotice(text, type) {
        if (!notice) return;
        notice.textContent = text;
        notice.classList.remove('success', 'error');
        if (type === 'success') notice.classList.add('success');
        if (type === 'error') notice.classList.add('error');
    }

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput ? emailInput.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showNotice('Please enter a valid email', 'error');
            if (emailInput) emailInput.focus();
            return;
        }

        // On valid email, show Submitted
        showNotice('Submitted', 'success');
        if (submitBtn) {
            submitBtn.disabled = true;
            // show check icon if using font awesome
            submitBtn.innerHTML = '<i class="fas fa-check"></i>';
        }

        // Optionally clear input
        if (emailInput) emailInput.value = '';

        // Re-enable button after 3s and restore icon
        setTimeout(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
            }
        }, 3000);
    });
})();