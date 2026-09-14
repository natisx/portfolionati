// ==========================================================================
// PORTFOLIO NATALIA - PROJECT DATA, MEDIA SLIDER & POPUP LOGIC
// ==========================================================================

// ✏️ INSTRUCTIE: Gebruik 'media: [...]' om meerdere foto's of video's toe te voegen per project.
// Ondersteunt afb. (.jpg/.png), video's (.mp4) en YouTube/Vimeo embed links.
const projectsData = {
    "1": {
        title: "PearUp",
        category: "Mediavormgeving",
        media: [
            "img/pearup.jpg",
            "img/demo-video.mp4", 
            "https://www.youtube.com/embed/dQw4w9WgXcQ"
        ],
        description: "Dit project is samenwerkings opdracht waar wij als team een app maken voor leerlingen van t' GLR, om hun met elkaar beter te verbinden en om meer mensen te leren kennen.",
        tools: "Figma, Adobe Photoshop, Canva"
    },
    "2": {
        title: "van 2d naar 3d",
        category: "ruimtelijk vormgeving",
        media: [
            "img/procesboek.jpg"
            "img/introductie.jpg"
            "img/begin.jpg"
            "img/uitwerking.jpg"
            "img/verven1.jpg"
            "img/verven2.jpg"
            "img/eindproduct.jpg"
        ],
        description: "dit is een procesboek van een project waar ik een patroon kreeg toegewezen en moest daarvan iets nieuws creeeren en naar 3d omzetten",
        tools: "procreate"
    },
    "3": {
        title: "project3",
        category: "project3",
        media: [
            "img/domifoto.jpg"
        ],
        description: "project3",
        tools: "project3"
    },
    "4": {
        title: "project4",
        category: "project4",
        media: [
            "img/domifoto.jpg"
        ],
        description: "project4",
        tools: "project4"
    }
};

// Foto's voor de "Over Mij" Pop-up
const aboutPhotos = [
    "img/natalia.jpg",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
];

