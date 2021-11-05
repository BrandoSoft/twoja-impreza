const moment = require('moment')

//function test
//console.log(handlebarsHelpers.dateFixer(new Date("December 17, 1995 03:24:00")))

const handlebarsHelpers = {
    dateFixer: (date) => moment.utc(date).format('DD-MM-YY'),
};

module.exports = {
    handlebarsHelpers,
}