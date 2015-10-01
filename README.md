# valid-json-template (we because `json-template` was taken)

[![Deps](https://david-dm.org/FGRibreau/valid-json-template.png)](https://david-dm.org/FGRibreau/valid-json-template)
[![Version](http://badge.fury.io/js/valid-json-template.png)](https://david-dm.org/FGRibreau/valid-json-template) [![Downloads](http://img.shields.io/npm/dm/valid-json-template.svg)](https://www.npmjs.com/package/valid-json-template)
[![Circle CI](https://circleci.com/gh/FGRibreau/valid-json-template/tree/master.svg?style=svg)](https://circleci.com/gh/FGRibreau/valid-json-template/tree/master)

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
npm install valid-json-template -S
```


### [changelog](/CHANGELOG.md)
