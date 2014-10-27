;(function(undefined) {
	'use strict';

	var validators = {
		//takes lower case string of type for config
		type: function(val, config, callback) {
			var valtype = Object.prototype.toString.call(val);
			valtype = valtype.substr(8, valtype.length - 9).toLowerCase();

			if (valtype === config) return callback(false);
			callback(true, 'type');
		},
		required: function(val, config, callback) {
			if (val === undefined) return callback(true);
			callback(false);
		},
		max: function(val, config, callback) {
			if (!val || val >= config) return callback(true);
			callback(false);	
		},
		min: function(val, config, callback) {
			if (!val || val <= config) return callback(true);
			callback(false);
		},
		maxlength: function(val, config, callback) {
			if (!val.length || val.length >= config) return callback(true);
			callback(false);
		},
		minlength: function(val, config, callback) {
			if (!val.length || val.length <= config) return callback(true);
			callback(false);
		},
		int: function(val, config, callback) {
			if (Math.round(val) === val) {
				return callback(false);
			}
			callback(true);
		},
		equals: function(val, config, callback) {
			if (val === config) {
				return callback(false);
			}
			callback(true);
		},
		//to do: test below, sort these
		regex: function(val, config, callback) {
			if (val.search(config)) {
				return callback(false)
			}
			callback(true);
		},
		email: function(val, config, callback) {
			if (val) {
				return callback(false);
			}
			callback(true);
		},
		url: function(val, config, callback) {
			if (val) {
				return callback(false);
			}
			callback(true);
		}
	};

	function addValidator(name, func) {
		validators[name] = function(val, config, callback) {
			if (func(val, config)) return callback(true, name);
			callback(false);
		};
	}

	function runValidators(object, schema, errors, init) {
		// if the schema is a field validate the property
		if (schema instanceof Field) {
			Object.keys(schema).forEach(function(validatorName){
				init.validateFuncs.push(function(callback) {
					function validatorCallback(invalid, validatorName) {
						if (invalid) {
							errors[validatorName] = true;
							init.errorTotal++;
						}
						init.totalValidated++;

						if (init.totalValidated === init.totalValidators) {
							callback();
						}
					}
					//call the validator
					validators[validatorName](object, schema[validatorName], validatorCallback);
				});
			});
		}
		//if its an array recurse over all the values in the object
		else if (schema instanceof Array && object instanceof Array) {
			object.forEach(function(arrayValue, index){
				if (!errors[index]) { errors[index] = {}; }
				runValidators(object[index], schema[0], errors[index], init);
			});
		}
		//otherwise go through the keys on the schema and recurse
		else if (schema instanceof Object && object instanceof Object) {
			Object.keys(schema).forEach(function(property){
				if (!errors[property]) { errors[property] = {}; }
				runValidators(object[property], schema[property], errors[property], init);
			});
		} else {
			// this should never happen, if it does, we aren't handling an object/schema construction error properly
			throw new Error('Internal Validation error for ', object, schema, errors);
		}
	}

	function validate(object, schema, callback) {
		var errors = {};
		var init = {
			totalValidators: 0,
			totalValidated: 0,
			errorTotal: 0,
			validateFuncs: []
		};

		runValidators(object, schema, errors, init);
		init.totalValidators = init.validateFuncs.length;

		init.validateFuncs.forEach(function(func){
			func(function() {
				if (!init.errorTotal) {
					return callback(null);
				}
				callback(errors);
			});
		});
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
		window.verja = window.verja || exports;
	} else if (module) {
		module.exports = exports;
	}

})();