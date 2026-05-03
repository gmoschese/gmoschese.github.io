document.addEventListener("DOMContentLoaded", () => {
    const nodeGroups = document.querySelectorAll(".node-group");
    const textBox = document.getElementById("dynamic-text");
    const defaultText = "Designing systems where data flows, learns, and becomes decisions.";

    const textMap = {
        stack: "Data engineering stack: pipelines and cloud systems.",
        lab: "Experimental projects in AI and research.",
        ai: "Building AI systems and LLM pipelines.",
        log: "Technical logs and incident reports.",
        opensource: "Open source community contributions.",
        about: "System Architect profile."
    };

    // FUNZIONE RANDOM
    function playRandom() {
        // Rimuove la classe da tutti
        nodeGroups.forEach(n => n.classList.remove("active"));
        // Accende uno a caso
        const rand = Math.floor(Math.random() * nodeGroups.length);
        nodeGroups[rand].classList.add("active");
    }

    let interval = setInterval(playRandom, 2000);

    nodeGroups.forEach(group => {
        group.addEventListener("mouseenter", () => {
            clearInterval(interval); // Ferma il random
            nodeGroups.forEach(n => n.classList.remove("active"));
            group.classList.add("active");
            textBox.textContent = textMap[group.getAttribute("data-section")];
        });

        group.addEventListener("mouseleave", () => {
            group.classList.remove("active");
            textBox.textContent = defaultText;
            interval = setInterval(playRandom, 2000); // Riparte
        });
    });
});
