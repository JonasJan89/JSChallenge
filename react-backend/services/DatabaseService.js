const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/JSChallenge');
const fs = require('fs');

const FeedbackModel = require('../models/feedback');
const SolutionModel = require('../models/solution');
const TaskModel = require('../models/task');

const DatabaseService = {

    solutions: {

        /**
         * saveOne überprüft, ob es schon eine Solution mit entsprechender taskID in der Datenbank gibt.
         * Ist das der Fall, wird die Solution mit den neuen Daten aktualisiert.
         * Gibt es noch keine Solution in der Datenbank wird ein neues Solution-Objekt in die Datenbank gespeichert.
         * Anschließend wird die mitgelieferte Code Datei in den dafür vorgesehenen Ordner gespeichert.
         */

        saveOne: (req, res, next) => {
            const solution = {
                'taskID': req.fields.taskID || null,
                'fileName': `${req.fields.taskID}.js` || null,
            };

            SolutionModel.findOneAndUpdate({
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
                                if(req.files.code.path && req.fields.taskID) {
                                    fs.rename(req.files.code.path,
                                        `files/studentsCode/${req.fields.taskID}.js`,
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
                    } else {
                        if(req.files.code.path && req.fields.taskID) {
                            fs.rename(req.files.code.path,
                                `files/studentsCode/${req.fields.taskID}.js`,
                                function (err) {
                                    if (err) {
                                        next(err);
                                    }
                                }
                            );
                        }
                        res.status(200);
                        res.locals.items = item;
                        res.locals.processed = true;
                        next();
                    }
                }
            );
        },
        /**
         * updateById überprüft, ob es ein Solution-Objekt mit der übergebenen ID schon gibt und aktualisiert dieses
         * und schickt das aktualisierte Objekt als Antwort zurück.
         * Gibt es das Solution-Objekt noch nicht, wird eine entsprechende Antwort ohne Objekt gesendet.
         */

        updateById: (req,res,next) => {
            SolutionModel.findByIdAndUpdate(req.params.solutionID, req.fields, {new: true}, function (err, item) {
                if (err) {
                    next(err);
                } else if(item) {
                    if(req.files.code.path) {
                        fs.rename(req.files.code.path,
                            `files/studentsCode/${item.taskID}.js`,
                            function (err) {
                                if (err) {
                                    next(err);
                                }
                            }
                        );
                    }
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
        },
        /**
         * Gibt alle Solution-Objekte der Datenbank als Antwort zurück. Gibt es keine Solution-Objekte,
         * gibt es eine entsprechende Antwort ohne Objekte.
         */

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

        /**
         * getById gibt ein Solution-Objekt mit passender ID (req.params.solutionID) zurück.
         * Wird kein Solution-Objekt mit passender ID gefunden, gibt es eine entsprechende Antwort ohne Objekt.
         */

        getById: (req, res, next ) => {
            SolutionModel.findById(req.params.solutionID, function (err, item) {
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

        /**
         * getByTaskId durchsucht die Datenbank nach einem Solution-Objekt, welches die übergebene taskID beinhaltet
         * und Antwortet mit dem gefundenen Objekt.
         * Wird kein Solution-Objekt gefunden, gibt es eine entsprechende Antwort ohne Objekt.
         */

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

        /**
         * Wie getById nur, dass das Ergebnis nicht als Antwort zurück gesendet wird, sondern dem mitgeliefertem
         * assessorHandler übergeben wird. Das "WR" im Namen steht dabei für "without response".
         * Die Methode antwortet selbst also nicht dem Frontend.
         */

        getByIdWR: (req, res, next, assessorHandler) => {
            SolutionModel.findById(req.params.solutionID, function(err, item) {
                if(err) {
                    next(err);
                } else if (!item) {
                    let error = new Error('No solution found with id: ' + req.params.id);
                    error.status = 404;
                    next(error);
                } else {
                    assessorHandler(req, res, next, item);
                }
            });
        }
    },

    feedback: {

        /**
         * saveOne überprüft, ob es schon ein Feedback-Objekt mit erhaltender solutionID in der Datenbank gibt.
         * Ist das der Fall, wird das Feedback-Objekt mit den neuen Daten aktualisiert.
         * Gibt es noch kein Feedback-Objekt in der Datenbank, wird ein neues Feedback-Objekt in die Datenbank gespeichert.
         * Die Antwort enthält das neue oder aktualisierte Feedback-Objekt.
         */

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

        /**
         * getBySolutionId überprüft, ob es ein Feedback-Objekt mit erhaltender solutionID in der Datenbank gibt.
         * Ist das der Fall, enthält die Antwort das angefrage Objekt.
         */
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

        /**
         * getByIdWR durchsucht die Datenbank nach einem Feedback-Objekt mit der erhaltenen Id.
         * Wird ein Feedback-Objekt gefunden, wird dieses zurückgegeben.
         * Das "WR" im Namen steht dabei für "without response". Die Methode antwortet selbst also nicht dem Frontend.
         */

        getByIdWR: (Id) => {
            let error = new Error();
            let feedback = {};
            FeedbackModel.findById(Id, function (err, item) {
                if (err) {
                    error = err;
                } else if (!item) {
                    error.message = 'No feedback found with Id: ' + Id;
                    error.status = 404;
                } else {
                    feedback = item;
                }
            });
            return {error, feedback};
        }
    },

    tasks: {

        /**
         * getAll antwortet mit allen Task-Objekten der Datenbank.
         */

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
        /**
         * getById überprüft, ob es ein Task-Objekt mit erhaltener Id in der Datenbank gibt.
         * Wenn es ein entsprechendes Task-Objekt gefunden hat, ist dieses in der Antwort enthalten.
         */

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

        /**
         * getTitleForDownload sucht nach einem Task-Objekt mit erhaltener Id in der Datenbank.
         * Findet es ein entsprechendes Objekt, schickt es also Antwort ein Dokument zum herunterladen mit einem Aufgabentext.
         */

        getTitleForDownload: (req, res, next) => {
            TaskModel.findById(req.params.id, function(err, item) {
                if(item) {
                    if (fs.existsSync(`./files/tasks/text_${req.params.id}.pdf`)) {
                        res.download(`./files/tasks/text_${req.params.id}.pdf`, `${item.title}.pdf`, function (err) {
                            if (err) {
                                next(err);
                            }
                        });
                    } else {
                        res.status(204);
                        res.locals.processed = true;
                        next();
                    }
                }
            });
        },

        /**
         * saveOne überprüft, ob die Anfrage alle erforderlichen Dateien zum speichern eines Task-Objekts hat.
         * Ist dies nicht der Fall, wird mit einem Fehler geantwortet. Sind alle Dateien vorhanden,
         * wird ein neues Task-Objekt in der Datenbank angelegt und alle mitgelieferten Dateien in die entsprechenden
         * Ordner verschoben und für die spätere Verarbeitung umbenannt.
         */

        saveOne: (req, res, next) => {
            if(!req.files.unittestFile) {
                let error = new Error('Missing unittest JavaScript file!');
                error.status = 400;
                next(error);
                return;
            }
            if(!req.files.methodsFile) {
                let error = new Error('Missing methods JavaScript file!');
                error.status = 400;
                next(error);
                return;
            }
            if(!req.files.taskTextFile) {
                let error = new Error('Missing task text pdf file!');
                error.status = 400;
                next(error);
                return;
            }
            let model = new TaskModel(req.fields);
            model.save(function (err, item) {
                if (err) {
                    err.status = 400;
                    err.message += ' in fields: ' + Object.getOwnPropertyNames(err.errors);
                    next(err);
                } else {
                    let noError = true;
                    if(req.files && req.files.code !== undefined) {
                        fs.rename(req.files.code.path,
                            `files/tasks/code_${item._id}.js`,
                            function (err) {
                                if (err) {
                                    next(err);
                                    noError = false;
                                }
                            }
                        );
                    }
                    if( noError ) {
                        fs.rename(req.files.unittestFile.path,
                            `files/unittests/test_${item._id}.js`,
                            function (err) {
                                if (err) {
                                    next(err);
                                    noError = false;
                                }
                            }
                        );
                    }
                    if( noError ) {
                        fs.rename(req.files.methodsFile.path,
                            `files/unittests/methods_${item._id}.js`,
                            function (err) {
                                if (err) {
                                    next(err);
                                    noError = false;
                                }
                            }
                        );
                    }
                    if( noError ) {
                        fs.rename(req.files.taskTextFile.path,
                            `files/tasks/text_${item._id}.pdf`,
                            function (err) {
                                if (err) {
                                    next(err);
                                    noError = false;
                                }
                            }
                        );
                    }
                    if( noError ) {
                        res.locals.items = item;
                        res.locals.processed = true;
                        res.status(201);
                        next();
                    }
                }
            });
        },

        /**
         * updateById aktualisiert ein Task-Objekt mit der erhaltenen Id. Es wird anschließend geschaut, ob auch neue
         * Dateien mitgesendet wurden, welche dann in die entsprechenden Ordner verschoben und gleichzeitig umbenannt werden.
         */
        updateById: (req, res, next ) => {

            TaskModel.findByIdAndUpdate(req.params.id, req.fields, {new: true}, function (err, item) {
                if (err) {
                    next(err);
                } else if(item) {
                    if(req.files) {
                        let noError = true;
                        if (req.files.code !== undefined) {
                            fs.rename(req.files.code.path,
                                `files/tasks/code_${item._id}.js`,
                                function (err) {
                                    if (err) {
                                        next(err);
                                        noError = false;
                                    }
                                }
                            );
                        }
                        if (noError && req.files.unittestFile !== undefined) {
                            fs.rename(req.files.unittestFile.path,
                                `files/unittests/test_${item._id}.js`,
                                function (err) {
                                    if (err) {
                                        next(err);
                                        noError = false;
                                    }
                                }
                            );
                        }
                        if (noError && req.files.methodsFile !== undefined) {
                            fs.rename(req.files.methodsFile.path,
                                `files/unittest/methods_${item._id}.js`,
                                function (err) {
                                    if (err) {
                                        next(err);
                                        noError = false;
                                    }
                                }
                            );
                        }
                        if (noError && req.files.taskTextFile !== undefined) {
                            fs.rename(req.files.taskTextFile.path,
                                `files/tasks/text_${item._id}.pdf`,
                                function (err) {
                                    if (err) {
                                        next(err);
                                        noError = false;
                                    }
                                }
                            );
                        }
                        if(noError) {
                            res.status(200);
                            res.locals.items = item;
                            res.locals.processed = true;
                            next();
                        }

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
