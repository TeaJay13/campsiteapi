// helper for validation using the npm package jsvalidator

const { Validator } = require('jsvalidator');

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    if (validation.passes()) {
        callback(null, true);
    } else {
        callback(validation.errors, false);
    }
};

module.exports = validator;