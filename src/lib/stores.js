import { readable, writable } from 'svelte/store';

export const score = writable(0);

export const selectedCategories = writable([]);

export const categoriesIcons = readable({
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
  });

export const colors = readable([
    "#e6d642", // Yellow
    "#f94e4e", // Red
    "#685af5", // Purple
    "#307de7", // Blue
    "#a656fd", // Violet
    "#e857ed", // Pink
    "#3ce976", // Green
    "#56cfef", // Light Blue
    "#4b0082", // Indigo
    "#ee3f73", // Hot Pink
  ]);
  

