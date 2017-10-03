const solutions = require('express').Router();

solutions.route('/')
    .get((req, res, next) => {
        //ToDo: implementing get correctly
        res.json("List of solutions");
    })
    .post((req, res, next) => {
        let user = req.body;
        user.id = Date.now();
        users.push(user);
        res.json(users);
    });

solutions.route('/:id')
    .get((req, res, next) => {
        res.json(users.filter( user => {
            return user.id == req.params.id;
        }));
    });

module.exports = solutions;
