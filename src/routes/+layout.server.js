
/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
    const response = await fetch(`http://localhost:3000/api/users`);
    let users = await response.json();

    return {
        users
    };
}

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        console.log(formData)
    }
}