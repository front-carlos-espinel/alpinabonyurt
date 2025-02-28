const classValidConection = 'is-valid';
const classInvalidConection = 'is-invalid';
const classMsgErrorConection = 'active';

const requestPost = async (url, body)=>{
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    return data;
}

//Show error in element
const showErrorInElement = (element) => {
    element.classList.add(classInvalidConection);
    element.classList.remove(classValidConection);
    element.value = '';
    if(element.nextElementSibling){
        element.nextElementSibling.classList.add(classMsgErrorConection);
    }
}

//show modal
const showModalError = (text) =>{
    const modalErrorCustom = document.querySelector('#modal-error-custom');
    const modalErrorText = document.querySelector('#text-error');

    modalErrorCustom.classList.add('show');
    modalErrorText.textContent = text;
}

//show modal
const showModalSuccess = () =>{
    const modalSuccess = document.querySelector('#modal-success');

    modalSuccess.classList.add('active');
}

//show modal generic error
const showModalGenericError = () =>{
    const modalErrorGeneric = document.querySelector('#modal-error');

    modalErrorGeneric.classList.add('active');
}


//enable and disable steps
const showNextStep = (currentStep, nextStep, number, title)=>{
    const getCurrentStep = document.querySelector(currentStep);
    const getNextStep = document.querySelector(nextStep);
    const currentStepNumber = document.querySelector('#current-step-number');
    const currentStepTitle = document.querySelector('#current-step-title');

    getCurrentStep.classList.remove('active');
    getNextStep.classList.add('active');
    currentStepNumber.textContent = `Paso ${number}`;
    currentStepTitle.textContent = title;
}

//First step conection and validation
const validateDataFirstStep = ()=> {
    const loader = document.querySelector('.bacana-loader');
    const buttonFirstStep = document.querySelector('#form__button');

    const name = document.querySelector('.form__content #name');
    const lastName = document.querySelector('.form__content #last_name');
    const cel = document.querySelector('.form__content #cel');
    const documentNumber = document.querySelector('.form__content #document_number');
    console.log(name)

    //const documentNumber = document.querySelector('.bacana-form-first-step #document_number');

    buttonFirstStep.addEventListener('click', async ()=>{
        
        loader.classList.remove('hidden-loader');
        buttonFirstStep.classList.add('disabled');
        // const request = {
        //     email: email.value,
        //     document: documentNumber.value
        // }
        // await requestPost('/api/bacana/form/validate-register', request)
        //     .then(data=>{
        //         const message = data.data || '';

        //         if(data.message == 'EMAIL_ERROR'){
        //             showErrorInElement(email);
        //             showModalError(message);
        //             return;
        //         }

        //         if(data.message == 'DOCUMENT_ERROR'){
        //             showErrorInElement(documentNumber);
        //             showModalError(message);
        //             return;
        //         }

        //         if(data.message == 'USER_EXISTS'){
        //             showModalSuccess();
        //             return;
        //         }

        //         if(data.message == 'SUCCESS'){
        //             showNextStep('.bacana-form-first-step', '.bacana-form-second-step', '2', 'COMPLETA EL REGISTRO');
        //             return;
        //         }

        //         showModalGenericError();
                
        //     }).catch(error=>{
        //         showModalGenericError();
        //         console.log(error)
        //     });

        // loader.classList.add('hidden-loader');
    });
}

//Second step validation and conection
const validateDataSecondStep = ()=> {
    const loader = document.querySelector('.bacana-loader');
    const buttonSecondStep = document.querySelector('#second-step-button');
    const email = document.querySelector('.bacana-form-second-step #email_secondary');
    const phone = document.querySelector('.bacana-form-second-step #phone');
    const documentNumber = document.querySelector('.bacana-form-first-step #document_number');

    buttonSecondStep.addEventListener('click', async ()=>{
        loader.classList.remove('hidden-loader');
        buttonSecondStep.classList.add('disabled');
        const request = {
            email: email.value,
            document: documentNumber.value,
            phone: phone.value
        }
        await requestPost('/api/bacana/form/validate-phone', request)
            .then(data=>{
                const message = data.data || '';

                if(data.message == 'EMAIL_ERROR'){
                    showErrorInElement(email);
                    showModalError(message);
                    return;
                }

                if(data.message == 'DOCUMENT_ERROR'){
                    showErrorInElement(documentNumber);
                    showModalError(message);
                    return;
                }

                if(data.message == 'PHONE_ERROR'){
                    showErrorInElement(phone);
                    showModalError(message);
                    return;
                }
                
                if(data.message == 'USER_EXISTS'){
                    showModalSuccess();
                    return;
                }
                
                if(data.message == 'SUCCESS'){
                    showNextStep('.bacana-form-second-step', '.bacana-form-third-step', '3', 'UBICACIÓN');
                    return;
                }

                showModalGenericError();

            }).catch(error=>{
                showModalGenericError();
                console.log(error)
            });

        loader.classList.add('hidden-loader');
    });
}

