const CLIEngine = require("eslint").CLIEngine;
const cli = new CLIEngine();

const staticAssessor = (filePath) => {
    let results = [];
    cli.executeOnFiles([filePath]).results.forEach( result => {
        result.messages.forEach( message => results.push(message));
    });
    console.log(results);
};

module.exports = staticAssessor;
