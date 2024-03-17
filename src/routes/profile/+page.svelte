<script>
    import "$lib/app.css";
    import { superForm } from 'sveltekit-superforms';
    export let data;

    const { form, errors, enhance } = superForm(data.form);
</script>

<main>
    <h1 class="text-3xl font-bold">My Profile</h1>
    <form method="POST" use:enhance>
    <div class="form-control w-full max-w-sm">
        <label for="username" class="label">
            <span class="label-text font-bold">Username</span>
        </label>
        <input
            type="text"
            name="username"
            class="input input-primary w-screen max-w-sm {$form.username
                ? 'input-error'
                : 'input-bordered'}"
            placeholder="Enter your username"
            bind:value={$form.username}
        />
        <label for="username" class="label">
            {#if $errors.username}
                <span class="label-text-alt text-error">{$errors.username}</span>
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
            class="input input-primary w-full max-w-sm {$form.email
                ? 'input-error'
                : 'input-bordered'}"
            placeholder="Enter your email"
            bind:value={$form.email}
        />
        <label for="email" class="label">
            {#if $errors.email}
                <span class="label-text-alt text-error">{$errors.email}</span>
            {/if}
        </label>
    </div>
    <h1 class="text-3xl font-bold">Reset Password</h1>
    <div class="form-control w-full max-w-sm">
        <label for="password" class="label">
            <span class="label-text font-bold">Reset Password</span>
        </label>
        <input
            type="password"
            name="password"
            class="input input-primary w-full max-w-md {$form.password
                ? 'input-error'
                : 'input-bordered'}"
            placeholder="Enter your password"
            bind:value={$form.password}
        />
        <label for="password" class="label">
            {#if $errors.password}
                <span class="label-text-alt text-error">{$errors.password}</span>
            {/if}
        </label>
    </div>
</form>
</main>
