<script>
	import "$lib/styles.css";
  import { InlineModal } from 'svelte-inline-modal'
</script>

<main>
<nav>
  <InlineModal let:open>
    <!-- Open Button -->
    <button class="login-button" on:click={open}>Login</button>
  
    <!-- Modal Content -->
    <div slot="menu" let:close>
      <h2>It's Modal Menu</h2>
  </InlineModal>

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