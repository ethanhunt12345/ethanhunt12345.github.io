document.addEventListener('DOMContentLoaded', function() {
    // Handle dropdown menus
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownContainer = this.nextElementSibling;
            dropdownContainer.classList.toggle('show');
            
            // Close other dropdowns
            dropdownBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.nextElementSibling.classList.remove('show');
                }
            });
        });
    });

    // Handle active link highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                
                // If it's in a dropdown, show the dropdown
                const parentDropdown = link.closest('.dropdown-container');
                if (parentDropdown) {
                    parentDropdown.classList.add('show');
                }
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Set active link on page load
    setActiveLink();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize syntax highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    // Add copy functionality to code blocks
    document.querySelectorAll('pre code').forEach((block) => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        
        const pre = block.parentNode;
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);

        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text:', err);
            }
        });
    });

    // Add styles for copy button
    const style = document.createElement('style');
    style.textContent = `
        .copy-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 8px;
            background: #404040;
            border: none;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.3s;
        }
        
        .copy-btn:hover {
            opacity: 1;
        }
        
        pre:hover .copy-btn {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
});
