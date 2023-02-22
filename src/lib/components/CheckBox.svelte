<script>
	import { filters } from "$lib/stores/filters";
	import { get } from "svelte/store";

	export let name;
	export let value;
	export let label;
	export let emoji;

	function setChecked(e) {
		// Get value of selected checkbox(es)
		const newCheckboxvalue = e.target.value;

		// Update value of filter store
		filters.update((state) => {
			let newCheckboxes;

			// Check if a checkbox is selected
			if (e.target.checked) {
				const checkedCheckboxes = state.checkboxes.filter(
					(checkbox) => checkbox !== newCheckboxvalue
				);

				// Set value according to selected checkbox(es)
				newCheckboxes = [...checkedCheckboxes, newCheckboxvalue];
			} else {
				// Remove selected checkbox from store
				newCheckboxes = state.checkboxes.filter(
					(checkbox) => checkbox !== newCheckboxvalue
				);
			}

			// Place the selected checkboxes in the checkboxes store
			return {
				...state,
				checkboxes: newCheckboxes,
			};
		});
	}
</script>

<label>
	<input type="checkbox" {name} {value} on:input={setChecked} />
	<span>{emoji} {label}</span>
</label>

<style>
	label {
		display: flex;
		cursor: pointer;
		align-items: center;
		text-transform: capitalize;
	}

	span {
		padding: 0.35rem;
	}
</style>
