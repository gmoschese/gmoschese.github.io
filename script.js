document.addEventListener("DOMContentLoaded", () => {
    const nodeGroups = document.querySelectorAll(".node-group");
    const textBox = document.getElementById("dynamic-text");
    const defaultText = "Designing systems where data flows, learns, and becomes decisions.";
    
    const textMap = {
        stack: "Data engineering stack: pipelines, cloud systems, distributed processing.",
        lab: "Experimental projects in AI and data science.",
        ai: "Building AI systems, LLM pipelines and intelligent applications.",
        log: "System logs: technical thoughts, updates, and incident reports.",
        opensource: "Open source projects and collaborations.",
        about: "Execute whoami.sh to view system architect profile."
    };

    let currentIndex = -1;
    let autoCycle = setInterval(highlightNextNode, 3000); // Cambia ogni 3 secondi

    function highlightNextNode() {
        // Rimuove la classe active da tutti i nodi
        nodeGroups.forEach(n => n.classList.remove("active"));
        
        // Passa al nodo successivo
        currentIndex = (currentIndex + 1) % nodeGroups.length;
        const currentNode = nodeGroups[currentIndex];
        
        // Lo illumina e cambia il testo
        currentNode.classList.add("active");
        const section = currentNode.getAttribute("data-section");
        textBox.textContent = textMap[section];
    }

    nodeGroups.forEach((group, index) => {
        // Se l'utente usa il mouse, fermiamo l'automatismo
        group.addEventListener("mouseenter", () => {
            clearInterval(autoCycle); 
            nodeGroups.forEach(n => n.classList.remove("active")); // Pulisce gli altri
            
            const section = group.getAttribute("data-section");
            textBox.textContent = textMap[section];
            group.classList.add("active");
        });

        // Quando il mouse esce, facciamo ripartire il ciclo dopo un po'
        group.addEventListener("mouseleave", () => {
            group.classList.remove("active");
            textBox.textContent = defaultText;
            
            // Reset dell'indice per ricominciare da dove si era rimasti o dal prossimo
            currentIndex = index;
            clearInterval(autoCycle);
            autoCycle = setInterval(highlightNextNode, 3000);
        });

        group.addEventListener("click", () => {
            window.location.href = `./section/${group.getAttribute("data-section")}.html`;
        });
    });
});
