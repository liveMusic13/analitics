export function hslToHex(hslColor) {
	// Извлекаем значения H, S, и L из строки "hsl(0, 100%, 50%)"
	const regex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
	const match = hslColor.match(regex);

	if (!match) {
		throw new Error('Invalid HSL color format');
	}

	const h = parseInt(match[1], 10);
	const s = parseFloat(match[2]);
	const l = parseFloat(match[3]);

	// Функция для конвертации компонент цвета из HSL в RGB
	function hue2rgb(p, q, t) {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	}

	// Конвертация HSL в RGB
	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	const r = hue2rgb(p, q, h / 360);
	const g = hue2rgb(p, q, (h + 1 / 3) / 360);
	const b = hue2rgb(p, q, (h + 2 / 3) / 360);

	// Форматирование RGB компонент в 0xRRGGBB
	const hexColor = (
		(Math.round(r * 255) << 16) |
		(Math.round(g * 255) << 8) |
		Math.round(b * 255)
	)
		.toString(16)
		.padStart(6, '0');

	return '0x' + hexColor;
}

export function isValidColor(color) {
	return /^0x[0-9A-F]{6}$/i.test(color);
}
