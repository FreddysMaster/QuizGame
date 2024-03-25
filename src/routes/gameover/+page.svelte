<script>
    // @ts-nocheck
    import "$lib/app.css";
    import { score } from "$lib/stores.js";
    import { onMount } from "svelte";

    let points = 0;

    onMount(() => {
    setInterval(() => {
      if (points < $score) {
        points+=1;
      }
    }, 500);
  });
</script>

<main>
    <!-- Game Interface Section -->
    <div class="text-center">
        <h1 class="text-black text-6xl">Game Over!</h1>
        <h3 class="text-lg text-black">You got {#if points === $score}<strong class="text-red-600"> {points} </strong>{:else} <span class="text-red-600">{points}</span> {/if} {$score === 1 ? "question" : "questions"} right.</h3>
        <a href="/play">
            <button class="btn bg-blue-500 text-white border-4 border-black">Try Again</button>
            
        </a>
        <a href="/play">
            <button class="btn bg-green-800 text-white border-4 border-black">Submit Score?</button>
        </a>
    </div>
    <style>
        h1 {
            font-family: "Permanent Marker", cursive;
            padding-bottom: 75px;
        }
        button{
            font-family: "Permanent Marker", cursive;

        }
    </style>
</main>