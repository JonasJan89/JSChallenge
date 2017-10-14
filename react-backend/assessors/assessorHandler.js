const db = require('../services/DatabaseService');
const dynamicAssessor = require('./dynamicAssessor');
const staticAssessor = require('./staticAssessor');
const studentsCodeHelper = require('../helper/studentsCodeHelper');

let feedback = {};

const assessorHandler = (req, res, next, solution) => {
    feedback = {
        solutionID: solution._id,
        staticAutomaticFeedback: [],
        dynamicAutomaticFeedback: [],
    };
    let methods = require(`../files/unittests/methods_${solution.taskID}`);
    let missingMethods = studentsCodeHelper.checkForMethods(solution.taskID, methods);
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
            new Promise(resolve => {
                resolve(dynamicAssessor(solution, methods));
            }).then(result => {
                feedback.dynamicAutomaticFeedback = result;
                db.feedback.saveOne(feedback,res,next);
            });
        }

    });
};

module.exports = assessorHandler;
