const otherJobField = document.querySelector('#other-job-role');
const shirtColorField = document.querySelector('#color')
const activities = document.querySelectorAll('#activities-box > label > input');
const jobRoles = document.querySelector('#title');
let Colors = shirtColorField.querySelectorAll('option');

// Page Load
window.onload = ()=>{
    document.querySelector('#name').focus();
    document.querySelector("option[value='credit-card'] ").setAttribute('selected', '');
    activities.forEach((input)=> { input.checked = false })
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
const activitiesCost = document.querySelectorAll('#activities-box > label > .activity-cost');
const activitiesTime = document.querySelectorAll('#activities-box > label > span');
const activityTotal = document.querySelector('#activities-cost');

function disableActivities(selectedActivity){

    let selectedTime = selectedActivity.nextElementSibling.nextElementSibling.innerText

    activitiesTime.forEach((activity)=> {
        let sameTime = activity.innerHTML;
        if(sameTime === selectedTime){
            activity.previousElementSibling.previousElementSibling.setAttribute('disabled', "")
            selectedActivity.removeAttribute('disabled');
            activity.parentElement.className = 'disabled';
        }
    })
}
function enableActivities(selectedActivity){
    activitiesTime.forEach((activity)=> {

        let selectedTime = selectedActivity.nextElementSibling.nextElementSibling.innerText

        let sameTime = activity.innerHTML;

        if(sameTime === selectedTime){
            activity.parentElement.className = ' ';
            activity.previousElementSibling.previousElementSibling.removeAttribute('disabled')
        }
    })
}

let cost = 0;
activities.forEach((input, index)=> {
    input.addEventListener('click', e => {
        if(input.checked === true) {
            disableActivities(input);
            cost += parseInt(activitiesCost[index].innerText.replace('$', ' '));
        }
        else if(input.checked === false){
            enableActivities(input)
            cost -= parseInt(activitiesCost[index].innerText.replace('$', ' '));
        }
        activityTotal.innerText = `Total: $${cost}`
    })
    input.addEventListener('focus', ()=>{
        input.parentElement.className = 'focus';
        input.addEventListener('blur', ()=>{
                input.parentElement.className = ' ';
        })
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
const inputs = form.querySelectorAll('input[id]');
const payment = document.querySelector('#payment');
const email = document.querySelector('#email');
let errors = 0;

// Regular Expressions
const validEmail = /^[a-zA-Z0-9.]*@\w+.com$/gm;
const validCreditCardNum = /^\d{13,16}$/gm;
const validZip = /^\d{5}$/gm;
const validCVV = /^\d{3}$/gm;

function showInvalid(input , classToKeep = '', hintMessage = ''){
    input.parentElement.className = `${classToKeep} not-valid`
    input.parentElement.lastElementChild.style.display = 'block'
    if(hintMessage !== ''){
        input.parentElement.lastElementChild.innerText = hintMessage;
    }
    errors++;
}
function showValid(input, classToKeep = ''){
    input.parentElement.className = `${classToKeep} valid`
    input.parentElement.lastElementChild.style.display = 'none'
}
// Real Time Email Validation
email.addEventListener('keyup', ()=> {
    realTimeEmailValidation();
})

function realTimeEmailValidation(){
    if(!validEmail.test(document.querySelector('#email').value)) {
        showInvalid(document.querySelector('#email'))
    }
    else{
        showValid(document.querySelector('#email'))
    }
}

form.addEventListener('submit', e=> {
    errors = 0;



    // Activities Check
    if(activityTotal.innerText === 'Total: $0'){
        showInvalid(activityTotal, 'activities')
    }
    else{
        showValid(activityTotal, 'activities')
    }

    // Validation
    inputs.forEach((input)=> {
                   
        // Basic Info
        if(input.id === 'name' && input.value === '') {
            showInvalid(input)
        }
        else if(input.id === 'email'){
            if(validEmail.test(document.querySelector('#email').value)){
                showValid(document.querySelector('#email'))
            }
        }
        else if(input.id === 'name' && input.value !== ''){
            showValid(input)
        }

        // Payment Methods

        function validatePaymentInfo(field){
            if(validCreditCardNum.test(field.value)){
                showValid(field)
            }
            else if(validZip.test(field.value)){
                showValid(field)
            }
            else if(validCVV.test(field.value)){
                showValid(field)
            }
            else {
                if(field.id === 'cc-num' && field.value === ''){
                    showInvalid(field, '', 'Credit card number cannot be empty or blank')
                }
                else if(field.id === 'cc-num'){
                    showInvalid(field, '', 'Credit card number must be between 13 - 16 digits & contain no special characters or letters')
                }
                else if(field.id === 'zip'){
                    showInvalid(field)
                }
                else if(field.id === 'cvv'){
                    showInvalid(field)
                }
            }
        }

        if(payment.value === 'credit-card'){
            validatePaymentInfo(input)
        }
    })

    console.log(errors , validEmail.test(email.value))

    if(errors > 0){
        e.preventDefault();
    }

})







