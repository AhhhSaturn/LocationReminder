import { invoke } from "@tauri-apps/api/core";
import {
	isPermissionGranted,
	requestPermission,
	sendNotification,
} from "@tauri-apps/plugin-notification";

export interface ScheduleTime {
	dateTime?: string; // ISO 8601 format
	duration?: number; // seconds
}

export interface ScheduleTaskRequest {
	taskName: string;
	scheduleTime: ScheduleTime;
}

export const schedule = async () => {
	let permissionGranted = await isPermissionGranted();

	// If not we need to request it
	if (!permissionGranted) {
		const permission = await requestPermission();
		permissionGranted = permission === "granted";
	}

	const payload: ScheduleTaskRequest = {
		taskName: "send_notif",
		scheduleTime: {
			duration: 5,
		},
	};

	invoke("plugin:schedule-task|schedule_task", {
		payload,
	});
};

// if (window.Worker) {
// 	setInterval(() => {
// 		sendNotification({ title: "worker", body: "from worker" });
// 	}, 1500);
// } else {
// 	const worker = new Worker(new URL("./notif.ts", import.meta.url));
// 	if (permissionGranted) {
// 		sendNotification({ title: "main", body: "from main" });
// 	}
// }
