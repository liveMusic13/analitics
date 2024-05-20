export const truncateDescription = (description, maxLength) => {
	if (description.length <= maxLength) {
		return description;
	}
	console.log(description);
	return description.slice(0, maxLength) + '...';
};
