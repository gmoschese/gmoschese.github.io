document.addEventListener("DOMContentLoaded", () => {

    /* ══════════════════════════════════════════
       ELEMENTI DOM
    ══════════════════════════════════════════ */

    const nodeGroups  = document.querySelectorAll(".node-group");
    const textBox     = document.getElementById("dynamic-text");
    const statusBox   = document.getElementById("status-box");
    const statusText  = document.getElementById("status-text");
    const playBtn     = document.getElementById("play-btn");
    const navHint     = document.getElementById("nav-hint");
    const svg         = document.querySelector(".neural-svg");

    /* ══════════════════════════════════════════
       IDLE — navigazione normale
    ══════════════════════════════════════════ */

    const defaultText = "Designing systems where data flows, learns, and becomes decisions.";

    const info = {
        stack:      "Modern Data Stack: Airflow, Spark, dbt and Cloud Infra.",
        lab:        "R&D: From experimental algorithms to production AI.",
        ai:         "Neural Architectures, LLM agents and RAG pipelines.",
        log:        "Technical writing on data engineering and automation.",
        opensource: "Proud contributor to open data and AI frameworks.",
        about:      "Architecting the backbone of data-driven companies."
    };

    let intervalId = null;
    let isHovering = false;
    let gameRunning = false;

    function setText(text) {
        if (!textBox) return;
        textBox.classList.add("fading");
        setTimeout(() => {
            textBox.textContent = text;
            textBox.classList.remove("fading");
        }, 250);
    }

    function setStatus(text, mode = "") {
        statusText.textContent = text;
        statusBox.className = "status-box";
        if (mode) statusBox.classList.add(mode);
    }

    function activateNode(group) {
        nodeGroups.forEach(n => n.classList.remove("active"));
        group.classList.add("active");
    }

    function clearAllNodes() {
        nodeGroups.forEach(n => {
            n.classList.remove("active", "error", "success");
        });
    }

    function stopRandom() {
        clearInterval(intervalId);
        intervalId = null;
    }

    function startRandom() {
        stopRandom();
        intervalId = setInterval(() => {
            if (isHovering || gameRunning) return;
            const random = nodeGroups[Math.floor(Math.random() * nodeGroups.length)];
            activateNode(random);
            setText(info[random.dataset.section]);
        }, 1000);
    }

    /* nav hint */
    if (navHint) setTimeout(() => navHint.classList.add("hidden"), 3000);

    /* ══════════════════════════════════════════
       GIOCO — Neural Pulse (Simon Says)
    ══════════════════════════════════════════ */

    let sequence      = [];   // sequenza da replicare
    let playerInput   = [];   // input del giocatore
    let isShowing     = false; // true mentre la rete mostra la sequenza
    let round         = 0;
    let bestScore     = 0;

    /* Accende un nodo per un tempo definito */
    function flashNode(index, duration = 500) {
        return new Promise(resolve => {
            const node = nodeGroups[index];
            node.classList.add("active");
            setTimeout(() => {
                node.classList.remove("active");
                resolve();
            }, duration);
        });
    }

    /* Mostra l'intera sequenza al giocatore */
    async function showSequence() {
        isShowing = true;
        const speed = Math.max(300, 600 - round * 20); // accelera ogni round
        const pause = Math.max(150, 300 - round * 10);

        setStatus(`round: ${round} — watch the sequence`, "game-active");
        setText("Watch carefully...");

        await sleep(600);

        for (const idx of sequence) {
            await flashNode(idx, speed);
            await sleep(pause);
        }

        isShowing = false;
        playerInput = [];
        setStatus(`round: ${round} — your turn (${sequence.length} steps)`, "game-active");
        setText("Now replicate the sequence.");
    }

    /* Aggiunge un nodo casuale alla sequenza e mostra */
    async function nextRound() {
        round++;
        sequence.push(Math.floor(Math.random() * nodeGroups.length));
        await showSequence();
    }

    /* Gestisce il click del giocatore durante il gioco */
    async function handleGameClick(index) {
        if (isShowing || !gameRunning) return;

        playerInput.push(index);
        const step = playerInput.length - 1;

        /* Flash rapido feedback */
        await flashNode(index, 250);

        /* Controllo correttezza */
        if (playerInput[step] !== sequence[step]) {
            /* SBAGLIATO */
            gameOver(index);
            return;
        }

        /* Sequenza completata correttamente */
        if (playerInput.length === sequence.length) {
            if (round > bestScore) bestScore = round;

            /* Flash verde su tutti i nodi */
            setStatus(`round: ${round} — correct! +1`, "game-success");
            nodeGroups.forEach(n => n.classList.add("success"));
            await sleep(600);
            nodeGroups.forEach(n => n.classList.remove("success"));

            await sleep(400);
            await nextRound();
        }
    }

    /* Game over */
    async function gameOver(wrongIndex) {
        const node = nodeGroups[wrongIndex];
        node.classList.add("error");

        setStatus(`game over — score: ${round - 1} | best: ${bestScore}`, "game-error");
        setText(`You reached round ${round - 1}. Try again?`);

        await sleep(1200);
        node.classList.remove("error");

        stopGame();
    }

    /* Avvia il gioco */
    async function startGame() {
        gameRunning = true;
        sequence    = [];
        playerInput = [];
        round       = 0;

        stopRandom();
        clearAllNodes();
        svg.classList.add("game-mode");
        playBtn.textContent = "// stop";
        playBtn.classList.add("active");

        setStatus("neural pulse — initializing...", "game-active");
        setText("Match the sequence fired by the network.");

        await sleep(800);
        await nextRound();
    }

    /* Ferma il gioco e torna alla modalità idle */
    function stopGame() {
        gameRunning = false;
        isShowing   = false;
        sequence    = [];
        playerInput = [];
        round       = 0;

        svg.classList.remove("game-mode");
        playBtn.textContent = "// play";
        playBtn.classList.remove("active");

        clearAllNodes();
        setStatus("section: build in progress — v0.1.0", "");
        setText(defaultText);
        startRandom();
    }

    /* ══════════════════════════════════════════
       EVENT LISTENERS
    ══════════════════════════════════════════ */

    playBtn.addEventListener("click", () => {
        if (gameRunning) {
            stopGame();
        } else {
            startGame();
        }
    });

    nodeGroups.forEach(group => {

        /* Click: gioco o navigazione */
        group.addEventListener("click", () => {
            if (gameRunning) {
                handleGameClick(parseInt(group.dataset.index));
            } else {
                const href = group.dataset.href;
                if (href) window.location.href = href;
            }
        });

        /* Hover: solo in modalità idle */
        group.addEventListener("mouseenter", () => {
            if (gameRunning) return;
            isHovering = true;
            stopRandom();
            activateNode(group);
            setText(info[group.dataset.section]);
        });

        group.addEventListener("mouseleave", () => {
            if (gameRunning) return;
            isHovering = false;
            group.classList.remove("active");
            setText(defaultText);
            startRandom();
        });
    });

    /* ══════════════════════════════════════════
       AVVIO
    ══════════════════════════════════════════ */

    startRandom();

    /* ── utility ── */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

});
