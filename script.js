const textMap = {
    stack: "Data engineering stack: pipelines, cloud systems, distributed processing.",
    lab: "Experimental projects in AI, data science and system design.",
    ai: "Building AI systems, LLM applications and intelligent pipelines.",
    opensource: "Open source contributions and collaborative development.",
    console: "Interactive tools and system interfaces."
};

const nodes = [
    { x: 30, y: 50 },
    { x: 90, y: 50 },
    { x: 60, y: 120 },
    { x: 30, y: 260 },
    { x: 90, y: 260 }
];

const paths = [
    [0, 2, 3],
    [1, 2, 4]
];

window.addEventListener("load", () => {
    const neurons = document.querySelectorAll(".neuron");
    const textBox = document.getElementById("dynamic-text");
    const dataLayer = document.querySelector(".data-layer");
    const connections = document.querySelectorAll(".synapse");

    function createPacket() {
        const path = paths[Math.floor(Math.random() * paths.length)];

        const packet = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        packet.setAttribute("r", 3);
        packet.setAttribute("fill", "#007aff");

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

    neurons.forEach(node => {
        node.addEventListener("mouseenter", () => {
            const section = node.dataset.section;

            neurons.forEach(n => n.classList.remove("active"));
            node.classList.add("active");

            textBox.textContent = textMap[section];

            connections.forEach(c => c.classList.add("active"));

            createPacket();
            createPacket();
        });

        node.addEventListener("click", () => {
            window.location.href = `sections/${node.dataset.section}.html`;
        });
    });
});
