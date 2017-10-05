const assessor = require('express').Router();
const db = require('../services/DatabaseService');
const fs = require('fs');
const dynamicAssessor = require('../assessors/dynamicAssessor');
const staticAssessor = require('../assessors/staticAssessor');

//ToDo: Why??
const logger = require('debug')('JSChallenge:assessor');
const assessSolution = (req, res, next, solution) => {
    dynamicAssessor(solution);
    res.locals.items = staticAssessor(solution.fileName);
    res.status(200);
    res.locals.processed = true;
    next()
};

assessor.route('/:solutionID')
    .get(( req, res, next ) => {
        db.solutions.getByIdWR(req, res, next, assessSolution);
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
