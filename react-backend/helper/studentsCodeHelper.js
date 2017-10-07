const fs = require('fs');
const studentsCodeDir = './files/studentsCode/';
const testfilesDir = './files/testfiles/';

const studentsCodeHelper = {

    copyFile: (fileName = '', methods = []) => {
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
    }
};

module.exports = studentsCodeHelper;
