import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

const schema = z.object({
  username: z.string().min(1).max(64).trim(),
  email: z.string().min(1).max(64).email(),
  password: z.string().min(1).max(64).trim()
});

/** @type {import('./$types').PageServerLoad} */
export const load = (async () => {
    const form = await superValidate(zod(schema));
  
    return { form };
  });

  export const actions = {
    default: async ({ request }) => {
      const form = await superValidate(request, zod(schema));
      console.log(form);
  
      if (!form.valid) {
        return fail(400, { form });
      }
  
      // TODO: Do something with the validated form.data
  
      return { form };
    }
  };