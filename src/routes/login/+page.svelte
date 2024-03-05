<script>
    import "$lib/styles.css";
    import { fade } from "svelte/transition";
    import Icon from "@iconify/svelte";
    import { superForm } from "sveltekit-superforms";
    export let data;

    let showModal = true;
    const { form, enhance } = superForm(data.form);
</script>

<main>
    <div class="container">
        <div class="picture"></div>
        <div class="container-contents">
            {#if showModal}
                <form method="POST" use:enhance>
                    <div in:fade={{ duration: 500 }}>
                        <h2>Login</h2>
                        <div class="input-container">
                            <Icon
                                icon="fa-solid:envelope"
                                style="
              padding: 10px;
              background-color: #eeeeee;
              height: inherit;
              color: #424953;
              min-width: .5em;
              text-align: center;
              border-right: 1px solid #a9a9a9;"
                            />
                            <input
                                class="input-field"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div class="input-container">
                            <Icon
                                icon="fa-solid:lock"
                                style="
              padding: 10px;
              background-color: #eeeeee;
              height: inherit;
              color: #424953;
              min-width: .5em;
              text-align: center;
              border-right: 1px solid #a9a9a9;"
                            />
                            <input
                                class="input-field"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div class="remember-container">
                            <input type="checkbox" id="rememberme" />
                            <label for="rememberme">Remember Me</label>
                        </div>
                        <div class="login-container">
                            <button
                                class="alt-button"
                                on:click|preventDefault={() =>
                                    (showModal = false)}>Register</button
                            >
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
            {:else}
                <form method="POST" use:enhance>
                    <div in:fade={{ duration: 500 }}>
                        <h2>Register</h2>
                        <div class="input-container">
                            <Icon
                                icon="fa-solid:user"
                                style="
              padding: 10px;
              background-color: #eeeeee;
              height: inherit;
              color: #424953;
              min-width: .5em;
              text-align: center;
              border-right: 1px solid #a9a9a9;"
                            />
                            <input
                                class="input-field"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                bind:value={$form.username}
                            />
                        </div>
                        <div class="input-container">
                            <Icon
                                icon="fa-solid:envelope"
                                style="
              padding: 10px;
              background-color: #eeeeee;
              height: inherit;
              color: #424953;
              min-width: .5em;
              text-align: center;
              border-right: 1px solid #a9a9a9;"
                            />
                            <input
                                class="input-field"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                bind:value={$form.email}
                            />
                        </div>
                        <div class="input-container">
                            <Icon
                                icon="fa-solid:lock"
                                style="
              padding: 10px;
              background-color: #eeeeee;
              height: inherit;
              color: #424953;
              min-width: .5em;
              text-align: center;
              border-right: 1px solid #a9a9a9;"
                            />
                            <input
                                class="input-field"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                bind:value={$form.password}
                            />
                        </div>
                        <div class="input-container">
                            <Icon
                                icon="fa-solid:lock"
                                style="
              padding: 10px;
              background-color: #eeeeee;
              height: inherit;
              color: #424953;
              min-width: .5em;
              text-align: center;
              border-right: 1px solid #a9a9a9;"
                            />
                            <input
                                class="input-field"
                                name="password"
                                type="password"
                                placeholder="Confirm your password"
                                bind:value={$form.confirmPassword}
                            />
                        </div>
                        <div class="register-container">
                            <button
                                class="alt-button"
                                on:click|preventDefault={() =>
                                    (showModal = true)}>Login</button
                            >
                            <button type="submit">Register</button>
                        </div>
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
        width: 75%;
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

    .login-container {
        justify-content: space-around;
    }

    .register-container {
        justify-content: space-around;
    }

    /* Style the input container */
    .input-container {
        display: flex;
        width: 100%;
        margin-bottom: 1em;
        border-radius: 5px;
        border: 1px solid #a9a9a9;
        overflow: hidden;
    }

    /* Style the input fields */
    .input-field {
        width: 100%;
        padding: 1em;
        outline: none;
        border: none;
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
