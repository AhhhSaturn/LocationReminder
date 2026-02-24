export interface Reminder {
	id: string;
	location?: {
		name: string;
		data: {
			lng: number;
			lat: number;
		};
	};
	reminder: {
		title: string;
		content?: string;
	};
}
