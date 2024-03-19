import { loginSchema, registerSchema } from '$lib/schemas/zodschemas.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt'
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageServerLoad} */
export const load = (async ({ locals }) => {
  if (locals.user) {
    redirect(302, '/');
  }
  const loginForm = await superValidate(zod(loginSchema));
  const registerForm = await superValidate(zod(registerSchema));

  return { loginForm, registerForm };
});

export const actions = {
  login: async ({ cookies, request }) => {
    const loginForm = await superValidate(request, zod(loginSchema));

    console.log(loginForm)
    if (!loginForm.valid) return fail(400, { loginForm });

    const user = await prisma.users.findUnique({
      where: { username: loginForm.data.username },
    })

    if (!user) {
      return fail(400, { credentials: true })
    }

    const userPassword = await bcrypt.compare(loginForm.data.password, user.password)

    if (!userPassword) {
      return fail(400, { credentials: true })
    }

    // generate new auth token just in case
    const authenticatedUser = await prisma.users.update({
      where: { username: user.username },
      data: { userAuthToken: crypto.randomUUID() },
    })

    cookies.set('session', authenticatedUser.userAuthToken, {
      // send cookie for every page
      path: '/',
      // server side only cookie so you can't use `document.cookie`
      httpOnly: true,
      // only requests from same site can send cookies
      // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
      sameSite: 'strict',
      // only sent over HTTPS in production
      secure: process.env.NODE_ENV === 'production',
      // set cookie to expire after a month
      maxAge: 60 * 60 * 24 * 30,
    })

    // redirect the user
    redirect(302, '/')
  },
  register: async ({ request }) => {
    const registerForm = await superValidate(request, zod(registerSchema));

    if (!registerForm.valid) {
      return fail(400, { registerForm });
    }

    const user = await prisma.users.findUnique({
      where: { username: registerForm.data.username },
    })

    if (user) {
      return fail(400, { message: "Username is taken." })
    }

    try {
      await prisma.users.create({
        data: {
          username: registerForm.data.username,
          email: registerForm.data.email,
          password: await bcrypt.hash(registerForm.data.password, 10),
          userAuthToken: crypto.randomUUID(),
        },
      }),
      redirect(302, '/');
    } catch (err) {
      console.error(err);
      return fail(500, { message: "Could not create the user." })
    }
  }
};