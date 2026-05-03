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

    let autoCycle;

    function startAutoCycle() {
        autoCycle = setInterval(() => {
            nodeGroups.forEach(n => n.classList.remove("active"));
            const randomIndex = Math.floor(Math.random() * nodeGroups.length);
            nodeGroups[randomIndex].classList.add("active");
        }, 2000);
    }

    nodeGroups.forEach(group => {
        group.addEventListener("mouseenter", () => {
            clearInterval(autoCycle); // Ferma il random
            nodeGroups.forEach(n => n.classList.remove("active"));
            group.classList.add("active");
            textBox.textContent = textMap[group.dataset.section];
        });

        group.addEventListener("mouseleave", () => {
            group.classList.remove("active");
            textBox.textContent = defaultText;
            startAutoCycle(); // Riparte il random
        });

        group.addEventListener("click", () => {
            window.location.href = `./section/${group.dataset.section}.html`;
        });
    });

    startAutoCycle();
});
