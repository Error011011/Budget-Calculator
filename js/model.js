const budget = [];

function createRecord(data) {
    let id = 1;
    if(budget.length > 0) {
        const lastElement = budget[budget.length - 1];
        const lastElId = lastElement.id;
        id = lastElId + 1;
    }
    

    const record = {
        id: id,
        type: data.type,
        title: data.title,
        value: data.value,
    }

    budget.push(record);

    return record;
}

function removeRecord(id) {
    const index = budget.findIndex(function(element) {
        return id === element.id;
   })

   budget.splice(index, 1);
}

function calcBudget() {
    const totalInc = budget.reduce(function(total, element) {

        if(element.type === 'inc') {
            return total + element.value;
        } else {
            return total;
        }


    }, 0);

    // expenses
    const totalExp = budget.reduce(function(total, element) {

        if(element.type === 'exp') {
            return total + element.value;
        } else {
            return total;
        }

    }, 0);

    // total
    const totalBudget = totalInc - totalExp;

    // percents
    let expPercents = 0;
    if(totalInc) {
    expPercents = Math.round((totalExp * 100) / totalInc);
    };

    return { totalInc, totalExp, totalBudget, expPercents };     
}

function getMonthYear() {
    const now = new Date();
    const year = now.getFullYear();
    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
    });
    const month = timeFormatter.format(now);

    return {month, year};
}


export {createRecord, removeRecord, calcBudget, getMonthYear} 