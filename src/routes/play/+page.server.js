// +page.js
import { prisma } from '$lib/server/prisma';
import { selectedCategories } from '$/lib/stores';
import { redirect } from '@sveltejs/kit';

export async function load() {
  if (selectedCategories == []) {
    redirect(305, '/');
  }

  try {
    const questions = await prisma.questions.findMany();

    return {
      questions
    };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return {
      status: 500,
      error: "Failed to load questions"
    };
  }
}
