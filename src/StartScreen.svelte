<script>
  import { started } from "./store.js";

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
  let displayNames = {
  "history": "History",
  "film_and_tv": "Film & TV",
  "society_and_culture": "Society & Culture",
  "geography": "Geography",
  "arts_and_literature": "Arts & Literature",
  "science": "Science",
  "music": "Music",
  "sport_and_leisure": "Sports & Leisure",
  "food_and_drink": "Food & Drink",
  "general_knowledge": "General Knowledge",
};
  let colors = [
    "#e6c642", // Yellow
    "#f94e4e", // Red
    "#685af5", // Purple
    "#3ce976", // Green
    "#307de7", // Blue
    "#a656fd", // Violet
    "#e857ed", // Pink
    "#56cfef"  // Light Blue
  ]
  let selectedCategories = [...categories];
  let currentQuestionIndex = 0;

  // Create a map of categories to colors
  let categoryColors = {};
  categories.forEach((category, index) => {
    categoryColors[category] = colors[index % colors.length];
  });

  function start() {
    started.set(true);
  }

  function handleCategoryChange(event) {
  const category = event.target.value;
  const index = selectedCategories.indexOf(category);
   
  // Toggle the category in the selectedCategories array
  if (index === -1) {
    selectedCategories = [...selectedCategories, category];
  } else {
    selectedCategories = selectedCategories.filter((cat) => cat !== category);
  }
   
  // Update the button's class based on the new selection state
  event.target.classList.toggle('selected');
   
  // Reset currentQuestionIndex to restart the game
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
      style="background: {selectedCategories.includes(category) ? categoryColors[category] : '#7f8c8d'};"
      on:click={handleCategoryChange}
      class="category-button selected"
      >
      {displayNames[category]}
      </button>
      {/each}
    </div>
  </div>

  <!-- Start Button -->
  <div class="start-button-container">
    <button on:click={start} class="start-button">Start Game</button>
  </div>
</main>

<style>
  :root {
    background-color: white;
  }
  
  .parent-container {
   display: flex;
   flex-direction: column;
   align-items: start;
  }

  .stack{
   display: grid;
   grid-template-columns: repeat(5, 1fr);
   column-gap: 10px;
   row-gap: 1em;
  }

  .categories-label {
   position: relative;
   left: 0;
  }

  .category-button{
   border: solid;
   border-width: .25em;
   border-color: var(--border-color);;
   color: var(--button-text-color);
   border-radius: 10px;
   font-size: larger;
   padding: 1em;
   cursor: pointer;
   text-align: center;
   width: 15em;
   height: 10em;
   transition: all .3s ease-in-out;
    }

  .category-button:hover {
   transform: scale(1.05);
   background: var(--primary-color);
  }

  .start-button {
   border: solid;
   background: var(--primary-color);
   border-width: .25em;
   border-color: var(--border-color);;
   border-radius: 10px;
   font-size: larger;
   padding: 1em;
   cursor: pointer;
   text-align: center;
   position: absolute;
   width: 10em;
   left: 50%;
   transform: translateX(-50%);
   margin-top: 3em;
   color: var(--button-text-color)
  }

</style>