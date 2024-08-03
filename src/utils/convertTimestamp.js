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

export function convertUnixTimestampToDate(unixTimestamp) {
	// Создаем объект Date из Unix timestamp (в миллисекундах)
	const date = new Date(unixTimestamp * 1000);

	// Получаем составляющие даты
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	// Форматируем дату в "DD.MM.YYYY HH:mm"
	const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

	return formattedDate;
}
