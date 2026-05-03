document.addEventListener('DOMContentLoaded', () => {
    const neurons = document.querySelectorAll('.neuron');
    
    // Funzione per accendere un neurone a caso in loop continuo
    const fireRandomNeuron = () => {
        // Seleziona un neurone casuale
        const randomIndex = Math.floor(Math.random() * neurons.length);
        const neuron = neurons[randomIndex];

        // Aggiunge la classe active (che attiva il glow nel CSS)
        neuron.classList.add('active');

        // Lo spegne dopo un intervallo variabile (200-500ms)
        setTimeout(() => {
            neuron.classList.remove('active');
        }, 200 + Math.random() * 300);

        // Pianifica il prossimo impulso tra 100ms e 600ms
        // Questo intervallo crea il ritmo "neurale" irregolare
        setTimeout(fireRandomNeuron, 100 + Math.random() * 500);
    };

    // Avvia il ciclo immediatamente al caricamento della pagina
    fireRandomNeuron();
    
    // Facoltativo: un secondo ciclo parallelo per rendere la rete più "densa" di impulsi
    setTimeout(fireRandomNeuron, 300); 
});
