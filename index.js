
var PromiseTool = {};

PromiseTool._isError = function (item) {
	var name = item ? item.constructor.name : false;
	return name && (
		name === 'Error' || name === 'EvalError' ||
		name === 'InternalError ' || name === 'RangeError' ||
		name === 'ReferenceError' || name === 'SyntaxError' ||
		name === 'URIError' || name === 'TypeError'
	);
};

PromiseTool._liftOne = function (method) {
	return function () {
		var args = Array.prototype.slice.call(arguments);

		return new Promise(function (resolve, reject) {

			args.push(function(error, data) {
				if (error) {
					return reject(error);
				} else {
					return resolve(data);
				}
			});

			method.apply(null, args);

		});
	};
};

PromiseTool._liftAll = function (source) {
	var self = this;
	var target = source.constructor();

	Object.keys(source).forEach(function (key) {
		if (key.indexOf('Sync') !== key.length-4 && typeof source[key] === 'function') {
			target[key] = self._liftOne(source[key]);
		} else {
			target[key] = source[key];
		}
	});

	return target;
};

PromiseTool.lift = function (data) {
	var self = this;

	if (data === undefined || data === null) {
		return undefined;
	} else if (typeof data === 'function') {
		return self._liftOne(data);
	} else if (typeof data === 'object') {
		return self._liftAll(data);
	}
};

PromiseTool.series = function (promises, values) {
	values = values || [];

	return promises.reduce(function (previousPromise, currentPromise, index) {
		return previousPromise.then(function () {
			var args = index === 0 ? values : values.concat(Array.prototype.slice.call(arguments));
			return currentPromise.apply(this, args);
		});
	}, Promise.resolve());
};

PromiseTool.setTimeout = function (delay) {
	var args = Array.prototype.slice.call(arguments);
	return new Promise(function (resolve) {
		setTimeout(function () {
			clearTimeout(this);
			resolve.apply(this, args);
		}, delay);
	});
};

PromiseTool.setInterval = function (delay, method) {
	var self = this;
	var args = Array.prototype.slice.call(arguments);

	return new Promise(function (resolve, reject) {
		setInterval(function () {
			var result = method.apply(this, args);
			if (result === false || self._isError(result)) {
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

PromiseTool.setImmediate = function () {
	var args = Array.prototype.slice.call(arguments);
	return new Promise(function (resolve) {
		setImmediate(function () {
			clearImmediate(this);
			resolve.apply(this, args);
		});
	});
};

PromiseTool.clearTimeout = function (timeout) {
	var args = Array.prototype.slice.call(arguments);
	return new Promise(function (resolve) {
		clearTimeout(timeout);
		resolve.apply(null, args);
	});
};

PromiseTool.clearInterval = function (interval) {
	var args = Array.prototype.slice.call(arguments);
	return new Promise(function (resolve) {
		clearInterval(interval);
		resolve.apply(null, args);
	});
};

PromiseTool.clearImmediate = function (immediate) {
	var args = Array.prototype.slice.call(arguments);
	return new Promise(function (resolve) {
		clearImmediate(immediate);
		resolve.apply(null, args);
	});
};

module.exports = PromiseTool;
