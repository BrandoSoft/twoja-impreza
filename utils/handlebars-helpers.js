// import moment from 'moment';

const moment = require('moment')



const handlebarsHelpers = {
        dateFixer: function (datetoFix){
        let isoDate = datetoFix;
        let newDate =  moment.utc(isoDate).format('DD-MM-YY');
        return newDate;
    }
};

module.exports = {
    handlebarsHelpers,
}