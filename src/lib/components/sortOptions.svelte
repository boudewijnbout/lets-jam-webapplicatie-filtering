<script>
	import { enhance } from "$app/forms";

	// Set client side sort store
	function setSortOption(e) {
		filters.update((values) => {
			return {
				...values,
				sortBy: e.target.value,
			};
		});
	}
</script>

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

<style>
	.sort-form-wrapper {
		display: inline-block;
	}

	select {
		text-transform: capitalize;
		border-radius: 1.5rem;
		text-align: center;
		padding: 0.25rem;
		border: 1px solid #e5e5e5;
		margin-bottom: 1rem;
	}
</style>
