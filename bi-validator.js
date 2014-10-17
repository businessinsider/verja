// Validator.addValidator('onlyChars', function(val, config){return true;})

// var schema = {username: {type: String, email: true, onlyChars: ['a','b','c']]}}
// var schema = {username: {type: String, email: true, onlyChars: ['x','y','z']]}}


(function(window, undefined) {

	function log(str) {
		console.log(str, eval(str));
	}

	var validators = {
		type: function(val, config, callback) {
			var invalid = false;
			callback(invalid);
		},
		required: function(val, config, callback) {
			var invalid = false;
			callback(invalid);
		},
		maxlength: function(val, config, callback) {
			var invalid = true;
			callback(invalid);
		},
		minlength: function(val, config, callback) {
			var invalid = false;
			callback(invalid);
		}
	};

	function addValidator(name, func) {
		validators[name] = func;
	}

	function validate(object, schema, callback) {

		var errors = new Object;

		for (var k1 in schema) {
			for (var k2 in schema[k1]) {
				validators[k2](object[k1], schema[k2], function(x) {
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

	var exposed = {
		addValidator: addValidator,
		validate: validate
	};
	window.Validator = window.Validator || exposed;
})(window);


Validator.addValidator('email', function(val) {
	return true;
});

var obj = {
	name: 'some too long name',
	email: 'forrest.alamsi@gmail.com'
};
var scheme = {
	name: {
		type: String,
		maxlength: 5
	},
	email: {
		type: Date
	}
};

Validator.validate(obj, scheme, function(err) {
	console.log(err);
});