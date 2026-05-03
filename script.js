document.addEventListener("DOMContentLoaded", () => {
    const nodeGroups = document.querySelectorAll(".node-group");
    const textBox = document.getElementById("dynamic-text");
    const defaultText = "Designing systems where data flows, learns, and becomes decisions.";

    const info = {
        stack: "Modern Data Stack: Airflow, Spark, dbt and Cloud Infra.",
        lab: "R&D: From experimental algorithms to production AI.",
        ai: "Neural Architectures, LLM agents and RAG pipelines.",
        log: "Technical writing on data engineering and automation.",
        opensource: "Proud contributor to open data and AI frameworks.",
        about: "Architecting the backbone of data-driven companies."
    };

    let interval;

    const startRandom = () => {
        interval = setInterval(() => {
            nodeGroups.forEach(n => n.classList.remove("active"));
            const random = nodeGroups[Math.floor(Math.random() * nodeGroups.length)];
            random.classList.add("active");
        }, 2000);
    };

    nodeGroups.forEach(group => {
        group.addEventListener("mouseenter", () => {
            clearInterval(interval);
            nodeGroups.forEach(n => n.classList.remove("active"));
            group.classList.add("active");
            textBox.textContent = info[group.dataset.section];
        });

        group.addEventListener("mouseleave", () => {
            group.classList.remove("active");
            textBox.textContent = defaultText;
            startRandom();
        });
    });

    startRandom();
});
