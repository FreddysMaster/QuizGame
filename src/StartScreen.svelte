<script>
  import { started } from "./store.js";
  import { fly } from "svelte/transition";

  let categories = [
    "history",
    "film_and_tv",
    "society_and_culture",
    "geography",
    "arts_and_literature",
    "science",
    "music",
    "sport_and_leisure",
    "food_and_drink",
    "general_knowledge",
  ];
  let selectedCategories = [];
  let currentQuestionIndex = 0;
  let clicked = false;

  function dropDown() {
    clicked = !clicked;
  }

  function start() {
    started.set(true);
  }

  function handleCategoryChange(event) {
  const category = event.target.value;
  const index = selectedCategories.indexOf(category);
  if (index === -1) {
    selectedCategories = [...selectedCategories, category];
  } else {
    selectedCategories = selectedCategories.filter((cat) => cat !== category);
  }
  currentQuestionIndex =  0;
}

</script>

<main>
  <!-- Category Selection -->
  <div class="parent-container">
    <h1 class="categories-label">Categories</h1>
    <div class="stack">
      {#each categories as category}
        <button
          value={category}
          on:click={handleCategoryChange}
          class="category-button {selectedCategories.includes(category) ? 'selected' : ''}"
        >
          {category}
        </button>
      {/each}
    </div>
  </div>

  <!-- Start Button -->
  <div class="start-button-container">
    <button on:click={start} class="start-button">Start Game</button>
  </div>
</main>
