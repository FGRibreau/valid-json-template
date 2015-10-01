**json-template**

[![Deps](https://david-dm.org/FGRibreau/json-template.png)](https://david-dm.org/FGRibreau/json-template)
[![Version](http://badge.fury.io/js/json-template.png)](https://david-dm.org/FGRibreau/json-template) [![Downloads](http://img.shields.io/npm/dm/json-template.svg)](https://www.npmjs.com/package/json-template)

### Why

Because sometimes you have a template like this **that needs to be a valid JSON**:

```js
var myTemplate = `{
	"user": {
    "age": "{{ age.computed }}",
    "biography": "{{ biography }}",
    "hasBlueEyes": "{{ eyes.areBlue }}",
  }
}`;

```

with a dataset like this:

```json
{
  "biography": "Hello world, 42.",
  "age":{
    "computed": 25
  },
  "eyes":{
    "areBlue": true
  }
}
```

and you want this:

```json
{
	"user": {
    "age": 25,
    "biography": "Hello world, 42.",
    "hasBlueEyes": true
  }
}
```

### npm


```shell
npm install json-template -S
```


### [changelog](/CHANGELOG.md)
