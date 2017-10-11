const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/JSChallenge');
const fs = require('fs');


const FeedbackModel = require('../models/feedback');
const SolutionModel = require('../models/solution');
const TaskModel = require('../models/task');
const UserModel = require('../models/user');

const DatabaseService = {

    solutions: {

        saveOne: (req, res, next) => {
            const solution = {
                // 'studentID': req.fields.studentID || null,
                'taskID': req.fields.taskID || null,
                // 'fileName': `${req.fields.studentID}_${req.fields.taskID}.js` || null,
                'fileName': `${req.fields.taskID}.js` || null,
                'approvedForLecturer': req.fields.approvedForLecturer || null,
            };

            SolutionModel.findOneAndUpdate({
                    // 'studentID': solution.studentID,
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
                } else if(items) {
                    res.locals.items = items;
                    res.status(200);
                    res.locals.processed = true;
                    next()
                } else {
                    res.status(204);
                    res.locals.processed = true;
                    next();
                }
            });
        },

        getByTaskId: (req, res, next ) => {
            SolutionModel.find({taskID: req.params.taskID}, function (err, item) {
                if (err) {
                    next(err);
                } else if (!item) {
                    res.status(204);
                    res.locals.processed = true;
                    next()
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
                   let error = new Error(`User with EmailAddress: ${req.body.emailAddress} already exists.`);
                   error.status = 400;
                   next(error);
               }
            });
        },

        getAll: (req, res, next) => {
            UserModel.find({}, function (err, items) {
                if (err) {
                    next(err);
                } else if ( items.length === 0 ){
                    res.status(204);
                    res.locals.processed = true;
                    next()
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
                    res.status(204);
                    res.locals.processed = true;
                    next();
                } else {
                    res.locals.items = item;
                    res.status(200);
                    res.locals.processed = true;
                    next()
                }
            });
        },

        updateBySolutionId: (req, res, next ) => {

            UserModel.findOneAndUpdate({'solutionID': `${req.params.solutionID}`}, req.body, {new: true}, function (err, item) {
                if (err) {
                    next(err);
                } else if(item){
                    res.status(200);
                    res.locals.items = item;
                    res.locals.processed = true;
                    next();
                } else {
                    let error = new Error(`User with ID: ${req.params.id} does not exists.`);
                    error.status = 400;
                    next(error);
                }
            });
        }
    },

    feedback: {
        saveOne: (feedback, res, next) => {
            FeedbackModel.findOneAndUpdate({'solutionID': `${feedback.solutionID}`}, feedback, { new: true }, function(err, item){
                if (err) {
                    next(err);
                }
                if(!item) {
                    let model = new FeedbackModel(feedback);
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
            });
        },

        getBySolutionId: (req, res, next) => {
            FeedbackModel.findOne({'solutionID': `${req.params.solutionID}`}, function(err, item) {
                if(err) {
                    next(err);
                } else if (!item) {
                    res.status(204);
                    res.locals.processed = true;
                    next();
                } else {
                    res.status(200);
                    res.locals.items = item;
                    res.locals.processed = true;
                    next();
                }
            });
        },

        getByIdWR: (id) => {
            let error = new Error();
            console.log(error);
            let feedback = {};
            FeedbackModel.findById(id, function (err, item) {
                if (err) {
                    error = err;
                } else if (!item) {
                    //ToDo müsste sein wie:  res.status(204); res.locals.processed = true; next();
                    error.message = 'No feedback found with id: ' + id;
                    error.status = 404;
                } else {
                    feedback = item;
                }
            });
            return {error, feedback};
        }
    },

    tasks: {

        getAll: (req, res, next) => {
            TaskModel.find({}, function (err, items) {
                if (err) {
                    next(err);
                } else if ( items.length === 0 ){
                    res.status(204);
                    res.locals.processed = true;
                    next();
                } else {
                    res.locals.items = items;
                    res.status(200);
                    res.locals.processed = true;
                    next();
                }
            });
        },

        getById: (req,res, next) => {
            TaskModel.findById(req.params.id, function (err, item) {
                if (err) {
                    next(err);
                } else if (!item) {
                    res.status(204);
                    res.locals.processed = true;
                    next();
                } else {
                    res.locals.items = item;
                    res.status(200);
                    res.locals.processed = true;
                    next();
                }
            });
        },

        saveOne: (req, res, next) => {
            let model = new TaskModel(req.fields);
            model.save(function (err, item) {
                if (err) {
                    err.status = 400;
                    err.message += ' in fields: ' + Object.getOwnPropertyNames(err.errors);
                    next(err);
                } else {
                    if(req.files && req.files.code !== undefined) {
                        fs.rename(req.files.code.path,
                            `files/tasks/${item._id}.js`,
                            function (err) {
                                if (err) {
                                    next(err);
                                }
                            }
                        );
                    }
                    res.locals.items = item;
                    res.locals.processed = true;
                    res.status(201);
                    next();
                }
            });
        },

        updateById: (req, res, next ) => {

            if (req.fields.id !== req.params.id) {
                let err = new Error('id of request param and send field have to be the same.');
                err.status = 400;
                next(err);
                return;
            }

            TaskModel.findByIdAndUpdate(req.params.id, req.fields, {new: true}, function (err, item) {
                if (err) {
                    next(err);
                } else if(item) {
                    if(req.files && req.files.code !== undefined ) {
                        fs.rename(req.files.code.path,
                            `files/tasks/${item._id}.js`,
                            function (err) {
                                if (err) {
                                    next(err);
                                } else {
                                    res.status(200);
                                    res.locals.items = item;
                                    res.locals.processed = true;
                                    next();
                                }
                            }
                        );
                    } else {
                        res.status(200);
                        res.locals.items = item;
                        res.locals.processed = true;
                        next();
                    }
                } else {
                    res.status(204);
                    res.locals.processed = true;
                    next();
                }
            });
        }
    }
};

module.exports = DatabaseService;
