BI's Declarative Object Validator
=================================

Built to support complex object structures, deeply nested arrays, and async validators.


### Install

```git clone https://github.com/businessinsider/verja```


### Use
Via node

```
	var validator = require('./verja');
```

Or the browser

```
	<script src="/angular-validator/verja.js" type="text/javascript"></script>
```

A basic example of validating an object by declaring a schema, and calling the validate method

```
	var schema = {
		property: new validator.Field({type: 'string'})
	};
	var obj = {
		property: 'some value'
	};
	validator.validate(obj, schema, function(err) {
		if (err) { return console.log('invalid', err) }
		return console.log('valid!');
	});
```

### Develop
**Setup**

```npm install```

```bower install```


**Tests**

Tests use [mocha](http://mochajs.org/).  To run, use:

```npm test``` - You may need to ```npm install mocha -g```