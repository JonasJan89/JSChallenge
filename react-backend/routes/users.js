const users = require('express').Router();
const db = require('../services/database');

//ToDo: Why??
const logger = require('debug')('JSChallenge:solutions');

users.route('/')
    .get((req, res, next) => {
        db.users.getAll(req,res,next);
    })
    .post((req, res, next) => {
        db.users.saveOne(req, res, next);
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

users.route('/:id')
    .get((req, res, next) => {
        db.users.getById(req, res, next);
    })
    .put(() => {
        db.users.updateById(req, res, next);
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

module.exports = users;
