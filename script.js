document.addEventListener("DOMContentLoaded", () => {
    const neurons = document.querySelectorAll(".neuron");
    const textBox = document.getElementById("dynamic-text");

    const textMap = {
        stack: "Data engineering stack: pipelines, cloud systems, distributed processing.",
        lab: "Experimental projects in AI and data science.",
        ai: "Building AI systems, LLM pipelines and intelligent applications.",
        opensource: "Open source projects and collaborations.",
        console: "Interactive tools and system interfaces."
    };

    let hovered = false;

    function pulseLoop() {
        if (!hovered) {
            const node = neurons[Math.floor(Math.random() * neurons.length)];
            node.classList.add("pulse");

            setTimeout(() => {
                node.classList.remove("pulse");
            }, 500);
        }

        setTimeout(pulseLoop, 400 + Math.random() * 600);
    }

    pulseLoop();

    neurons.forEach(node => {

        node.addEventListener("mouseenter", () => {
            hovered = true;

            neurons.forEach(n => {
                n.classList.remove("pulse");
                n.classList.remove("active");
            });

            node.classList.add("active");

            const section = node.dataset.section;
            if (section && textMap[section]) {
                textBox.textContent = textMap[section];
            }
        });

        node.addEventListener("mouseleave", () => {
            hovered = false;
            node.classList.remove("active");
        });

        node.addEventListener("click", () => {
            const section = node.dataset.section;
            if (section) {
                window.location.href = "sections/" + section + ".html";
            }
        });

    });
});
