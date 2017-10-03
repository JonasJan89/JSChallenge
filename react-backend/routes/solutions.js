const solutions = require('express').Router();
const db = require('../services/database');

//ToDo: Why??
const logger = require('debug')('JSChallenge:solutions');

solutions.route('/')
    .get(( req, res, next ) => {
        db.solutions.getAll(req,res,next);
    })
    .post(( req, res, next ) => {
        db.solutions.saveOne(req, res, next);
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

solutions.route('/:id')
    .get((req, res, next) => {
        db.solutions.getById( req, res, next );
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

module.exports = solutions;
