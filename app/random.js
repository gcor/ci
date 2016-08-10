/* Получаем рандомное число от -50 до +50 */
module.exports.getRandomWeather = function () {
	const weather = (Math.random() * 100) - 50;
	const roundRandom = weather;
	return Math.round(roundRandom);
};