export function convertValuesToValue(data) {
	return data.map(item => ({ ...item, value: item.values }));
}

export function getSeriesData(data) {
	// Получаем уникальные значения hub
	const hubs = [...new Set(data.map(item => item.hub))];

	// Создаем пустой объект для хранения данных серии
	const seriesData = {};

	// Перебираем каждый уникальный hub
	hubs.forEach(hub => {
		// Перебираем каждый объект в данных
		data.forEach(item => {
			// Если tonality еще не существует в seriesData, добавляем его
			if (!seriesData[item.tonality]) {
				seriesData[item.tonality] = {
					name: item.tonality,
					data: new Array(hubs.length).fill(0), // Инициализируем массив нулями
				};
			}

			// Если hub текущего объекта совпадает с текущим hub, добавляем count к соответствующему элементу в массиве
			if (item.hub === hub) {
				const index = hubs.indexOf(hub);
				seriesData[item.tonality].data[index] += item.count;
			}
		});
	});

	// Возвращаем данные серии как массив объектов
	return Object.values(seriesData);
}

export function getCategoryData(data) {
	const uniqueHubs = [...new Set(data.map(item => item.hub))];

	return uniqueHubs.map(hub => {
		return `${hub} <span class="f16"><span id="flag" class="flag"></span></span>`;
	});
}

export const convertDataToSankeyFormat = data => {
	const nodes = [];
	const links = [];

	data.forEach(item => {
		// Добавляем узлы
		if (!nodes.find(node => node.id === item.hub)) {
			nodes.push({ id: item.hub });
		}
		if (!nodes.find(node => node.id === item.tonality)) {
			nodes.push({ id: item.tonality });
		}

		// Добавляем связи
		links.push([item.hub, item.tonality, item.count]);
	});

	return { nodes, links };
};
