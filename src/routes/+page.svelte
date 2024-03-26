<script>
  import '$lib/styles.css';
  import Icon from '@iconify/svelte';
  import { selectedCategories } from '$lib/stores.js';

  export let data;
  const { categories } = data;
  selectedCategories.set(categories);

  const categoriesIcons = {
    1: "ic:round-science",
    2: "mdi:people",
    3: "mdi:art",
    4: "mdi:music",
    5: "mdi:soccer",
    6: "mdi:food",
    7: "mdi:globe",
    8: "mdi:dice-6",
    9: "mdi:video-film",
    10: "mdi:book-open-page-variant",
  };

  const colors = [
    "#e6c642", // Yellow
    "#f94e4e", // Red
    "#685af5", // Purple
    "#3ce976", // Green
    "#307de7", // Blue
    "#a656fd", // Violet
    "#e857ed", // Pink
    "#56cfef", // Light Blue
    "#4b0082", // Indigo
    "#ee3f73", // Hot Pink
  ];

  // Create a map of categories to colors
  let categoryColors = {};
  categories.forEach((category, index) => {
    categoryColors[category.category_id] = colors[index % colors.length];
  });

  function handleCategoryChange(event) {
    const categoryId = parseInt(event.target.value, 10); // Parse the ID as an integer

    selectedCategories.update((selected) => {
      // Find the index of the category in the selected categories array by ID
      const index = selected.findIndex((cat) => cat.category_id === categoryId);
      if (index === -1) {
        // If the category is not found, add it to the selected categories array
        const categoryToAdd = categories.find(
          (cat) => cat.category_id === categoryId,
        );
        return [...selected, categoryToAdd];
      } else {
        // If the category is found, remove it from the selected categories array
        return selected.filter((cat) => cat.category_id !== categoryId);
      }
    });
    // Update the button's class based on the new selection state
    event.target.classList.toggle("selected");
  }
</script>

<main>
  <!-- Category Selection -->
  <div class="parent-container">
    <h1 class="categories-label text-3xl">Categories</h1>
    <div class="categories-grid">
      {#each categories as category}
        <button
          value={category.category_id}
          style="background: {$selectedCategories.includes(category)
            ? categoryColors[category.category_id]
            : '#7f8c8d'}; outline:.15em solid {categoryColors[
            category
          ]}; overflow: hidden;"
          on:click={handleCategoryChange}
          class="category-button {$selectedCategories.includes(
            category.category,
          )
            ? 'selected'
            : ''}"
        >
          <Icon
            icon={categoriesIcons[category.category_id]}
            width="2em"
            height="2em"
            style="pointer-events: none;"
          /><br />{category.category}
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
    background: var(--background-color);
    
  }

  .parent-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(75vh);
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
    transform: scale(1.05);
    transition: all 0.15s ease-in-out;
    overflow: hidden;
  }

  .categories-grid {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5em 1em;
  }

  @media (min-width: 1250px) {
    .categories-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (max-width: 1249px) and (min-width: 900px) {
    .categories-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 899px) and (min-width: 600px) {
    .categories-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 599px) and (min-width: 450px) {
    .categories-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 449px) and (min-width: 0px) {
    .categories-grid {
      grid-template-columns: repeat(1, 1fr);
    }
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
    margin-top: 2em;
    margin-bottom: 5em;
    color: var(--button-text-color);
  }

  .start-button:hover {
    background: var(--hover-color);
  }
</style>
