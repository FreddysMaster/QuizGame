// +page.js
import { get } from 'svelte/store';
import { selectedCategories } from "$lib/stores.js";

export async function load({ fetch }) {
  try {
    const response = await fetch(`http://localhost:3000/api/questions`);
    const allQuestions = await response.json();

    // Get the IDs of the selected categories
    const selectedCategoryIds = get(selectedCategories).map(category => category.id);

    // Filter questions based on whether their category_id is included in the selectedCategoryIds
    const filteredQuestions = allQuestions.filter(question => selectedCategoryIds.includes(question.category_id));

    // Shuffle the questions
    const questions = shuffleArray(filteredQuestions);

    return {
      questions
    };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return {
      status:  500,
      error: "Failed to load questions"
    };
  }
}

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length -  1; i >  0; i--) {
    const j = Math.floor(Math.random() * (i +  1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
