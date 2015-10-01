'use strict';

var _ = require('lodash');
/**
 * json-template
 * @param  {string} templateString JSON template as a string
 * @return {function} function(data): string
 */
module.exports = function(templateString) {
  var reg = /\"\{\{[^#\{]([\s\S]+?)[^\}]\}\}\"/g;
  return function(data) {
    return templateString.replace(reg, function(match, key) {
      return JSON.stringify(_.get(data, key));
    });
  };
};
