document.addEventListener("DOMContentLoaded", () => {
    const nodeGroups = document.querySelectorAll(".node-group");
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

    nodeGroups.forEach(group => {
        // Al passaggio del mouse
        group.addEventListener("mouseenter", () => {
            const section = group.getAttribute("data-section");
            
            // 1. Aggiorna il testo
            textBox.style.opacity = "0";
            setTimeout(() => {
                textBox.textContent = textMap[section];
                textBox.style.opacity = "1";
            }, 50);

            // 2. Accendi il nodo aggiungendo la classe active
            group.classList.add("active");
        });

        // Quando il mouse esce
        group.addEventListener("mouseleave", () => {
            textBox.textContent = defaultText;
            // Spegni il nodo
            group.classList.remove("active");
        });

        // Al click
        group.addEventListener("click", () => {
            window.location.href = `./section/${group.getAttribute("data-section")}.html`;
        });
    });
});
