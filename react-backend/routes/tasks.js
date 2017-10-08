const tasks = require('express').Router();
const db = require('../services/DatabaseService');
const fs = require('fs');
const formidable = require('express-formidable');

tasks.route('/')
    .get((req, res, next) => {
        db.tasks.getAll(req,res,next);
    })
    .post(formidable({uploadDir: './tmp'}), (req, res, next) => {
        console.log(1);
        if(req.files && req.files.code !== undefined && req.fields.title !== undefined) {
            console.log(2);
            req.fields.fileName = `${req.fields.title}.js`;
            fs.rename(req.files.code.path,
                `files/tasks/${req.fields.title}.js`,
                function (err) {
                    if (err) {
                        next(err);
                    }
                    console.log(3);
                }
            );
        } else {
            console.log(4);
            req.fields.fileName = null;
        }
        console.log(5);
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
        if(req.files && req.files.code !== undefined ) {
            req.fields.fileName = `${req.fields.title}.js`;
            fs.rename(req.files.code.path,
                `files/tasks/${req.fields.title}.js`,
                function (err) {
                    if (err) {
                        next(err);
                    }
                }
            );
        }
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

tasks.route('/download/:title')
    .get((req,res,next) => {
        if(fs.existsSync(`./files/tasks/${req.params.title}.js`)) {
            res.download(`./files/tasks/${req.params.title}.js`, `${req.params.title}.js`, function(err){
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
