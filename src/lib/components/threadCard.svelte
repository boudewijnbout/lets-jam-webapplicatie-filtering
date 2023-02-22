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
	}

	ul {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
		flex-wrap: wrap;
	}

	li {
		font-size: 0.9rem;
		color: #222;
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
