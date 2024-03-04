import { prisma } from '$lib/server/prisma';
import { selectedCategories } from "$lib/stores.js";

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