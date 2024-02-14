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
  border:  0.25em solid var(--border-color);
  background: var(--primary-color);
  border-radius:  10px;
  font-size: larger;
  padding:  .5em;
  cursor: pointer;
  width:  5em;
  color: var(--button-text-color);
}
</style>