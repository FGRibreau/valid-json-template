'use strict';
/*global describe, it, beforeEach */
var t = require('chai').assert;
var jsonTemplate = require('./');

//jscs:disable disallowQuotedKeysInObjects

describe('valid-json-template', function() {
  var tmpl, data;

  beforeEach(function() {
    tmpl = {
      'user': {
        'age': '{{ age.computed }}',
        'biography': '{{biography}}',
        'hasBlueEyes': '{{ eyes.areBlue }}'
      }
    };

    data = {
      'biography': 'Hello world, 42.',
      'age': {
        'computed': 25
      },
      'eyes': {
        'areBlue': true
      }
    };

  });
  it('should compile with the right types', function() {
    var myTmpl = JSON.stringify(tmpl);

    t.deepEqual(jsonTemplate(myTmpl)(data), '{"user":{"age":25,"biography":"Hello world, 42.","hasBlueEyes":true}}');
  });

  it('should be a valid JSON schema', function() {
    t.deepEqual(JSON.parse(jsonTemplate(JSON.stringify(tmpl))(data)), {
      'user': {
        'age': 25,
        'biography': 'Hello world, 42.',
        'hasBlueEyes': true
      }
    });
  });

  it('should keep a missing tag in default mode', function() {
    tmpl.user.name = '{{name}}';
    t.deepEqual(JSON.parse(jsonTemplate(JSON.stringify(tmpl))(data)), {
      'user': {
        'age': 25,
        'biography': 'Hello world, 42.',
        'hasBlueEyes': true,
        'name': '{{name}}'
      }
    });
  });

  it('should throw an error when a value is empty when empty values are disallowed', function() {
    data.biography = '';
    t.throw(jsonTemplate(JSON.stringify(tmpl), {disallowEmpty: true}).bind(data), /Empty value for key `\S+`/);
  });

  it('should not throw an error when a value is empty when empty values are not disallowed', function() {
    data.biography = '';
    t.deepEqual(JSON.parse(jsonTemplate(JSON.stringify(tmpl))(data)), {
      'user': {
        'age': 25,
        'biography': '{{biography}}',
        'hasBlueEyes': true
      }
    });
  });

  it('should throw an error when a key is missing in strict mode', function() {
    t.throw(jsonTemplate(JSON.stringify(tmpl), {strictMode: true}).bind({}), /Missing key `\S+`/);
  });

  it('should execute the mapper function if given', function() {
    function f(key, vars, options) {
      t.deepEqual(vars, data);
      t.deepEqual(options, {mapper: f});
      return key.trim() + ' test';
    }

    t.deepEqual(JSON.parse(jsonTemplate(JSON.stringify(tmpl), {mapper: f})(data)), {
      'user': {
        'age': 'age.computed test',
        'biography': 'biography test',
        'hasBlueEyes': 'eyes.areBlue test'
      }
    });
  });
});
