<script>
  // @ts-nocheck
  import { score } from '$lib/stores.js';
  import "$lib/styles.css";
  import Icon from "@iconify/svelte";
  import { Sound } from "svelte-sound";
  import correctsound from "$lib/assets/correctsound.mp3";
  import incorrectsound from "$lib/assets/wrongsound.mp3";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  const correct_sound = new Sound(correctsound);
  const incorrect_sound = new Sound(incorrectsound);

  let time = 2000.0;
  let currentQuestionIndex = 0;
  let gameOver = false;
  let questions = [];
  let loading = true;
  $score = 0

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [aray[j], array[i]];
    }
    return array;
  };

  // This interval updates every  100 milliseconds to provide subsecond precision
  onMount(() => {
    setInterval(() => {
      time -= 0.01;
      if (time < 0) {
        time = 0;
      }
    }, 10);
    fetchQuestions();
  });

  // Fetch questions from the backend when the page loads
  async function fetchQuestions() {
    try {
      const response = await fetch(`http://localhost:3000/api/questions`);
      questions = await response.json();
      questions = shuffleArray(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      loading = false; // Set loading to false regardless of success or failure
    }
  }

  // Call fetchQuestions when the DOM content is loaded
  onMount(fetchQuestions);

  function handleClick(answer) {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      correct_sound.play();
      score.update((n) => n + 1);
      time = 20;
    } else {
      incorrect_sound.play();
      goto("/gameover");
    }
    currentQuestionIndex++;
  }

  $: if (time <= 0) {
    gameOver = true;
  }

  $: if (gameOver) {
    incorrect_sound.play();
    goto("/gameover");
  }
</script>

<main>
  {#if questions.length > 0 && currentQuestionIndex < questions.length}
    <div class="backDiv">
      <a href="/">
        <button class="backButton"
          ><Icon icon="mingcute:arrow-left-fill" width="1.5em" height="1.5em" /></button
        >
      </a>
    </div>
    <div class="currentScore">
      <h3>Score: {$score}</h3>
      <h3>Time: {time.toFixed(2)}</h3>
    </div>
    <h2 class="question">{questions[currentQuestionIndex].question}</h2>
    <div class="grid">
      {#each questions[currentQuestionIndex].answers as answer, index (answer)}
        <button on:click|preventDefault={() => handleClick(answer)}>
          <span class="answer-label"
            >{`${String.fromCharCode(65 + index)}. `}</span
          >{answer}
        </button>
      {/each}
    </div>
  {/if}
</main>

<style>
  :root {
    background-color: var(--background-color);
  }

  main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin:  0 auto;
  }

  h2 {
    font-family:  "Permanent Marker", cursive;
    color: var(--button-text-color);
  }

  h3 {
    padding-left: 1em;
    padding-right: 1em;
  }

  .currentScore {
    display: flex;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    width: 45%;
  }

  .question {
    background-color: var(--secondary-color);
    padding: 1em;
    margin-top: 0;
    border-radius: 10px;
    width: calc(45% - 2em);
    font-size: 1.25rem;
    min-height: 100px;
    max-height: 1100px;
  }

  button {
    background: var(--primary-color);
    color: var(--button-text-color);
    font-family: "Roboto", sans-serif;
    border: solid;
    border-width: 0.25em;
    border-color: var(--border-color);
    border-radius: 10px;
    font-size: larger;
    padding: 1em;
    cursor: pointer;
    transition: background 0.3s ease;
    text-align: center;
  }

  .backDiv {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 0.5em;
  }

  .backButton {
    display: flex;
    padding: .5em;
    align-content: center;
    background: white;
    border-style: none;
    color: var(--text-color);
  }

  .backButton:hover {
    transform: scale(1.05);
    background: white;
  }

  button:hover {
    background: var(--hover-color);
  }

  button:disabled {
    background: var(--disabled-color);
    cursor: not-allowed;
  }
</style>
