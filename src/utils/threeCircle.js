export const addThreeCircle = (arrNegAuthor, arrPosAuthor, neg, pos) => {
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

	const editNegAuthor = arrNegAuthor.map(({ author_data }) =>
		author_data.map(({ url, fullname, count_texts }) => ({
			url,
			name: fullname,
			value: count_texts,
		})),
	);

	const editPosAuthor = arrPosAuthor.map(({ author_data }) =>
		author_data.map(({ url, fullname, count_texts }) => ({
			url,
			name: fullname,
			value: count_texts,
		})),
	);

	const flatNegAuthor = editNegAuthor.flat();
	const flatPosAuthor = editPosAuthor.flat();

	for (let key in objectNeg) {
		flatNegAuthor.map(author => {
			if (author.url && author.url.includes(key)) {
				if (objectNeg[key]) {
					objectNeg[key].push(author);
				}
			}
		});
	}

	for (let key in objectPos) {
		flatPosAuthor.map(author => {
			if (author.url && author.url.includes(key)) {
				if (objectPos[key]) {
					objectPos[key].push(author);
				}
			}
		});
	}

	return [objectNeg, objectPos];
};
