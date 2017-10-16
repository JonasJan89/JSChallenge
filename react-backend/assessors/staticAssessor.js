const CLIEngine = require("eslint").CLIEngine;
const cli = new CLIEngine();
/**
 * Im staticAssessor wird mithilfe der ESLint CLIEngine eine Lösung nach statischen Aspekten überprüft.
 * Die Resultate werde in einem Array gespeichert, welches anschließend zurückgegeben wird.
 */
const staticAssessor = (fileName) => {
    let p = new Promise((resolve) => {
        resolve(cli.executeOnFiles([`./files/studentsCode/${fileName}`]).results);
    });
    return p.then(results => {
        let result = [];
        results.forEach( r => {
           r.messages.forEach( m => result.push(m));
        });
        return result;
    });
};

module.exports = staticAssessor;
