<script>
  // @ts-nocheck
  import '$lib/styles.css';
  import { score } from '$lib/stores.js';
  import correctsound from '$lib/assets/correctsound.mp3';
  import incorrectsound from '$lib/assets/wrongsound.mp3';
  import Icon from '@iconify/svelte';
  import { Sound } from 'svelte-sound';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { selectedCategories } from '$lib/stores.js';

  const correct_sound = new Sound(correctsound);
  const incorrect_sound = new Sound(incorrectsound);

  export let data;
  let questions = data.questions;
  console.log($selectedCategories);
  let time = 202.0;
  let currentQuestionIndex = 0;
  $score = 0;
  let answers = [];

  // This interval updates every 100 milliseconds to provide subsecond precision
  onMount(() => {
    setInterval(() => {
      time -= 0.01;
      if (time < 0) {
        time = 0;
      }
    }, 10);
  });

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Get the IDs of the selected categories
  const selectedCategoryIds = $selectedCategories.map(
    (category) => category.category_id,
  );

  // Filter questions based on whether their category_id is included in the selectedCategoryIds
  const filteredQuestions = questions.filter((question) =>
    selectedCategoryIds.includes(question.category_id),
  );

  // Shuffle the questions
  questions = shuffleArray(filteredQuestions);

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
    incorrect_sound.play();
    goto("/gameover");
  }

  $: if (questions[currentQuestionIndex]) {
    answers = [
      questions[currentQuestionIndex].answer1,
      questions[currentQuestionIndex].answer2,
      questions[currentQuestionIndex].answer3,
      questions[currentQuestionIndex].answer4,
    ];
  }
</script>

<main>
  {#if questions.length > 0 && currentQuestionIndex < questions.length}
    <div class="backDiv">
      <a href="/">
        <button class="backButton"
          ><Icon
            icon="mingcute:arrow-left-fill"
            width="1.5em"
            height="1.5em"
          /></button
        >
      </a>
    </div>
    <div class="currentScore">
      <h3>Score: {$score}</h3>
      <h3>Time: {time.toFixed(2)}</h3>
    </div>
    <h2 class="question">{questions[currentQuestionIndex].question}</h2>
    <div class="grid">
      {#if answers.length > 0}
        {#each answers as answer, index}
          <button on:click|preventDefault={() => handleClick(answer)}>
            <span class="answer-label"
              >{`${String.fromCharCode(65 + index)}. `}</span
            >
            {answer}
          </button>
        {/each}
      {/if}
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
    margin: 0 auto;
  }

  h2 {
    font-family: "Permanent Marker", cursive;
    color: var(--button-text-color);
  }

  h3 {
    padding: 0 1em 0 1em;
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
    inset: 0;
    border-radius: 10px;
    width: calc(45% - 2em);
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40%;
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

  .backDiv {
    position: absolute;
    left: 0;
    top: 0;
    padding: 0.5em;
  }

  .backButton {
    display: flex;
    padding: 0.5em;
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
