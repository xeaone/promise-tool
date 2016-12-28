var PromiseTool = require('../index.js');

function a (text, one, two) {
	return new Promise (function (resolve) {
		setTimeout(function () {
			text = `a-${one}${two}`;
			return resolve(text);
		}, 900);
	});
}

function b (text, one, two) {
	return new Promise (function (resolve) {
		setTimeout(function () {
			text = `${text} b-${one}${two}`;
			return resolve(text);
		}, 600);
	});
}

function c (text, one, two) {
	return new Promise (function (resolve) {
		setTimeout(function () {
			text = `${text} c-${one}${two}`;
			return resolve(text);
		}, 300);
	});
}

PromiseTool.series([a, b, c], ['', 1, 2]).then(function (result) {
	console.log(result);
});
