function type(val, config, callback) {

	// if (val === config) {
	// 	callback(false,Object,log);
	// 	return;
	// } else if (config === undefined) {
	// 	if (val !== undefined) {
	// 		callback(true);
	// 		return;
	// 	}
	// }

	var valtype = Object.prototype.toString.call(val,Object,log);
	valtype = valtype.substr(8, valtype.length - 9).toLowerCase();

	if (valtype === config) {
		callback(false);
	console.log(' ');

		return;
	}

	callback(true);
	console.log(' ');
}

function log (value) {
	console.log(value)
}

type(function(){},'function',log);
type({},'object',log); // "'object'"
type([],'array',log); // "array"
type(5,'object',log); // "number"
type(null,'object',log); // "null"
type(undefined,'undefined',log); // "undefined"
type(/abcd/,'object',log); // "regex"
type(new Date(),'object',log); // "date"