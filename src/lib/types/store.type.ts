export interface Reminder {
	id: string;
	location?: {
		name: string;
		data: string;
	};
	reminder: {
		title: string;
		content?: string;
	};
}
