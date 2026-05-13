document.addEventListener("DOMContentLoaded", () => {

    const nodeGroups = document.querySelectorAll(".node-group");
    const textBox    = document.getElementById("dynamic-text");
    const statusBox  = document.getElementById("status-box");
    const statusText = document.getElementById("status-text");
    const playBtn    = document.getElementById("play-btn");
    const navHint    = document.getElementById("nav-hint");
    const scoreBadge = document.getElementById("score-badge");
    const svg        = document.querySelector(".neural-svg");

    /* ── idle ── */
    const defaultText = "Designing systems where data flows, learns, and becomes decisions.";

    const info = {
    work:        "Projects and case studies: from architecture decisions to production results.",
    research:    "Technical deep dives, documentation and applied AI research.",
    foundations: "Core concepts in data science, ML and AI — explained without the hype.",
    aptu:        "Aptù: products and tools built to solve real problems.",
    contact:     "Get in touch — let's build something together.",
    about:       "Who I am, how I think, and why I care about systems."
    };

    let intervalId  = null;
    let isHovering  = false;
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
        nodeGroups.forEach(n => n.classList.remove("active", "error", "success"));
    }

    function stopRandom() {
        clearInterval(intervalId);
        intervalId = null;
    }

    function startRandom() {
        stopRandom();
        intervalId = setInterval(() => {
            if (isHovering || gameRunning) return;
            const r = nodeGroups[Math.floor(Math.random() * nodeGroups.length)];
            activateNode(r);
            setText(info[r.dataset.section]);
        }, 2000);
    }

    if (navHint) setTimeout(() => navHint.classList.add("hidden"), 3000);

    /* ══════════════════════════════════════
       GIOCO — Neural Pulse
    ══════════════════════════════════════ */

    let sequence    = [];
    let playerInput = [];
    let isShowing   = false;
    let round       = 0;
    let bestScore   = 0;

    const sleep = ms => new Promise(r => setTimeout(r, ms));

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

    async function showSequence() {
        isShowing = true;
        const speed = Math.max(280, 580 - round * 20);
        const pause = Math.max(120, 280 - round * 10);

        setStatus(`round: ${round} — watch the sequence`, "game-active");
        setText("Watch carefully...");
        await sleep(700);

        for (const idx of sequence) {
            await flashNode(idx, speed);
            await sleep(pause);
        }

        isShowing   = false;
        playerInput = [];
        setStatus(`round: ${round} — your turn  [${sequence.length} steps]`, "game-active");
        setText("Now replicate the sequence.");
    }

    async function nextRound() {
        round++;
        sequence.push(Math.floor(Math.random() * nodeGroups.length));
        await showSequence();
    }

    async function handleGameClick(index) {
        if (isShowing || !gameRunning) return;

        playerInput.push(index);
        const step = playerInput.length - 1;
        await flashNode(index, 220);

        if (playerInput[step] !== sequence[step]) {
            await gameOver(index);
            return;
        }

        if (playerInput.length === sequence.length) {
            if (round > bestScore) bestScore = round;
            setStatus(`round: ${round} — correct! +1`, "game-success");
            nodeGroups.forEach(n => n.classList.add("success"));
            await sleep(550);
            nodeGroups.forEach(n => n.classList.remove("success"));
            await sleep(350);
            await nextRound();
        }
    }

    async function gameOver(wrongIndex) {
        const finalScore = round - 1;
        const node = nodeGroups[wrongIndex];
        node.classList.add("error");
        setStatus(`game over — score: ${finalScore} | best: ${bestScore}`, "game-error");
        setText(`Round ${finalScore} reached. Try again?`);
        scoreBadge.textContent = bestScore > 0 ? `// best: ${bestScore}` : "";
        await sleep(1400);
        node.classList.remove("error");
        stopGame();
    }

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
        scoreBadge.textContent = bestScore > 0 ? `// best: ${bestScore}` : "";

        setStatus("neural pulse — initializing...", "game-active");
        setText("Match the sequence fired by the network.");
        await sleep(800);
        await nextRound();
    }

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

    /* ── eventi ── */
    playBtn.addEventListener("click", () => {
        gameRunning ? stopGame() : startGame();
    });

    nodeGroups.forEach(group => {
        group.addEventListener("click", () => {
            if (gameRunning) {
                handleGameClick(parseInt(group.dataset.index));
            } else {
                const href = group.dataset.href;
                if (href) window.location.href = href;
            }
        });

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

    startRandom();
});
