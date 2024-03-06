import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const categories = await prisma.categories.findMany();

        return { categories };
    } catch (error) {
        console.log("Error fetching categories");
        console.log(error);
    }

};