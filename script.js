document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    const faqItems = document.querySelectorAll('.faq-item');
    const copyBtn = document.querySelector('.copy-btn');
    
    // Theme Toggle
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Mobile Menu Toggle
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = nav.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && nav.classList.contains('show')) {
            nav.classList.remove('show');
        }
    });
    
    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('show')) {
                nav.classList.remove('show');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });
    
    // Copy template functionality
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const templateContent = document.querySelector(`.${targetId}`).textContent;
            
            navigator.clipboard.writeText(templateContent)
                .then(() => {
                    // Change button text temporarily
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    this.textContent = 'Failed to copy';
                });
        });
    }
    
    // Animation on scroll
    const scrollElements = document.querySelectorAll('.content-section');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else if (elementOutofView(el)) {
                hideScrollElement(el);
            }
        });
    };
    
    // Add .scrolled class to first visible sections on page load
    window.addEventListener('load', () => {
        handleScrollAnimation();
    });
    
    // Update active progress step based on scroll position
    const progressSteps = document.querySelectorAll('.progress-step');
    const sections = document.querySelectorAll('section[id]');
    
    const updateProgressTracker = () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });
        
        progressSteps.forEach(step => {
            step.classList.remove('active');
            
            // Map section IDs to progress steps
            if (currentSectionId === 'script' && step.getAttribute('data-step') === '1') {
                step.classList.add('active');
            } else if (currentSectionId === 'voiceover' && step.getAttribute('data-step') === '2') {
                step.classList.add('active');
            } else if (currentSectionId === 'panels' && step.getAttribute('data-step') === '3') {
                step.classList.add('active');
            } else if (currentSectionId === 'editing' && step.getAttribute('data-step') === '4') {
                step.classList.add('active');
            } else if (currentSectionId === 'effects' && step.getAttribute('data-step') === '5') {
                step.classList.add('active');
            } else if ((currentSectionId === 'growth' || currentSectionId === 'example' || currentSectionId === 'faq') && step.getAttribute('data-step') === '6') {
                step.classList.add('active');
            }
        });
    };
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
        updateProgressTracker();
    });
});
