const requestHandler = require('express').Router();

// const users = require('../routes/users');
const solutions = require('../routes/solutions');
// const courses = require('../routes/courses');
// const tasks = require('../routes/tasks');

// requestHandler.use('/users', users);
requestHandler.use('/solutions', solutions);
// requestHandler.use('/courses', courses);
// requestHandler.use('/tasks', tasks);

module.exports = requestHandler;
