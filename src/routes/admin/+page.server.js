
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export async function load( {locals}) {
    if (locals.user.user_type != 'admin') {
        redirect(302, '/');
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

/** @type {import('./$types').Actions} */
export const actions = {
  deleteQuestions: async ({ url }) => {
    const idStr = url.searchParams.get("ids")
    const ids = idStr.split(',').map(Number);
    if(!ids){
      return fail(405, {message: 'Invalid request'})
    }

    try {
      await prisma.questions.deleteMany({
        where: {
          question_id: { in: ids },
        },
      })
    }
    catch (error) {
      console.error("Error fetching Ids:", error);
    }
  },
  saveEdit: async ({ request }) => {
    if(!id){
      return fail(405, {message: 'Invalid request'})
    }

    try {
    
    }
    catch (error) {
      console.error("Error fetching Ids:", error);
    }
  }
};
