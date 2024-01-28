export function convertValuesToValue(data) {
	return data.map(item => ({ ...item, value: item.values }));
}
