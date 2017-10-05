const Mocha = require('mocha');
const studentsCodeHelper = require('../helper/studentsCodeHelper');
const unittestHelper = require('../helper/unittestHelper');


const dynamicAssessor = (solution) => {

    studentsCodeHelper.copyFile(solution.fileName, ['add']);
    unittestHelper.copyFile(solution, ['add']);

    //ToDo definitiv ein Problem, welches in der Arbeit beschrieben werden könnte
    Object.keys(require.cache).forEach( file => {
        delete require.cache[ file ];
    });

    let mocha = new Mocha();
    mocha.addFile(`./files/testfiles/test_${solution.taskID}.js`);

    //ToDo collecting and save in a feedback file
    mocha.run()
        .on('test', function(test) {
            console.log('Test started: '+test.title);
        })
        .on('test end', function(test) {
            console.log('Test done: '+test.title);
        })
        .on('pass', function(test) {
            console.log('Test passed');
            console.log(test);
        })
        .on('fail', function(test, err) {
            console.log('Test fail');
            console.log(test);
            console.log(err);
        })
        .on('end', function() {
            console.log('All done');
        });

    studentsCodeHelper.deleteFile(solution.fileName);
    unittestHelper.deleteFile(solution.taskID);

};

module.exports = dynamicAssessor;
