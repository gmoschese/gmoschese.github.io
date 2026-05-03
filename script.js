window.addEventListener("load", () => {
    const neurons = document.querySelectorAll(".neuron");

    let hovered = false;
    let timeoutId = null;

    function randomPulse() {
        if (hovered) return;

        const node = neurons[Math.floor(Math.random() * neurons.length)];

        node.classList.add("pulse");

        setTimeout(() => {
            node.classList.remove("pulse");
        }, 400);

        timeoutId = setTimeout(randomPulse, 300 + Math.random() * 700);
    }

    randomPulse();

    neurons.forEach(node => {
        node.addEventListener("mouseenter", () => {
            hovered = true;

            if (timeoutId) clearTimeout(timeoutId);

            neurons.forEach(n => {
                n.classList.remove("pulse");
                n.classList.remove("active");
            });

            node.classList.add("active");
        });

        node.addEventListener("mouseleave", () => {
            hovered = false;
            node.classList.remove("active");
            randomPulse();
        });

        node.addEventListener("click", () => {
            const section = node.dataset.section;
            if (section) {
                window.location.href = `sections/${section}.html`;
            }
        });
    });
});
