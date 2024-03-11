import { colors } from './colors';

function renderDemo() {
	const rootStyles = getComputedStyle(document.querySelector(':root'));

	const fragments = {
		gradients: document.createDocumentFragment(),
		colors: document.createDocumentFragment(),
	};

	const isGradient = (colorName) => colorName.startsWith('gradient');

	const getCSSVariableValue = (variableName) =>
		rootStyles.getPropertyValue(`--${variableName}`);

	colors.forEach((colorName) => {
		// Set the background color
		let backgroundStyle;

		if (isGradient(colorName)) {
			backgroundStyle = getCSSVariableValue(colorName);
		} else {
			backgroundStyle = `color(display-p3 ${getCSSVariableValue(
				`color-${colorName}-p3`
			)})`;
		}

		// Create the color box
		const boxEl = document.createElement('div');
		const nameEl = document.createElement('span');

		boxEl.appendChild(nameEl);

		boxEl.className = 'color-box';
		nameEl.className = 'color-name';
		nameEl.textContent = colorName;

		boxEl.style.background = backgroundStyle;

		// Append the color box to the correct fragment
		if (isGradient(colorName)) {
			fragments.gradients.appendChild(boxEl);
		} else {
			fragments.colors.appendChild(boxEl);
		}
	});

	document.querySelector('#gradients').appendChild(fragments.gradients);
	document.querySelector('#colors').appendChild(fragments.colors);
}

renderDemo();
