const fs = require('fs')
const excelToJson = require('convert-excel-to-json');


const result = excelToJson({
    source: fs.readFileSync(__dirname + '/test.xlsx') // fs.readFileSync return a Buffer
});

module.exports = result