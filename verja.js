(function(undefined) {

	function log(x){
		console.log(x);
	}

	'use strict';

	var validators = {
		async: function(val, config, callback) {
			//do something
		},
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
			if (func(val, config)) {
				callback(true);
				return;
			}
			callback(false);
		};
	}
	
	var validateFuncs = [];
	var totalValidators = 0;
	var totalValidated = 0;

	function runValidators(object,schema,errors,errorTotal) {
		//if the schema is a field validate the property
		if (schema instanceof Field) {
			Object.keys(schema).forEach(function(validatorName){
				validateFuncs.push(function(callback) {
					//call the validator
					function validatorCallback(invalid) {
						if (invalid) {
							errors[validatorName] = true;
							errorTotal.total++;
						}
						totalValidated++;

						if (totalValidated === totalValidators) {

							callback();
						}
					}
					validators[validatorName](object, schema[validatorName], validatorCallback);
				});
			});
		}
		//if its an array recurse over all the values in the object
		else if (schema instanceof Array && object instanceof Array) {
			object.forEach(function(arrayValue, index){
				if (!errors[index]) { errors[index] = {}; }
				runValidators(object[index], schema[0], errors[index], errorTotal);
			});
		}
		//otherwise go through the keys on the schema and recurse
		else if (schema instanceof Object && object instanceof Object) {
			Object.keys(schema).forEach(function(property){
				if (!errors[property]) { errors[property] = {}; }
				runValidators(object[property], schema[property], errors[property], errorTotal);
			});
		} else {
			//this should never happen, if it does, we aren't handling an object/schema construction error properly
			throw new Error('Internal Validation error for ', object,schema,errors,errorTotal);
		}
	}

	function validate(object, schema, callback) {
		var errors = {};
		var errorTotal = {total: 0};
		validateFuncs = [];
		totalValidators = 0;
		totalValidated = 0;

		runValidators(object, schema, errors, errorTotal);
		totalValidators = validateFuncs.length;

		validateFuncs.forEach(function(func){
			func(function() {
				if (!errorTotal.total) {
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
	} else {
		module.exports = exports;
	}

})();