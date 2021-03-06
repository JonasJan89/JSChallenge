const Mocha = require('mocha');
const studentsCodeHelper = require('../helper/studentsCodeHelper');
const unittestHelper = require('../helper/unittestHelper');

/**
 * Im dynamicAssessor wird die Lösung eines Studenten mit Unittests überprüft.
 * Dazu wird eine Instanz von Mocha erzeugt und dieser ein Testfile übergeben,
 * bevor der Test gestartet wird. Der Test erzeugt Events, welche mithilfe von Listener
 * abgefangen werden. Die Resultate, die die Events liefern, werden in einem Array gespeichert,
 * welches anschließend zurückgegeben wird.
 */

const dynamicAssessor = (solution, methods) => {

    studentsCodeHelper.prepareFile(solution.fileName, methods);
    unittestHelper.prepareFile(solution, methods);
    let mocha = new Mocha();
    mocha.addFile(`./files/testfiles/test_${solution.taskID}.js`);

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

        Object.keys(require.cache).forEach( file => {
            delete require.cache[ file ];
        });

        studentsCodeHelper.deleteFile(solution.fileName);
        unittestHelper.deleteFile(solution.taskID);
        return testResult;
    });
};

module.exports = dynamicAssessor;
