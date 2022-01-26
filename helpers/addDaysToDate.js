exports.addDaysToDate = (date, days) => {

    let res = new Date(date);
    res.setDate(res.getDate() + days);

    return res;
}

