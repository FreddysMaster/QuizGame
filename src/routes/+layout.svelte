<script>
  import "$lib/styles.css";
  import Modal from "$lib/Modal.svelte";
  import { fade } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import { enhance } from '$app/forms';

  let showModal = false;
</script>

<main>
  <nav>
    <button
      class="login-button"
      on:click={() => {
        showModal = true;
      }}>Login</button
    >
    <Modal bind:showModal>
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
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div class="remember-container">
            <input type="checkbox" id="rememberme" />
            <label for="rememberme">Remember Me</label>
          </div>
          <div class="login-container">
            <button class="alt-button" on:click|preventDefault={() => (showModal = false)}
              >Register</button
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
              type="text"
              placeholder="Enter your username"
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
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div class="register-container">
            <button class="alt-button" on:click|preventDefault={() => (showModal = true)}
              >Login</button
            >
            <button type="submit">Register</button>
          </div>
        </div>
      </form>
      {/if}
    </Modal>
  </nav>
  <slot />
</main>

<style>
  nav {
    display: flex;
    justify-content: flex-end;
  }

  h2 {
    margin-top: 0;
  }

  .remember-container {
    display: flex;
    align-items: start;
    margin: 1em 0 2em 0;
  }

  .login-container {
    display: flex;
    justify-content: space-around;
  }

  .register-container {
    display: flex;
    justify-content: space-around;
  }

  .login-button {
    border: 0.25em solid var(--border-color);
    background: var(--primary-color);
    border-radius: 10px;
    font-size: larger;
    padding: 0.5em;
    cursor: pointer;
    width: 5em;
    color: var(--button-text-color);
  }

  .login-button:hover {
    background: var(--hover-color);
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
