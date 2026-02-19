<script lang="ts">
import { goto } from "$app/navigation";
import * as Card from "$lib/components/ui/card";
import type { Reminder } from "$lib/types/store.type";

let { reminder }: { reminder: Reminder } = $props();
</script>

<Card.Root onclick={() => goto(`reminder/${reminder.id}`)}>
<Card.Header>
    <Card.Title>{reminder.reminder.title}</Card.Title>
    <Card.Description>{reminder.location?.name || 'No Location Set'}</Card.Description>
</Card.Header>
</Card.Root>
