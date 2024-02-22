<script>
  import "$lib/styles.css";
  import Modal from '$lib/Modal.svelte';
  let showModal = false;
  let username = '';
  let email = '';
  let password = '';

  function handleLogin() {
    // Here you can handle the login logic, e.g., send a request to the server
    console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);
    showModal = false; // close the modal after login
  }
</script>

<main>
  <nav>
      <button class="login-button" on:click={() => (showModal = true)}>Login</button>
      <Modal bind:showModal >
        <h2 slot="header">Login</h2>
        <h3>Username: </h3>
        <input bind:value={username} placeholder="Enter your username" />
        <h3>Email: </h3>
        <input bind:value={email} type="email" placeholder="Enter your email" />
        <h3>Password: </h3>
        <input bind:value={password} type="password" placeholder="Enter your password" />
        <a href="#" onclick={() => (showModal = false)}>Register</a>
        <br>
        <button on:click={handleLogin}>Login</button>
      </Modal>   
  </nav>
  <slot />
</main>

<style>
  nav {
    display: flex;
    justify-content: flex-end;
  }

  .login-button {
    border:  0.25em solid var(--border-color);
    background: var(--primary-color);
    border-radius:  10px;
    font-size: larger;
    padding:  0.5em;
    cursor: pointer;
    width:  5em;
    color: var(--button-text-color);
  }

  .login-button:hover {
    background: var(--hover-color);
  }

/* Add styles for the input fields to improve usability */
input {
    display: block;
    width:  100%;
    padding:  0.5em;
    margin-bottom:  1em;
    font-size:  1em;
}

/* Style the login button */
button {
    background-color: var(--primary-color);
    border: none;
    border-radius:  10px;
    padding:  0.5em  1em;
    font-size:  1em;
    cursor: pointer;
    color: var(--button-text-color);
}

button:hover {
    background-color: var(--hover-color);
}
</style>
