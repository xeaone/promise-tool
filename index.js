
function isError (item) {
	var name = item ? item.constructor.name : false;
	return name && (
		name === 'Error' || name === 'EvalError' ||
		name === 'InternalError ' || name === 'RangeError' ||
		name === 'ReferenceError' || name === 'SyntaxError' ||
		name === 'URIError' || name === 'TypeError'
	);
}

module.exports.series = function (promises, values) {
	values = values || [];

	return promises.reduce(function (previousPromise, currentPromise, index) {
		return previousPromise.then(function () {
			var args = index === 0 ? values : values.concat(Array.prototype.slice.call(arguments));
			return currentPromise.apply(this, args);
		});
	}, Promise.resolve());
};

module.exports.setTimeout = function (delay) {
	var args = Array.prototype.slice.call(arguments);
	return new Promise(function (resolve) {
		setTimeout(function () {
			clearTimeout(this);
			resolve.apply(this, args);
		}, delay);
	});
};

module.exports.setInterval = function (delay, method) {
	var args = Array.prototype.slice.call(arguments);
	return new Promise(function (resolve, reject) {
		setInterval(function () {
			var result = method.apply(this, args);
			if (result === false || isError(result)) {
				clearInterval(this);
				args.splice(0, 0, result);
				reject.apply(this, args);
			} else if (result || result === true) {
				clearInterval(this);
				args.splice(0, 0, result);
				resolve.apply(this, args);
			}
		}, delay);
	});
};

module.exports.setImmediate = function () {
	var args = Array.prototype.slice.call(arguments);
	return new Promise(function (resolve) {
		setImmediate(function () {
			clearImmediate(this);
			resolve.apply(this, args);
		});
	});
};

module.exports.clearTimeout = function (timeout) {
	var args = Array.prototype.slice.call(arguments);
	return new Promise(function (resolve) {
		clearTimeout(timeout);
		resolve.apply(null, args);
	});
};

module.exports.clearInterval = function (interval) {
	var args = Array.prototype.slice.call(arguments);
	return new Promise(function (resolve) {
		clearInterval(interval);
		resolve.apply(null, args);
	});
};

module.exports.clearImmediate = function (immediate) {
	var args = Array.prototype.slice.call(arguments);
	return new Promise(function (resolve) {
		clearImmediate(immediate);
		resolve.apply(null, args);
	});
};
