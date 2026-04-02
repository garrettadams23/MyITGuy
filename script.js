document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector('.navbar');
    const scrollUpBtn = document.querySelector('.scroll-up-btn');
    const html = document.documentElement;
    const menu = document.querySelector('.navbar .menu');
    const menuBtn = document.querySelector('.menu-btn');
    const menuBtnIcon = document.querySelector('.menu-btn i');

    // Sticky navbar and scroll-up button script
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }

        if (window.scrollY > 500) {
            scrollUpBtn.classList.add("show");
        } else {
            scrollUpBtn.classList.remove("show");
        }
    });

    // Slide-up script
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Toggle menu/navbar script
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle("active");
            menuBtnIcon.classList.toggle("active");
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.navbar .menu li a').forEach(link => {
        link.addEventListener('click', () => {
            html.style.scrollBehavior = "smooth";
            if (menu.classList.contains("active")) {
                menu.classList.remove("active");
                menuBtnIcon.classList.remove("active");
            }
        });
    });

    // Typing text animation script
    if (document.querySelector(".typing")) {
        new Typed(".typing", {
            strings: ["Tier 2 Imaging Technician Lead", "IT Expert", "Tier 2 Help Desk", "IT Administrator", "Freelancer", "Information System Engineer", "Inventory Management Specialist", "AI Prompt Engineer", "Junior Full Stack Developer", "Software Engineer"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    if (document.querySelector(".typing-2")) {
        new Typed(".typing-2", {
            strings: ["Tier 2 Imaging Technician", "IT Expert", "Tier 2 Help Desk", "IT Administrator", "Freelancer"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // Swiper Carousel script
    if (document.querySelector(".mySwiper")) {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                600: {
                    slidesPerView: 2,
                },
                1000: {
                    slidesPerView: 3,
                },
            },
        });
    }

    // Business Card Flip Logic
    const flipCard = document.getElementById('flip-card');
    if (flipCard) {
        flipCard.addEventListener('click', () => {
            flipCard.classList.toggle('flipped');
        });
    }

    // QR Code Generation
    const qrContainer = document.getElementById("qrcode");
    if (qrContainer) {
        new QRCode(qrContainer, {
            text: window.location.href,
            width: 130,
            height: 130,
            colorDark: "#0d1f3c",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    // Dark Mode Toggle
    const themeBtn = document.querySelector('.theme-btn');
    const themeIcon = document.querySelector('.theme-btn i');
    const body = document.body;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            
            // Toggle icon
            if (isDark) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
