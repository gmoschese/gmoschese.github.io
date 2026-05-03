document.addEventListener("DOMContentLoaded", () => {
    const nodeGroups = document.querySelectorAll(".node-group");
    const textBox = document.getElementById("dynamic-text");
    const defaultText = "Designing systems where data flows, learns, and becomes decisions.";

    const textMap = {
        stack: "Data engineering stack: pipelines, cloud systems, distributed processing.",
        lab: "Experimental projects in AI and data science.",
        ai: "Building AI systems, LLM pipelines and intelligent applications.",
        opensource: "Open source projects and collaborations.",
        console: "Interactive tools and system interfaces."
    };

    let isHovered = false;

    // Pulse casuale (Rete attiva)
    function pulseLoop() {
        if (!isHovered) {
            const allNeurons = document.querySelectorAll(".neuron");
            const randomNeuron = allNeurons[Math.floor(Math.random() * allNeurons.length)];
            
            randomNeuron.classList.add("pulse");
            setTimeout(() => randomNeuron.classList.remove("pulse"), 500);
        }
        setTimeout(pulseLoop, 350 + Math.random() * 400);
    }

    pulseLoop();

    nodeGroups.forEach(group => {
        group.addEventListener("mouseenter", () => {
            isHovered = true;
            document.querySelectorAll(".neuron").forEach(n => n.classList.remove("pulse"));
            
            const section = group.getAttribute("data-section");
            if (section && textMap[section]) {
                textBox.textContent = textMap[section];
            }
        });

        group.addEventListener("mouseleave", () => {
            isHovered = false;
            textBox.textContent = defaultText;
        });

        group.addEventListener("click", () => {
            const section = group.getAttribute("data-section");
            if (section) {
                // Navigazione verso la cartella ./section/
                window.location.href = "./section/" + section + ".html";
            }
        });
    });
});
