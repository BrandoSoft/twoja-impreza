const { CATEGORY } = require("../data/checkboxList");
const formatData = (date) => {
    // if (date !== "") {
    //     let newDate = date.split("-")
    //     const startDate = `${newDate[0]}-${newDate[1]}-${newDate[2]}`.trim();
    //     const finishDate = `${newDate[3]}-${newDate[4]}-${newDate[5]}`.trim();
    //     newDate = {
    //         startDate,
    //         finishDate,
    //     }
    //     return newDate
    // }
    // return undefined;
}

const formatSearchParameters = (searchParameters) => {
    // if (searchParameters === "") {
    //     return undefined;
    // } else {
    //     return searchParameters.toUpperCase();
    // }
}

const formatAge = (firstAge, secondAge) => {
    if (firstAge === ""){
        firstAge = 1;
    }
    if (secondAge === ""){
        secondAge = 99;
    }
    if (firstAge <= secondAge) {
        const minAge = Number(firstAge);
        const maxAge = Number(secondAge);
        return { minAge, maxAge };
    } else {
        const minAge = Number(secondAge);
        const maxAge = Number(firstAge);
        return { minAge, maxAge };
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

const formatter = (data) => {
    const newData = {};
    newData.date = formatData(data.date);
    newData.searchParameters = formatSearchParameters(data.searchParameters);
    newData.age = formatAge(data.firstAge, data.secondAge);
    newData.checklist = formatChecklist(data);
    return newData;
}

module.exports = {
    formatter,
}