export function convertTimestamp(timestamp) {
	var date = new Date(timestamp * 1000);
	return date.toUTCString();
}

export function convertDateFormat(dateString) {
	const date = new Date(dateString);
	return date.toISOString().slice(0, 10).replace(/-/g, '/');
}

export function convertDateToTimestamp(dateString) {
	const [day, month, year] = dateString.split('.');

	const timestamp = Math.floor(Date.UTC(year, month - 1, day) / 1000);

	return timestamp;
}
