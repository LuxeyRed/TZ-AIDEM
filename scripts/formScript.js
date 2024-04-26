const birthDate = document.getElementById("date-of-birth");

let newDate ='';
birthDate.addEventListener("focus", function() {
    let birth = birthDate.value;
    newDate =  birth.slice(6,10) + '-' + birth.slice(3,5) + '-' + birth.slice(0,2);
    birthDate.value = newDate;
    birthDate.type ='date';
    
});

birthDate.addEventListener("blur", function() {
    let birth = birthDate.value.toString();
    
    if(birthDate.value){
        newDate = birth.slice(8,10) + '.' + birth.slice(5,7) + '.' + birth.slice(0,4);
    }
    birthDate.type='text';
    birthDate.value = newDate;
});

const fileInput = document.getElementById('file-input');
const dropArea = document.getElementById('drop-area');
const fileInputBtn = document.getElementById('file-input-btn');
const fileText = document.getElementById('file-text');

fileInputBtn.addEventListener("click", function() {
    fileInput.click();
});

fileInput.addEventListener("change", function() {
    if (fileInput.value) {
        fileText.innerHTML = fileInput.value.replace(/^.*[\\/]/, '');
        fileText.style.opacity = '100%';
    }
    else {
        fileText.innerHTML = "выберете или перетащите файл";
        fileText.style.opacity = '30%';
    }
});

dropArea.addEventListener('dragover', e => {
  e.preventDefault();
  dropArea.classList.toggle('drop-area-active', true); 
});

dropArea.addEventListener('dragleave', e => {
    e.preventDefault();
    dropArea.classList.toggle('drop-area-active', false); 
});

dropArea.addEventListener('drop', e => {
    e.preventDefault();
    dropArea.classList.toggle('drop-area-active', false); 
    fileInput.files = e.dataTransfer.files; 
    fileText.innerHTML = fileInput.value.replace(/^.*[\\/]/, '');
    fileText.style.opacity = '100%';
});

let captcha = document.getElementById('captcha-check');
let approval = document.getElementById('approval-check');
let sendBtn = document.getElementById('send-btn');

captcha.addEventListener('click', activeSubmit);
approval.addEventListener('click', activeSubmit);

function activeSubmit() {
    if(captcha.checked && approval.checked) {
        sendBtn.style.background = '#FFDF31';
        sendBtn.disabled = '';
    }
    else {
        sendBtn.style.background = '#F5F5F5';
        sendBtn.disabled = 'disabled';
    }
}

const form = document.getElementById('job-form');
const jobSelect = document.getElementById('job-select');
const fullName = document.getElementById('full-name');
const phone = document.getElementById('phone');
const email = document.getElementById('el-mail');

form.setAttribute('novalidate', '');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
    let errors = errorCheck(form).length;
    console.log(errors);
    if (errors === 0) {
        e.currentTarget.submit();
    }
});

const setError = (element, msg) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-msg')

    errorDisplay.innerHTML = msg;
    element.classList.add('input-error');
    inputControl.querySelector('.check').style.display = 'none';
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-msg')

    errorDisplay.innerHTML = '';
    element.classList.remove('input-error');
    inputControl.querySelector('.check').style.display = 'inline-block';
}

const setCheck = (element) => { 
    const label = document.getElementById(element);
    label.querySelector('.check').style.display = 'inline-block';
}

const removeCheck = (element) => { 
    const label = document.getElementById(element);
    label.querySelector('.check').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    var input = document.querySelector(".phone-input");
    
    input.addEventListener("input", mask);
    input.addEventListener("focus", mask);
    input.addEventListener("blur", mask);
    
    function mask(event) {
      var blank = "+_ (___) ___-__-__";
      
      var i = 0;
      var val = this.value.replace(/\D/g, "").replace(/[1-9]/, "7"); 
      
      this.value = blank.replace(/./g, function(char) {
        if (/[_\d]/.test(char) && i < val.length) return val.charAt(i++);
        
        return i >= val.length ? "" : char;
      });
      
      if (event.type == "blur") {
        if (this.value.length == 2) this.value = "";
      } else {
        setCursorPosition(this, this.value.length);
      }
    };
    
    function setCursorPosition(elem, pos) {
      elem.focus();
      
      if (elem.setSelectionRange) {    
        elem.setSelectionRange(pos, pos);
        return;
      }
      
      if (elem.createTextRange) {    
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();      
        return;
      }
    }
});

const validateInputs = () => {
    if (jobSelect.value === ''){
        setError(jobSelect, 'поле не выбрано');
    }
    else {
        setSuccess(jobSelect);
    }

    if (fullName.value === '') {
        setError(fullName, 'поле не заполнено');
    }
    else {
        setSuccess(fullName);
    }

    if (birthDate.value === ''){
        setError(birthDate, 'поле не заполнено');
    }
    else {
        setSuccess(birthDate);
    }

    let checkedGender = document.querySelector('input[name = "gender"]:checked');
    if (checkedGender != null) {
        setCheck("gender-label");
    }
    else {
        removeCheck("gender-label");
    }

    if(phone.value === '') {
        setError(phone, 'поле не заполнено');
    } 
    else if (phone.value.length < 18){
        setError(phone, 'поле заполнено не до конца');
    }
    else {
        setSuccess(phone);
    }

    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (email.value.match(pattern)){
        setSuccess(email);
    } 
    else if(email.value != '') {
        setError(email, 'поле заполнено не корректно');
    }
    else {
        const errorDisplay = email.parentElement.querySelector('.error-msg')
        errorDisplay.innerHTML = '';
        email.classList.remove('input-error');
    }

    if (fileInput.value != null) {
        setCheck("file-label");
    }
    else {
        removeCheck("file-label");
    }
    
}

function errorCheck(formNode) {
    const {elements} = formNode;
    const data = Array.from(elements)
        .map((element) => {
            let error = element.parentElement.querySelector('.error-msg');
            if (error) {
                return error.innerText;
            }
        });
    const filterData = Array.from(data)
        .filter((item) => !!item)
        .map((element) => {
            return element;
        });
    return filterData;
}