export const load = async ({ fetch }) => {
	const [threadsReq, tagsReq] = await Promise.all([
		fetch("/threads.json"),
		fetch("/tags.json"),
	]);

	const threads = await threadsReq.json();
	const tags = await tagsReq.json();

	return {
		threads,
		tags,
	};
};
