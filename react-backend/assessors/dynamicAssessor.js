const Mocha = require('mocha');
const studentsCodeHelper = require('../helper/studentsCodeHelper');
const unittestHelper = require('../helper/unittestHelper');


const dynamicAssessor = (solution) => {
    let p = new Promise((resolve, reject) => {
        studentsCodeHelper.copyFile(solution.fileName, ['add']);
        unittestHelper.copyFile(solution, ['add']);
        resolve(true);
    });
    p.then(result => {
        if (result) {
            //ToDo definitiv ein Problem, welches in der Arbeit beschrieben werden könnte
            Object.keys(require.cache).forEach( file => {
                delete require.cache[ file ];
            });

            let mocha = new Mocha();
            mocha.addFile(`./files/testfiles/test_${solution.taskID}.js`);

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
        }
        studentsCodeHelper.deleteFile(solution.fileName);
        unittestHelper.deleteFile(solution.taskID);
    });

    //ToDo: catch for errors

};

module.exports = dynamicAssessor;
