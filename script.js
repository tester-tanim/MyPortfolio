/**
 * Ishtiaque Ahmed Tanim - Personal Portfolio JavaScript Engine
 * Theme switching, scroll effects, coverage meters, and interactions.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // THEME SWITCHER SYSTEM
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('icon-sun');
    const moonIcon = document.getElementById('icon-moon');
    const htmlElement = document.documentElement;

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
    // HEADER SCROLL PROGRESS & ACTIVE NAV
    // ==========================================
    const scrollProgress = document.getElementById('scroll-progress');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = `${scrollPercent}%`;

        let currentSection = '';
        const sections = document.querySelectorAll('main section[id]');
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
    // MOBILE NAVIGATION MENU
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(element => revealObserver.observe(element));

    // ==========================================
    // CONTACT FORM
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const submitBtnText = submitBtn.querySelector('span');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const subjectInput = document.getElementById('form-subject');
        const messageInput = document.getElementById('form-message');

        if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
            alert('Please fill out all fields before sending a message.');
            return;
        }

        if (!validateEmail(emailInput.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        submitBtn.disabled = true;
        submitBtnText.textContent = 'Sending Message...';

        setTimeout(() => {
            submitBtnText.textContent = 'Message Sent Successfully!';

            contactForm.reset();

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtnText.textContent = 'Send Message';
            }, 4000);

        }, 1500);
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
