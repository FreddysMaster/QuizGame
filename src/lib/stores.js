import { writable } from 'svelte/store';

export const score = writable(0);

export const categories = [
  {id: 1, name:"science"},
  {id: 2, name:"society_and_culture"},
  {id: 3, name:"arts_and_literature"},
  {id: 4, name:"music"},
  {id: 5, name:"sport_and_leisure"},
  {id: 6, name:"food_and_drink"},
  {id: 7, name:"geography"},
  {id: 8, name:"general_knowledge"},
  {id: 9, name:"film_and_tv"},
  {id: 10, name:"history"},
];

export const selectedCategories = writable(categories);


