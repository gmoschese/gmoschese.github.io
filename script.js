document.addEventListener("DOMContentLoaded", () => {
    const nodeGroups = document.querySelectorAll(".node-group");
    const textBox = document.getElementById("dynamic-text");
    const defaultText = "Designing systems where data flows, learns, and becomes decisions.";

    const textMap = {
        stack: "Data engineering stack: pipelines, cloud systems.",
        lab: "Experimental projects in AI.",
        ai: "Building AI systems and LLM pipelines.",
        log: "Technical thoughts and reports.",
        opensource: "Open source projects.",
        about: "System architect profile."
    };

    nodeGroups.forEach(group => {
        group.addEventListener("mouseenter", () => {
            const section = group.getAttribute("data-section");
            textBox.textContent = textMap[section];
            group.classList.add("active");
        });
        group.addEventListener("mouseleave", () => {
            textBox.textContent = defaultText;
            group.classList.remove("active");
        });
    });
});
