document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const siteLogo = document.getElementById('site-logo');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'light-mode') {
            themeIcon.textContent = '🌙';
            siteLogo.src = 'negro.png'; // Set light mode logo
        } else {
            themeIcon.textContent = '☀️';
            siteLogo.src = 'blanco.png'; // Set dark mode logo
        }
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        let theme = 'dark-mode';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light-mode';
            themeIcon.textContent = '🌙';
            siteLogo.src = 'negro.png'; // Change to light mode logo
        } else {
            themeIcon.textContent = '☀️';
            siteLogo.src = 'blanco.png'; // Change to dark mode logo
        }
        localStorage.setItem('theme', theme);
    });

    // Smart navigation bar logic
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    const scrollThreshold = 100; // Define el umbral de desplazamiento en píxeles

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling down and past the threshold
            header.classList.add('header-hidden');
        } else if (scrollTop < lastScrollTop || scrollTop <= scrollThreshold) {
            // Scrolling up or at the top of the page
            header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop;
    });

    // Smooth scroll for logo click
    const logoLink = document.querySelector('header .header-logo').closest('a');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animación de elementos al hacer scroll
    const animatedElements = document.querySelectorAll('.service-category, .v-m-v-item, .feature-card');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // El 20% del elemento debe ser visible para activar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Deja de observar una vez que se ha animado
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Mobile menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuButton = document.querySelector('.close-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu ul li a');

    hamburgerMenu.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; // Disable scroll on body
    });

    closeMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = ''; // Enable scroll on body
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = ''; // Enable scroll on body
        });
    });
});