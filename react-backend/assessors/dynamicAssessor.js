const Mocha = require('mocha');
const studentsCodeHelper = require('../helper/studentsCodeHelper');
const unittestHelper = require('../helper/unittestHelper');

const dynamicAssessor = (solution, methods) => {

    studentsCodeHelper.prepareFile(solution.fileName, methods);
    unittestHelper.prepareFile(solution, methods);
    let mocha = new Mocha();
    mocha.addFile(`./files/testfiles/test_${solution.taskID}.js`);

    //ToDo muss gesetzt werden, damit nicht immer wieder neue Listener erschaffen werden.
    process.setMaxListeners(3);

    let p = new Promise(resolve => {
        let testResult = [];
        mocha.reporter('list').run()
            .on('pass', function(test) {
                testResult.push({
                    title: test.title,
                    state: test.state,
                })
            })
            .on('fail', function(test, err) {
                testResult.push({
                    title: test.title,
                    state: test.state,
                    err: err,
                })
            })
            .on('end', function() {
                resolve(testResult);
            });
    });

    return p.then(testResult => {

        /*ToDo definitiv ein Problem, welches in der Arbeit beschrieben werden könnte.
            muss sein, weil sonst die Tests nicht doppelt durchlaufen
         */

        Object.keys(require.cache).forEach( file => {
            delete require.cache[ file ];
        });
        studentsCodeHelper.deleteFile(solution.fileName);
        unittestHelper.deleteFile(solution.taskID);
        return testResult;
    });
};

module.exports = dynamicAssessor;
