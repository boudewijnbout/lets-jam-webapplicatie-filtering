<script>
	import { enhance } from "$app/forms";
	import { get } from "svelte/store";

	// Components
	import ThreadCard from "$lib/components/threadCard.svelte";
	import CheckBox from "$lib/components/CheckBox.svelte";
	import SearchBar from "$lib/components/searchBar.svelte";

	// Stores
	import { filteredThreads } from "$lib/stores/filteredThreads";
	import { filters } from "$lib/stores/filters";

	// Get data
	export let data;
	let tags = data.tags.available_tags;

	let threads = get(filteredThreads).length
		? get(filteredThreads)
		: data.threads.threads;

	filteredThreads.set(threads);

	$: threadsF = $filters.checkboxes.length
		? $filteredThreads.filter((thread) => {
				const hasEmoji = thread.applied_tags.filter((tag) =>
					$filters.checkboxes.includes(tag)
				);

				console.log(hasEmoji);

				if (hasEmoji.length) {
					return thread;
				}
		  })
		: $filteredThreads;

	$: console.log(threadsF);

	// Get tags beloning to threads
	threads.map((thread) => {
		let emoji = thread.applied_tags.map((tagId) => {
			let found = tags.find((tag) => tagId == tag.id);
			return { emoji: found.emoji_name, name: found.name };
		});
		thread.emoji = emoji;
		return emoji;
	});
</script>

<!-- Main title -->
<h1>All threads</h1>

<!-- Search bar -->
<SearchBar {threads} />

<!-- Sorting -->
<!-- <SortOptions /> -->

<main>
	<!-- Show all threads -->
	<div>
		{#each threadsF as thread}
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

	.filters {
		background-color: #fff;
		border: 1px solid #e5e5e5;
		color: #222;
		padding: 1rem 1.5rem;
		border-radius: 8px;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	h2 {
		margin: 1.5rem 0;
	}

	/* Darkmode */
	@media (prefers-color-scheme: dark) {
		h1 {
			color: #fff;
		}
		.filters {
			background-color: #000;
			border: 1px solid #333;
			color: #fff;
		}
	}
</style>
