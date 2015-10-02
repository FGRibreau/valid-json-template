'use strict';

var _ = require('lodash');
/**
 * json-template
 * @param  {string} templateString JSON template as a string
 * @param  {boolean} strictMode if true, throws an error if a key is missing
 * @return {function} function(data): string
 */
module.exports = function(templateString, strictMode) {
  var reg = /\"(\{\{([\s\S]+?)\}\})\"/g;
  return function(data) {
    return templateString.replace(reg, function(match, tag, key) {
      var value = _.get(data, _.trim(key));

      if (_.isUndefined(value) && strictMode) {
        throw new Error('Missing key `' + _.trim(key) + '`');
      }

      return JSON.stringify(value || tag);
    });
  };
};
