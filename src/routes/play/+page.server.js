// +page.js
import { get } from 'svelte/store';
import { selectedCategories } from "$lib/stores.js";
import { prisma } from '$lib/server/prisma';

export async function load() {
  try {
    const allQuestions = await prisma.questions.findMany()
    
    // Get the IDs of the selected categories
    const selectedCategoryIds = get(selectedCategories).map(category => category.category_id);

    console.log(selectedCategoryIds);

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
