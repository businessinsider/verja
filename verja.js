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
			if (typeof val !== 'string') {
				return callback(false);
			}
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

	function validate(object, schema, callback) {
		//create a schema and accumulate all of its validators
		var s = new Schema(schema, callback);
		//accumulate all the validation functions we need to run over the object
		s.accumulateValidators(object);
		//run them all
		s.run();
	}

	function Schema(schema, userCallback) {
		var self = this;
		this.schema = schema;

		this.errors = {};
		this.validationStatus = {
			totalValidators: 0,
			totalValidated: 0,
			errorTotal: 0,
		};
		this.validateFuncs = [];
		this.userCallback = userCallback;
	}

	Schema.prototype.accumulateValidators = function(object, schema, errors) {
		var self = this;
		if (!schema) {
			schema = self.schema;
		}
		if (!errors) {
			errors = self.errors;
		}

		if (schema instanceof Field) {
			// if array with itemSchema, we need to add a validation function for each item in the array
			if (schema.itemSchema && Array.isArray(object)) {
				object.forEach(function(arrayValue, index) {
					self.addPropertyToErrors(errors, index);
					self.accumulateValidators(object[index], schema.itemSchema, errors[index]);
				});
			}
			//Add a validator for each one declared on the Field
			Object.keys(schema).forEach(function(validatorName, index) {
				if (validators[validatorName]) {
					self.addValidationFunction(object, schema, errors, validatorName);
				} else {
					//handle non validator keys here
				}
			});
		}
		//otherwise go through the keys on the schema and recurse
		else if (schema instanceof Object && object instanceof Object) {
			Object.keys(schema).forEach(function(property) {
				self.addPropertyToErrors(errors, property);
				self.accumulateValidators(object[property], schema[property], errors[property]);
			});
		} else {
			// this should never happen, if it does, we aren't handling an object/schema construction error properly
			throw new Error('Internal Validation error for ', object, schema, errors);
		}
	};

	Schema.prototype.addValidationFunction = function(object, schema, errors, validatorName) {
		var self = this;
		self.validateFuncs.push(function() {
			var validatorCallback = self.generateValidatorCallback(object, schema, errors, validatorName);
			//call the validator
			validators[validatorName](object, schema[validatorName], validatorCallback);
		});
		self.validationStatus.totalValidators++;
	};

	//generates the internal callback for the validator
	Schema.prototype.generateValidatorCallback = function(object, schema, errors, validatorName) {
		var self = this;
		return function(valid) {
			//set the error if it was invalid
			if (!valid) {
				errors[validatorName] = true;
				self.validationStatus.errorTotal++;
			}
			self.validationStatus.totalValidated++;

			self.checkValidationComplete();
		};
	};

	Schema.prototype.addPropertyToErrors = function(errors, property) {
		if (!errors[property]) {
			errors[property] = {};
		}
	};

	Schema.prototype.run = function() {
		this.validateFuncs.forEach(function(func) {
			func();
		});
	};

	Schema.prototype.checkValidationComplete = function() {
		var self = this;
		if (self.validationStatus.totalValidated === self.validationStatus.totalValidators) {
			if (!self.validationStatus.errorTotal) {
				return self.userCallback(null);
			}
			self.userCallback(self.errors);
		}
	};

	function Field(props) {
		for (var prop in props) {
			this[prop] = props[prop];
		}
	}

	function strip (obj) {
		var obj2 = new Field(obj);
		Object.keys(obj2).forEach(function(x) {
			if (obj2[x] instanceof Object && !Object.keys(obj2[x]).length) {
				delete obj2[x];
				obj2 = strip(obj2);
			} else if (obj2[x] instanceof Object) {
				obj2[x] = strip(obj2[x]);
			}
		});
		return obj2;
	} 

	var exports = {
		addValidator: addValidator,
		validate: validate,
		Field: Field,
		validators: validators,
		strip: strip
	};

	if (typeof window !== 'undefined') {
		window.verja = window.verja || exports;
	} else if (module) {
		module.exports = exports;
	}

})();