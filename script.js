document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript geladen ✅");

    // Mobile Menü Steuerung
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            console.log("Hamburger Menü geöffnet");
            mobileMenu.classList.toggle("hidden");
            mobileMenu.classList.toggle("flex");
        });

        if (closeMenu) {
            closeMenu.addEventListener("click", () => {
                console.log("Hamburger Menü geschlossen");
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("flex");
            });
        }
    } else {
        console.error("Fehlende Elemente: Prüfe IDs für #menu-toggle und #mobile-menu");
    }
    // 3D Hover Effekt für die Karte
    const card = document.querySelector(".card-container");
    const perspective = 1000;

    if (card) {
        card.addEventListener("mousemove", (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / width;
            const y = (e.clientY - top - height / 2) / height;

            card.style.transform = `
             perspective(${perspective}px)
             rotateX(${y * 10}deg)
             rotateY(${x * -10}deg)
             translateY(-5px)
             scale(1.02)
         `;
            card.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.1)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
            card.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.05)";
        });
    }

    // Intersection Observer mit Verzögerung
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                }, 200 * parseInt(entry.target.dataset.delay || "0"));
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    });

    document.querySelectorAll('[class*="animate-fade"]').forEach((element, index) => {
        element.dataset.delay = index % 2;
        observer.observe(element);
    });
});

