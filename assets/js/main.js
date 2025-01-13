// Theme Switching
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('light-mode', savedTheme === 'light');
        themeSwitch.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    }

    // Theme toggle handler
    themeSwitch.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeSwitch.textContent = isLight ? '🌙' : '☀️';
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const navLinks = document.querySelectorAll('nav a');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        navLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            const listItem = link.parentElement;
            
            if (text.includes(searchTerm)) {
                listItem.style.display = '';
                // Expand parent categories if match found
                let parent = listItem.parentElement;
                while (parent && !parent.classList.contains('sidebar')) {
                    if (parent.tagName === 'UL') {
                        parent.style.display = '';
                    }
                    parent = parent.parentElement;
                }
            } else {
                listItem.style.display = 'none';
            }
        });
    });

    // Sidebar category expansion
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('click', () => {
            const subMenu = category.nextElementSibling;
            if (subMenu && subMenu.tagName === 'UL') {
                subMenu.style.display = subMenu.style.display === 'none' ? '' : 'none';
            }
        });
    });

    // Code highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    // Mobile menu toggle (for future implementation)
    const createMobileMenu = () => {
        const sidebar = document.querySelector('.sidebar');
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '☰';
        document.body.appendChild(mobileToggle);

        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    };

    // Add mobile menu if screen width is less than 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
});

// Add smooth scrolling for anchor links
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
