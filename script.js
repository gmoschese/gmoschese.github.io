document.addEventListener("DOMContentLoaded", () => {
    const nodeGroups = document.querySelectorAll(".node-group");
    const textBox = document.getElementById("dynamic-text");
    const defaultText = "Designing systems where data flows, learns, and becomes decisions.";

    const textMap = {
        stack: "Data engineering stack: pipelines and cloud architectures.",
        lab: "Experimental projects in AI and data science.",
        ai: "Building AI systems and LLM pipelines.",
        log: "Technical logs and incident reports.",
        opensource: "Open source collaborations.",
        about: "System architect profile."
    };

    let autoTimer;

    function startRandomCycle() {
        autoTimer = setInterval(() => {
            // Rimuovi active da tutti
            nodeGroups.forEach(n => n.classList.remove("active"));
            
            // Scegli uno a caso
            const randomNode = nodeGroups[Math.floor(Math.random() * nodeGroups.length)];
            randomNode.classList.add("active");
            
            // Opzionale: cambia il testo mentre gira da solo
            // textBox.textContent = textMap[randomNode.getAttribute('data-section')];
        }, 2000); // Ogni 2 secondi si accende un punto diverso
    }

    nodeGroups.forEach(group => {
        group.addEventListener("mouseenter", () => {
            clearInterval(autoTimer); // Ferma il giro se l'utente entra col mouse
            nodeGroups.forEach(n => n.classList.remove("active"));
            
            const section = group.getAttribute("data-section");
            textBox.textContent = textMap[section];
            group.classList.add("active");
        });

        group.addEventListener("mouseleave", () => {
            group.classList.remove("active");
            textBox.textContent = defaultText;
            startRandomCycle(); // Riparti quando l'utente esce
        });
    });

    startRandomCycle(); // Avvio immediato
});
