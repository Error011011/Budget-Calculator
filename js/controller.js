import * as view from './view.js';
import * as model from './model.js';


init();


// actions 
view.elements.form.addEventListener('submit', function(e) { 
    e.preventDefault();
    if (!view.checkEmptyFields()) return;
    
    const data = view.getFormData();
    const record = model.createRecord(data);
    view.renderRecord(record);
    
    view.clearForm();
    view.renderBudget(model.calcBudget());
    
    
    
    
})

document.body.addEventListener('click', function(e) {
    if(e.target.closest('.item__remove')) {
        
        const id = view.removeRecord(e);
        
        model.removeRecord(id);
        view.renderBudget(model.calcBudget());
        
    }
    
})




// functions

function init() {

    view.clearForm();
    displayMonth();
    view.renderBudget(model.calcBudget())
}
function displayMonth() {
    
    
    const monthYear = model.getMonthYear(); 
    view.renderMonth(monthYear.month, monthYear.year);
    
}