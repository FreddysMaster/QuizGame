<script>
  import "$lib/styles.css";
  import Icon from "@iconify/svelte";

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
  let categoriesIcons = {
    history: "mdi:book-open-page-variant",
    film_and_tv: "mdi:video-film",
    society_and_culture: "mdi:people",
    geography: "mdi:globe",
    arts_and_literature: "mdi:art",
    science: "ic:round-science",
    music: "mdi:music",
    sport_and_leisure: "mdi:soccer",
    food_and_drink: "mdi:food",
    general_knowledge: "mdi:dice-6",
  };
  let displayNames = {
    history: "History",
    film_and_tv: "Film & TV",
    society_and_culture: "Society & Culture",
    geography: "Geography",
    arts_and_literature: "Arts & Literature",
    science: "Science",
    music: "Music",
    sport_and_leisure: "Sports & Leisure",
    food_and_drink: "Food & Drink",
    general_knowledge: "General Knowledge",
  };
  let colors = [
    "#fcd01e", // Yellow
    "#f94e4e", // Red
    "#685af5", // Purple
    "#3ce976", // Green
    "#307de7", // Blue
    "#a656fd", // Violet
    "#e857ed", // Pink
    "#56cfef", // Light Blue
    "#4b0082", // Indigo
    "#ee3f73", // Pink
  ];
  let selectedCategories = [...categories];
  let currentQuestionIndex = 0;

  // Create a map of categories to colors
  let categoryColors = {};
  categories.forEach((category, index) => {
    categoryColors[category] = colors[index % colors.length];
  });

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
    event.target.classList.toggle("selected");

    // Reset currentQuestionIndex to restart the game
    currentQuestionIndex = 0;
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
          style="background: {selectedCategories.includes(category)
            ? categoryColors[category]
            : '#7f8c8d'}; outline:.1em solid {categoryColors[category]};"
          on:click={handleCategoryChange}
          class="category-button selected"
        >
          <Icon icon={categoriesIcons[category]} width="2em" height="2em" /><br
          />{displayNames[category]}
        </button>
      {/each}
    </div>
  </div>

  <!-- Start Button -->
  <div class="start-button-container">
    <a href="/play">
      <button class="start-button">Start Game</button>
    </a>
  </div>
</main>

<style>
  :root {
    background-color: var(--background-color);
  }

  .parent-container {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .stack {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1em;
    row-gap: 1.5em;
  }

  .categories-label {
    position: relative;
    left: 0;
  }

  .category-button {
    border: 0.15em solid #ffffff;
    color: var(--button-text-color);
    border-radius: 10px;
    font-size: larger;
    padding: 1em;
    cursor: pointer;
    text-align: center;
    width: 12em;
    height: 7em;
    transition: all 0.3s ease-in-out;
  }

  .category-button:hover {
    border: 0.2em solid #ffffff;
    transform: scale(1.04);
    transition: all 0.1s ease-in-out;
  }

  .start-button {
    border: 0.25em solid var(--border-color);
    background: var(--primary-color);
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
    color: var(--button-text-color);
  }
</style>
