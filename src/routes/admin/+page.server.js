import { questionSchema } from "$lib/schemas/zodschemas.js";
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export async function load( {locals}) {
    if (locals.user.user_type != 'admin') {
        redirect(302, '/');
      }

  try {
    const questions = await prisma.questions.findMany();
    const categories = await prisma.categories.findMany();
    const editQuestionForm = await superValidate(zod(questionSchema));
    const addQuestionForm = await superValidate(zod(questionSchema));

    return {
      questions, categories, editQuestionForm, addQuestionForm
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
    const editForm = await superValidate(request, zod(questionSchema));

    if (!editForm.valid) {
      return fail(400, { editForm });
    }

    console.log(editForm)
  },
  addQuestion: async ({ request }) => {
    const addQuestionForm = await superValidate(request, zod(questionSchema));

		try {
			await prisma.questions.create({
				data: {
					question: addQuestionForm.data.question,
					answer1: addQuestionForm.data.answer1,
          answer2: addQuestionForm.data.answer2,
          answer3: addQuestionForm.data.answer3,
          answer4: addQuestionForm.data.answer4,
          correctAnswer: addQuestionForm.data.correctAnswer,
          category_id: addQuestionForm.data.category_id,
				},
			})
		} catch (err) {
			console.error(err)
			return fail(500, { message: "Could not add the question." })
		}

		return {
			status: 201,
		}
  }
};