const fs = require('fs');

const UnittestService =  {
    loadTests: (testDir) => {
        return fs.readdirSync(testDir).filter(function(file){
            return file.substr(-3) === '.js';
        });
    }
};

module.exports = UnittestService;
