let express = require('express');
let router = express.Router();

/* ToDo: remove */
let staticAssessor = require('../assessors/staticAssessor');

let users = [
    {
        id: Date.now(),
        username: "Anni",
    },
    {
        id: Date.now() + 1,
        username: "Jonas",
    }
];

/* GET users listing. */
router.route('/')
    .get((req, res, next) => {
        res.json(users);
    })
    .post((req, res, next) => {
        let user = req.body;
        user.id = Date.now();
        users.push(user);
        res.json(users);
    });

router.route('/:id')
    .get((req, res, next) => {
        res.json(users.filter( user => {
            return user.id == req.params.id;
        }));
    });

module.exports = router;
