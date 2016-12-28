
function isError (item) {
	var name = item ? item.constructor.name : false;
	return name && (
		name === 'Error' || name === 'EvalError' ||
		name === 'InternalError ' || name === 'RangeError' ||
		name === 'ReferenceError' || name === 'SyntaxError' ||
		name === 'URIError' || name === 'TypeError'
	);
}

function overwrite (arg, arr) {
	arg = Array.prototype.slice.call(arg);

	for (var i = 0, l = arg.length; i < l; i++) {
		arr.splice(i, 1, arg[i]);
	}

	return arr;
}

module.exports.series = function (promises, mainArguments) {
	return promises.reduce(function (previous, current) {
		return previous.then(function () {
			var subArguments = overwrite(arguments, mainArguments);
			return current.apply(null, subArguments);
		});
	}, Promise.resolve(mainArguments[0]));
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
