;
(function(undefined) {
	'use strict';

	var validators = {
		//takes lower case string of type for config
		type: function(val, config, callback) {
			var valtype = Object.prototype.toString.call(val);
			valtype = valtype.substr(8, valtype.length - 9).toLowerCase();
			if (valtype === config) {
				return callback(true);
			}
			callback(false, 'type');
		},
		required: function(val, config, callback) {
			if (config) {
				if (!val || typeof val === undefined) {
					return callback(false);
				}
			}
			callback(true);
		},
		max: function(val, config, callback) {
			if (typeof val !== 'number' || !val || val > config) {
				return callback(false);
			}
			callback(true);
		},
		min: function(val, config, callback) {
			if (typeof val !== 'number' || !val || val < config) {
				return callback(false);
			}
			callback(true);
		},
		maxlength: function(val, config, callback) {
			if (!val || !val.length || val.length > config) {
				return callback(false);
			}
			callback(true);
		},
		minlength: function(val, config, callback) {
			if (!val || !val.length || val.length < config) {
				return callback(false);
			}
			callback(true);
		},
		int: function(val, config, callback) {
			if (Math.round(val) === val) {
				return callback(true);
			}
			callback(false);
		},
		equals: function(val, config, callback) {
			if (val === config) {
				return callback(true);
			}
			callback(false);
		},
		regex: function(val, config, callback) {
			if (val.search(config) > -1) {
				return callback(true);
			}
			callback(false);
		},
		email: function(val, config, callback) {
			if (typeof val !== 'string') { return callback(false); }
			var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			if (regex.test(val)) {
				return callback(true);
			}
			callback(false);
		},
		url: function(val, config, callback) {
			var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;

			if (regex.test(val)) {
				return callback(true);
			}
			callback(false);
		}
	};

	function addValidator(name, func) {
		validators[name] = func;
	}

	function runValidators(object, schema, errors, init) {
		// if the schema is a field validate the property
		if (schema instanceof Field) {
			// if array with itemSchema, validate each member of the array according to the schema
			if (schema.itemSchema) {
				if (Array.isArray(object)) {
					object.forEach(function(arrayValue, index) {
						if (!errors[index]) {
							errors[index] = {};
						}
						runValidators(object[index], schema.itemSchema, errors[index], init);
					});
				} 

			}
			Object.keys(schema).forEach(function(validatorName) {
				if (validators[validatorName]) {
					init.validateFuncs.push(function(callback) {
						function validatorCallback(valid) {
							if (!valid) {
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
				}
			});
		}
		//otherwise go through the keys on the schema and recurse
		else if (schema instanceof Object && object instanceof Object) {
			Object.keys(schema).forEach(function(property) {
				if (!errors[property]) {
					errors[property] = {};
				}
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

		init.validateFuncs.forEach(function(func) {
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
		Field: Field,
		validators: validators
	};

	if (typeof window !== 'undefined') {
		window.verja = window.verja || exports;
	} else if (module) {
		module.exports = exports;
	}

})();