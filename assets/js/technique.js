// Table of Contents Functionality
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const tocLinks = document.querySelectorAll('.toc a');
    
    // Intersection Observer for section visibility
    const observerOptions = {
        rootMargin: '-20% 0px -75% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all TOC links
                tocLinks.forEach(link => link.parentElement.classList.remove('active'));
                
                // Add active class to current section's TOC link
                const activeLink = document.querySelector(`.toc a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.parentElement.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Smooth scrolling for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile TOC toggle
    const createMobileTocToggle = () => {
        const toc = document.querySelector('.toc');
        const tocToggle = document.createElement('button');
        tocToggle.className = 'toc-toggle';
        tocToggle.innerHTML = '📑';
        tocToggle.setAttribute('title', 'Toggle Table of Contents');
        document.querySelector('main').appendChild(tocToggle);

        tocToggle.addEventListener('click', () => {
            toc.classList.toggle('show');
        });

        // Hide TOC when clicking outside
        document.addEventListener('click', (e) => {
            if (!toc.contains(e.target) && !tocToggle.contains(e.target)) {
                toc.classList.remove('show');
            }
        });
    };

    // Add mobile TOC toggle if screen width is less than 1400px
    if (window.innerWidth < 1400) {
        createMobileTocToggle();
    }

    // Code block copy functionality
    const addCodeCopyButtons = () => {
        document.querySelectorAll('pre code').forEach(codeBlock => {
            const container = codeBlock.parentElement;
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = '📋';
            copyButton.setAttribute('title', 'Copy to clipboard');

            // Find or create code header
            let codeHeader = container.previousElementSibling;
            if (!codeHeader || !codeHeader.classList.contains('code-header')) {
                codeHeader = document.createElement('div');
                codeHeader.className = 'code-header';
                container.parentElement.insertBefore(codeHeader, container);
            }

            codeHeader.appendChild(copyButton);

            copyButton.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(codeBlock.textContent);
                    copyButton.innerHTML = '✅';
                    setTimeout(() => {
                        copyButton.innerHTML = '📋';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy code:', err);
                    copyButton.innerHTML = '❌';
                    setTimeout(() => {
                        copyButton.innerHTML = '📋';
                    }, 2000);
                }
            });
        });
    };

    addCodeCopyButtons();

    // Add metadata tooltips
    const metadataItems = document.querySelectorAll('.metadata-item');
    metadataItems.forEach(item => {
        const label = item.querySelector('span:first-child').textContent;
        const value = item.querySelector('span:last-child').textContent;
        item.setAttribute('title', `${label}: ${value}`);
    });
});
