<script>
  import "$lib/app.css";
  import Icon from "@iconify/svelte";
  import { selectedCategories, categoriesIcons, colors } from "$lib/stores.js";

  export let data;
  const { categories } = data;
  selectedCategories.set(categories);

  function handleCategoryChange(event) {
    const categoryId = parseInt(event.target.value, 10); // Parse the ID as an integer

    selectedCategories.update((selected) => {
      // Find the index of the category in the selected categories array by ID
      const index = selected.findIndex((cat) => {
        if (cat && cat.category_id) {
          return cat.category_id == categoryId;
        }
        return false;
      });
      if (index === -1) {
        // If the category is not found, add it to the selected categories array
        const categoryToAdd = categories.find((cat) => {
          if (cat && cat.category_id) {
            return cat.category_id == categoryId;
          }
          return false;
        });
        return [...selected, categoryToAdd];
      } else {
        // If the category is found, remove it from the selected categories array
        return selected.filter((cat) => {
          if (cat && cat.category_id) {
            return cat.category_id != categoryId;
          }
          return true;
        });
      }
    });
    // Update the button's class based on the new selection state
    event.target.classList.toggle("selected");
  }
</script>

<main>
  <div>
    <!-- Category Selection -->
    <div class="h-[calc(100vh-8rem)] rounded-md m-5 p-4">
      <div class="flex flex-col left-0 px-3">
        <h1 class="text-center text-5xl font-bold text-black">The Big Quiz Game!</h1>
        <h2 class="text-center text-3xl m-5 font-bold text-black">Here are your Categories:</h2>
        <p class="text-center text-large font-bold text-black"> Click a category to keep their questions out of the game.</p>
        <div
          class="grid justify-items-center grid-cols-5 gap-8 gap-x-1 p-8 rounded-md"
        >
          {#each categories as category, index}
            <button
              value={category.category_id}
              on:click={handleCategoryChange}
              class="flex flex-col justify-center items-center overflow-hidden border-solid border-4 rounded-3xl text-white w-64 h-48 transition-all duration-300 ease-in-out hover:border-white hover:scale-105"
              style="border-color: {$selectedCategories.includes(category)
                ? '#fff'
                : $colors[
                    index
                  ]}; background-color: {$selectedCategories.includes(category)
                ? $colors[index]
                : '#fff'};"
            >
              <Icon
                class="pointer-events-none"
                icon={$categoriesIcons[category.category_id]}
                color={$selectedCategories.includes(category)
                  ? "#fff"
                  : $colors[index]}
                width="3em"
                height="3em"
              />
              <br />
              <p
                class="text-xl pointer-events-none"
                style="color: {$selectedCategories.includes(category)
                  ? '#fff'
                  : $colors[index]};"
              >
                {category.category}
              </p>
            </button>
          {/each}
        </div>
      </div>

      <!-- Start Button -->
      <div class="text-center m-3">
        <a href="/play">
          <button class="btn btn-primary btn-wide text-white">Start Game</button
          >
        </a>
      </div>
    </div>
  </div>
  <style>
    h1{
      font-family: "Permanant Marker", cursive;
    }
  </style>
</main>
