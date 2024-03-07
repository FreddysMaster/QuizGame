<script>
    // @ts-nocheck
    import '$lib/styles.css';
    import { score } from '$lib/stores.js';
</script>

<main>
    <!-- Game Interface Section -->
    <div class="game-over">
        <h2>Game Over!</h2>
        <p>You got {$score} {$score === 1 ? "question" : "questions"} right.</p>
        <a href="/play">
            <button>Try Again</button>
        </a>
    </div>
</main>

<style>
    :root {
        background-color: var(--background-color);
        text-align: center;
    }

    h2 {
        font-family: "Workbench", sans-serif;
        color: var(--button-text-color);
    }

    button {
        background: var(--primary-color);
        color: var(--button-text-color);
        border: 0.25em solid var(--border-color);
        border-radius: 10px;
        font-size: larger;
        padding: 1em;
        cursor: pointer;
        transition: background 0.3s ease;
        text-align: center;
    }

    button:hover {
        background: var(--hover-color);
    }

    button:disabled {
        background: var(--disabled-color);
        cursor: not-allowed;
    }
</style>
