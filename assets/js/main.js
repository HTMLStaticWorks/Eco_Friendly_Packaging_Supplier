document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Theme toggle (Dark/Light)
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const htmlEl = document.documentElement;

    // Check saved theme or system preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            htmlEl.classList.toggle('dark');
            if (htmlEl.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    });

    // RTL Toggle
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isRTL = htmlEl.getAttribute('dir') === 'rtl';
            if (isRTL) {
                htmlEl.setAttribute('dir', 'ltr');
                localStorage.setItem('dir', 'ltr');
            } else {
                htmlEl.setAttribute('dir', 'rtl');
                localStorage.setItem('dir', 'rtl');
            }
        });
    });

    // Set initial dir
    const savedDir = localStorage.getItem('dir');
    if (savedDir) {
        htmlEl.setAttribute('dir', savedDir);
    }
    
    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Highlight Active Navigation Menu
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref && linkHref === currentPath) {
            // Main styling for active link
            link.classList.remove('text-charcoal', 'dark:text-soft-beige');
            link.classList.add('text-leaf-green', 'dark:text-leaf-green', 'font-bold');
            
            // If it's inside a dropdown (like Home 1 / Home 2), highlight the parent Menu Item too
            const dropdown = link.closest('.group');
            if (dropdown) {
                const parentLink = dropdown.querySelector('a');
                if (parentLink && parentLink !== link) {
                    parentLink.classList.remove('text-charcoal', 'dark:text-soft-beige');
                    parentLink.classList.add('text-leaf-green', 'dark:text-leaf-green', 'font-bold');
                }
            }
        }
    });

    // Admin Sidebar Toggle (Slide-over for Mobile/Tablet)
    const adminMenuBtn = document.getElementById('admin-menu-btn');
    const adminSidebar = document.getElementById('admin-sidebar');
    const adminSidebarOverlay = document.getElementById('admin-sidebar-overlay');

    if (adminMenuBtn && adminSidebar && adminSidebarOverlay) {
        function toggleAdminSidebar() {
            const isClosed = adminSidebar.classList.contains('-translate-x-full');
            if (isClosed) {
                adminSidebar.classList.remove('-translate-x-full');
                adminSidebarOverlay.classList.remove('opacity-0', 'pointer-events-none');
                adminSidebarOverlay.classList.add('opacity-100');
            } else {
                adminSidebar.classList.add('-translate-x-full');
                adminSidebarOverlay.classList.remove('opacity-100');
                adminSidebarOverlay.classList.add('opacity-0', 'pointer-events-none');
            }
        }

        adminMenuBtn.addEventListener('click', toggleAdminSidebar);
        adminSidebarOverlay.addEventListener('click', toggleAdminSidebar);
    }
});
