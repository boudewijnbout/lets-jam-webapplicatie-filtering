import { filters } from "$lib/stores/filters";
import { get } from "svelte/store";
import { filteredThreads } from "$lib/stores/filteredThreads";
import { object_without_properties } from "svelte/internal";

export const actions = {
	// Search bar handling
	search: async ({ request }) => {
		const formData = await request.formData();
		const searchQuery = formData.get("search");

		// Update store with search query
		filters.update((values) => {
			return {
				...values,
				search: searchQuery,
			};
		});
	},

	// Checkbox filter handeling
	checkboxFilter: async ({ request }) => {
		const formData = await request.formData();
		const checkboxesValue = formData.getAll("checkbox");

		// Update store value with selected checkboxes
		filters.update((values) => {
			return {
				...values,
				checkboxes: checkboxesValue,
			};
		});
	},

	// Sorting handeling
	sort: async ({ request }) => {
		const formData = await request.formData();
		const sortValue = formData.get("sort");

		filters.update((values) => {
			return {
				...values,
				sortBy: sortValue,
			};
		});
	},
};

export const load = async ({ fetch }) => {
	const [threadsReq, tagsReq] = await Promise.all([
		fetch("/threads.json"),
		fetch("/tags.json"),
	]);

	// Get JSON data
	const threads = await threadsReq.json();
	const tags = await tagsReq.json();

	// Get values from filter options
	let filterValues = get(filters);

	const searchTermFiltered = filterValues.search
		? threads.threads.filter((thread) => {
				return thread.name
					.toLowerCase()
					.includes(filterValues.search.toLowerCase());
		  })
		: threads.threads;

	const checkBoxesFiltered =
		filterValues.checkboxes.length === 0
			? searchTermFiltered
			: searchTermFiltered.filter((thread) => {
					const x = filterValues.checkboxes
						.map((checkbox) => {
							return thread.applied_tags.includes(checkbox);
						})
						.every(Boolean);
					return x;
			  });

	// Set filtered threads store
	filteredThreads.set(checkBoxesFiltered);

	// Return JSON
	return {
		threads,
		tags,
	};
};
