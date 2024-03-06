import { loginSchema, registerSchema } from '$lib/schemas/zodschemas.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from "oslo/password";
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageServerLoad} */
export const load = (async () => {

  const loginForm = await superValidate(zod(loginSchema));
  const registerForm = await superValidate(zod(registerSchema));

  return { loginForm, registerForm };
});

export const actions = {
  login: async ({ request }) => {
    const loginForm = await superValidate(request, zod(loginSchema));
    console.log(loginForm);

    if (!loginForm.valid) return fail(400, { loginForm });

    // TODO: Login user
    return message(loginForm, 'Login form submitted');
  },
  register: async ({ request }) => {
    const registerForm = await superValidate(request, zod(registerSchema));

    if (!registerForm.valid) {
      return fail(400, { registerForm });
    }

    try {
      const hashedPassword = await new Argon2id().hash(registerForm.data.password);

      await prisma.users.create({
        data: {
          username: registerForm.data.username,
          email: registerForm.data.email,
          password: hashedPassword,
        },
      })

      redirect(302, "/");

    } catch (err) {
      console.error(err);
      return fail(500, { message: 'Could not create the user.' })
    }
  }
};