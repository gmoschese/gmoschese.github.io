/**
 * Illungo - Neural Animation Script
 * Gestisce l'animazione continua dei nodi dell'ombra di Papà Gambalunga
 */

window.addEventListener('load', () => {
    // Seleziona tutti i nodi (cerchi) dell'SVG
    const neurons = document.querySelectorAll('.neuron');
    
    // Controllo di sicurezza: se l'HTML non è ancora pronto, interrompe per evitare errori
    if (neurons.length === 0) {
        console.error("Illungo Script: Nessun neurone trovato. Controlla le classi nell'HTML.");
        return;
    }

    /**
     * Funzione ricorsiva per l'accensione casuale
     * Crea un effetto organico e imprevedibile
     */
    const fireRandomNeuron = () => {
        // 1. Sceglie un neurone a caso dalla lista
        const randomIndex = Math.floor(Math.random() * neurons.length);
        const neuron = neurons[randomIndex];

        // 2. Attiva il neurone aggiungendo la classe CSS 'active'
        // Questa classe attiva il fill azzurro e il bagliore (glow)
        neuron.classList.add('active');

        // 3. Imposta lo spegnimento del neurone
        // La durata dell'accensione è variabile (tra 300ms e 700ms)
        const lightDuration = 300 + Math.random() * 400;
        setTimeout(() => {
            neuron.classList.remove('active');
        }, lightDuration);

        // 4. Pianifica il prossimo impulso
        // L'intervallo tra un'accensione e l'altra è casuale (tra 150ms e 750ms)
        const nextImpulse = 150 + Math.random() * 600;
        setTimeout(fireRandomNeuron, nextImpulse);
    };

    /**
     * ESECUZIONE
     * Lanciamo due cicli paralleli per rendere la rete più viva.
     * In questo modo ci saranno spesso 1 o 2 nodi accesi contemporaneamente.
     */
    
    // Primo ciclo (principale)
    fireRandomNeuron();

    // Secondo ciclo (sfalsato di 400ms)
    setTimeout(() => {
        fireRandomNeuron();
    }, 400);

    console.log("Illungo System: Neural Network Online.");
});
