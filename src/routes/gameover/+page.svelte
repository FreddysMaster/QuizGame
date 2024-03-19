<script>
    // @ts-nocheck
    import "$lib/app.css";
    import { score } from "$lib/stores.js";
</script>

<main>
    <!-- Game Interface Section -->
    <div class="text-center">
        <h2 class="text-xl">Game Over!</h2>
        <h3 class="text-lg">You got {$score} {$score === 1 ? "question" : "questions"} right.</h3>
        <a href="/play">
            <button class="btn">Try Again</button>
        </a>
    </div>
</main>