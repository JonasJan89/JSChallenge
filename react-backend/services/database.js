const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/JSChallenge');

const FeedbackModel = require('../models/feedback');
const SolutionModel = require('../models/solution');
const SubtaskModel = require('../models/subtask');
const TaskModel = require('../models/task');
const TestsetModel = require('../models/testset');
const UserModel = require('../models/user');

const DatabaseService = {

    solutions: {

        saveOne: (req, res, next) => {

            SolutionModel.findOneAndUpdate({
                    'studentID': `${req.body.studentID}`,
                    'taskID': `${req.body.taskID}`
                }, req.body,
                { new: true },
                function (err, item) {
                    if (err) {
                        next(err);
                        return;
                    }

                    if(!item) {
                        let model = new SolutionModel(req.body);

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
    },

    users: {

        saveOne: (req, res, next) => {

            new UserModel(req.body).save(function (err, item) {
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
