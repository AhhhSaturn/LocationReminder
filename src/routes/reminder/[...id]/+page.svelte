<script lang="ts">
import ReminderIcon from "@lucide/svelte/icons/bell-dot";
import MapIcon from "@lucide/svelte/icons/map-pin";
import DeleteIcon from "@lucide/svelte/icons/trash-2";
import { beforeNavigate, goto } from "$app/navigation";
import { page } from "$app/state";
import * as InputGroup from "$lib/components/ui/input-group/index.js";
import { deleteReminder, getReminder, saveReminder } from "$lib/store";
import type { Reminder } from "$lib/types/store.type";

const reminder = $state(
	await getReminder(page.params.id as string).then((reminder) => {
		if (!reminder) goto("/");
		return reminder as Reminder;
	}),
);

beforeNavigate(async (nav) => {
	if (nav.type !== "popstate") return;
	await saveReminder(reminder.id, $state.snapshot(reminder));
});
</script>

<InputGroup.Root class="h-full!">
<InputGroup.Addon align="block-start" class="border-b">
    <ReminderIcon />
    <InputGroup.Input class="border rounded-lg" placeholder="Reminder Title" bind:value={reminder.reminder.title} />
    <InputGroup.Button onclick={() => {deleteReminder(reminder.id); goto('/')}} class="h-9 rounded-lg" variant="outline"><DeleteIcon/></InputGroup.Button>
</InputGroup.Addon>
<InputGroup.Textarea
    placeholder="Reminder Content"
    bind:value={reminder.reminder.content}
/>
<InputGroup.Addon align="block-end" class="border-t">
    <div class="flex flex-row gap-2 border px-2 py-1 rounded-md">
    <InputGroup.Text>18 lant close</InputGroup.Text>
    <InputGroup.Button variant="secondary"><MapIcon/></InputGroup.Button>
    </div>
</InputGroup.Addon>
</InputGroup.Root>
