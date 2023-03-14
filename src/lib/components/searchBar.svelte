<script>
    import {enhance} from "$app/forms";
    import {filteredThreads} from "$lib/stores/filteredThreads";

    export let threads;

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

    <!-- Submit button	-->
    <button type="submit">Zoek</button>
</form>

<style>
    form {
        position: relative;
        display: flex;
        align-items: center;
        /*width: 35rem;*/
        margin: 1.5rem 0;
    }

    input {
        width: 100%;
        border-radius: 10px;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        padding: 0.65rem 1rem;
        color: #222;
    }

    button {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 0.6rem 1.5rem;
        cursor: pointer;
        background-color: var(--accent);
        color: #fff;
        position: absolute;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 0.85rem;
        transition: background-color 150ms;
        right: 0;
    }

    button:hover {
        background-color: var(--bg-btn-action);
    }

    @media (min-width: 75rem) {
        form {
            width: 35rem;
        }
    }
</style>
