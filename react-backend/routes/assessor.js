const assessor = require('express').Router();
const db = require('../services/DatabaseService');
const assessorHandler = require('../assessors/assessorHandler');

assessor.route('/:solutionID')
    .get(( req, res, next ) => {
        db.solutions.getByIdWR(req, res, next, assessorHandler);
    })
    .all(function (req, res, next) {
        if (res.locals.processed) {
            next();
        } else {
            let err = new Error('this method is not allowed at ' + req.originalUrl);
            err.status = 405;
            next(err);
        }
    });

module.exports = assessor;
