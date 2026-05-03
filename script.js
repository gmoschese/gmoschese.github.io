const nodes = [
    { x: 30, y: 50, label: "Sources" },
    { x: 90, y: 50, label: "Sources" },
    { x: 60, y: 120, label: "Ingestion" },
    { x: 60, y: 190, label: "Transform" },
    { x: 30, y: 260, label: "Output" },
    { x: 90, y: 260, label: "Output" }
];

const paths = [
    [0, 2, 3, 4],
    [1, 2, 3, 5]
];

const colors = {
    batch: "#007aff",
    streaming: "#2ecc71",
    error: "#ff3b30"
};

const textMap = {
    "Sources": "Collecting data from multiple systems.",
    "Ingestion": "Ingesting and validating incoming data.",
    "Transform": "Transforming and enriching datasets.",
    "Output": "Delivering data to analytical systems."
};

window.addEventListener("load", () => {
    const dataLayer = document.querySelector(".data-layer");
    const textBox = document.getElementById("dynamic-text");

    function createPacket(type = "batch") {
        const path = paths[Math.floor(Math.random() * paths.length)];

        const packet = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        packet.setAttribute("r", 3);
        packet.setAttribute("fill", colors[type]);

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
            progress += 0.02;

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
        const types = ["batch", "streaming", "error"];
        createPacket(types[Math.floor(Math.random() * 3)]);
        setTimeout(loop, 500);
    }

    loop();

    // Hover interaction
    document.querySelectorAll(".neuron").forEach((el, index) => {
        el.addEventListener("mouseenter", () => {
            const label = nodes[index].label;
            textBox.textContent = textMap[label];

            for (let i = 0; i < 2; i++) {
                setTimeout(() => createPacket("streaming"), i * 200);
            }
        });
    });
});
