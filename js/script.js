// ==========================================================================
// PORTFOLIO NATALIA - EASY PROJECT DATA & POPUP LOGIC
// ==========================================================================

// ✏️ INSTRUCTIE: Hieronder kun je heel eenvoudig projecten toevoegen of aanpassen!
// Pas de titel, omschrijving, afbeelding en tools aan.
const projectsData = {
    "1": {
        title: "PearUp",
        category: "Mediavormgeving",
        image: "img/pearup.jpg",
        description: "Dit project is samenwerkings opdracht waar wij als team een app maken voor leerlingen van t' GLR, om hun met elkaar beter te verbinden en om meer mensen te leren kennen.",
        tools: "Figma, Adobe Photoshop, Canva"
    },
    "2": {
        title: "project2",
        category: "project2",
        image: "img/domifoto.jpg",
        description: "project2",
        tools: "project2"
    },
    "3": {
        title: "project3",
        category: "project3",
        image: "img/domifoto.jpg",
        description: "project3",
        tools: "project3"
    },
    "4": {
        title: "project4",
        category: "project4",
        image: "img/domifoto.jpg",
        description: "project4",
        tools: "project4"
    }
};

// --- POPUP / MODAL LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("project-modal");
    const closeModalBtn = document.querySelector(".close-btn");
    
    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalImg = document.getElementById("modal-img");
    const modalDesc = document.getElementById("modal-desc");
    const modalTools = document.getElementById("modal-tools");

    // Dynamic rendering of cards in grid
    const grid = document.getElementById("projects-grid");
    if (grid) {
        grid.innerHTML = Object.keys(projectsData).map(id => {
            const p = projectsData[id];
            return `
                <div class="project-card" data-project="${id}">
                    <div class="card-img-wrapper">
                        <img src="${p.image}" alt="${p.title}" onerror="this.src='https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'">
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

    // Open Modal when clicking a project button
    document.querySelectorAll(".open-modal-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".project-card");
            const projectId = card.getAttribute("data-project");
            const data = projectsData[projectId];

            if (data) {
                modalTitle.textContent = data.title;
                modalCategory.textContent = data.category;
                modalImg.src = data.image;
                if (modalImg.src.includes("img/")) {
                    // Fallback to placeholder if local image doesn't exist yet
                    modalImg.onerror = () => {
                        modalImg.src = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80";
                    };
                }
                modalDesc.textContent = data.description;
                if (modalTools) modalTools.textContent = data.tools;

                modal.classList.add("show");
            }
        });
    });

    // Close Modal when clicking X
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            modal.classList.remove("show");
        });
    }

    // Close Modal when clicking outside the content box
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
});
