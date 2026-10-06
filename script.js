/* ==========================================
   VCA INTERNATIONAL
   INTERACTIONS
========================================== */


/* ==========================================
   CUSTOM CURSOR
========================================== */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

});

function animateCursor() {

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* ==========================================
   CURSOR HOVER
========================================== */

const interactiveElements = document.querySelectorAll(
    "a, button, .project, .service-item, .discipline"
);

interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        cursorRing.style.width = "60px";
        cursorRing.style.height = "60px";
        cursorRing.style.background = "rgba(124,255,203,.08)";

    });

    element.addEventListener("mouseleave", () => {

        cursorRing.style.width = "35px";
        cursorRing.style.height = "35px";
        cursorRing.style.background = "transparent";

    });

});


/* ==========================================
   MOBILE MENU
========================================== */

const menuButton = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

});


document.querySelectorAll(".mobile-menu a").forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

    });

});


/* ==========================================
   HERO MOUSE MOVEMENT
========================================== */

const hero = document.querySelector(".hero");
const heroWords = document.querySelectorAll(".hero h1 span");

hero.addEventListener("mousemove", (e) => {

    const rect = hero.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    heroWords.forEach((word, index) => {

        const amount = (index + 1) * 8;

        word.style.transform = `
            translate(
                ${x * amount}px,
                ${y * amount}px
            )
        `;

    });

});


hero.addEventListener("mouseleave", () => {

    heroWords.forEach((word) => {

        word.style.transform = "translate(0, 0)";

    });

});


/* ==========================================
   CREATIVE SYSTEM
========================================== */

const switches = document.querySelectorAll(".switch");
const disciplines = document.querySelectorAll(".discipline");

switches.forEach((button) => {

    button.addEventListener("click", () => {

        const target = button.dataset.target;

        switches.forEach((item) => {
            item.classList.remove("active");
        });

        disciplines.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const selected = document.querySelector(
            `.discipline-${target}`
        );

        if (selected) {
            selected.classList.add("active");
        }

    });

});


/* ==========================================
   AUTO ROTATE CREATIVE SYSTEM
========================================== */

let currentDiscipline = 0;

const disciplineNames = [
    "build",
    "create",
    "grow"
];

let autoRotate = setInterval(() => {

    currentDiscipline++;

    if (currentDiscipline >= disciplineNames.length) {
        currentDiscipline = 0;
    }

    const target = disciplineNames[currentDiscipline];

    const button = document.querySelector(
        `.switch[data-target="${target}"]`
    );

    if (button) {
        button.click();
    }

}, 7000);


/* Stop automatic rotation when user interacts */

switches.forEach((button, index) => {

    button.addEventListener("click", () => {

        currentDiscipline = index;

        clearInterval(autoRotate);

        autoRotate = setInterval(() => {

            currentDiscipline++;

            if (currentDiscipline >= disciplineNames.length) {
                currentDiscipline = 0;
            }

            const target = disciplineNames[currentDiscipline];

            const autoButton = document.querySelector(
                `.switch[data-target="${target}"]`
            );

            if (autoButton) {
                autoButton.click();
            }

        }, 7000);

    });

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(
    ".service-section, .project, .process-item, .about-grid, .manifesto h2"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ==========================================
   SERVICE ITEM MAGNETIC EFFECT
========================================== */

const serviceItems = document.querySelectorAll(".service-item");

serviceItems.forEach((item) => {

    item.addEventListener("mousemove", (e) => {

        const rect = item.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        item.style.transform = `
            translate(${x * 0.03}px, ${y * 0.08}px)
        `;

    });

    item.addEventListener("mouseleave", () => {

        item.style.transform = "translate(0, 0)";

    });

});


/* ==========================================
   PROJECT PARALLAX
========================================== */

const projects = document.querySelectorAll(".project");

projects.forEach((project) => {

    project.addEventListener("mousemove", (e) => {

        const visual = project.querySelector(".project-visual");

        if (!visual) return;

        const rect = project.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        visual.style.transform = `
            scale(1.02)
            translate(${x * 8}px, ${y * 8}px)
        `;

    });

    project.addEventListener("mouseleave", () => {

        const visual = project.querySelector(".project-visual");

        if (!visual) return;

        visual.style.transform =
            "scale(1) translate(0, 0)";

    });

});


/* ==========================================
   MANIFESTO MOVEMENT
========================================== */

const manifesto = document.querySelector(".manifesto");
const orbit = document.querySelector(".manifesto-orbit");

manifesto.addEventListener("mousemove", (e) => {

    const rect = manifesto.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    orbit.style.transform = `
        translate(${x * 20}px, ${y * 20}px)
    `;

});


/* ==========================================
   ABOUT PARALLAX
========================================== */

const about = document.querySelector(".about");
const aboutWords = document.querySelector(".about-big");

about.addEventListener("mousemove", (e) => {

    const rect = about.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    aboutWords.style.transform = `
        translate(${x * 10}px, ${y * 10}px)
    `;

});


/* ==========================================
   SCROLL PROGRESS
========================================== */

const progressBar = document.createElement("div");

progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "2px";
progressBar.style.width = "0%";
progressBar.style.background = "#7cffcb";
progressBar.style.zIndex = "99999";
progressBar.style.pointerEvents = "none";

document.body.appendChild(progressBar);


window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    progressBar.style.width = `${progress}%`;

});


/* ==========================================
   DYNAMIC YEAR
========================================== */

const currentYear = new Date().getFullYear();

document.querySelectorAll(".footer-right").forEach((element) => {

    element.innerHTML =
        `© ${currentYear} VCA INTERNATIONAL
        <br>
        ALL RIGHTS RESERVED.`;

});


/* ==========================================
   SMOOTH ANCHOR OFFSET
========================================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        const offset = 70;

        const position =
            target.getBoundingClientRect().top +
            window.scrollY -
            offset;

        window.scrollTo({
            top: position,
            behavior: "smooth"
        });

    });

});


/* ==========================================
   CONSOLE
========================================== */

console.log(
    "%cVCA INTERNATIONAL",
    "font-size:20px;font-weight:bold;color:#7cffcb;"
);

console.log(
    "%cBUILD • CREATE • GROW",
    "font-size:12px;color:#9a6bff;"
);