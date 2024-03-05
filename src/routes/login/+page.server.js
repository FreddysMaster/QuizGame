import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { Argon2id } from "oslo/password";
import { prisma } from '$lib/server/prisma';

const schema = z.object({
  username: z.string().min(1).max(64).trim(),
  email: z.string().min(1).max(64).email(),
  password: z.string().min(1).max(64).trim(),
  confirmPassword: z.string().min(1).max(64).trim()
});

/** @type {import('./$types').PageServerLoad} */
export const load = (async () => {
  const form = await superValidate(zod(schema));

  return { form };
});

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const hashedPassword = await new Argon2id().hash(form.data.password);

      await prisma.users.create({
        data: {
          username: form.data.username,
          email: form.data.email,
          password: hashedPassword,
        },
      })

      return { form };
    } catch (err) {
      console.error(err);
      return fail(500, { message: 'Could not create the user.' })
    }
  }
};