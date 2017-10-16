const fs = require('fs');
const studentsCodeDir = './files/studentsCode/';
const testfilesDir = './files/testfiles/';

const studentsCodeHelper = {

    /**
     * checkForMethods überprüft ob in einer Datei mit dem Pfad: './files/studentsCode/<fileName>.js
     * sich die Methodennamen befinden, welche in dem erhaltenen Array 'methods' enthalten sind.
     */
    checkForMethods: (fileName, methods) => {
        let code =  fs.readFileSync(`${studentsCodeDir}${fileName}.js`, 'utf8');
        return methods.filter(method => code.indexOf(method) === -1).map(method => `Method "${method}" is missing.`);
    },

    /**
     * prepareFile kopiert eine Datei vom Pfad: './files/studentsCode/<fileName>.js' zum Pfad:
     * './files/testfiles/<fileName>.js und erweitert die Kopie um Exportstatements,
     * welche für die Unittests benötigt werden.
     */
    prepareFile: (fileName, methods = []) => {
        fs.copyFileSync(`${studentsCodeDir}${fileName}`, `${testfilesDir}${fileName}`);
        let extraCode = '\n\nmodule.exports = { ';
        methods.forEach(method => {
            extraCode += `${method}: ${method},`;
        });
        extraCode += ' };\n';
        fs.appendFileSync(`${testfilesDir}${fileName}`, extraCode);
    },

    /**
     * deletFile löscht eine Datei mit dem Pfad: './files/testfiles/<fileName>.js
     */
    deleteFile: (fileName) => {
        fs.unlinkSync(`${testfilesDir}${fileName}`);
    },

};

module.exports = studentsCodeHelper;
