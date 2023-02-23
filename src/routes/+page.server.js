import { filters } from "$lib/stores/filters";
import { get } from "svelte/store";
import { filteredThreads } from "$lib/stores/filteredThreads";

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

	// Get threads that match filter options
	if (filteredThreads) {
		const filteredItems = threads.threads.filter((thread) => {
			return filterValues.checkboxes.some(element => thread.applied_tags.includes(element));
		});	

		// Set filtered threads store
		filteredThreads.set(filteredItems);
		console.log(get(filteredThreads));
	}

	// Return JSON
	return {
		threads,
		tags,
	};
};
