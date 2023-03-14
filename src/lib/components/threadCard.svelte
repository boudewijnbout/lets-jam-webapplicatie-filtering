<script>
	export let name;
	export let tags;
</script>

<div>
	<h2>{name}</h2>

	<ul>
		{#each tags as tag}
			<li>{`${tag.emoji} ${tag.name}`}</li>
		{/each}
	</ul>
</div>

<style>
	div {
		background-color: #fff;
		color: #fff;
		border: 1px solid #e5e5e5;
		border-radius: 8px;
		padding: 1rem 1.5rem;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 1.35rem;
		color: #222;
		font-family: "Montserrat", sans-serif;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
	}

	li {
		font-size: 0.75rem;
		color: var(--text-secondary);
		text-transform: uppercase;
		font-family: "Rubik", sans-serif;
		font-weight: 600;
		border: 1px solid var(--element-border);
		padding: 0.3rem 0.9rem;
		border-radius: 3rem;
		margin-right: 0.3rem;
	}

	@media (prefers-color-scheme: dark) {
		div {
			background-color: #000000;
			border: 1px solid #333;
		}

		h2 {
			color: #fff;
		}

		li {
			color: #fff;
		}
	}
</style>
