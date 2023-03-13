<script>
	import { enhance } from "$app/forms";
	import { filteredThreads } from "$lib/stores/filteredThreads";
	export let threads;
	import { get } from "svelte/store";

	// Set client side search store
	function filterThreads(searchQuery) {
		const filteredThreads = threads.filter((thread) => {
			return thread.name.toLowerCase().includes(searchQuery);
		});

		return filteredThreads;
	}
</script>

<form method="POST" action="?/search" use:enhance>
	<input
		type="search"
		name="search"
		on:input={(e) => filteredThreads.set(filterThreads(e.target.value))}
		placeholder="Zoeken..."
	/>
</form>

<style>
	input {
		margin: 1.5rem 0;
		width: 30rem;
		background-color: #fff;
		border: 1px solid #e5e5e5;
		color: #fff;
		padding: 0.75rem;
		color: #222;
	}

	@media (prefers-color-scheme: dark) {
		input {
			background-color: #000000;
			border: 1px solid #333;
			color: #fff;
		}
	}
</style>
