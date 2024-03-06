// +page.js
import { prisma } from '$lib/server/prisma';

export async function load() {
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
