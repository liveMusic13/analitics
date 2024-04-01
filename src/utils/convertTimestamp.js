export function convertTimestamp(timestamp) {
	var date = new Date(timestamp * 1000);
	// console.log('date', date);
	// console.log('date.toUTCString()', date.toUTCString());

	// return date.toUTCString();
	return date;
}

export function convertDateFormat(dateString) {
	const date = new Date(dateString);
	return date.toISOString().slice(0, 10).replace(/-/g, '/');
}

export function convertDateToTimestamp(dateTimeString) {
	// const [day, month, year] = dateTimeString.split('.');

	// const timestamp = Math.floor(Date.UTC(year, month - 1, day) / 1000);

	// return timestamp;
	const date = new Date(dateTimeString);
	return Math.floor(date / 1000);
}
