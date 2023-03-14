<script>
    import {get} from "svelte/store";

    // Components
    import ThreadCard from "$lib/components/threadCard.svelte";
    import SearchBar from "$lib/components/searchBar.svelte";
    import Filters from "$lib/components/filters.svelte";

    // Stores
    import {filteredThreads} from "$lib/stores/filteredThreads";
    import {filters} from "$lib/stores/filters";

    // Get data
    export let data;
    let tags = data.tags.available_tags;

    let threads = get(filteredThreads).length
        ? get(filteredThreads)
        : data.threads.threads;

    filteredThreads.set(threads);

    $: threadsF = $filters.checkboxes.length
        ? $filteredThreads.filter((thread) => {
            const hasEmoji = thread.applied_tags.filter((tag) =>
                $filters.checkboxes.includes(tag)
            );
            if (hasEmoji.length) {
                return thread;
            }
        })
        : $filteredThreads;

    // Get tags beloning to threads
    threads.map((thread) => {
        let emoji = thread.applied_tags.map((tagId) => {
            let found = tags.find((tag) => tagId == tag.id);
            return {emoji: found.emoji_name, name: found.name};
        });
        thread.emoji = emoji;
        return emoji;
    });
</script>

<!-- Main title -->
<h1>Alle vragen</h1>

<!-- Search bar -->
<SearchBar {threads}/>

<!-- Sorting -->
<!-- <SortOptions />-->

<main>
    <!-- Show all threads -->
    <div>
        {#each threadsF as thread}
            <ThreadCard name={thread.name} tags={thread.emoji}/>
        {/each}
    </div>

    <!-- Filters -->
    <Filters {tags} />
</main>

<style>
    h1 {
        color: #222;
        margin: 1.5rem 0;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    h2 {
        margin: 1.5rem 0;
    }
</style>
