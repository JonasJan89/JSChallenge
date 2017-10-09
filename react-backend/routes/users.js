const users = require('express').Router();
const db = require('../services/DatabaseService');

//ToDo: Why??
const logger = require('debug')('JSChallenge:users');

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
        let err = new Error('this method is not allowed at ' + req.originalUrl);
        err.status = 405;
        next(err);
    }
});

users.route('/:id')
    .get((req, res, next) => {
        db.users.getById(req, res, next);
    })
    .put((req, res, next) => {
        db.users.updateById(req, res, next);
    })
    //ToDo delete for admin
    .all(function (req, res, next) {
    if (res.locals.processed) {
        next();
    } else {
        let err = new Error('this method is not allowed at ' + req.originalUrl);
        err.status = 405;
        next(err);
    }
});

module.exports = users;
