import { writable } from 'svelte/store';

export const score = writable(0);

export const categories = writable([]);
export const selectedCategories = writable(categories);
