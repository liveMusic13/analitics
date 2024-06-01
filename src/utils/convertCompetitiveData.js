export const convertCompetitive = (index1, index2, dataArray) => {
	// Находим объекты по значениям index_number
	const obj1 = dataArray.find(item => item.index_number === index1);
	const obj2 = dataArray.find(item => item.index_number === index2);

	// Проверяем, существуют ли оба объекта
	if (!obj1 || !obj2) {
		console.log(false);
		return {
			min_data: 0,
			max_data: 0,
		};
	}

	// Извлекаем min_data и max_data из объектов
	const { min_data: minData1, max_data: maxData1 } = obj1;
	const { min_data: minData2, max_data: maxData2 } = obj2;

	// Находим пересечение временных промежутков
	const overlapStart = Math.max(minData1, minData2);
	const overlapEnd = Math.min(maxData1, maxData2);

	// Проверяем, есть ли пересечение
	if (overlapStart <= overlapEnd) {
		console.log({
			overlapStart,
			overlapEnd,
		});
		return {
			min_data: overlapStart,
			max_data: overlapEnd,
		};
	} else {
		console.log(false);
		return {
			min_data: 0,
			max_data: 0,
		};
	}
};

// export function convertCompetitive(index1, index2, data) {
// 	let minValue = Infinity;
// 	let maxValue = -Infinity;

// 	data.forEach(item => {
// 		if (item['index_number'] === index1 || item['index_number'] === index2) {
// 			minValue = Math.min(minValue, item['min_data']);
// 			maxValue = Math.max(maxValue, item['max_data']);
// 		}
// 	});
// 	console.log({
// 		min_data: minValue,
// 		max_data: maxValue,
// 	});
// 	return {
// 		min_data: minValue,
// 		max_data: maxValue,
// 	};
// }
