const requestHandler = require('express').Router();
const users = require('../routes/users');
const solutions = require('../routes/solutions');
const assessor = require('../routes/assessor');

requestHandler.use('/users', users);
requestHandler.use('/solutions', solutions);
requestHandler.use('/assessor', assessor);

requestHandler.use(function (req, res, next) {
    if (res.locals.items) {
        res.json(res.locals.items);
        delete res.locals.items;
    } else {
        res.set('Content-Type', 'application/json');
        res.status(204).end(); // no content;
    }
});

// catch 404 and forward to error handler
//toDo: make a better version??
requestHandler.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ToDo: error handler
requestHandler.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).end();
    // res.render('error');
});

module.exports = requestHandler;
