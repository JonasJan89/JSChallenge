const fs = require('fs');
const studentsCodeDir = './files/studentsCode/';
const testfilesDir = './files/testfiles/';

const studentsCodeHelper = {

    prepareFile: (fileName = '', methods = []) => {
        let extraCode = '\n\nmodule.exports = { ';
        methods.forEach(method => {
            extraCode += `${method}: ${method} || undefined,`;
        });
        extraCode += ' };\n';
        fs.copyFileSync(`${studentsCodeDir}${fileName}`, `${testfilesDir}${fileName}`);
        fs.appendFileSync(`${testfilesDir}${fileName}`, extraCode);
    },

    deleteFile: (fileName) => {
        fs.unlinkSync(`${testfilesDir}${fileName}`);
    },

    checkForMethods: (solution, methods) => {
        // let code =  fs.readFileSync(`${studentsCodeDir}${solution.studentID}_${solution.taskID}.js`, 'utf8');
        let code =  fs.readFileSync(`${studentsCodeDir}${solution.taskID}.js`, 'utf8');
        return methods.filter(method => code.indexOf(method) === -1).map(method => `Method "${method}" is missing.`);
    }
};

module.exports = studentsCodeHelper;
