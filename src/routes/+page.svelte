<script lang="ts">
import PlusIcon from "@lucide/svelte/icons/badge-plus";
import { goto } from "$app/navigation";
import ReminderTile from "$lib/components/ReminderTile.svelte";
import { Button } from "$lib/components/ui/button";
import * as Empty from "$lib/components/ui/empty/index.js";
import { getLoc } from "$lib/geo";
import { newReminder as createNewReminder, getReminders } from "$lib/store";

const newReminder = () =>
	createNewReminder().then((id) => goto(`/reminder/${id}`));
</script>

{#await getReminders() then reminders}
{#if reminders.length > 0}
    <main class="flex flex-col gap-3 h-full overflow-scroll">
    {#each reminders as reminder}
       	<ReminderTile reminder={reminder}/>
    {/each}
    </main>
{:else}
<Empty.Root>
    <Empty.Header>
        <Empty.Title>No Reminders Yet</Empty.Title>
    </Empty.Header>
    <Empty.Content>
        <Button onclick={newReminder} variant="secondary">New Reminder</Button>
    </Empty.Content>
</Empty.Root>
{/if}
{/await}

<button onclick={getLoc}>meow</button>

<Button variant="outline" onclick={newReminder} class="bg-card rounded-4xl absolute bottom-5 right-5 w-14 h-14">
    <PlusIcon class="size-7"/>
</Button>
