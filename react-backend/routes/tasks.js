const tasks = require('express').Router();
const db = require('../services/DatabaseService');
const formidable = require('express-formidable');
const fs = require('fs');

tasks.route('/')
    .get((req, res, next) => {
        db.tasks.getAll(req,res,next);
    })
    .post(formidable({uploadDir: './tmp'}), (req, res, next) => {
        db.tasks.saveOne(req, res, next);
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

tasks.route('/:id')
    .get((req, res, next) => {
        db.tasks.getById(req, res, next);
    })
    .put(formidable({uploadDir: './tmp'}), (req, res, next) => {
        db.tasks.updateById(req, res, next);
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

tasks.route('/:id/textdownload')
    .get((req,res,next) => {
        db.tasks.getTitleForDownload(req,res,next);
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

tasks.route('/:id/codedownload')
    .get((req,res,next) => {
        if(fs.existsSync(`./files/tasks/code_${req.params.id}.js`)) {
            res.download(`./files/tasks/code_${req.params.id}.js`, function(err){
                if (err) {
                    next(err);
                }
            });
        } else {
            res.status(204);
            res.locals.processed = true;
            next();
        }
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

module.exports = tasks;
