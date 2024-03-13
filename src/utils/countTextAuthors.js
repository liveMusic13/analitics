export const countTextAuthors = array => {
	return array.map(author => author.reposts.length).reduce((a, b) => a + b, 0);
};
