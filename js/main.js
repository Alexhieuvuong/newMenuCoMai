console.log("Cong Caphe Clone - Main JS Loaded");

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.querySelector('header');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            document.body.classList.toggle('mobile-menu-open');
            header.classList.toggle('mobile-open');
        });
    }

    // Scroll Spy for Sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = document.querySelectorAll('.menu-category');

    function highlightSidebar() {
        let scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Offset for header
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightSidebar);

    // Auto-sliding Carousel (Only for Best Seller / .carousel-grid)
    // Auto-sliding Carousel (Only for Best Seller / .carousel-grid)
    const carousels = document.querySelectorAll('.carousel-grid');

    carousels.forEach(carousel => {
        let autoScrollInterval;
        let resumeTimeout;

        const getScrollAmount = () => {
            const item = carousel.querySelector('.menu-item');
            if (!item) return 300; // Fallback

            const itemWidth = item.offsetWidth;
            const style = window.getComputedStyle(carousel);
            const gap = parseFloat(style.gap) || 0;

            return itemWidth + gap;
        };

        const stopAutoScroll = () => {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
            if (resumeTimeout) {
                clearTimeout(resumeTimeout);
                resumeTimeout = null;
            }
        };

        const startAutoScroll = () => {
            // Always clear existing interval first to prevent stacking
            stopAutoScroll();

            autoScrollInterval = setInterval(() => {
                const scrollAmount = getScrollAmount();

                // Check if we've reached the end
                if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 3000); // Scroll every 3 seconds
        };

        // Start auto-scroll initially
        startAutoScroll();

        // Pause on interaction
        const pauseInteraction = () => {
            stopAutoScroll();
        };

        const resumeInteraction = () => {
            // Clear any existing resume timeout
            if (resumeTimeout) clearTimeout(resumeTimeout);

            // Set a new timeout to resume scrolling
            resumeTimeout = setTimeout(startAutoScroll, 2000);
        };

        carousel.addEventListener('mousedown', pauseInteraction);
        carousel.addEventListener('touchstart', pauseInteraction);
        carousel.addEventListener('mouseenter', pauseInteraction);

        // Resume on leave
        carousel.addEventListener('mouseleave', resumeInteraction);
        carousel.addEventListener('touchend', resumeInteraction);

        // Carousel Navigation Buttons
        const container = carousel.closest('.carousel-container');
        if (container) {
            const prevBtn = container.querySelector('.carousel-btn-left');
            const nextBtn = container.querySelector('.carousel-btn-right');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    pauseInteraction();
                    const scrollAmount = getScrollAmount();

                    if (carousel.scrollLeft <= 10) {
                        carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
                    } else {
                        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                    }

                    resumeInteraction();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    pauseInteraction();
                    const scrollAmount = getScrollAmount();

                    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
                        carousel.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }

                    resumeInteraction();
                });
            }
        }
    });

    // Click on product card to toggle price
    const menuItems = document.querySelectorAll('.standard-grid .menu-item');

    menuItems.forEach(item => {
        // Make the card clickable
        item.style.cursor = 'pointer';

        item.addEventListener('click', function (e) {
            // Find the button and price list within this card
            const button = this.querySelector('.see-more-btn');
            const priceList = this.querySelector('.price-list');

            if (button && priceList) {
                // Toggle visibility
                if (priceList.style.display === 'block') {
                    priceList.style.display = 'none';
                    button.textContent = 'Xem Giá';
                } else {
                    priceList.style.display = 'block';
                    button.textContent = 'Ẩn Giá';
                }
            }
        });
    });

    // Contact Modal Logic
    const modal = document.getElementById('contactModal');
    const contactBtns = document.querySelectorAll('.contact-btn, .footer-btn');
    const closeBtn = document.querySelector('.close-modal');

    // Open modal
    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior if applicable
            modal.style.display = 'flex';
        });
    });

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
});
