window.addEventListener('load', () => {
    const neurons = document.querySelectorAll('.neuron');
    
    if (neurons.length === 0) return;

    const fireRandomNeuron = () => {
        const randomIndex = Math.floor(Math.random() * neurons.length);
        const neuron = neurons[randomIndex];

        neuron.classList.add('active');

        setTimeout(() => {
            neuron.classList.remove('active');
        }, 300 + Math.random() * 400);

        setTimeout(fireRandomNeuron, 150 + Math.random() * 600);
    };

    // Avvio di 4 cicli paralleli per una rete densa e dinamica
    fireRandomNeuron();
    setTimeout(() => fireRandomNeuron(), 200);
    setTimeout(() => fireRandomNeuron(), 400);
    setTimeout(() => fireRandomNeuron(), 600);

    console.log("Illungo System: Neural Network Online.");
});