//Event third step
const validateDataThirdStep = ()=> {
    const buttonThirdStep = document.querySelector('#third-step-button');

    buttonThirdStep.addEventListener('click', ()=>{
        showNextStep('.bacana-form-third-step', '.bacana-form-fourth-step', '4', 'TERMINA EL REGISTRO');
    });
}

//Second step validation and conection
const validateDataFourthStep = ()=> {
    const loader = document.querySelector('.bacana-loader');
    const buttonFourthStep = document.querySelector('#fourth-step-button');
    const preferences = document.querySelector('.bacana-form-fourth-step #preferences');
    const passionPoint = document.querySelector('.bacana-form-third-step #passionp');

    buttonFourthStep.addEventListener('click', async ()=>{
        loader.classList.remove('hidden-loader');
        buttonFourthStep.classList.add('disabled');

        const request = {
            email: document.querySelector('.bacana-form-second-step #email_secondary').value,
            doc_type: document.querySelector('.bacana-form-first-step #document_type').value,
            document: document.querySelector('.bacana-form-first-step #document_number').value,
            name: document.querySelector('.bacana-form-second-step #name').value,
            lastname: document.querySelector('.bacana-form-second-step #last_name').value,
            birthdate: `${document.querySelector('.bacana-form-second-step #born_day').value}-${document.querySelector('.bacana-form-second-step #born_month').value}-${document.querySelector('.bacana-form-second-step #born_year').value}`,
            phone: document.querySelector('.bacana-form-second-step #phone').value,
            pp: document.querySelector('#passionp-answer').textContent,
            pp_res: passionPoint.options[passionPoint.selectedIndex].text,
            city: document.querySelector('.bacana-form-third-step #city').value,
            localidad: document.querySelector('.bacana-form-third-step #locality').value,
            tyc: document.querySelector('.bacana-form-fourth-step #tyc').checked ? '1' : '0',
            privacity: document.querySelector('.bacana-form-fourth-step #cookies').checked ? '1' : '0',
            preferencias: document.querySelector('.bacana-form-fourth-step #preferences').checked ? '1' : '0',
            pre_sms: '0',
            pre_email: '0',
            pre_call: '0',
            pre_app: '0',
            pre_offline: '0'
        }

        if(preferences.checked){
            request.pre_sms = document.querySelector('#modal-preferences #pre_sms').checked ? '1' : '0';
            request.pre_email = document.querySelector('#modal-preferences #pre_email').checked ? '1' : '0';
            request.pre_call = document.querySelector('#modal-preferences #pre_call').checked ? '1' : '0';
            request.pre_app = document.querySelector('#modal-preferences #pre_app').checked ? '1' : '0';
            request.pre_offline = document.querySelector('#modal-preferences #pre_offline').checked ? '1' : '0';
        }else{
            request.pre_sms = '0';
            request.pre_email = '0';
            request.pre_call = '0';
            request.pre_app = '0';
            request.pre_offline = '0';
        }

        await requestPost('/api/bacana/form/register', request)
            .then(data=>{
                if(data.message == 'SUCCESS'){
                    document.querySelector('#modal-success').classList.add('active');
                    return;
                }

                showModalGenericError();

                dataLayer.push({
                    'event': 'GAEvent',
                    'event_category': 'Register',
                    'event_action': 'Success',
                    'event_label': 'Register Complete',
                    'component_name': 'form_success',
                    'event_text': 'Register Success',
                });

            }).catch(error=>{
                console.log(error);
                showModalGenericError();
            });

        loader.classList.add('hidden-loader');
    });
}


window.addEventListener('DOMContentLoaded', ()=>{
    try {
        validateDataFirstStep();
    } catch (error) {
        console.log(error);        
    }
    try {
        validateDataSecondStep();
    } catch (error) {
        console.log(error);        
    }
    try {
        validateDataThirdStep();
    } catch (error) {
        console.log(error);        
    }
    try {
        validateDataFourthStep();
    } catch (error) {
        console.log(error);        
    }
});