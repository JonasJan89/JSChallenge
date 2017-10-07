const Mocha = require('mocha');
const studentsCodeHelper = require('../helper/studentsCodeHelper');
const unittestHelper = require('../helper/unittestHelper');


const dynamicAssessor = (solution) => {

    studentsCodeHelper.copyFile(solution.fileName, ['add', 'sub']);
    unittestHelper.copyFile(solution, ['add','sub']);

    //ToDo definitiv ein Problem, welches in der Arbeit beschrieben werden könnte
    Object.keys(require.cache).forEach( file => {
        delete require.cache[ file ];
    });

    let mocha = new Mocha();
    mocha.addFile(`./files/testfiles/test_${solution.taskID}.js`);

    //ToDo collecting and save in a feedback file
    let p = new Promise(resolve => {
        let testResult = [];
        mocha.reporter('list').run()
            .on('pass', function(test) {
                testResult.push({
                    title: test.title,
                    state: test.state,
                })
            })
            .on('fail', function(test) {
                testResult.push({
                    title: test.title,
                    state: test.state,
                    err: test.err,
                })
            })
            .on('end', function() {
                resolve(testResult);
            });


    });

    return p.then(testResult => {
        studentsCodeHelper.deleteFile(solution.fileName);
        unittestHelper.deleteFile(solution.taskID);
        return testResult;
    });


};

module.exports = dynamicAssessor;
