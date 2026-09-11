/* =========================================================
   BANDENAWAZ KORABU — PROFILE WEBSITE
   COMPLETE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HELPER FUNCTIONS
       ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];


    /* =====================================================
       LOADER
       ===================================================== */

    const loader = $("#loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add("hidden");
            }
        }, 700);
    });


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle = $(".menu-toggle");
    const nav = $("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            nav.classList.toggle("open");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                if (nav.classList.contains("open")) {
                    icon.className = "fas fa-xmark";
                } else {
                    icon.className = "fas fa-bars";
                }
            }

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICK
       ===================================================== */

    $$(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            if (nav) {
                nav.classList.remove("open");
            }

            const icon = menuToggle?.querySelector("i");

            if (icon) {
                icon.className = "fas fa-bars";
            }

        });

    });


    /* =====================================================
       TYPING EFFECT
       ===================================================== */

    const typingText = $("#typingText");

    const words = [
        "Computer Science Student",
        "Web Developer",
        "Software Developer",
        "AI Enthusiast",
        "Problem Solver",
        "Tech Explorer",
        "Future Software Engineer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typingEffect() {

        if (!typingText) return;

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingText.textContent =
                currentWord.substring(0, charIndex);

            charIndex++;

            if (charIndex > currentWord.length) {

                deleting = true;

                setTimeout(typingEffect, 1400);

                return;
            }

        } else {

            typingText.textContent =
                currentWord.substring(0, charIndex);

            charIndex--;

            if (charIndex < 0) {

                charIndex = 0;
                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }

            }

        }

        setTimeout(
            typingEffect,
            deleting ? 45 : 80
        );
    }

    setTimeout(typingEffect, 1000);


    /* =====================================================
       NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar = $(".navbar");

    function navbarScroll() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        navbarScroll,
        { passive: true }
    );

    navbarScroll();


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = $$("section[id]");
    const navLinks = $$(".nav-link");

    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            navLinks.forEach(link => {

                                const href =
                                    link.getAttribute("href");

                                link.classList.toggle(
                                    "active",
                                    href === `#${entry.target.id}`
                                );

                            });

                        }

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = $$(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       PROFILE CARD 3D EFFECT
       ===================================================== */

    const profileCard = $(".profile-card");

    if (
        profileCard &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        profileCard.addEventListener(
            "mousemove",
            event => {

                const rect =
                    profileCard.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) * 12;

                const rotateX =
                    ((y / rect.height) - 0.5) * -12;

                profileCard.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );

        profileCard.addEventListener(
            "mouseleave",
            () => {

                profileCard.style.transform = "";

            }
        );

    }


    /* =====================================================
       BACK TO TOP BUTTON
       ===================================================== */

    const backToTop = $("#backToTop");

    function backToTopVisibility() {

        if (!backToTop) return;

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    window.addEventListener(
        "scroll",
        backToTopVisibility,
        { passive: true }
    );

    backToTopVisibility();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       DYNAMIC YEAR
       ===================================================== */

    const currentYear = $("#currentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       PROJECT CARD INTERACTION
       ===================================================== */

    const projectCards = $$(".project-card");

    projectCards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {
                card.style.zIndex = "5";
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.style.zIndex = "";
            }
        );

    });


    /* =====================================================
       SKILL CARD ANIMATION
       ===================================================== */

    const skillCards = $$(".skill-card");

    skillCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 60}ms`;

    });


    /* =====================================================
       STAT NUMBER ANIMATION
       ===================================================== */

    const statCards = $$(".stat-card");

    function animateStats() {

        statCards.forEach(card => {

            const number =
                card.querySelector(".stat-number");

            if (!number) return;

            const target =
                parseInt(
                    number.textContent.replace(/\D/g, ""),
                    10
                );

            if (!target || number.dataset.animated) {
                return;
            }

            number.dataset.animated = "true";

            let current = 0;

            const duration = 900;
            const steps = 30;
            const increment =
                target / steps;

            const timer =
                setInterval(() => {

                    current += increment;

                    if (current >= target) {

                        current = target;

                        clearInterval(timer);

                    }

                    number.textContent =
                        Math.floor(current);

                }, duration / steps);

        });

    }


    if ("IntersectionObserver" in window) {

        const statsObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            animateStats();

                            statsObserver.disconnect();

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );

        const aboutSection =
            $("#about");

        if (aboutSection) {
            statsObserver.observe(
                aboutSection
            );
        }

    }


    /* =====================================================
       EMAIL PROTECTION
       ===================================================== */

    $$("[data-email]").forEach(element => {

        const email =
            element.dataset.email;

        if (!email) return;

        element.textContent = email;

        if (element.tagName === "A") {
            element.href =
                `mailto:${email}`;
        }

    });


    /* =====================================================
       CURRENT STATUS
       ===================================================== */

    const statusElements =
        $$(".status-online");

    statusElements.forEach(element => {

        element.setAttribute(
            "title",
            "Currently available"
        );

    });


    /* =====================================================
       KEYBOARD ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                nav?.classList.remove("open");

                const icon =
                    menuToggle?.querySelector("i");

                if (icon) {
                    icon.className =
                        "fas fa-bars";
                }

            }

        }
    );


    /* =====================================================
       DISABLE 3D EFFECT ON MOBILE
       ===================================================== */

    function checkMobile() {

        if (!profileCard) return;

        if (window.innerWidth <= 700) {

            profileCard.style.transform = "";

        }

    }

    window.addEventListener(
        "resize",
        checkMobile
    );

    checkMobile();


    /* =====================================================
       PERFORMANCE — PASSIVE TOUCH
       ===================================================== */

    document.addEventListener(
        "touchstart",
        () => {},
        { passive: true }
    );


    /* =====================================================
       CONSOLE BRANDING
       ===================================================== */

    console.log(
        "%c BANDENAWAZ KORABU ",
        "background:#6366f1;color:white;font-size:18px;font-weight:bold;padding:8px 14px;border-radius:8px;"
    );

    console.log(
        "%c Personal Profile Website Loaded Successfully 🚀 ",
        "color:#22d3ee;font-size:14px;font-weight:bold;"
    );

});