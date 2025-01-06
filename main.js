// Project data
const projects = [
    {
        title: "Responsive Landing Page",
        description: "A modern landing page I created for a local business, featuring smooth scroll animations and a fully responsive design that works beautifully across all devices.",
        image: "https://via.placeholder.com/300x200",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        features: [
            "Responsive design for all devices",
            "Smooth scroll animations",
            "Interactive navigation",
            "Contact form with validation"
        ],
        liveLink: "#",
        githubLink: "#"
    },
    {
        title: "Interactive Dashboard",
        description: "A clean and intuitive dashboard interface I developed using vanilla JavaScript. Features interactive charts and real-time data updates.",
        image: "https://via.placeholder.com/300x200",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        features: [
            "Real-time data updates",
            "Interactive charts and graphs",
            "Customizable dashboard layout",
            "Dark/Light mode toggle"
        ],
        liveLink: "#",
        githubLink: "#"
    },
    {
        title: "Portfolio Website",
        description: "My personal portfolio website built from scratch. Features a clean design, system theme detection, and smooth animations using pure JavaScript.",
        image: "https://via.placeholder.com/300x200",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        features: [
            "System theme detection",
            "Smooth page transitions",
            "Mobile-first design",
            "Contact form integration"
        ],
        liveLink: "#",
        githubLink: "#"
    }
];

// Load projects
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const projectCard = `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <ul class="project-features">
                        ${project.features.map(feature => `
                            <li><i class="fas fa-check"></i> ${feature}</li>
                        `).join('')}
                    </ul>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.liveLink}" target="_blank" class="btn primary">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        <a href="${project.githubLink}" target="_blank" class="btn secondary">
                            <i class="fab fa-github"></i> View Code
                        </a>
                    </div>
                </div>
            </div>
        `;
        projectsGrid.innerHTML += projectCard;
    });
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Create overlay element for theme transition
const overlay = document.createElement('div');
overlay.className = 'theme-transition-overlay';
document.body.appendChild(overlay);

// Function to handle theme change
function changeTheme() {
    // Start the animation
    overlay.classList.add('animate');
    
    // Toggle dark mode after a small delay
    setTimeout(() => {
        body.classList.toggle('dark-mode');
        
        // Reset the animation
        setTimeout(() => {
            overlay.classList.remove('animate');
        }, 500);
    }, 100);
}

// Check system theme preference
function getSystemThemePreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Set theme based on system preference
function setThemeBasedOnSystem() {
    const isDarkMode = getSystemThemePreference() === 'dark';
    // Set theme immediately without animation for initial load
    body.classList.toggle('dark-mode', isDarkMode);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeBasedOnSystem);

// Theme toggle button
themeToggle.addEventListener('click', () => {
    changeTheme();
});

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    // Prevent scrolling when menu is open
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
    });
});

// Smooth scroll for navigation links
function smoothScroll(target) {
    const element = document.querySelector(target);
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'));
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');

function showMessage(type, message) {
    formMessage.className = type;
    formMessage.textContent = message;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.sendForm('service_wtfsbax', 'template_olhbk04', contactForm)
        .then(() => {
            showMessage('success', 'Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        })
        .catch((error) => {
            showMessage('error', 'Oops! Something went wrong. Please try again later.');
            console.error('Email Error:', error);
        })
        .finally(() => {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
});
window.addEventListener('load', () => {
    window.location = '#';
});
// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setThemeBasedOnSystem();  // Set initial theme based on system preference
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Add a class to handle the direction of animation
        if (entry.boundingClientRect.top > 0) {
            entry.target.classList.add('scroll-down');
            entry.target.classList.remove('scroll-up');
        } else {
            entry.target.classList.add('scroll-up');
            entry.target.classList.remove('scroll-down');
        }

        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all sections
document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
}); 