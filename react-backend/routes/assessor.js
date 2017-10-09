const assessor = require('express').Router();
const db = require('../services/DatabaseService');
const dynamicAssessor = require('../assessors/dynamicAssessor');
const staticAssessor = require('../assessors/staticAssessor');
const studentsCodeHelper = require('../helper/studentsCodeHelper');

let feedback = {};
const assessSolution = (req, res, next, solution) => {
    let methods = require(`../files/unittests/methods_${solution.taskID}`);
    feedback = {
        solutionID: solution._id,
        staticAutomaticFeedback: [],
        dynamicAutomaticFeedback: [],
    };
    let missingMethods = studentsCodeHelper.checkForMethods(solution, methods);
    if( missingMethods.length > 0 ) {
        feedback.staticAutomaticFeedback = [{
            type: 'missingMethods',
            message: missingMethods,
        }];
        db.feedback.saveOne(feedback,res,next);
        return;
    }

    new Promise((resolve) => {
        resolve(staticAssessor(solution.fileName));
    }).then(saf => {
        feedback.staticAutomaticFeedback = saf;
        if( feedback.staticAutomaticFeedback.length > 0 ) {
            db.feedback.saveOne(feedback,res,next);
        } else {
            let p = new Promise(resolve => {
                resolve(dynamicAssessor(solution, methods));
            });
            p.then(result => {
                feedback.dynamicAutomaticFeedback = result;
                db.feedback.saveOne(feedback,res,next);
            });
        }

    });
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
