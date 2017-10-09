const fs = require('fs');
const unittestDir = './files/unittests/';
const testfilesDir = './files/testfiles/';

const unittestHelper = {

    prepareFile: (solution, methods = []) => {
        fs.copyFileSync(`${unittestDir}test_${solution.taskID}.js`, `${testfilesDir}test_${solution.taskID}.js`);
        let extraCode = '';
        methods.forEach(method => {
            extraCode += `\nconst { ${method} } = require('./${solution.fileName}');\n`;
        });
        fs.appendFileSync(`${testfilesDir}test_${solution.taskID}.js`, extraCode);
    },

    deleteFile: (taskID) => {
        fs.unlinkSync(`${testfilesDir}test_${taskID}.js`);
    }
};

module.exports = unittestHelper;
