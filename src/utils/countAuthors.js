export const countAuthors = arr => {
	let count = 0;
	arr.forEach(array => {
		count += array.length;
	});

	return count;
};
