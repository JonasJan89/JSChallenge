const fs = require('fs');
const unittestDir = './files/unittests/';
const testfilesDir = './files/testfiles/';

const unittestHelper = {

    /**
     * prepareFile kopiert eine Datei vom Pfad: './files/unittests/test_<fileName>.js' zum Pfad:
     * './files/testfiles/test_<fileName>.js und erweitert die Kopie um Importstatements,
     * welche für die Unittests benötigt werden.
     */
    prepareFile: (solution, methods = []) => {
        fs.copyFileSync(`${unittestDir}test_${solution.taskID}.js`, `${testfilesDir}test_${solution.taskID}.js`);
        let extraCode = '';
        methods.forEach(method => {
            extraCode += `\nconst { ${method} } = require('./${solution.fileName}');\n`;
        });
        fs.appendFileSync(`${testfilesDir}test_${solution.taskID}.js`, extraCode);
    },

    /**
     * deletFile löscht eine Datei mit dem Pfad: './files/testfiles/test_<fileName>.js
     */
    deleteFile: (taskID) => {
        fs.unlinkSync(`${testfilesDir}test_${taskID}.js`);
    }
};

module.exports = unittestHelper;
