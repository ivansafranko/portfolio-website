(function () {
    // --- Navigation & Mobile Menu ---
    const header = document.querySelector("nav");
    const menuToggle = document.querySelector("[data-menu-toggle]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a[href^='#']") : [];

    if (menuToggle && mobileMenu) {
        const closeMenu = () => {
            mobileMenu.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        };

        menuToggle.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("is-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        mobileLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    // --- Smooth Scrolling ---
    const anchorLinks = document.querySelectorAll("a[href^='#']");
    anchorLinks.forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            // Consistent offset for sticky header (h-24 = 96px, let's use 85px to be tighter)
            // We ignore header.offsetHeight to avoid issues when mobile menu is expanded
            const offset = 85;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });

    // --- Contact Form Handling (Netlify AJAX) ---
    const contactForm = document.querySelector(".contact-form");
    const successMessage = document.getElementById("form-success-message");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const submitBtn = this.querySelector("button[type='submit']");
            const originalText = submitBtn ? submitBtn.textContent : "";

            if (submitBtn) {
                submitBtn.textContent = "Sending...";
                submitBtn.disabled = true;
            }

            // Validation
            const requiredInputs = this.querySelectorAll("input[required], textarea[required]");
            let isValid = true;

            requiredInputs.forEach((input) => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add("ring-2", "ring-red-500");
                } else {
                    input.classList.remove("ring-2", "ring-red-500");
                }
            });

            if (!isValid) {
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
                return;
            }

            // Post to Netlify
            const formData = new FormData(this);
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
                .then(() => {
                    if (successMessage) {
                        contactForm.style.display = "none";
                        successMessage.style.display = "block";
                        successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                    contactForm.reset();
                })
                .catch(() => {
                    alert("Something went wrong. Please try again.");
                })
                .finally(() => {
                    if (submitBtn) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                });
        });
    }

    // --- Project Interaction: Moj OPG Gallery Lightbox ---
    // (Assuming Moj OPG still uses a lightbox if needed, though index.html version is simple)
    // Adding it back only if elements exist to keep script clean
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    if (galleryItems.length > 0 && lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightbox.style.display = 'block';
                    lightboxImg.src = img.src;
                }
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => lightbox.style.display = 'none');
        }
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.style.display = 'none';
        });
    }

    // --- Project Interaction: Wallplay/CallApp Frame Zoom ---
    const allScrollablePreviews = document.querySelectorAll('.scroll-image-container img');
    const frameModal = document.getElementById('frameModal');
    if (allScrollablePreviews.length > 0 && frameModal) {
        const frameModalImg = document.getElementById('frameModalImg');
        const frameViewport = document.getElementById('frameViewport');
        const frameClose = document.querySelector('.frame-modal-close');

        allScrollablePreviews.forEach(img => {
            img.addEventListener('click', () => {
                frameModalImg.src = img.src;
                frameModal.setAttribute('aria-hidden', 'false');
                requestAnimationFrame(() => {
                    const vw = frameViewport.clientWidth;
                    const iw = frameModalImg.naturalWidth || frameModalImg.width;
                    const scale = vw / iw;
                    frameModalImg.style.transform = `scale(${scale})`;
                    frameViewport.scrollTop = 0;
                });
            });
        });

        if (frameClose) {
            frameClose.addEventListener('click', () => frameModal.setAttribute('aria-hidden', 'true'));
        }
    }



})();