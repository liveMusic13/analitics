export const addThreeCircle = (arr, neg, pos) => {
	let objectNeg = {};
	let objectPos = {};

	neg.map(elem => {
		if (!objectNeg.hasOwnProperty(elem.name)) {
			objectNeg[elem.name] = []; // замените [] на то, что вы хотите добавить
		}
	});
	pos.map(elem => {
		if (!objectPos.hasOwnProperty(elem.name)) {
			objectPos[elem.name] = []; // замените [] на то, что вы хотите добавить
		}
	});

	const editArr = arr.flatMap(group =>
		group.flatMap(({ author_data }) =>
			author_data.map(({ url, fullname, count_texts }) => ({
				url,
				fullname,
				count_texts,
			})),
		),
	);

	for (let key in objectNeg) {
		editArr.map(author => {
			if (author.url.includes(key)) {
				if (objectNeg[key]) {
					objectNeg[key].push(author);
				}
			}
		});
	}

	for (let key in objectPos) {
		editArr.map(author => {
			if (author.url.includes(key)) {
				if (objectPos[key]) {
					objectPos[key].push(author);
				}
			}
		});
	}

	return [objectNeg, objectPos];
};
