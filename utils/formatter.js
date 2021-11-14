const { CATEGORY, AGE } = require("../data/checkboxList");

const formatData = (date) => {
    if (date !== "") {
        let newDate = date.split("-")
        const startDate = `${newDate[0]}-${newDate[1]}-${newDate[2]}`.trim();
        const finishDate = `${newDate[3]}-${newDate[4]}-${newDate[5]}`.trim();
        newDate = {
            startDate,
            finishDate,
        }
        return newDate
    }
    return undefined;
}

const formatSearchParameters = (searchParameters) => {
    if (searchParameters === "" ) {
        return undefined;
    } else {
        return searchParameters.toUpperCase();
    }
}

const formatChecklist = (data) => {
    const checklist = {};
    for (const element of CATEGORY) {
        if (data[`${element}`] !== undefined){
            checklist[`${element}`] = true;
        } else {
            checklist[`${element}`] = false;
        }
    }
    return checklist;
}
const ageChecklist = (data) => {
    const age = {};
    for (const element of AGE) {
        if (data[`${element}`] !== undefined){
            age[`${element}`] = true;
        } else {
            age[`${element}`] = false;
        }
    }
    return age;
}

const formatter = (data) => {
    const newData = {};
    newData.date = formatData(data.date);
    newData.searchParameters = formatSearchParameters(data.searchParameters);
    newData.age = ageChecklist(data);
    newData.checklist = formatChecklist(data);
    return newData;
}

module.exports = {
    formatter,
}