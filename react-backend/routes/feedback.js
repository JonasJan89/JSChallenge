const feedback = require('express').Router();
const db = require('../services/DatabaseService');

feedback.route('/:solutionID')
    .get((req, res, next) => {
        db.feedback.getBySolutionId(req, res, next);
    })
    .put((req, res, next) => {
        db.feedback.updateBySolutionId(req, res, next);
    })
    .all(function (req, res, next) {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            let err = new Error('this method is not allowed at ' + req.originalUrl);
            err.status = 405;
            next(err);
        }
    });

module.exports = feedback;
