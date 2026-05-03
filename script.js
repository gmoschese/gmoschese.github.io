document.addEventListener('DOMContentLoaded', () => {
    const neurons = document.querySelectorAll('.neuron');
    const visual = document.querySelector('.brand-visual');
    let isHovering = false;
    let timer;

    // Funzione per accendere un neurone a caso
    const fireRandomNeuron = () => {
        if (!isHovering) return;

        // Seleziona un neurone casuale
        const randomIndex = Math.floor(Math.random() * neurons.length);
        const neuron = neurons[randomIndex];

        // Aggiunge la classe per l'accensione
        neuron.style.fill = 'var(--accent)';
        neuron.style.stroke = 'var(--accent)';
        neuron.style.transition = 'all 0.1s ease';

        // Lo spegne dopo un breve istante
        setTimeout(() => {
            neuron.style.fill = 'var(--bg)';
            neuron.style.stroke = 'var(--primary)';
            neuron.style.transition = 'all 0.4s ease';
        }, 200 + Math.random() * 300);

        // Pianifica la prossima accensione tra 100ms e 600ms (ritmo irregolare)
        timer = setTimeout(fireRandomNeuron, 100 + Math.random() * 500);
    };

    // Attiva solo quando il mouse è sopra l'icona
    visual.addEventListener('mouseenter', () => {
        isHovering = true;
        fireRandomNeuron();
    });

    // Ferma tutto quando il mouse esce
    visual.addEventListener('mouseleave', () => {
        isHovering = false;
        clearTimeout(timer);
        // Reset immediato di tutti i nodi
        neurons.forEach(n => {
            n.style.fill = 'var(--bg)';
            n.style.stroke = 'var(--primary)';
        });
    });
});
