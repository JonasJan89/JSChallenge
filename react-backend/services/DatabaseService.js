const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/JSChallenge');

const FeedbackModel = require('../models/feedback');
const SolutionModel = require('../models/solution');
const TaskModel = require('../models/task');
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
                } else if(item) {
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

        getById: (req, res, next ) => {
            SolutionModel.findById(req.params.id, function (err, item) {
                if (err) {
                    next(err);
                } else if (!item) {
                    //ToDo müsste sein wie:  res.status(204); res.locals.processed = true; next();
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

        updateById: (req, res, next ) => {

            if (req.body._id !== req.params.id) {
                let err = new Error('id of request param and send JSON body have to be the same.');
                err.status = 400;
                next(err);
                return;
            }

            UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, item) {
                if (err) {
                    next(err);
                } else if(item){
                    res.status(200);
                    res.locals.items = item;
                    res.locals.processed = true;
                    next();
                } else {
                    res.status(204);
                    res.locals.processed = true;
                    next();
                }
            });
        }
    },

    feedback: {
        saveOne: (feedback, res, next) => {
            FeedbackModel.findOneAndUpdate({solutionID: feedback.solutionID}, feedback, { new: true }, function(err, item){
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

        getById: (req, res, next) => {
            FeedbackModel.findById(req.params.id, function(err, item) {
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

            TaskModel.findOne({'title': `${req.fields.title}`}, function(err, item){
                if (err) {
                    next(err);
                } else if(!item) {
                    let model = new TaskModel(req.fields);
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
                    let error = new Error(`Task with title: ${req.fields.title} already exists.`);
                    error.status = 400;
                    next(error);
                }
            });
        },

        updateById: (req, res, next ) => {

            if (req.fields._id !== req.params.id) {
                let err = new Error('id of request param and send field have to be the same.');
                err.status = 400;
                next(err);
                return;
            }

            TaskModel.findByIdAndUpdate(req.params.id, req.fields, {new: true}, function (err, item) {
                if (err) {
                    next(err);
                } else if(item) {
                    res.status(200);
                    res.locals.items = item;
                    res.locals.processed = true;
                    next();
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
