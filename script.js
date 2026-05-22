/**
 * Ishtiaque Ahmed Tanim - Personal Portfolio JavaScript Engine
 * Dynamic interactions, theme switching, mouse tracking glow, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // THEME SWITCHER SYSTEM
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('icon-sun');
    const moonIcon = document.getElementById('icon-moon');
    const htmlElement = document.documentElement;

    // Retrieve saved theme or default to system preference (or dark)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'light') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // ==========================================
    // INTERACTIVE CURSOR-TRACKING GLOW
    // ==========================================
    const root = document.documentElement;

    // Track cursor on body for global background glow
    document.body.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        root.style.setProperty('--mouse-x', `${x}px`);
        root.style.setProperty('--mouse-y', `${y}px`);
    });

    // Track cursor locally on project cards for unique individual card glow
    const projectCards = document.querySelectorAll('.project-card, .about-card, .contact-info-panel');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--card-mouse-x', `${x}px`);
            card.style.setProperty('--card-mouse-y', `${y}px`);
        });
    });

    // ==========================================
    // HEADER SCROLL & PROGRESS INDICATOR
    // ==========================================
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scroll-progress');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Header styling on scroll
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = `${scrollPercent}%`;

        // Active Nav Link highlight on Scroll
        let currentSection = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (scrollTop >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // MOBILE NAVIGATION burger MENU
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when links are clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // ==========================================
    // DYNAMIC TYPING SIMULATOR
    // ==========================================
    const typedTextSpan = document.getElementById('typed-text');
    const roles = ["SQA Engineer.", "Playwright Developer.", "SaaS Test Specialist.", "QA Automation Engineer."];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newWordDelay = 2000;
    
    let roleIndex = 0;
    let charIndex = 0;
    let isErasing = false;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (!isErasing && charIndex < currentRole.length) {
            // Type characters
            typedTextSpan.textContent += currentRole.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (isErasing && charIndex > 0) {
            // Erase characters
            typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, erasingSpeed);
        } else if (!isErasing && charIndex === currentRole.length) {
            // Start erasing after delay
            isErasing = true;
            setTimeout(type, newWordDelay);
        } else if (isErasing && charIndex === 0) {
            // Move to next word
            isErasing = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, typingSpeed);
        }
    }

    // Initialize typing simulator
    if (typedTextSpan) {
        setTimeout(type, 1000);
    }

    // ==========================================
    // INTERACTIVE TABS (ABOUT SECTION)
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Toggle button states
            tabButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            // Toggle contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // ==========================================
    // SKILLS FILTERING SYSTEM
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Active button highlight
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            // Sort cards with animation
            skillCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // ==========================================
    // INTERSECTION OBSERVER FOR SCROLL REVEALS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => revealObserver.observe(element));

    // ==========================================
    // SKILL PROGRESS BARS TRIGGER ON SCROLL
    // ==========================================
    const skillSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.skill-level-progress');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = level;
                });
                skillsObserver.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        threshold: 0.2
    });

    if (skillSection) {
        skillsObserver.observe(skillSection);
    }

    // ==========================================
    // INTERACTIVE CONTACT FORM SYSTEM
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const submitBtnText = submitBtn.querySelector('span');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Retrieve elements
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const subjectInput = document.getElementById('form-subject');
        const messageInput = document.getElementById('form-message');

        // Simple validation checks
        if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
            alert('Please fill out all fields before sending a message.');
            return;
        }

        if (!validateEmail(emailInput.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Animate button on success
        submitBtn.disabled = true;
        submitBtnText.textContent = 'Sending Message...';

        setTimeout(() => {
            submitBtnText.textContent = 'Message Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)'; // Green gradient on success
            submitBtn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
            
            // Clear inputs
            contactForm.reset();

            // Revert button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtnText.textContent = 'Send Message';
                submitBtn.style.background = ''; // Revert to stylesheet default
                submitBtn.style.boxShadow = '';
            }, 4000);

        }, 1500);
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
