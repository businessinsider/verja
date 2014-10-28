Verja - BI's Declarative Object Validator
=================================

Built to support complex object structures, deeply nested arrays, and async validators.


### Install

```git clone https://github.com/businessinsider/verja```


### Use
Via node

```
	var verja = require('verja');
```

Or the browser

```
	<script src="/verja.js" type="text/javascript"></script>
```

A basic example of validating an object by declaring a schema, and calling the validate method

```
	var schema = {
		property: new verja.Field({type: 'string'})
	};
	var obj = {
		property: 'some value'
	};
	verja.validate(obj, schema, function(err) {
		if (err) { return console.log('invalid', err) }
		return console.log('valid!');
	});
```

Verja schemas support nested objects and arrays

```
var schema = {
	key: {
			key2: [new verja.Field({type: 'string'})],
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
			url: true
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

You can add custom validators like this. Return true if you want an error, false if no error:

```
verja.addValidator('isntArray', function(val, config) {
	if (Array.isArray(val)) return false;
	return true;
});

var schema = {
	key: new verja.Field({isntArray: true})
};
```


### Develop
**Setup**

```npm install```


**Tests**

Tests use [mocha](http://mochajs.org/).  To run, use:

```npm test``` - You may need to ```npm install mocha -g```