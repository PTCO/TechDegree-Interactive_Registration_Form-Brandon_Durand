const otherJobField = document.querySelector('#other-job-role');
const shirtColorField = document.querySelector('#color')
const jobRoles = document.querySelector('#title');
let Colors = shirtColorField.querySelectorAll('option');

// Page Load
window.onload = ()=>{
    document.querySelector('#name').focus();
    document.querySelector("option[value='credit-card'] ").setAttribute('selected', '')
    otherJobField.style.display = 'none';
    shirtColorField.setAttribute('disabled', "")
    showMethod('credit-card')
}


// Job Role
jobRoles.addEventListener('change', e => {
    if(e.target.tagName = 'OPTION'){
       if(e.target.value === 'other'){
            otherJobField.style.display = 'block'
       }
       else{
            otherJobField.style.display = 'none'
       }
    }
})

// T-SHIRT Design & Color
const checkDesign = (design)=>{
    
    Colors.forEach((colour, index)=> {
        Colors[index].style.display = 'block'

        if(colour.getAttribute('data-theme') !== design){
            Colors[index].style.display = 'none'
        }
    });

}  
document.querySelector('#design').addEventListener('click', e=> {
    
        Colors[0].removeAttribute('selected');
        Colors[0].setAttribute('selected', "");

        if(e.target.value === 'heart js'){
            checkDesign('heart js');
            shirtColorField.removeAttribute('disabled')
        }
        else if(e.target.value === 'js puns'){
            checkDesign('js puns');
            shirtColorField.removeAttribute('disabled')
        }
        else{
            shirtColorField.setAttribute('disabled', "")
        }

        
})

// Activities Total
const activities = document.querySelectorAll('#activities-box > label > input');
const activitiesCost = document.querySelectorAll('#activities-box > label > .activity-cost');
const activityTotal = document.querySelector('#activities-cost');

let cost = 0;

activities.forEach((input, index)=> {
    input.addEventListener('click', e => {
        if(input.checked === true) {
            cost += parseInt(activitiesCost[index].innerText.replace('$', ' '));
        }
        else if(input.checked === false){
            cost -= parseInt(activitiesCost[index].innerText.replace('$', ' '));
        }
        activityTotal.innerText = `$ ${cost}`
    })
})

// Payment Section
const paymentMethods = document.querySelector('.payment-methods');
const paymentMethodInfo = paymentMethods.querySelectorAll('div[id]');

const showMethod = (show)=>{
    paymentMethodInfo.forEach( method => {
        method.style.display = 'none'
        if(method.id === show){
            method.style.display = 'block'
        }
    })
}

paymentMethods.addEventListener('change', e=> {
    if( e.target.value === 'credit-card'){
        showMethod('credit-card')
    }
    else if (e.target.value === 'paypal'){
        showMethod('paypal')
    }
    else if (e.target.value === 'bitcoin'){
        showMethod('bitcoin')
    }
})

// Form Validation

const form = document.querySelector('form');

form.addEventListener('submit', e=> {
    e.preventDefault();
    const inputs = form.querySelectorAll('input[id]');

    // Regular Expressions
    const validEmail = /^[a-zA-Z0-9.]*@\w+.[a-z0-9.][a-z0-9.][a-z0-9.]$/gm;

    // Checks
    inputs.forEach((input)=> {
        if(input.id === 'name' && input.value === '') {
            input.parentElement.className = 'not-valid'
            input.parentElement.lastElementChild.style.display = 'block'
        }
        else if(input.id === 'email' && !validEmail.test(input.value)) {
            input.parentElement.className = 'not-valid'
            input.parentElement.lastElementChild.style.display = 'block'
        }
    })


})







