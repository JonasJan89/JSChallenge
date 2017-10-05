const solutions = require('express').Router();
const db = require('../services/DatabaseService');
const fs = require('fs');
const formidable = require('express-formidable');

//ToDo: Why??
const logger = require('debug')('JSChallenge:solutions');

solutions.route('/')
    .get(( req, res, next ) => {
        db.solutions.getAll(req,res,next);
    })
    //ToDo formidable hatte ich vor allen request, das führte zu problemen, wenn kein form ankommt
    .post(formidable({uploadDir: './tmp'}),(req, res, next) => {
        if(!req.files) {
            let err = new Error('no file attached');
            err.status = 400; //ToDo welcher statuscode?
            next(err);
        }
        db.solutions.saveOne(req, res, next);
        if(req.files.studentsCode.path && req.fields.studentID && req.fields.taskID) {
            fs.rename(req.files.studentsCode.path,
                `files/studentsCode/${req.fields.studentID}_${req.fields.taskID}.js`,
                function (err) {
                    if (err) {
                        //ToDo: error handling
                        next(err);
                    }
                }
            );
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
