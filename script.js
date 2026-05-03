document.addEventListener("DOMContentLoaded", () => {
    const nodeGroups = Array.from(document.querySelectorAll(".node-group"));
    const textBox = document.getElementById("dynamic-text");
    const defaultText = "Designing systems where data flows, learns, and becomes decisions.";
    
    const textMap = {
        stack: "Data engineering stack: pipelines, cloud systems, distributed processing.",
        lab: "Experimental projects in AI and data science.",
        ai: "Building AI systems, LLM pipelines and intelligent applications.",
        log: "System logs: technical thoughts, updates, and incident reports.",
        opensource: "Open source projects and collaborations.",
        about: "Execute whoami.sh to view system architect profile."
    };

    let autoCycle;

    // Funzione per accendere un nodo a caso
    function startRandomHighlight() {
        autoCycle = setInterval(() => {
            // Spegni tutti
            nodeGroups.forEach(n => n.classList.remove("active"));
            
            // Scegli uno a caso
            const randomIndex = Math.floor(Math.random() * nodeGroups.length);
            const targetNode = nodeGroups[randomIndex];
            
            // Accendi
            targetNode.classList.add("active");
            
            // Opzionale: cambia il testo anche durante il giro random
            // textBox.textContent = textMap[targetNode.getAttribute("data-section")];
        }, 2000); // Cambia ogni 2 secondi
    }

    nodeGroups.forEach(group => {
        group.addEventListener("mouseenter", () => {
            clearInterval(autoCycle); // Ferma il random quando l'utente interagisce
            nodeGroups.forEach(n => n.classList.remove("active"));
            
            const section = group.getAttribute("data-section");
            textBox.textContent = textMap[section];
            group.classList.add("active");
        });

        group.addEventListener("mouseleave", () => {
            group.classList.remove("active");
            textBox.textContent = defaultText;
            startRandomHighlight(); // Fai ripartire il random
        });
    });

    // Avvia il ciclo al caricamento
    startRandomHighlight();
});
