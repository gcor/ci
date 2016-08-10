function getRandomWeather() {
	return Math.round(Math.random() * 100 - 50)
}

module.exports = {
	getRandomWeather: getRandomWeather
}