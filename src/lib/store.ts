import { load } from "@tauri-apps/plugin-store";
import type { Reminder } from "./types/store.type";

// we cant just await the store as webkit will break </3
const getStore = load("store.json", {
	defaults: {},
	autoSave: false,
});

export const getReminders = async () => {
	const store = await getStore;
	return store.values() as Promise<Reminder[]>;
};

export const getReminder = async (
	id: string,
): Promise<Reminder | undefined> => {
	const store = await getStore;
	return store.get(id);
};

export const newReminder = async () => {
	const store = await getStore;
	const id = Date.now().toString();
	await store.set(id, { id, reminder: { title: "Untitled Reminder" } });
	await store.save();
	return id;
};

export const saveReminder = async (id: string, reminder: Reminder) => {
	const store = await getStore;
	await store.set(id, reminder);
	await store.save();
};

export const deleteReminder = async (id: string) => {
	const store = await getStore;
	await store.delete(id);
	await store.save();
};
