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

// export const convertDataToSankeyFormat = data => {
// 	const nodes = [];
// 	const links = [];

// 	data.forEach(item => {
// 		// Добавляем узлы
// 		if (!nodes.find(node => node.id === item.hub)) {
// 			nodes.push({ id: item.hub });
// 		}
// 		if (!nodes.find(node => node.id === item.tonality)) {
// 			nodes.push({ id: item.tonality });
// 		}
// 		if (!nodes.find(node => node.id === item.type)) {
// 			nodes.push({ id: item.type });
// 		}

// 		// Добавляем связи
// 		links.push([item.hub, item.tonality, item.count]);
// 		links.push([item.type, item.hub, item.count]);
// 	});

// 	return { nodes, links };
// };

export const convertDataToSankeyFormat = (data, fulldata) => {
	const nodes = [];
	const links = [];

	fulldata.forEach(item => {
		if (!nodes.find(node => node.id === item.name)) {
			nodes.push({ id: item.name });
		}

		const typeCounts = {};
		item.sunkey_data.forEach(dataItem => {
			if (!nodes.find(node => node.id === dataItem.type)) {
				nodes.push({ id: dataItem.type });
			}

			typeCounts[dataItem.type] = (typeCounts[dataItem.type] || 0) + 1;
		});

		Object.entries(typeCounts).forEach(([type, count]) => {
			links.push([item.name, type, count]);
		});
	});

	data.forEach(item => {
		// Добавляем узлы
		if (!nodes.find(node => node.id === item.hub)) {
			nodes.push({ id: item.hub });
		}
		if (!nodes.find(node => node.id === item.tonality)) {
			nodes.push({ id: item.tonality });
		}
		if (!nodes.find(node => node.id === item.type)) {
			nodes.push({ id: item.type });
		}

		// Добавляем связи
		links.push([item.hub, item.tonality, item.count]);
		links.push([item.type, item.hub, item.count]);
	});

	return { nodes, links };
};

// fulldata = [
// 	{
// 		name: 'карта',
// 		sunkey_data: [
// 			{
// 				count: 18,
// 				hub: "vk.com",
// 				search:'карта',
// 				tonality:'Нейтрал',
// 				type:'Пост'
// 			}
// 		]
// 	}
// ]

export function concatData(data) {
	// Создаем пустой массив для объединенных данных
	let combinedArray = [];

	// Перебираем все объекты в массиве data
	for (const obj of data) {
		if (obj.sunkey_data && Array.isArray(obj.sunkey_data)) {
			// Если у объекта есть свойство sunkey_data и оно является массивом,
			// то добавляем его элементы в combinedArray
			combinedArray = combinedArray.concat(obj.sunkey_data);
		}
	}

	console.log(combinedArray);
	return combinedArray;
}

export function getCategoriesName(data) {
	let nameCategories = [];

	for (const obj of data) {
		nameCategories.push(obj.name);
	}

	console.log(nameCategories);
	return nameCategories;
}
