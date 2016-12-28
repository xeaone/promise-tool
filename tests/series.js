var PromiseTool = require('../index.js');
var one = 1.0;
var two = 2.0;

function a (one, two) {
// function a () {
	return new Promise (function (resolve) {
		setTimeout(function () {
			return resolve(`a-${one}${two}`);
		}, 900);
	});
}

function b (one, two, result) {
// function b (result) {
	return new Promise (function (resolve) {
		setTimeout(function () {
			result = `${result} b-${one}${two}`;
			return resolve(result);
		}, 600);
	});
}

function c (one, two, result) {
// function c (result) {
	return new Promise (function (resolve) {
		setTimeout(function () {
			result = `${result} c-${one}${two}`;
			return resolve(result);
		}, 300);
	});
}

PromiseTool.series([a, b, c], [1, 2]).then(function (result) {
// PromiseTool.series([a, b, c]).then(function (result) {
	console.log(result);
});
