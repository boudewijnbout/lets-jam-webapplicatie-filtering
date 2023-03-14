<script>
    import CheckBox from "./CheckBox.svelte";
    import {enhance} from "$app/forms";

    export let tags;
</script>

<!-- Filters -->
<div>
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
        <button type="submit">Apply filters</button>
    </form>
</div>

<style>
    div {
        background-color: #fff;
        border: 1px solid #e5e5e5;
        color: #222;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        position: relative;
    }

    button {
        margin-top: 1rem;
        padding: 0.5rem;
        background-color: var(--accent);
        color: #fff;
        font-size: 0.85rem;
        border-radius: 10px;
        position: absolute;
        right: 1.5rem;
        top: 1rem;
    }
</style>