import type { Position } from "@tauri-apps/api/dpi";
import {
	checkPermissions,
	clearWatch,
	getCurrentPosition,
	requestPermissions,
	watchPosition,
} from "@tauri-apps/plugin-geolocation";

const getLocationPermission = async () => {
	let permissions = await checkPermissions();
	if (
		permissions.location === "prompt" ||
		permissions.location === "prompt-with-rationale"
	) {
		permissions = await requestPermissions(["location"]);
	}
	if (permissions.location !== "granted") return false;
	return true;
};

const handleLocationUpdate = (position: Position) => {};

export const startLocationWatcher = async () => {
	const permission = await getLocationPermission();
	if (!permission) {
		console.error("no perms");
		return;
	}

	console.log("hi meow", localStorage.getItem("watcherId"));

	if (localStorage.getItem("watcherId")) {
		console.log("[MEOWWW] deleteding old watcher");
		await clearWatch(Number(localStorage.getItem("watcherId")));
		localStorage.removeItem("watcherId");
	}

	const watcherId = await watchPosition(
		{ enableHighAccuracy: true, timeout: 100000, maximumAge: 0 },
		(pos) => {
			console.log("meow!!");
			console.log(JSON.stringify(pos));
		},
	);
	console.log("");
	localStorage.setItem("watcherId", String(watcherId));
	console.log("[MEOWWW] saved new watcher");
};
