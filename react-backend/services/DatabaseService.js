const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/JSChallenge');

const FeedbackModel = require('../models/feedback');
const SolutionModel = require('../models/solution');
const SubtaskModel = require('../models/subtask');
const TaskModel = require('../models/task');
const TestsetModel = require('../models/testset');
const UserModel = require('../models/user');

const DatabaseService = {

    solutions: {

        saveOne: (req, res, next) => {

            const solution = {
                'studentID': req.fields.studentID || undefined,
                'taskID': req.fields.taskID || undefined,
                'fileName': `${req.fields.studentID}_${req.fields.taskID}.js` || undefined,
                'approvedForLecturer': req.fields.approvedForLecturer || undefined,
            };

            SolutionModel.findOneAndUpdate({
                    'studentID': solution.studentID,
                    'taskID': solution.taskID
                }, solution,
                { new: true },
                function (err, item) {
                    if (err) {
                        next(err);
                    }
                    if(!item) {
                        let model = new SolutionModel(solution);

                        model.save(function (err, item) {
                            if (err) {
                                err.status = 400;
                                err.message += ' in fields: ' + Object.getOwnPropertyNames(err.errors);
                                next(err);
                            } else {
                                res.locals.items = item;
                                res.locals.processed = true;
                                res.status(201);
                                next();
                            }
                        });
                    } else {
                        res.status(200);
                        res.locals.items = item;
                        res.locals.processed = true;
                        next();
                    }
                }
            );
        },

        getAll: (req, res, next) => {
            SolutionModel.find({}, function (err, items) {
                if (err) {
                    next(err);
                } else {
                    res.locals.items = items;
                    res.status(200);
                    res.locals.processed = true;
                    next()
                }
            });
        },

        getById: (req, res, next ) => {
            SolutionModel.findById(req.params.id, function (err, item) {
                if (err) {
                    next(err);
                } else if (!item) {
                    let error = new Error('No solution found with id: ' + req.params.id);
                    error.status = 404;
                    next(error);
                } else {
                    res.locals.items = item;
                    res.status(200);
                    res.locals.processed = true;
                    next()
                }
            });
        },

        getByIdWR: (req, res, next, assessSolution) => {
            SolutionModel.findById(req.params.solutionID, function(err, item) {
                if(err) {
                    next(err);
                } else if (!item) {
                    let error = new Error('No solution found with id: ' + req.params.id);
                    error.status = 404;
                    next(error);
                } else {
                    assessSolution(req, res, next, item);
                }
            });
        }
    },

    users: {

        saveOne: (req, res, next) => {
            UserModel.findOne({'emailAddress': `${req.body.emailAddress}`}, function(err, item) {
               if(err) {
                   err.status = 400;
                   next(err);
               } else if  (!item) {
                   let user = new UserModel(req.body);
                   user.save(function (err, item) {
                       if (err) {
                           err.status = 400;
                           err.message += ' in fields: ' + Object.getOwnPropertyNames(err.errors);
                           next(err);
                       } else {
                           res.locals.items = item;
                           res.locals.processed = true;
                           res.status(201);
                           next();
                       }
                   });
               } else {
                   let error = new Error(`User with EmailAddress: ${req.body.emailAddress} already exists`);
                   error.status = 400;
                   next(error);
               }
            });
        },

        getAll: (req, res, next) => {
            UserModel.find({}, function (err, items) {
                if (err) {
                    next(err);
                } else {
                    res.locals.items = items;
                    res.status(200);
                    res.locals.processed = true;
                    next()
                }
            });
        },

        getById: (req, res, next ) => {
            UserModel.findById(req.params.id, function (err, item) {
                if (err) {
                    next(err);
                } else if (!item) {
                    let error = new Error('No user found with id: ' + req.params.id);
                    error.status = 404;
                    next(error);
                } else {
                    res.locals.items = item;
                    res.status(200);
                    res.locals.processed = true;
                    next()
                }
            });
        },

        updateById: (req, res, next ) => {

            if (req.body._id !== req.params.id) {
                let err = new Error('id of PUT resource and send JSON body are not equal ' + req.params.id + " " + req.body._id);
                err.status = 400;
                next(err);
                return;
            }

            UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, item) {
                if (err) {
                    next(err);
                } else {
                    res.status(200);
                    res.locals.items = item;
                    res.locals.processed = true;
                    next();
                }
            });
        }
    },
};

module.exports = DatabaseService;
