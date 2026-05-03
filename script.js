window.addEventListener('load', () => {
    const neurons = document.querySelectorAll('.neuron');
    const tooltip = document.getElementById('neural-tooltip');
    
    // Gestione Tooltip per nodi interattivi
    neurons.forEach(n => {
        if (n.classList.contains('interactive')) {
            n.addEventListener('mouseenter', (e) => {
                tooltip.innerText = n.getAttribute('data-label');
                tooltip.style.opacity = '1';
            });

            n.addEventListener('mousemove', (e) => {
                tooltip.style.left = (e.clientX + 15) + 'px';
                tooltip.style.top = (e.clientY - 15) + 'px';
            });

            n.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
        }
    });

    // Logica di animazione casuale (invariata)
    const fireRandomNeuron = () => {
        const randomIndex = Math.floor(Math.random() * neurons.length);
        const neuron = neurons[randomIndex];
        neuron.classList.add('active');
        setTimeout(() => neuron.classList.remove('active'), 400);
        setTimeout(fireRandomNeuron, 200 + Math.random() * 600);
    };

    for(let i=0; i<4; i++) setTimeout(fireRandomNeuron, i * 200);
});
