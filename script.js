const nodes = [
    { x: 30, y: 50, section: "stack" },
    { x: 90, y: 50, section: "lab" },
    { x: 60, y: 120, section: "ai" },
    { x: 30, y: 260, section: "opensource" },
    { x: 90, y: 260, section: "console" }
];

const paths = [
    [0, 2, 3],
    [1, 2, 4]
];

const colors = {
    batch: "#007aff",
    streaming: "#2ecc71"
};

const textMap = {
    stack: "Data engineering stack: pipelines, cloud systems, distributed processing.",
    lab: "Experimental projects in AI, data science and system design.",
    ai: "Building AI systems, LLM applications and intelligent pipelines.",
    opensource: "Open source contributions and collaborative development.",
    console: "Interactive tools, system interfaces and technical playground."
};

window.addEventListener("load", () => {
    const dataLayer = document.querySelector(".data-layer");
    const textBox = document.getElementById("dynamic-text");
    const neurons = document.querySelectorAll(".neuron");
    const connections = document.querySelectorAll(".synapse");

    let activeNode = null;

    function createPacket() {
        const path = paths[Math.floor(Math.random() * paths.length)];

        const packet = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        packet.setAttribute("r", 3);
        packet.setAttribute("fill", colors.batch);

        dataLayer.appendChild(packet);
        move(packet, path, 0);
    }

    function move(packet, path, i) {
        if (i >= path.length - 1) {
            packet.remove();
            return;
        }

        const from = nodes[path[i]];
        const to = nodes[path[i + 1]];

        let progress = 0;

        function animate() {
            progress += 0.03;

            const x = from.x + (to.x - from.x) * progress;
            const y = from.y + (to.y - from.y) * progress;

            packet.setAttribute("cx", x);
            packet.setAttribute("cy", y);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                move(packet, path, i + 1);
            }
        }

        animate();
    }

    function loop() {
        createPacket();
        setTimeout(loop, 800);
    }

    loop();

    neurons.forEach((node) => {
        node.addEventListener("mouseenter", () => {
            const section = node.dataset.section;

            // reset nodi
            neurons.forEach(n => n.classList.remove("active"));
            node.classList.add("active");
            activeNode = node;

            // testo dinamico
            textBox.textContent = textMap[section];

            // attiva connessioni
            connections.forEach(c => c.classList.add("active"));

            // burst dati
            for (let i = 0; i < 2; i++) {
                setTimeout(() => createPacket(), i * 150);
            }
        });

        node.addEventListener("click", () => {
            console.log("Navigate to:", node.dataset.section);
        });
    });
});
