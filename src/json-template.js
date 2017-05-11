'use strict';

var _ = require('lodash');

/**
 * json-template
 * @param  {string} templateString JSON template as a string
 * @param  {object} options
 *  strictMode: if true, throws an error if a key is missing
 *  disallowEmpty: if true, throws an error if a value is empty
 *  mapper: function to execute on each tag
 * @return {function} function(data): string
 */
module.exports = function(templateString, options) {
  var reg = /\"(\{\{([\s\S]+?)\}\})\"/g;
  options = options || {};

  return function(data) {
    var mapper = _.isFunction(options.mapper) ? _.partialRight(options.mapper, data, options) : _.flow(_.trim, _.partial(_.get, data));

    return templateString.replace(reg, function(match, tag, key) {
      var value = mapper(key);

      if (_.isUndefined(value) && options.strictMode) {
        throw new Error('Missing key `' + _.trim(key) + '`');
      }

      if (_.isEmpty(_.trim(value)) && options.disallowEmpty) {
        throw new Error('Empty value for key `' + _.trim(key) + '`');
      }

      return JSON.stringify(value || tag);
    });
  };
};
