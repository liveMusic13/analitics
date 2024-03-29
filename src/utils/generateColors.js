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
