# Promise Tool
A promised library of tools for Node.js and the browser.

## Install
`npm install promise-tool --save`


## API
- `PromiseTool.lift()` Lifts a callback style function or prototype object and converts to a promise/s first argument must be an error.

- `PromiseTool.series` A given task will not be started until the preceding task completes.
	- `tasks` <Array> The array of functions to execute in series.
		- `task` <Function> A function which returns a promise.
			- `resolve(result)` <Any> A result which will be appended to the end of each task/function as parameter.
	- `parameters` <Array> An Array of parameters to be passed to each task/function. **Optional**

- `PromiseTool.setTimeout`
	- `delay` <Number> The number of milliseconds to wait before calling resolve.
	- `...args` <Any> Optional arguments to pass when the resolve is executed.


- `PromiseTool.setInterval`
	- `delay` <Number> The number of milliseconds to wait before calling resolve.
	- `method` <Function> A function that repeats on each interval. This function will fire upon each interval unless one of the following returns are implemented.
		- Return Value Actions
			- `result` <Error> Any valid JavaScript error type. Will fire the reject and pass the error.
			- `result` <Boolean> A boolean that calls resolve if true or reject if false.
			- `result` <Any> Any thing returned besides `null`, `undefined`, `false`, and a valid `Error` type will resolve with that return value as the first argument.
			- `result` <Null, Undefined> Both are ignored and will not trigger the resolve or reject.
	- `...args` <Any> Optional arguments to pass when the resolve is executed.


- `PromiseTool.setImmediate`
	- `...args` <Any> Optional arguments to pass when the resolve is executed.


- `PromiseTool.clearTimeout`
	- `timeout` <Timeout> A Timeout object as returned by setInterval().


- `PromiseTool.clearInterval`
	- `interval` <Interval> A Interval object as returned by setInterval().


- `PromiseTool.clearImmediate`
	- `immediate` <Immediate> An Immediate object as returned by setImmediate().


## Examples

### Series
```JavaScript
var PromiseTool = require('../index.js');

function a (one, two) {
	return new Promise (function (resolve) {
		setTimeout(function () {
			return resolve(`a-${one}${two}`);
		}, 900);
	});
}

function b (one, two, result) {
	return new Promise (function (resolve) {
		setTimeout(function () {
			result = `${result} b-${one}${two}`;
			return resolve(result);
		}, 600);
	});
}

PromiseTool.series([a, b], [1, 2]).then(function (result) {
	console.log(result); // a-12 b-12
});
```

### Timers
```JavaScript
var PromiseTool = require('promise-timers');
var delay = 500;

PromiseTool.setTimeout(delay).then(function (args) {
	// this refers to timeout
	console.log(args);
	console.log('timeout done');
});

var i = 0;

function method () {
	// this refers to interval
	if (i > 5) {
		return true;
	} else {
		console.log(i);
		i++;
	}
};

 PromiseTool.setInterval(delay, method).then(function (args) {
	// this refers to interval
	console.log(args);
	console.log('interval done');
});

PromiseTool.setImmediate().then(function (args) {
	// this refers to immediate
   console.log(args);
   console.log('immediate done');
});

```

## Authors
[AlexanderElias](https://github.com/AlexanderElias)

## License
[Why You Should Choose MPL-2.0](http://veldstra.org/2016/12/09/you-should-choose-mpl2-for-your-opensource-project.html)
This project is licensed under the MPL-2.0 License
