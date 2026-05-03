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
        group.addEventListener("mouseenter", () => {
            const section = group.getAttribute("data-section");
            // Aggiunge un piccolo effetto fade al cambio testo
            textBox.style.opacity = 0.7;
            setTimeout(() => {
                textBox.textContent = textMap[section];
                textBox.style.opacity = 1;
            }, 50);
        });

        group.addEventListener("mouseleave", () => {
            textBox.textContent = defaultText;
        });

        group.addEventListener("click", () => {
            // Reindirizza alla cartella section/
            window.location.href = `./section/${group.getAttribute("data-section")}.html`;
        });
    });
});
