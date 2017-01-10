Verja - Business Insider's Declarative Object Validator
=================================

Built to support complex object structures, deeply nested arrays, and async validators.


### Install

```git clone https://github.com/businessinsider/verja```

or
 
```npm install verja --save```

or

```bower install verja --save```


### Use
Via node

```
	var verja = require('verja');
```

Or the browser

```
	<script src="/verja.js" type="text/javascript"></script>
```

A basic example of validating an object by declaring a schema and calling the validate method

```
	var schema = {
		property: new verja.Field({type: 'string'})
	};
	var obj = {
		property: 12345
	};
	verja.validate(obj, schema, function(err) {
		if (err) { return console.log(err) }
		return console.log('valid!');
	});
	
	// logs { property: { type: true } }
```

Verja schemas support nested objects and arrays

```
var schema = {
	key: {
		key2: new verja.Field({
			itemSchema: new verja.Field({type: 'string'}),
			minlength: 2
		}),
		key3: new verja.Field({type: 'number', max: 100})
	},
	key4: new verja.Field({required: true})
};
```
The following validators are available:

```
var schema = {
	strings: new verja.Field({
		maxlength: 5, 
		minlength: 2, 
		equals: 'a string to match',
		regex: 'string or /pattern/',
		email: true,
		url: true,
		hasLowerCaseLetter: true,
		hasCapitalLetter: true,
		hasNumber: true
	}),
	numbers: new verja.Field({
		min: 1,
		max: 5,
		int: true,
		equals: 3		
	}),
	everything: new verja.Field({
		type: 'lowercase, string version of type',
		required: true,
		equals: 'this can also take an object pointer'
	})
};
```

You can add custom validators like this. Pass true to the callback if the field is valid, false if it is not.  All validators are assumed to be async so returning will not do anything, you must use the callback

"val" here is the value of the field, "config" is the value of the validator property on the Field object passed into the schema. "callback" is an internal callback you cannot configure.

```
verja.addValidator('isArray', function(val, config, callback) {
	if (Array.isArray(val)) { return callback(true); }
	callback(false);
});

var schema = {
	key: new verja.Field({isArray: true})
};
```


### Develop
**Setup**

```npm install```


**Tests**

Tests use [mocha](http://mochajs.org/).  To run, use:

```npm test```

**Minification**

Minify using [uglify-js](http://lisperator.net/uglifyjs/). To minify, use:

```npm run minify```