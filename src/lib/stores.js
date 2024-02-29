import { writable } from 'svelte/store';


export const score = writable(0);

const response = await fetch(`http://localhost:3000/api/categories`);
export const categories = await response.json();

export const selectedCategories = writable(categories);


