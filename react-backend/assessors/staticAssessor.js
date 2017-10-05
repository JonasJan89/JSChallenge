const CLIEngine = require("eslint").CLIEngine;
const cli = new CLIEngine();

const staticAssessor = (fileName) => {
    //ToDo get feedback object and save information in it using databaseService
    let results = [];
    cli.executeOnFiles([`./files/studentdsCode/${fileName}`]).results.forEach( result => {
        result.messages.forEach( message => results.push(message));
    });
    return results;
};

module.exports = staticAssessor;
