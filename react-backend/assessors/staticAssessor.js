const CLIEngine = require("eslint").CLIEngine;
const cli = new CLIEngine();

const staticAssessor = (fileName) => {
    let results = [];
    cli.executeOnFiles([`./files/studentdsCode/${fileName}`]).results.forEach( result => {
        result.messages.forEach( message => results.push(message));
    });
    return results;
};

module.exports = staticAssessor;
