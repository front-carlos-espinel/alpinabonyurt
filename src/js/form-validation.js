const jsonValidationSecondSteptwo = [
    {
        pattern: '^[a-zA-ZÀ-ÿ\\s]{3,30}$',
        errorMessage: 'Ingresa un nombre válido',
        minlength: '3',
        maxlength: '30',
        required: true,
    },
    {
        pattern: '^[a-zA-ZÀ-ÿ\\s]{3,30}$',
        errorMessage: 'Ingresa un apellido válido',
        minlength: '3',
        maxlength: '30',
        required: true,
    },
    {
        pattern: '^(\\+)?[\\d\\s]{9,10}$',
        minlength: '9',
        maxlength: '10',
        errorMessage: 'Ingresa un número celular válido',
        required: true,
    },
    {
        pattern: '^(\\+)?[\\w\\s]{5,13}$',
        minlength: '5',
        maxlength: '10',
        errorMessage: 'Ingresa un número de documento válido',
        required: true,
    }
];

const classValid = 'is-valid';
const classInvalid = 'is-invalid';
const classMsgError = 'active';
const classToValidate = 'field-to-validate';

//Create error message
const createErrorMessage = (errorMessage) => {
    const p = document.createElement('p');
    p.classList.add('alpina-error');
    p.textContent = errorMessage;

    return p;
}

//Reuse cls error and text content
const reUseError = (input, msg, content)=>{
    input.classList.remove(`${classValid}`);
    msg.textContent = content;
}

//Enable button when form is valid
const enableOrDisableButton = (formClass, buttonId) => {
    const getAllInputsToValidate = document.querySelectorAll(`.${formClass} .${classToValidate}`);
    const getAllInputsIsValidate = document.querySelectorAll(`.${formClass} .${classToValidate}.${classValid}`);
    const buttonSend = document.querySelector(buttonId);
    getAllInputsToValidate.forEach(()=>{
        if(!buttonSend) return;
        if(getAllInputsIsValidate.length == getAllInputsToValidate.length && getAllInputsIsValidate.length > 0){
            buttonSend.classList.remove('disabled');
        }else{
            buttonSend.classList.add('disabled');
        }
    });
}

//Validate date
const formLimitDateInptus = () => {
    const inputDateBirthdate = document.querySelector("#birthdate");
    const inputDateEvent = document.querySelector("#event_date");

    // get date of 18 years ago
    const today = new Date();
    const dateMin = today.toISOString().split("T")[0];
    today.setFullYear(today.getFullYear() - 18);
    const dateMax = today.toISOString().split("T")[0];

    // set max date and min date
    inputDateBirthdate.setAttribute("max", dateMax);
    inputDateEvent.setAttribute("min", dateMin);
}

const formValidateDate = (data) => {
    //Validate date
    const value = new Date(data.value);
    const getMax = data.getAttribute('max');
    const getMin = data.getAttribute('min');
    //Validate max date
    if(getMax){
        const max = new Date(getMax);
        if(value > max){
            data.value = "";
            reUseError(data, data.nextElementSibling, `La fecha no puede ser mayor a ${getMax}`);
            data.nextElementSibling.classList.add(`${classMsgError}`);
        }
    }
    //Validate min date
    if(getMin){
        const min = new Date(getMin);
        const parse = parseInt(data.value);
        if(value < min && parse > 2000){
            data.value = "";
            reUseError(data, data.nextElementSibling, `La fecha no puede ser menor a ${getMin}`);
            data.nextElementSibling.classList.add(`${classMsgError}`);
        }
    }
}

const formReuseValidation = (data, formClass, buttonId) => {
    console.log("test validacion")
    const nextElementSibling = data.nextElementSibling;
    console.log(nextElementSibling)
    //Attributes
    const getValue = data.value;
    const minlength = data.getAttribute('minlength');
    const pattern = data.getAttribute('pattern');
    const maxlength = data.getAttribute('maxlength');
    const newRegExp = new RegExp(pattern);
    console.log(data.type)
    //Validate type select
    // if(data.type == 'select-one') {
    //     if(data.value !== ''){
    //         data.classList.add(`${classValid}`);
    //         data.classList.remove(`${classInvalid}`);
    //         nextElementSibling.classList.remove(`${classMsgError}`);
    //     }else{
    //         reUseError(data, nextElementSibling, data.getAttribute('data-error'));
    //     }
    //     enableOrDisableButton(formClass, buttonId);
    //     return;
    // };
    // //Validate type input
    // if(data.type == 'checkbox'){
    //     if(data.checked){
    //         data.classList.add(`${classValid}`);
    //         data.classList.remove(`${classInvalid}`);
    //         nextElementSibling.classList.remove(`${classMsgError}`);
    //     }else{
    //         reUseError(data, nextElementSibling, data.getAttribute('data-error'));
    //     }
    //     enableOrDisableButton(formClass, buttonId);
    //     return;
    // }
    //Validate minlength
    if(getValue.length < minlength){
        reUseError(data, nextElementSibling, `Ingresa mínimo ${minlength} caracteres`);
        enableOrDisableButton(formClass, buttonId);
        return;
    }
    //Validate maxLength
    if(getValue.length > maxlength){
        reUseError(data, nextElementSibling, `No se permiten más de ${maxlength} caracteres`);
        enableOrDisableButton(formClass, buttonId);
        return;
    }
    //Validate exp regular
    if(newRegExp.test(getValue)){
        data.classList.add(`${classValid}`);
        data.classList.remove(`${classInvalid}`);
        nextElementSibling.classList.remove(`${classMsgError}`);
    }else{
        reUseError(data, nextElementSibling, data.getAttribute('data-error'));
    }

    enableOrDisableButton(formClass, buttonId);
}

