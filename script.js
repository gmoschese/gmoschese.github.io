document.addEventListener("DOMContentLoaded", () => {

    const nodeGroups   = document.querySelectorAll(".node-group");
    const textBox      = document.getElementById("dynamic-text");
    const defaultText  = "Designing systems where data flows, learns, and becomes decisions.";

    const info = {
        stack:      "Modern Data Stack: Airflow, Spark, dbt and Cloud Infra.",
        lab:        "R&D: From experimental algorithms to production AI.",
        ai:         "Neural Architectures, LLM agents and RAG pipelines.",
        log:        "Technical writing on data engineering and automation.",
        opensource: "Proud contributor to open data and AI frameworks.",
        about:      "Architecting the backbone of data-driven companies."
    };

    let intervalId = null;   // unico riferimento — niente stacking
    let isHovering = false;

    /* ── helpers ──────────────────────────────── */

    function setText(text) {
        textBox.classList.add("fading");
        setTimeout(() => {
            textBox.textContent = text;
            textBox.classList.remove("fading");
        }, 250);
    }

    function activateNode(group) {
        nodeGroups.forEach(n => n.classList.remove("active"));
        group.classList.add("active");
    }

    function stopRandom() {
        clearInterval(intervalId);   // clearInterval(null) è sicuro — non fa nulla
        intervalId = null;
    }

    function startRandom() {
        stopRandom();                // pulisce sempre prima di ripartire
        intervalId = setInterval(() => {
            if (isHovering) return;
            const random = nodeGroups[Math.floor(Math.random() * nodeGroups.length)];
            activateNode(random);
            setText(info[random.dataset.section]);   // testo in sync con il nodo
        }, 2000);
    }

    /* ── navigazione al click ─────────────────── */
    // I nodi hanno data-href per le pagine secondarie in ./section/

    nodeGroups.forEach(group => {
        group.addEventListener("click", () => {
            const href = group.dataset.href;
            if (href) window.location.href = href;
        });

        group.addEventListener("mouseenter", () => {
            isHovering = true;
            stopRandom();
            activateNode(group);
            setText(info[group.dataset.section]);
        });

        group.addEventListener("mouseleave", () => {
            isHovering = false;
            group.classList.remove("active");
            setText(defaultText);
            startRandom();
        });
    });

    /* ── avvio ────────────────────────────────── */

    startRandom();
});
