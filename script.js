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

    let isHovered = false;

    function pulseLoop() {
        if (!isHovered) {
            const allNeurons = document.querySelectorAll(".neuron");
            const randomNeuron = allNeurons[Math.floor(Math.random() * allNeurons.length)];
            randomNeuron.classList.add("pulse");
            setTimeout(() => randomNeuron.classList.remove("pulse"), 450);
        }
        setTimeout(pulseLoop, 300 + Math.random() * 500);
    }
    pulseLoop();

    nodeGroups.forEach(group => {
        group.addEventListener("mouseenter", () => {
            isHovered = true;
            const section = group.getAttribute("data-section");
            if (section) textBox.textContent = textMap[section];
        });
        group.addEventListener("mouseleave", () => {
            isHovered = false;
            textBox.textContent = defaultText;
        });
        group.addEventListener("click", () => {
            const section = group.getAttribute("data-section");
            if (section) window.location.href = "./section/" + section + ".html";
        });
    });
});
