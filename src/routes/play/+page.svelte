<script>
  // @ts-nocheck
  import { score } from "$lib/stores.js";
  import "$lib/app.css";
  import Icon from "@iconify/svelte";
  import { Sound } from "svelte-sound";
  import correctSound from "$lib/assets/correctsound.mp3";
  import incorrectSound from "$lib/assets/wrongsound.mp3";
  import backgroundMusic from "$lib/assets/cipher.mp3";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { selectedCategories, categoriesIcons, colors } from "$lib/stores.js";

  const correct_sound = new Sound(correctSound);
  const incorrect_sound = new Sound(incorrectSound);

  export let data;
  let questions = data.questions;
  let categories = data.categories;
  console.log($selectedCategories);
  let time = 20.0;
  let currentQuestionIndex = 0;
  $score = 0;
  let answers = [];

  // This interval updates every 100 milliseconds to provide subsecond precision
  onMount(() => {
    setInterval(() => {
      time -= 1;
      if (time < 0) {
        time = 0;
      }
    }, 1000);
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
  <a href="/">
    <button class="btn btn-square m-2">
      <Icon icon="mingcute:arrow-left-fill" width="2em" height="2em" />
    </button>
  </a>
  {#if questions.length > 0 && currentQuestionIndex < questions.length}


    <div
      class="h-[calc(100vh-16rem)] w-screen flex flex-col justify-center items-center"
    >
      <div class="relative flex justify-center items-center w-full">
        <div class="absolute bg-primary rounded-full shadow-inner bottom-[-10px] w-3/12">
          <h3 class="text-xl font-bold m-2 pl-2 text-white">Score: {$score}</h3>
          <div class="relative flex justify-center items-center">
            <h3
              class="absolute text-xl font-bold rounded-full bg-white text-black border-3 border-black h-16 w-16 flex items-center justify-center bottom-0 shadow-inner "
            >
              {time}s
            </h3>
          </div>
        </div>
      </div>
      <h2
        class="bg-secondary p-4 inset-0 rounded-lg w-2/4 h-32 flex justify-center items-center text-2xl text-white text-center"
      >
        {questions[currentQuestionIndex].question}
      </h2>
      <div class="flex flex-col gap-3 w-2/4 my-4">
        <div
          class="fixed left-0 top-1/2 transform -translate-y-1/2 m-2 rounded-md bg-accent"
        >
          <div class="grid grid-cols-2 m-2">
            {#each categories as category, index}
              <Icon
                class="pointer-events-none m-1 p-1 rounded-md"
                style="background-color: {$selectedCategories.find(
                  (cat) => cat.category === category.category,
                )
                  ? $colors[index]
                  : 'none'};"
                icon={$categoriesIcons[category.category_id]}
                color="white"
                width="2em"
                height="2em"
              />
            {/each}
          </div>
        </div>
        {#if answers.length > 0}
          {#each answers as answer, index}
            <button
              class="btn btn-primary text-lg min-h-16 text-white justify-start"
              on:click|preventDefault={() => handleClick(answer)}
            >
              <span
                class="flex flex-col items-center justify-center w-10 h-10 p-2 rounded-full bg-white text-primary"
                >{`${String.fromCharCode(65 + index)}`}</span
              >
              <p>{answer}</p>
            </button>
          {/each}
        {/if}
      </div>
    </div>
  {:else}
    {time = 9999999}
    <h2 class=" text-4xl text-black">No category selected. Go back with the arrow</h2>
  {/if}
</main>

<style>
  h2 {
    font-family: "Permanent Marker", cursive;
  }
</style>
