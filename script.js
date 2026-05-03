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

    // Loop della rete molto più attivo
    function pulseLoop() {
        if (!isHovered) {
            const allNeurons = document.querySelectorAll(".neuron");
            const randomNeuron = allNeurons[Math.floor(Math.random() * allNeurons.length)];
            
            randomNeuron.classList.add("pulse");
            setTimeout(() => {
                randomNeuron.classList.remove("pulse");
            }, 500);
        }
        
        // Frequenza alta: un battito ogni 300-700ms
        setTimeout(pulseLoop, 300 + Math.random() * 400);
    }

    pulseLoop();

    nodeGroups.forEach(group => {
        group.addEventListener("mouseenter", () => {
            isHovered = true;
            
            // Spegne i battiti casuali per focus
            document.querySelectorAll(".neuron").forEach(n => n.classList.remove("pulse"));
            
            const section = group.getAttribute("data-section");
            if (section && textMap[section]) {
                textBox.style.opacity = 0;
                setTimeout(() => {
                    textBox.textContent = textMap[section];
                    textBox.style.opacity = 1;
                }, 100);
            }
        });

        group.addEventListener("mouseleave", () => {
            isHovered = false;
            textBox.style.opacity = 0;
            setTimeout(() => {
                textBox.textContent = defaultText;
                textBox.style.opacity = 1;
            }, 100);
        });

        group.addEventListener("click", () => {
            const section = group.getAttribute("data-section");
            if (section) {
                console.log("Navigazione a:", section);
                // window.location.href = "sections/" + section + ".html";
            }
        });
    });
});
