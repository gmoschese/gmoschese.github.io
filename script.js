window.addEventListener('load', () => {
    const neurons = document.querySelectorAll('.neuron');
    if (neurons.length === 0) return;

    const fireRandomNeuron = () => {
        const randomIndex = Math.floor(Math.random() * neurons.length);
        const neuron = neurons[randomIndex];

        neuron.classList.add('active');

        setTimeout(() => {
            neuron.classList.remove('active');
        }, 400 + Math.random() * 400);

        setTimeout(fireRandomNeuron, 150 + Math.random() * 600);
    };

    // Attivazione di 5 flussi paralleli per un effetto dinamico
    fireRandomNeuron();
    setTimeout(() => fireRandomNeuron(), 150);
    setTimeout(() => fireRandomNeuron(), 300);
    setTimeout(() => fireRandomNeuron(), 450);
    setTimeout(() => fireRandomNeuron(), 600);

    console.log("Neural Architecture Online.");
});
