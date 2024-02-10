<script>
  // @ts-nocheck
  import { Sound } from "svelte-sound";
  import correctsound from "./assets/correctsound.mp3";
  import incorrectsound from "./assets/wrongsound.mp3";
  import { onMount } from "svelte";
  import { started } from "./store.js";
  import StartScreen from "./StartScreen.svelte";

  const correct_sound = new Sound(correctsound);
  const incorrect_sound = new Sound(incorrectsound);

  let score = 0;
  let time = 20.0;
  const incr = () => (time += 1);
  let currentQuestionIndex = 0;
  let gameOver = false;
  let questions = [];
  let loading = true;

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // This interval updates every  100 milliseconds to provide subsecond precision
  onMount(() => {
    setInterval(() => {
      time -= 0.01;
      if (time < 0) {
        time = 0;
        gameOver = true;
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
      score++;
      time = 30;
    } else {
      gameOver = true;
      incorrect_sound.play();
    }
    currentQuestionIndex++;
  }

  $: if (time <= 0) {
    gameOver = true;
  }

  // Reactive statement to check if the game is over
  $: if (!loading && currentQuestionIndex >= questions.length && score === 0) {
    gameOver = true;
  }

  // Function to reset the game state
  function resetGame() {
    questions = shuffleArray(questions);
    score = 0;
    time = 20;
    currentQuestionIndex = 0;
    gameOver = false;
  }
</script>

<main>
  {#if $started}
    <!-- Game Interface Section -->
    {#if gameOver}
      <div class="game-over">
        <h2>Game Over!</h2>
        <p>You got {score} {score === 1 ? "question" : "questions"} right.</p>
        <button on:click={resetGame}>Try Again</button>
      </div>
    {:else if questions.length > 0 && currentQuestionIndex < questions.length}
      <div class="currentScore">
        <h3>Score: {score}</h3>
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
  {/if}
  {#if !$started}
    <StartScreen />
  {/if}
</main>

<style>
  :root {
    background-color: var(--background-color);
  }

  h2{
   font-family: 'Workbench', sans-serif;
   color: var(--button-text-color)
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
  }
 
  button {
     background: var(--primary-color);
     color: var(--button-text-color);
     font-family: 'Roboto', sans-serif;
     border: solid;
     border-width: .25em;
     border-color: var(--border-color);
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