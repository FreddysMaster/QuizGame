<script>
    import "$lib/app.css";
    import { loginSchema, registerSchema } from "$lib/schemas/zodschemas.js";
    import { fade } from "svelte/transition";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    export let data;

    let showModal = true;
    const {
        form: loginForm,
        errors: loginErrors,
        enhance: loginEnhance,
    } = superForm(data.loginForm, {
        resetForm: true,
        validators: zodClient(loginSchema),
        validationMethod: "submit",
    });

    const {
        form: registerForm,
        errors: registerErrors,
        enhance: registerEnhance,
    } = superForm(data.registerForm, {
        resetForm: true,
        validators: zodClient(registerSchema),
        validationMethod: "submit",
    });
</script>

<main>
    <div class="flex flex-col items-center justify-center h-[calc(100vh-4rem)]  bg-slate-100">
        <div class="flex flex-col items-center justify-center h-[calc(100vh-4rem)] w-2/6 my-24 rounded-lg bg-white">
            {#if showModal}
            <h1 class="text-3xl font-bold top-0 text-black">Login</h1>
                <form
                    class="w-full max-w-sm"
                    method="POST"
                    action="?/login"
                    use:loginEnhance
                >
                    <div in:fade={{ duration: 500 }}>
                        <div class="form-control w-full max-w-sm">
                            <label for="username" class="label">
                                <span class="label-text font-bold">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                class="input input-primary w-full max-w-sm{$loginErrors.username
                                    ? 'input-error'
                                    : 'input-bordered'}"
                                placeholder="Enter your username"
                                bind:value={$loginForm.username}
                            />
                            <label for="username" class="label">
                                {#if $loginErrors.username}
                                    <span class="label-text-alt text-error"
                                        >{$loginErrors.username}</span
                                    >
                                {/if}
                            </label>
                        </div>
                        <div class="form-control w-full max-w-sm">
                            <label for="password" class="label">
                                <span class="label-text font-bold">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                class="input input-primary w-full max-w-sm {$loginErrors.password
                                    ? 'input-error'
                                    : 'input-bordered'}"
                                placeholder="Enter your password"
                                bind:value={$loginForm.password}
                            />
                            <label for="password" class="label">
                                {#if $loginErrors.password}
                                    <span class="label-text-alt text-error"
                                        >{$loginErrors.password}</span
                                    >
                                {/if}
                            </label>
                        </div>
                        <div class="flex justify-center mt-4 space-x-12 ">
                            <button
                                class="btn w-24 "
                                on:click|preventDefault={() =>
                                    (showModal = false)}>Register</button
                            >
                            <button
                                class="btn w-24 btn-primary text-white"
                                type="submit">Login</button
                            >
                        </div>
                    </div>
                </form>
            {:else}
            <h1 class="text-3xl font-bold">Register</h1>
                <form
                    class="w-full max-w-sm"
                    method="POST"
                    action="?/register"
                    use:registerEnhance
                >
                    <div in:fade={{ duration: 500 }}>
                        <div class="form-control w-full max-w-sm">
                            <label for="username" class="label">
                                <span class="label-text font-bold">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                class="input input-primary w-screen max-w-sm {$registerErrors.username
                                    ? 'input-error'
                                    : 'input-bordered'}"
                                placeholder="Enter your username"
                                bind:value={$registerForm.username}
                            />
                            <label for="username" class="label">
                                {#if $registerErrors.username}
                                    <span class="label-text-alt text-error"
                                        >{$registerErrors.username}</span
                                    >
                                {/if}
                            </label>
                        </div>
                        <div class="form-control w-full max-w-sm">
                            <label for="email" class="label">
                                <span class="label-text font-bold">Email</span>
                            </label>
                            <input
                                type="text"
                                name="email"
                                class="input input-primary w-full max-w-sm {$registerErrors.email
                                    ? 'input-error'
                                    : 'input-bordered'}"
                                placeholder="Enter your email"
                                bind:value={$registerForm.email}
                            />
                            <label for="email" class="label">
                                {#if $registerErrors.email}
                                    <span class="label-text-alt text-error"
                                        >{$registerErrors.email}</span
                                    >
                                {/if}
                            </label>
                        </div>
                        <div class="form-control w-full max-w-sm">
                            <label for="password" class="label">
                                <span class="label-text font-bold">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                class="input input-primary w-full max-w-md {$registerErrors.password
                                    ? 'input-error'
                                    : 'input-bordered'}"
                                placeholder="Enter your password"
                                bind:value={$registerForm.password}
                            />
                            <label for="password" class="label">
                                {#if $registerErrors.password}
                                    <span class="label-text-alt text-error"
                                        >{$registerErrors.password}</span
                                    >
                                {/if}
                            </label>
                        </div>
                        <div class="form-control w-full max-w-sm">
                            <label for="confirmPassword" class="label">
                                <span class="label-text font-bold">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                class="input input-primary w-full max-w-sm {$registerErrors.confirmPassword
                                    ? 'input-error'
                                    : 'input-bordered'}"
                                placeholder="Confirm your password"
                                bind:value={$registerForm.confirmPassword}
                            />
                            <label for="confirmPassword" class="label">
                                {#if $registerErrors.confirmPassword}
                                    <span class="label-text-alt text-error"
                                        >{$registerErrors.confirmPassword}</span
                                    >
                                {/if}
                            </label>
                        </div>
                        <div class="flex justify-center mt-4 space-x-12">
                            <button
                                class="btn w-24"
                                on:click|preventDefault={() =>
                                    (showModal = true)}>Login</button
                            >
                            <button
                                class="btn btn-primary w-24 text-white"
                                type="submit">Register</button
                            >
                        </div>
                    </div>
                </form>
            {/if}
        </div>
        </div>
</main>