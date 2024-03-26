<script>
  import "$lib/app.css";
  import { page } from "$app/stores";
</script>

<main>
  {#if !$page.data.user}
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl text-black" href="/">Quiz Game</a>
      </div>
      <div class="navbar-end mr-4">
        <a href="/login" class="text-sm font-semibold leading-6 text-gray-900">Log in<span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  {:else if $page.data.user.user_type === "user"}
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl text-black" href="/">Quiz Game</a>
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="avatar placeholder">
          <div class="bg-neutral text-neutral-content rounded-full w-12">
            <span class="text-lg">D</span>
          </div>
        </div>
        <ul
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 text-black shadow rounded-box w-52"
        >
          <li>
            <a class="justify-between" href="/profile">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a href="/settings">Settings</a></li>
          <form method="POST" action="/logout">
            <li><button type="submit">Logout</button></li>
          </form>
        </ul>
      </div>
    </div>
  {:else}
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl text-black" href="/">Quiz Game</a>
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="avatar placeholder">
          <div class="bg-neutral text-neutral-content rounded-full w-12">
            <span class="text-lg">D</span>
          </div>
        </div>
        <ul
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52"
        >
          <li>
            <a class="justify-between" href="/profile">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a href="/admin">Admin</a></li>
          <li><a href="/settings">Settings</a></li>
          <form method="POST" action="/logout">
            <li><button type="submit">Logout</button></li>
          </form>
        </ul>
      </div>
    </div>
  {/if}
  <slot />
</main>
