// Validator.addValidator('onlyChars', function(val, config){return true;})

// var schema = {username: {type: String, email: true, onlyChars: ['a','b','c']]}}
// var schema = {username: {type: String, email: true, onlyChars: ['x','y','z']]}}


(function(undefined) {

	function log(str) {
		console.log(str, eval(str));
	}

	var validators = {
		type: function(val, config, callback) {


			var invalid = false;
			callback(invalid);
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

		var errors = new Object;

		for (var k1 in schema) {
			for (var k2 in schema[k1]) {
				validators[k2](object[k1], schema[k1][k2], function(x) {
					if (x) {
						if (!errors[k1]) errors[k1] = new Object();
						errors[k1][k2] = x;
					}
				});
			}
		}

		console.log(errors);

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

	exports = {
		addValidator: addValidator,
		validate: validate,
		Field: Field
	};

	if (typeof window !== 'undefined') {
		window.Validator = window.Validator || exports;
	} else {
		module.exports = exports;
	}

})();

