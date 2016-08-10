const assert = require('chai').assert;
const random = require('../random');

describe('getRandomWeather', () => {
	const weather = random.getRandomWeather();

	it('should be number', () => {
		assert.isNumber(weather, 'random weather');
	});
	it('limitations. -100 < weather < 100', () => {
		assert.isBelow(weather, 100, 'weather is strictly less than 100');
		assert.isAbove(weather, -100, 'weather is strictly greater than -100');
	});
});
