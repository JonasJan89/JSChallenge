const fs = require('fs');
const unittestDir = './files/unittests/';
const testfilesDir = './files/testfiles/';

const unittestHelper = {

    copyFile: (solution, methods = []) => {
        let extraCode = '';
        methods.forEach(method => {
            extraCode += `\nconst { ${method} } = require('./${solution.fileName}');\n`;
        });
        fs.copyFileSync(`${unittestDir}test_${solution.taskID}.js`, `${testfilesDir}test_${solution.taskID}.js`);
        fs.appendFileSync(`${testfilesDir}test_${solution.taskID}.js`, extraCode);
    },

    deleteFile: (taskID) => {
        fs.unlinkSync(`${testfilesDir}test_${taskID}.js`);
    }
};

module.exports = unittestHelper;
