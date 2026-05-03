* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #1a1a1a;
    --secondary: #666;
    --accent: #007aff;
    --bg: #fafafa;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    width: 90%;
    max-width: 900px;
}

.main-header {
    display: flex;
    align-items: center;
    gap: 4rem;
}

/* NEURAL */

.neuron {
    fill: white;
    stroke: var(--primary);
    stroke-width: 2;
    transition: all 0.25s ease;
    cursor: pointer;
}

.neuron:hover {
    transform: scale(1.15);
}

.neuron.active {
    fill: var(--accent);
    stroke: var(--accent);
    transform: scale(1.15);
    transform-origin: center;
    filter: drop-shadow(0 0 8px var(--accent));
}

/* Connessioni */
.synapse {
    stroke: var(--primary);
    opacity: 0.2;
    transition: all 0.3s ease;
}

.synapse.active {
    opacity: 0.8;
    stroke: var(--accent);
}

/* DATA FLOW */
.data-layer circle {
    filter: drop-shadow(0 0 6px currentColor);
}

/* HINT */
.hint {
    margin-top: 12px;
    font-size: 0.75rem;
    color: var(--secondary);
    font-family: monospace;
    opacity: 0.8;
    transition: opacity 0.3s ease;
}

.brand-visual:hover .hint {
    opacity: 1;
}

/* UI */
.status-box {
    background: #eee;
    padding: 6px 10px;
    border-radius: 4px;
    font-family: monospace;
    margin-bottom: 1rem;
}

.pulse {
    width: 8px;
    height: 8px;
    background: #2ecc71;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
}

h1 {
    font-size: 3rem;
}

.role {
    color: var(--secondary);
}

.divider {
    width: 40px;
    height: 2px;
    background: var(--accent);
    margin: 1rem 0;
}

.message {
    color: var(--secondary);
    max-width: 400px;
}
