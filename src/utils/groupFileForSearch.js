export function getFirstWordAfterUnderscore(inputString) {
	const underscoreIndex = inputString.indexOf('_');
	if (underscoreIndex !== -1) {
		const firstWord = inputString.substring(0, underscoreIndex);
		return firstWord;
	} else {
		return 'no group'; // Если символ "_" не найден, вернуть null или другое значение по вашему усмотрению
	}
}
