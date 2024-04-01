export function generateColorsForObjects(array) {
	const colors = [];
	const hueStep = Math.floor(360 / array.length); // Разделите 360 (полный круг цветов) на количество объектов

	for (let i = 0; i < array.length; i++) {
		const hue = hueStep * i;
		const color = `hsl(${hue}, 100%, 50%)`; // Создайте цвет HSL с насыщенностью 100% и светлотой 50%
		colors.push(color);
	}

	return colors;
}

// export function generateColorsForObjects(array) {
// 	const colors = [];
// 	const goldenRatio = 0.618033988749895; // Значение золотого сечения
// 	let hue = Math.random(); // Случайное начальное значение

// 	for (let i = 0; i < array.length; i++) {
// 		hue += goldenRatio;
// 		hue %= 1; // Ограничиваем значение hue в диапазоне от 0 до 1
// 		const color = `hsl(${hue * 360}, 100%, 50%)`; // Создаем цвет HSL
// 		colors.push(color);
// 	}

// 	return colors;
// }
