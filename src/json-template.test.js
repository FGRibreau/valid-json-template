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
        'biography': '{{ biography }}',
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
});
