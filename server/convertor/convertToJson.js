const fs = require('fs')
const excelToJson = require('convert-excel-to-json');


const result = (pathName) => {
    return excelToJson({
        source: fs.readFileSync("../server/public/uploads/" + pathName) // fs.readFileSync return a Buffer
    });
}

module.exports = result