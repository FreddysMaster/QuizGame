<script>
  import "$lib/styles.css";
</script>

<main>
  <nav>
    <a href="/login">
      <button class="login-button">Login</button>
    </a>
  </nav>
  <slot />
</main>

<style>
  nav {
    display: flex;
    justify-content: flex-end;
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
</style>
