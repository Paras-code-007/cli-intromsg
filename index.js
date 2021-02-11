module.exports = (options) => {
	const defaultOptions = {
		title: 'Please Specify a Title',
		tagLine: ['Tagline number one', 'Tagline number two'],
		description: 'Some Random Description',
		bgColor: '#4567E3',
		color: '#000000',
		version: '0.0.0',
		clear: true,
		bold: true,
	};

	const opts = { ...defaultOptions, ...options };

	opts.clear && process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');

	const rgbBg = hexTorgb(opts.bgColor);
	const rgbFg = hexTorgb(opts.color);
	const bold = opts.bold ? '\x1b[1m' : '';

	const bg = `\x1b[48;2;${rgbBg[0]};${rgbBg[1]};${rgbBg[2]}m`;
	const fg = `\x1b[38;2;${rgbFg[0]};${rgbFg[1]};${rgbFg[2]}m`;

	console.log(`\n${bg}${fg}${bold}%s\x1b[0m v${opts.version}\x1b[0m`, `  ${opts.title}  `);
	console.log(`${opts.description}`);
	opts.tagLine.forEach((element) => {
		console.log('\x1b[90m%s\x1b[0m', element);
	});
};

function hexTorgb(hexCode) {
	if (hexCode.startsWith('#')) {
		// Performance issue because convert string to array first using spread
		// [...hexCode].forEach(function (char) {
		// 	console.log(char);
		// });

		// therfore use for of
		// for (const i of hexCode.replace('#', '')) {
		// 	console.log(i);
		// }

		let rgb = [];
		let j = 0;

		for (let i = 1; i < hexCode.length; i += 2) {
			rgb[j] = parseInt(hexCode[i] + hexCode[i + 1], 16);
			j++;
		}
		return rgb;
	}
}

// hexTorgb('#4567E3'); //01000101

// console.log(hexTorgb('#4567E3'));

// console.log('\x1b0x07');

// process.stdout.write('0x07');