const formValidation = (jsonValidation, formClass, buttonId) => {
    console.log("primer evento")
    const allInputs = document.querySelectorAll(`.${formClass} .${classToValidate}`);
    console.log(allInputs)
    //Set attributtes
    allInputs.forEach((data, index)=>{
        if(jsonValidation[index]){
            data.insertAdjacentElement('afterend', createErrorMessage(jsonValidation[index].errorMessage));
            //Set atrributes
            jsonValidation[index].minlength && data.setAttribute('minlength', jsonValidation[index].minlength);
            jsonValidation[index].maxlength && data.setAttribute('maxlength', jsonValidation[index].maxlength);
            jsonValidation[index].pattern && data.setAttribute('pattern', jsonValidation[index].pattern);
            jsonValidation[index].required && data.setAttribute('required', jsonValidation[index].required);
            jsonValidation[index].errorMessage && data.setAttribute('data-error', jsonValidation[index].errorMessage);
            //Add class to identify fields required
            if(!jsonValidation[index].required){
                data.classList.remove(`${classToValidate}`);
            }
            console.log("primer evento 2")
        }
        console.log("eveto 3")
        //Listener
        data.addEventListener('click', ()=>{
            formReuseValidation(data, formClass, buttonId);
        });
        //Listener
        data.addEventListener('change', ()=>{
            formReuseValidation(data, formClass, buttonId);
        });
        //Listener
        data.addEventListener('keyup', ()=>{
            formReuseValidation(data, formClass, buttonId);
            //Validate date
            if(data.getAttribute('type') == 'date'){
                formValidateDate(data);
            }
        });
        //Blur
        data.addEventListener('blur', ()=>{
            formReuseValidation(data, formClass, buttonId);
            //Validate date
            if(data.getAttribute('type') == 'date'){
                formValidateDate(data);
            }
            if(!data.classList.contains(`${classValid}`)){
                if(data.getAttribute('required') == 'true'){
                    data.nextElementSibling && data.nextElementSibling.classList.add(`${classMsgError}`);
                    data.classList.add(`${classInvalid}`);
                }
            }else{
                if(data.getAttribute('required') == 'true'){
                    data.nextElementSibling && data.nextElementSibling.classList.remove(`${classMsgError}`);
                }
            }
        });
        //Limit input text to number with custom class 
        data.addEventListener('keydown', (e)=>{
            if(data.classList.contains('isNumber')){
                if (
                    !/[0-9]/.test(e.key) && 
                    e.key !== "Backspace" && 
                    e.key !== "Delete" && 
                    e.key !== "ArrowLeft" && 
                    e.key !== "ArrowRight" && 
                    e.key !== "Tab"
                  ) {
                    e.preventDefault();
                }
            }
            if(data.classList.contains('isWords')){
                if (e.key >= "0" && e.key <= "9") {
                    e.preventDefault();
                }
            }
        });
    });

    console.log("fuinal evento")
}

window.addEventListener('DOMContentLoaded', ()=>{
    try {
        console.log("funcion inicio validate")
        formValidation(jsonValidationSecondSteptwo, 'form__content', '#form__button');
    } catch (error) {
        console.log(error);        
    }
    // try {
    //     formValidation(jsonValidationSecondStep, 'bacana-form-second-step', '#second-step-button');
    // } catch (error) {
    //     console.log(error);        
    // }
    // try {
    //     formValidation(jsonValidationThirdStep, 'bacana-form-third-step', '#third-step-button');
    // } catch (error) {
    //     console.log(error);        
    // }
    // try {
    //     formValidation(jsonValidationForthStep, 'bacana-form-fourth-step', '#fourth-step-button');
    // } catch (error) {
    //     console.log(error);        
    // }
});