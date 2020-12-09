const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show Input Error : 
function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

// Show Success 

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// Check email :
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    }else{
        showError(input,'Email is not Valid');
    }
}

// Check Required fields 
function checkRequired(inputArr) {
    inputArr.forEach((input) => {
        if(input.value.trim() === ""){
            showError(input,`${getFieldName(input)} Is Required`);
        }else{
            showSuccess(input);
        }
    });
}

// Check password : 
function checkPasswordMatch(input1,input2) {
    if(input1.value !== input2.value){
        showError(input2,'Passwords Do Not Match');
    }
}

// Get FieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check Length :
function checkLength(input,min,max) {
    if(input.value.length < min) {
        showError(input,`${getFieldName(input)} must be at least ${min} characters. `);
    }else if(input.value.length > max){
        showError(input,`${getFieldName(input)} must be less than ${max} characters. `);
    }
    else{
        showSuccess(input);
    }
}

// Event Listeners : 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    checkRequired([username,email,password,password2]);
    checkLength(username, 3, 15);
    checkLength(password,6,25);
    checkLength(password2,6,25);
    checkEmail(email);
    checkPasswordMatch(password,password2);
});

