const requestHandler = require('express').Router();
const users = require('../routes/users');
const solutions = require('../routes/solutions');
const assessor = require('../routes/assessor');
const feedback = require('../routes/feedback');
const tasks = require('../routes/tasks');

requestHandler.use('/users', users);
requestHandler.use('/solutions', solutions);
requestHandler.use('/assessor', assessor);
requestHandler.use('/feedback', feedback);
requestHandler.use('/tasks', tasks);

requestHandler.use(function (req, res, next) {
    if (res.locals.processed) {
        next();
    } else {
        let err = new Error('Not found: ' + req.originalUrl);
        err.status = 404;
        next(err);
    }
});

requestHandler.use(function (req, res, next) {
    if (res.locals.items) {
        res.json(res.locals.items);
        delete res.locals.items;
    } else {
        res.set('Content-Type', 'application/json');
        res.status(204).end(); // no content;
    }
});

// ToDo: error handler
requestHandler.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    console.log(err.message);
    res.json(err.message);
});

module.exports = requestHandler;
