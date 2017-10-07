const assessor = require('express').Router();
const db = require('../services/DatabaseService');
const dynamicAssessor = require('../assessors/dynamicAssessor');
const staticAssessor = require('../assessors/staticAssessor');

//ToDo: Why??
const logger = require('debug')('JSChallenge:assessor');

let feedback = {};
const assessSolution = (req, res, next, solution) => {

    feedback = {
        solutionID: solution._id,
    };
    new Promise((resolve) => {
        resolve(staticAssessor(solution.fileName));
    }).then(saf => {
        feedback.staticAutomaticFeedback = saf;
        if( feedback.staticAutomaticFeedback.length > 0 ) {
            feedback.dynamicAutomaticFeedback = [];
            db.feedback.saveOne(feedback,res,next);
        } else {
            let p = new Promise(resolve => {
                resolve(dynamicAssessor(solution));
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
