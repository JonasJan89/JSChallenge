const CLIEngine = require("eslint").CLIEngine;
const cli = new CLIEngine();

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
