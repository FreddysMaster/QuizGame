import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';
import { Argon2id } from "oslo/password";
import { prisma } from '$lib/server/prisma';

const loginSchema = z.object({
  username: z.string().min(1).max(64).trim(),
  password: z.string().min(1).max(64).trim()
});

const registerSchema = z.object({
  username: z.string().min(1).max(64).trim(),
  email: z.string().min(1).max(64).email(),
  password: z.string().min(1).max(64).trim(),
  confirmPassword: z.string().min(1).max(64).trim()
});

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
    console.log(registerForm);

    if (!registerForm.valid) {
      return fail(400, { registerForm });
    }

    if (registerForm.data.password != registerForm.data.confirmPassword){ 
      console.log("FAIL");
      return fail(504, { message: 'Passwords do not match' })
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

      return { registerForm };
    } catch (err) {
      console.error(err);
      return fail(500, { message: 'Could not create the user.' })
    }
  }
};