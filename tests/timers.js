var PromiseTool = require('../index.js');
var delay = 500;

// PromiseTool.setTimeout(delay).then(function (args) {
// 	console.log(args);
// 	console.log('timeout done');
// });

var i = 0;

function method () {
	if (i > 3) {
		// return false;
		// return true;
		// return { hello: 'world' };
		// return new Error('oops');
	} else {
		console.log(i);
		i++;
	}
}

PromiseTool.setInterval(delay, method).then(function (args) {
	console.log(args);
	console.log('interval done');
}).catch(function (error) {
	console.log(error);
});

// PromiseTool.setImmediate().then(function (args) {
//    console.log(args);
//    console.log('immediate done');
// });
