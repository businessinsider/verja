// var schema = {username: {type: String, email: true, onlyChars: ['a','b','c']]}}
// var schema = {username: {type: String, email: true, onlyChars: ['x','y','z']]}}

(function(undefined) {

	'use strict';

	function log(str) {
		console.log(str, eval(str));
	}

	var validators = {
		//takes lower case string of type for config
		type: function(val, config, callback) {
			var valtype = Object.prototype.toString.call(val);
			valtype = valtype.substr(8, valtype.length - 9).toLowerCase();

			if (valtype === config) {
				callback(false);
				return;
			}

			callback(true);
		},
		required: function(val, config, callback) {
			if (!val) {
				callback(true);
				return;
			}
			callback(false);
		},
		maxlength: function(val, config, callback) {
			var invalid;
			if (val.length > config) {
				invalid = true;
			} else {
				invalid = false;
			}
			callback(invalid);
		},
		minlength: function(val, config, callback) {
			var invalid;
			if (val.length < config) {
				invalid = true;
			} else {
				invalid = false;
			}
			callback(invalid);
		}
	};

	function addValidator(name, func) {
		validators[name] = function(val, config, callback) {
			if (func(val)) {
				callback(true);
				return;
			}
			callback(false);
		};
	}

	function validate(object, schema, callback) {

		var errors = new Object();


		function runValidators (sch, obj) {
			for (var k in sch) {

				if (sch[k].prototype !== new Field().prototype) {
					runValidators(sch[k], obj[k]);
				} else {
					for (var k2 in sch[k]) {
						validators[k2](obj[k], sch[k][k2], function(x) { //fix this line for recursion
							if (x) {
								if (!errors[k]) errors[k] = new Object();
								errors[k][k2] = x;
							}
						});
					}
				}
			}
		}

		runValidators(schema, object);

		callback(errors);
		//for each prop on schema, call the validator
		//recurse if type Array or is an Object
		//track how many are done
		//when all done callback
	}

	function Field(props) {
		for (var prop in props) {
			this[prop] = props[prop];
		}
	}

	var exports = {
		addValidator: addValidator,
		validate: validate,
		validators: validators,
		Field: Field
	};

	if (typeof window !== 'undefined') {
		window.Validator = window.Validator || exports;
	} else {
		module.exports = exports;
	}

})();