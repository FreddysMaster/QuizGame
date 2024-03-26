/** @type {import('./$types').PageServerLoad} */
import { profileSchema } from '$lib/schemas/zodschemas.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  if (!locals.user) {
    redirect(302, '/');
  }
  const profileForm = await superValidate(zod(profileSchema));

  return { user: locals.user, profileForm: profileForm};
}