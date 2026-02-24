<script lang="ts">
import { invoke } from "@tauri-apps/api/core";
import { PlaceAutocomplete } from "places-autocomplete-svelte";
import type {
	ComponentOptions,
	PlaceResult,
} from "places-autocomplete-svelte/interfaces";

const apiKey: Promise<string> = invoke("get_key");

let {
	location = $bindable(),
	dialogOpen = $bindable(),
}: {
	location: { name: string; data: { lng: number; lat: number } } | undefined;
	dialogOpen: boolean;
} = $props();

const onResponse = (response: PlaceResult) => {
	if (!response.location) return;
	const name = `${response.addressComponents[0].longText} ${response.addressComponents[1].longText}, ${response.addressComponents[2].longText}`;

	location = {
		data: {
			lat: response.location.lat,
			lng: response.location.lng,
		},
		name,
	};
	dialogOpen = false;
};

const onError = (error: string) => {
	console.error("Places Autocomplete Error:", error);
};

const options: ComponentOptions = {
	autofocus: true,
	clear_input: false,
	classes: {
		container: "relative z-10 transform rounded-xl mt-4 mb-32",
	},
};
</script>

{#await apiKey then apiKey}
<PlaceAutocomplete
    PUBLIC_GOOGLE_MAPS_API_KEY={apiKey}
    fetchFields={["location", "addressComponents"]}
    {options}
    {onResponse}
    {onError}
/>
{/await}
