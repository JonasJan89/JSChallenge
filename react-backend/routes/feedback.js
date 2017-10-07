const feedback = require('express').Router();
const db = require('../services/DatabaseService');

//ToDo: Why??
const logger = require('debug')('JSChallenge:feedback');

feedback.route('/:id')
    .get((req, res, next) => {
        db.feedback.getById(req, res, next);
    })
        //todo nice to have
    // .put((req, res, next) => {
    //     db.users.updateById(req, res, next);
    // })
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
