
const elements = {
    form: document.querySelector('#form'),
    type: document.querySelector('#type'),
    title: document.querySelector('#title'),
    value: document.querySelector('#value'),

    incList:  document.querySelector('#incomes-list'),
    expList:  document.querySelector('#expenses-list'),

    budgetEl:  document.querySelector('#budget'),
    totalIncomeEl:  document.querySelector('#total-income'),
    totalExpensesEl: document.querySelector('#total-expense'),
    percentsWrapper:  document.querySelector('#expense-percents-wrapper'),

    monthEl:document.querySelector('#month'),
    yearEl: document.querySelector('#year'),

};

function checkEmptyFields() {
    if(elements.title.value.trim() === '') {
        elements.title.classList.add('form__input--error');
        return false;
    } else {
        elements.title.classList.remove('form__input--error');  
    };

    if(elements.value.value.trim() === '' || +elements.value.value <= 0) {
        elements.value.classList.add('form__input--error');
        return false;
    } else {
        elements.value.classList.remove('form__input--error'); 
  
    };

    return true;
}

function renderRecord(record) {

    if(record.type === 'inc') {
        const html = `
                    <li data-id="${record.id}" class="budget-list__item item item--income">
                    <div class="item__title">${record.title}</div>
                    <div class="item__right">
                        <div class="item__amount">+ ${priceFormatter.format(record.value)}</div>
                        <button class="item__remove">
                            <img
                                src="./img/circle-green.svg"
                                alt="delete"
                            />
                        </button>
                    </div>
                    </li>
                    `;

        elements.incList.insertAdjacentHTML('afterbegin', html);

        } else {
            const html = `
                    <li data-id="${record.id}" class="budget-list__item item item--expense">
                        <div class="item__title">${record.title}</div>
                        <div class="item__right">
                            <div class="item__amount">
                                - ${priceFormatter.format(record.value)}
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>
                    `;

            elements.expList.insertAdjacentHTML('afterbegin', html);
        }

}

function renderBudget({totalInc, totalExp, totalBudget, expPercents}) {
    elements.budgetEl.innerHTML = priceFormatter.format(totalBudget);
    elements.totalIncomeEl.innerHTML = priceFormatter.format(totalInc);
    elements.totalExpensesEl.innerHTML = priceFormatter.format(totalExp);

    if(expPercents) {
        const html = ` <div class="badge">${expPercents}%</div>`
        elements.percentsWrapper.innerHTML = html;
    } else {
        elements.percentsWrapper.innerHTML = '';    
    }
}

function clearForm () {
    elements.form.reset();
}

function renderMonth(month, year) {
    elements.monthEl.innerHTML = month;
    elements.yearEl.innerHTML = year;
}

function getFormData() {
    const data = {
        type: elements.type.value,
        title: elements.title.value.trim(),
        value: +elements.value.value,

    };
    return data;
}

function removeRecord(e) {
    const recordElement =  e.target.closest('.budget-list__item');
    const id = recordElement.dataset.id;
    recordElement.remove();
    return id;
}



const priceFormatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
})

export {priceFormatter, elements, checkEmptyFields, renderRecord, renderBudget, clearForm, renderMonth, getFormData, removeRecord};