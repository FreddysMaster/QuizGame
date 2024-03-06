<script>
    import "$lib/styles.css";
    import { loginSchema, registerSchema } from '$lib/schemas/zodschemas.js';
    import { fade } from "svelte/transition";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from 'sveltekit-superforms/adapters';
    export let data;

    let showModal = true;
    const { form, errors, enhance } = superForm(data.loginForm, {
        resetForm: true,
        validators: zodClient(loginSchema),
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
    <div class="container">
        <div class="picture"></div>
        <div class="container-contents">
            {#if showModal}
                <form method="POST" action="?/login" use:enhance>
                    <div in:fade={{ duration: 500 }}>
                        <h2>Login</h2>
                        <div class="input-container">
                            <label for="username">Username</label>
                            <input
                                class="input-field"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                bind:value={$form.username}
                            />
                            {#if $errors.username}
                                <small>{$errors.username}</small>
                            {/if}
                        </div>
                        <div class="input-container">
                            <label for="password">Password</label>
                            <input
                                class="input-field"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                bind:value={$form.password}
                            />
                            {#if $errors.password}
                                <small>{$errors.password}</small>
                            {/if}
                        </div>
                        <div class="remember-container">
                            <input type="checkbox" id="rememberme" />
                            <label for="rememberme">Remember Me</label>
                        </div>
                        <button
                            class="alt-button"
                            on:click|preventDefault={() => (showModal = false)}
                            >Register</button
                        >
                        <button type="submit">Login</button>
                    </div>
                </form>
            {:else}
                <form method="POST" action="?/register" use:registerEnhance>
                    <div in:fade={{ duration: 500 }}>
                        <h2>Register</h2>
                        <div class="input-container">
                            <label for="username">Username</label>
                            <input
                                class="input-field"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                bind:value={$registerForm.username}
                            />
                            {#if $registerErrors.username}
                                <small>{$registerErrors.username}</small>
                            {/if}
                        </div>
                        <div class="input-container">
                            <label for="email">Email</label>
                            <input
                                class="input-field"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                bind:value={$registerForm.email}
                            />
                            {#if $registerErrors.email}
                                <small>{$registerErrors.email}</small>
                            {/if}
                        </div>
                        <div class="input-container">
                            <label for="password">Password</label>
                            <input
                                class="input-field"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                bind:value={$registerForm.password}
                            />
                            {#if $registerErrors.password}
                                <small>{$registerErrors.password}</small>
                            {/if}
                        </div>
                        <div class="input-container">
                            <label for="confirmPassword">Confirm Password</label
                            >
                            <input
                                class="input-field"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                bind:value={$registerForm.confirmPassword}
                            />
                            {#if $registerErrors.confirmPassword}
                                <small>{$registerErrors.confirmPassword}</small>
                            {/if}
                        </div>
                        <button
                            class="alt-button"
                            on:click|preventDefault={() => (showModal = true)}
                            >Login</button
                        >
                        <button type="submit">Register</button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
</main>

<style>
    :root {
        background-color: var(--background-color);
    }
    h2 {
        margin-top: 0;
    }

    small {
        color: #ff5861;
    }

    .remember-container {
        display: flex;
        align-items: start;
        margin: 1em 0 2em 0;
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1em;
        border-radius: 10px;
        height: calc(100vh - 150px);

    }

    .picture {
        display: inherit;
        width: 50%;
        height: inherit;
        overflow: hidden;
        border-radius: 10px 0px 0px 10px;
        background-image: url(https://images.unsplash.com/photo-1606766923156-15fa276e8f07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
    }

    .container-contents {
        display: inherit;
        width: 50%;
        height: inherit;
        background-color: #24242c;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        border-radius: 0px 10px 10px 0px;
    }

    /* Style the input container */
    .input-container {
        display: grid;
        width: 100%;
        margin-bottom: 1em;
        border: none;
    }

    /* Style the input fields */
    .input-field {
        width: inherit;
        padding: 1em;
        outline: none;
        border: none;
        border-radius: 5px;
    }

    /* Style the login button */
    button {
        background-color: var(--primary-color);
        border: none;
        border-radius: 5px;
        padding: 0.5em 1em;
        font-size: 1em;
        cursor: pointer;
        color: var(--button-text-color);
        width: 8em;
    }

    button:hover {
        background-color: var(--hover-color);
    }

    .alt-button {
        background: none;
        border: 1px solid #a9a9a9;
        border-radius: 5px;
        padding: 0.5em 1em;
        font-size: 1em;
        cursor: pointer;
        color: #a9a9a9;
        width: 8em;
    }
    .alt-button:hover {
        background: #a9a9a9;
        color: white;
    }
</style>
