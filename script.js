document.addEventListener('DOMContentLoaded', () => {
    const neurons = document.querySelectorAll('.neuron');
    const tooltip = document.getElementById('neural-tooltip');

    // 1. Gestione Interattività Nodi
    neurons.forEach(neuron => {
        if (neuron.classList.contains('interactive')) {
            neuron.addEventListener('mouseenter', (e) => {
                const label = neuron.getAttribute('data-label');
                tooltip.innerText = label;
                tooltip.style.opacity = '1';
            });

            neuron.addEventListener('mousemove', (e) => {
                tooltip.style.left = e.clientX + 'px';
                tooltip.style.top = e.clientY + 'px';
            });

            neuron.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });

            neuron.addEventListener('click', () => {
                const target = neuron.getAttribute('data-label').replace('// ', '').toLowerCase();
                console.log("Navigating to:", target);
                // Qui puoi mettere window.location.href = target + ".html";
            });
        }
    });

    // 2. Animazione Casuale dei Neuroni
    const fireRandomNeuron = () => {
        // Filtriamo per non disturbare troppo il nodo su cui l'utente ha il mouse
        const randomIndex = Math.floor(Math.random() * neurons.length);
        const neuron = neurons[randomIndex];

        if (!neuron.matches(':hover')) {
            neuron.classList.add('active');
            setTimeout(() => {
                neuron.classList.remove('active');
            }, 500);
        }

        setTimeout(fireRandomNeuron, 150 + Math.random() * 500);
    };

    // Avvio di 4 flussi paralleli
    for (let i = 0; i < 4; i++) {
        setTimeout(fireRandomNeuron, i * 200);
    }

    console.log("Giovanni Moschese: Neural Kernel v2.0 Ready.");
});
