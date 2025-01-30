document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript geladen ✅");

    const menuToggle = document.getElementById("menu-toggle");
    const closeMenu = document.getElementById("close-menu");
    const mobileMenu = document.getElementById("mobile-menu");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });

    // Menü schließen, wenn man außerhalb des Menübereichs klickt
    mobileMenu.addEventListener("click", (event) => {
        if (event.target === mobileMenu) {
            mobileMenu.classList.remove("active");
        }
    });

    // Popup für PDF
    const openPopup = document.getElementById("open-popup");
    const closePopup = document.getElementById("close-popup");
    const popup = document.getElementById("pdf-popup");
    const popupContent = document.getElementById("popup-content");

    openPopup.addEventListener("click", () => {
        popup.classList.remove("hidden");
        setTimeout(() => {
            popup.classList.remove("opacity-0");
            popupContent.classList.remove("scale-95");
        }, 10); // Verzögerung für sanfte Animation
    });

    closePopup.addEventListener("click", () => {
        popup.classList.add("opacity-0");
        popupContent.classList.add("scale-95");
        setTimeout(() => {
            popup.classList.add("hidden");
        }, 300); // Nach der Animation ausblenden
    });

    // Popup schließen, wenn außerhalb geklickt wird
    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.classList.add("opacity-0");
            popupContent.classList.add("scale-95");
            setTimeout(() => {
                popup.classList.add("hidden");
            }, 300);
        }
    });

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