let currentMedia = [];
let currentMediaIndex = 0;
let currentAboutIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    // Project Modal Elementen
    const projectModal = document.getElementById("project-modal");
    const closeProjectBtn = projectModal ? projectModal.querySelector(".close-btn") : null;
    
    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalMediaContainer = document.getElementById("modal-media-container");
    const modalDesc = document.getElementById("modal-desc");
    const modalTools = document.getElementById("modal-tools");
    
    const prevBtn = document.getElementById("slider-prev");
    const nextBtn = document.getElementById("slider-next");
    const sliderCounter = document.getElementById("slider-counter");

    // About Modal Elementen
    const aboutModal = document.getElementById("about-modal");
    const profileTrigger = document.getElementById("profile-trigger");
    const closeAboutBtn = document.getElementById("close-about-modal");
    const aboutImg = document.getElementById("about-modal-img");
    const aboutPrevBtn = document.getElementById("about-prev");
    const aboutNextBtn = document.getElementById("about-next");
    const aboutCounter = document.getElementById("about-slider-counter");

    // Dynamic rendering of cards in grid
    const grid = document.getElementById("projects-grid");
    if (grid) {
        grid.innerHTML = Object.keys(projectsData).map(id => {
            const p = projectsData[id];
            const coverItem = (p.media && p.media.length > 0) ? p.media[0] : '';
            return `
                <div class="project-card" data-project="${id}">
                    <div class="card-img-wrapper">
                        <img src="${coverItem}" alt="${p.title}" onerror="this.src='https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'">
                    </div>
                    <div class="card-content">
                        <div class="card-tag">${p.category}</div>
                        <h3 class="card-title">${p.title}</h3>
                        <p class="card-desc">${p.description}</p>
                        <button class="open-modal-btn">Bekijk Project</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Media Renderen (Foto's, Video's of Embeds)
    function renderMedia() {
        if (!modalMediaContainer) return;
        modalMediaContainer.innerHTML = "";
        const src = currentMedia[currentMediaIndex];
        if (!src) return;

        if (src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov")) {
            const video = document.createElement("video");
            video.src = src;
            video.controls = true;
            modalMediaContainer.appendChild(video);
        } else if (src.includes("youtube.com") || src.includes("vimeo.com")) {
            const iframe = document.createElement("iframe");
            iframe.src = src;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            modalMediaContainer.appendChild(iframe);
        } else {
            const img = document.createElement("img");
            img.src = src;
            img.alt = "Project Media";
            img.onerror = () => {
                img.src = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80";
            };
            modalMediaContainer.appendChild(img);
        }

        if (currentMedia.length > 1) {
            if (prevBtn) prevBtn.classList.remove("hidden");
            if (nextBtn) nextBtn.classList.remove("hidden");
            if (sliderCounter) {
                sliderCounter.classList.remove("hidden");
                sliderCounter.textContent = `${currentMediaIndex + 1} / ${currentMedia.length}`;
            }
        } else {
            if (prevBtn) prevBtn.classList.add("hidden");
            if (nextBtn) nextBtn.classList.add("hidden");
            if (sliderCounter) sliderCounter.classList.add("hidden");
        }
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove("show");
        if (modalMediaContainer) modalMediaContainer.innerHTML = "";
    }

    // Open Project Modal
    document.querySelectorAll(".open-modal-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".project-card");
            const projectId = card.getAttribute("data-project");
            const data = projectsData[projectId];

            if (data) {
                if (modalTitle) modalTitle.textContent = data.title;
                if (modalCategory) modalCategory.textContent = data.category;
                if (modalDesc) modalDesc.textContent = data.description;
                if (modalTools) modalTools.textContent = data.tools;

                currentMedia = data.media && data.media.length > 0 ? data.media : ["img/domifoto.jpg"];
                currentMediaIndex = 0;
                renderMedia();

                if (projectModal) projectModal.classList.add("show");
            }
        });
    });

    // Slider Navigatie Projects
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            currentMediaIndex = (currentMediaIndex - 1 + currentMedia.length) % currentMedia.length;
            renderMedia();
        });

        nextBtn.addEventListener("click", () => {
            currentMediaIndex = (currentMediaIndex + 1) % currentMedia.length;
            renderMedia();
        });
    }

    // Over Mij Modal Logica
    function renderAboutPhoto() {
        if (aboutImg) {
            aboutImg.src = aboutPhotos[currentAboutIndex];
        }
        if (aboutCounter) {
            aboutCounter.textContent = `${currentAboutIndex + 1} / ${aboutPhotos.length}`;
        }
    }

    if (profileTrigger) {
        profileTrigger.addEventListener("click", () => {
            currentAboutIndex = 0;
            renderAboutPhoto();
            if (aboutModal) aboutModal.classList.add("show");
        });
    }

    if (aboutPrevBtn && aboutNextBtn) {
        aboutPrevBtn.addEventListener("click", () => {
            currentAboutIndex = (currentAboutIndex - 1 + aboutPhotos.length) % aboutPhotos.length;
            renderAboutPhoto();
        });

        aboutNextBtn.addEventListener("click", () => {
            currentAboutIndex = (currentAboutIndex + 1) % aboutPhotos.length;
            renderAboutPhoto();
        });
    }

    if (closeAboutBtn) {
        closeAboutBtn.addEventListener("click", () => {
            if (aboutModal) aboutModal.classList.remove("show");
        });
    }

    // Sluiten via achtergrond
    if (closeProjectBtn) closeProjectBtn.addEventListener("click", closeProjectModal);

    window.addEventListener("click", (e) => {
        if (e.target === projectModal) closeProjectModal();
        if (e.target === aboutModal && aboutModal) aboutModal.classList.remove("show");
    });

    // Toetsenbord Navigatie (ArrowLeft & ArrowRight)
    document.addEventListener("keydown", (e) => {
        if (projectModal && projectModal.classList.contains("show") && currentMedia.length > 1) {
            if (e.key === "ArrowLeft") {
                currentMediaIndex = (currentMediaIndex - 1 + currentMedia.length) % currentMedia.length;
                renderMedia();
            } else if (e.key === "ArrowRight") {
                currentMediaIndex = (currentMediaIndex + 1) % currentMedia.length;
                renderMedia();
            }
        } else if (aboutModal && aboutModal.classList.contains("show") && aboutPhotos.length > 1) {
            if (e.key === "ArrowLeft") {
                currentAboutIndex = (currentAboutIndex - 1 + aboutPhotos.length) % aboutPhotos.length;
                renderAboutPhoto();
            } else if (e.key === "ArrowRight") {
                currentAboutIndex = (currentAboutIndex + 1) % aboutPhotos.length;
                renderAboutPhoto();
            }
        }
    });
});
