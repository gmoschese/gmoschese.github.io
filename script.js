window.addEventListener('load', () => {
    const neurons = document.querySelectorAll('.neuron');
    if (neurons.length === 0) return;

    const fireRandomNeuron = () => {
        const randomIndex = Math.floor(Math.random() * neurons.length);
        const neuron = neurons[randomIndex];

        neuron.classList.add('active');

        // Durata dell'accensione
        setTimeout(() => {
            neuron.classList.remove('active');
        }, 400 + Math.random() * 400);

        // Intervallo per il prossimo impulso
        setTimeout(fireRandomNeuron, 100 + Math.random() * 600);
    };

    // Attivazione di 5 flussi di dati paralleli
    fireRandomNeuron();
    setTimeout(() => fireRandomNeuron(), 150);
    setTimeout(() => fireRandomNeuron(), 300);
    setTimeout(() => fireRandomNeuron(), 450);
    setTimeout(() => fireRandomNeuron(), 600);

    console.log("Neural Architecture Online.");
});
