const validator = require('../helpers/validate');

const customMessages = {
    required: 'The :attribute field is required.',
    string: 'The :attribute field must be a string.',
    numeric: 'The :attribute field must be a number.',
    array: 'The :attribute field must be an array.'
};

const createCampsite = (req, res, next) => {
    const rules = {
        name: 'required|string',
        location: 'required|string',
        description: 'required|string',
        rating: 'required|numeric',
        pricePerNight: 'required|numeric',
        amenities: 'required|array',
        accessibility: 'required|string'
    };
    
    validator(req.body, rules, customMessages, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const updateCampsite = (req, res, next) => {
    const rules = {
        name: 'string',
        location: 'string',
        description: 'string',
        rating: 'numeric',
        pricePerNight: 'numeric',
        amenities: 'array',
        accessibility: 'string'
    };
    
    validator(req.body, rules, customMessages, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const deleteCampsite = (req, res, next) => {
    const rules = {
        id: 'required|regex:/^[0-9a-fA-F]{24}$/'
    };
    
    validator(req.params, rules, customMessages, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    createCampsite,
    updateCampsite,
    deleteCampsite
};