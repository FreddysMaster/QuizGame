import { writable } from 'svelte/store';

export const score = writable(0);

export const categories = [
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

export const selectedCategories = writable(categories);


