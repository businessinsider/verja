BI's Declarative Object Validator
=================================

Built to support complex object structures, deeply nested arrays, and async validators.


### Install

```git clone https://github.com/malls/angular-validator```


### Use
Via node

```
	var Validator = require('./angular-validator/bi-validator');
```

Or the browser

```
	<script src="/angular-validator/bi-validator.js" type="text/javascript"></script>
```

A basic example of validating an object by declaring a schema, and calling the validate method

```
	var schema = {
		property: new Validator.Field({type: 'string'})
	};
	var obj = {
		property: 'some value'
	};
	Validator.validate(obj, schema, function(err) {
		if (err) { return console.log('invalid', err) }
		return console.log('valid!');
	});
```
