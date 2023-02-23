<script>
  import ThreadCard from "$lib/components/threadCard.svelte";
  import CheckBox from "$lib/components/CheckBox.svelte";
  import { enhance } from "$app/forms";
  import { get } from "svelte/store";

  // Stores
  import { filteredThreads } from "$lib/stores/filteredThreads";
  import { filters } from "$lib/stores/filters";

  // Get data
  export let data;
  let tags = data.tags.available_tags;
  let filterData;

  let threads = get(filteredThreads).length
    ? get(filteredThreads)
    : data.threads.threads;

  // Subscribe to filter store changes
  filters.subscribe((value) => {
    filterData = value;
  });

  // Get tags beloning to threads
  threads.map((thread) => {
    let emoji = thread.applied_tags.map((tagId) => {
      let found = tags.find((tag) => tagId == tag.id);
      return { emoji: found.emoji_name, name: found.name };
    });
    thread.emoji = emoji;
    return emoji;
  });

  // Set client side search store
  function setSearch(searchQuery) {
    filters.update((values) => {
      return {
        ...values,
        search: searchQuery,
      };
    });
  }

  // Set client side sort store
  function setSortOption(e) {
    filters.update((values) => {
      return {
        ...values,
        sortBy: e.target.value,
      };
    });
  }

  // $: console.log(get(filters));
</script>

<!-- Main title -->
<h1>All threads</h1>

<!-- Search bar -->
<form method="POST" action="?/search" use:enhance>
  <input
    type="search"
    name="search"
    on:input={(e) => setSearch(e.target.value)}
    placeholder="Zoeken..."
  />
</form>

<!-- Sorting -->
<div>
  <form class="sort-form-wrapper" method="POST" action="?/sort" use:enhance>
    <select name="sort" id="sort" on:change={setSortOption}>
      <option value="date">datum</option>
      <option value="alphabetical">a-z</option>
      <option value="reactions">reacties</option>
    </select>
    <button type="submit">Submit sort</button>
  </form>
</div>

<main>
  <!-- Show all threads -->
  <div>
    {#each threads as thread}
      <ThreadCard name={thread.name} tags={thread.emoji} />
    {/each}
  </div>

  <!-- Filters -->
  <div class="filters">
    <h2>Filters</h2>

    <!-- Checkboxes -->
    <form method="POST" action="?/checkboxFilter" use:enhance>
      {#each tags as tag}
        <CheckBox
          name="checkbox"
          value={tag.id}
          emoji={tag.emoji_name}
          label={tag.name}
        />
      {/each}

      <!-- Apply filter button -->
      <div class="filter-checkboxes">
        <button type="submit">Apply filters</button>
      </div>
    </form>
  </div>
</main>

<style>
  h1 {
    color: #222;
    margin: 1.5rem 0;
  }

  input[type="search"] {
    margin: 1.5rem 0;
    width: 30rem;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    color: #fff;
    padding: 0.75rem;
    color: #222;
  }

  .filters {
    background-color: #fff;
    border: 1px solid #e5e5e5;
    color: #222;
    padding: 1rem 1.5rem;
    border-radius: 8px;
  }

  .sort-form-wrapper {
    display: inline-block;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  h2 {
    margin: 1.5rem 0;
  }

  select {
    text-transform: capitalize;
    border-radius: 1.5rem;
    text-align: center;
    padding: 0.25rem;
    border: 1px solid #e5e5e5;
    margin-bottom: 1rem;
  }

  /* Darkmode */
  @media (prefers-color-scheme: dark) {
    h1 {
      color: #fff;
    }

    input[type="search"] {
      background-color: #000000;
      border: 1px solid #333;
      color: #fff;
    }

    .filters {
      background-color: #000;
      border: 1px solid #333;
      color: #fff;
    }
  }
</style>
