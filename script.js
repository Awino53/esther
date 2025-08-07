// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScrolling();
    initSkillAnimations();
    initContactForm();
    initScrollAnimations();
    setCurrentYear();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to 'light' mode
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.setAttribute('data-lucide', 'moon');
    }
    
    // Re-initialize icons after theme change
    lucide.createIcons();
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        if (newTheme === 'dark') {
            themeIcon.setAttribute('data-lucide', 'sun');
        } else {
            themeIcon.setAttribute('data-lucide', 'moon');
        }
        
        // Re-initialize icons
        lucide.createIcons();
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = mobileMenuToggle.querySelector('.menu-icon');
    let isMenuOpen = false;
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <a href="#about" class="nav-link">About</a>
        <a href="#skills" class="nav-link">Skills</a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#education" class="nav-link">Education</a>
        <a href="#contact" class="nav-link">Contact</a>
    `;
    
    // Insert mobile menu after navbar
    const navbar = document.getElementById('navbar');
    navbar.parentNode.insertBefore(mobileMenu, navbar.nextSibling);
    
    mobileMenuToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            mobileMenu.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        
        lucide.createIcons();
    });
    
    // Close mobile menu when clicking on a link
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            isMenuOpen = false;
            mobileMenu.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            isMenuOpen = false;
            mobileMenu.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skill Bar Animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                // Animate the skill bar
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 200);
                
                observer.unobserve(skillBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `mailto:estherojul53@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message (you could implement a toast notification here)
        alert('Thank you for your message! Your email client should open now.');
        
        // Reset form
        contactForm.reset();
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat-card, .highlight-card, .project-card, .education-item, .cert-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Set Current Year in Footer
function setCurrentYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Utility Functions
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

// Add active state to navigation links based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll listener for active navigation
window.addEventListener('scroll', debounce(updateActiveNavLink, 10));

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Preloader (optional)
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    const preloaderStyles = `
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--background);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        .preloader-content {
            text-align: center;
        }
        .preloader-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--muted);
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = preloaderStyles;
    document.head.appendChild(styleElement);
    document.body.appendChild(preloader);
    
    // Hide preloader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }, 1000);
    });
}

 

// Initialize preloader
// showPreloader();

// Performance optimization: Lazy loading for images
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

// Error handling for failed image loads
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDUwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMzIuNSAxNDJMMjUwIDE2MC41TDI2Ny41IDE0MkwyOTAgMTY1VjE5MEgyMTBWMTY1TDIzMi41IDE0MloiIGZpbGw9IiM5Q0EzQUYiLz4KPGNpcmNsZSBjeD0iMjMwIiBjeT0iMTMwIiByPSI4IiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjI1MCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjM3MjhGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
    }
}, true);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const menuIcon = mobileMenuToggle.querySelector('.menu-icon');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    }
});

// Add ARIA labels and improve accessibility
function improveAccessibility() {
    // Add ARIA labels to social links
    const socialLinks = document.querySelectorAll('.social-link, .footer-social-link');
    socialLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes('github')) {
            link.setAttribute('aria-label', 'Visit GitHub profile');
        } else if (href.includes('linkedin')) {
            link.setAttribute('aria-label', 'Visit LinkedIn profile');
        } else if (href.includes('mailto')) {
            link.setAttribute('aria-label', 'Send email');
        }
    });
    
    // Add ARIA labels to navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const text = link.textContent.trim();
        link.setAttribute('aria-label', `Navigate to ${text} section`);
    });
}

//sending message
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent actual form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const text = `*New Message From Website*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
    const encodedText = encodeURIComponent(text);

    // WhatsApp link with your number
    const whatsappURL = `https://wa.me/254799091398?text=${encodedText}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");
  });

// Initialize accessibility improvements
improveAccessibility();

// Console welcome message
console.log(`
%c👋 Welcome to Esther's Portfolio!
%cBuilt with vanilla HTML, CSS, and JavaScript
%cFeel free to explore the code!
`, 
'font-size: 18px; font-weight: bold; color: #4f46e5;',
'font-size: 14px; color: #64748b;',
'font-size: 14px; color: #64748b;'
);