const requestHandler = require('express').Router();

const users = require('../routes/users');
const solutions = require('../routes/solutions');
// const courses = require('../routes/courses');
// const tasks = require('../routes/tasks');

requestHandler.use('/users', users);
requestHandler.use('/solutions', solutions);
// requestHandler.use('/courses', courses);
// requestHandler.use('/tasks', tasks);

requestHandler.use(function (req, res, next) {
    if (res.locals.items) {
        res.json(res.locals.items);
        delete res.locals.items;
    } else {
        res.set('Content-Type', 'application/json');
        res.status(204).end(); // no content;
    }
});

module.exports = requestHandler;
