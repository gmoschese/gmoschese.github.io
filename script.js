window.addEventListener('load', () => {
    const neurons = document.querySelectorAll('.neuron');
    if (neurons.length === 0) return;

    const fireRandomNeuron = () => {
        const randomIndex = Math.floor(Math.random() * neurons.length);
        const neuron = neurons[randomIndex];

        // Accende
        neuron.classList.add('active');

        // Spegne dopo un tempo casuale
        setTimeout(() => {
            neuron.classList.remove('active');
        }, 300 + Math.random() * 400);

        // Pianifica il prossimo impulso
        setTimeout(fireRandomNeuron, 150 + Math.random() * 600);
    };

    // Avvio di 4 cicli paralleli per una rete viva
    fireRandomNeuron();
    setTimeout(() => fireRandomNeuron(), 150);
    setTimeout(() => fireRandomNeuron(), 300);
    setTimeout(() => fireRandomNeuron(), 450);

    console.log("Neural Architecture Online.");
});
