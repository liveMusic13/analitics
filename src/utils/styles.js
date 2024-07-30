export const styleTarget = (elementWidth, buttonTarget) => {
	return {
		width: `${elementWidth[buttonTarget]}px`,
		left: buttonTarget === 'one' ? '0' : buttonTarget === 'two' ? `36%` : `72%`,
	};
};
