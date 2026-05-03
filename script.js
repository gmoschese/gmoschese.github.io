document.addEventListener("DOMContentLoaded", () => {
    const nodeGroups = document.querySelectorAll(".node-group");
    const textBox = document.getElementById("dynamic-text");
    const defaultText = "Designing systems where data flows, learns, and becomes decisions.";

    const textMap = {
        stack: "Data engineering stack: pipelines and cloud systems.",
        lab: "Experimental projects in AI and research.",
        ai: "Building intelligent agents and LLM workflows.",
        log: "Technical logs and incident reports.",
        opensource: "Community projects and open tools.",
        about: "System Architect & Data Engineer profile."
    };

    let currentIndex = -1;
    let autoCycle = setInterval(rotateNodes, 3000);

    function rotateNodes() {
        currentIndex = (currentIndex + 1) % nodeGroups.length;
        activateNode(nodeGroups[currentIndex]);
    }

    function activateNode(group) {
        // Spegne tutti i nodi
        nodeGroups.forEach(n => n.classList.remove("active"));
        // Accende quello attuale
        group.classList.add("active");
        // Cambia testo
        const section = group.getAttribute("data-section");
        textBox.textContent = textMap[section];
    }

    nodeGroups.forEach((group, index) => {
        group.addEventListener("mouseenter", () => {
            clearInterval(autoCycle); // Ferma l'animazione se l'utente usa il mouse
            activateNode(group);
        });

        group.addEventListener("mouseleave", () => {
            group.classList.remove("active");
            textBox.textContent = defaultText;
            autoCycle = setInterval(rotateNodes, 3000); // Fa ripartire l'animazione
        });
    });
});
