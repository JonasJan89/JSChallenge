const fs = require('fs');
const studentsCodeDir = './files/studentsCode/';
const testfilesDir = './files/testfiles/';

const studentsCodeHelper = {

    checkForMethods: (fileName, methods) => {
        // let code =  fs.readFileSync(`${studentsCodeDir}${solution.studentID}_${solution.taskID}.js`, 'utf8');
        let code =  fs.readFileSync(`${studentsCodeDir}${fileName}.js`, 'utf8');
        return methods.filter(method => code.indexOf(method) === -1).map(method => `Method "${method}" is missing.`);
    },

    prepareFile: (fileName, methods = []) => {
        fs.copyFileSync(`${studentsCodeDir}${fileName}`, `${testfilesDir}${fileName}`);
        let extraCode = '\n\nmodule.exports = { ';
        methods.forEach(method => {
            extraCode += `${method}: ${method},`;
        });
        extraCode += ' };\n';
        fs.appendFileSync(`${testfilesDir}${fileName}`, extraCode);
    },

    deleteFile: (fileName) => {
        fs.unlinkSync(`${testfilesDir}${fileName}`);
    },

};

module.exports = studentsCodeHelper;
