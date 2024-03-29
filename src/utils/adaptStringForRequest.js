export function adaptStringForRequest(inputString) {
	// Проверяем, есть ли пробелы или запятые в строке
	if (inputString.includes(' ') || inputString.includes(',')) {
		// Заменяем пробелы на %20 и запятые на %2C
		const encodedString = inputString.replace(/ /g, '%20').replace(/,/g, '%2C');
		return encodedString;
	} else {
		// Если нет пробелов и запятых, возвращаем исходную строку
		return inputString;
	}
}
