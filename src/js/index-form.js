const classValidIndex = 'is-valid';
const classInvalidIndex = 'is-invalid';
const classMsgErrorIndex = 'active';
const classToValidateIndex = 'field-to-validate';

// const emailMirror = () => {
//     const emailField = document.querySelector('.bacana-form-first-step #email');
//     const emailMirrorField = document.querySelector('.bacana-form-second-step #email_secondary');
    
//     emailField.addEventListener('keyup', (e)=>{
//         emailMirrorField.value = e.target.value;
//     });
// }



//hidden global modal
const hiddeModalGlobal = ()=>{
    const getAllClose = document.querySelectorAll('.bacana-close-modal');

    getAllClose.forEach((data)=>{
        data.addEventListener('click', (e)=>{
            const parent = e.target.closest('section');

            parent.classList.remove('active');
            parent.classList.remove('show');
        });
    })
}

const openModalPreferences = () => {
    const buttonModalPreferences = document.querySelector('#modal-preferences-open');
    const modalPreferences = document.querySelector('#modal-preferences');

    buttonModalPreferences.addEventListener('click', ()=>{
        modalPreferences.classList.add('active');
    });
}

const loopRemoveErrorMessageUnnecesary = () => {
    setInterval(()=>{
        const getAllElements = document.querySelectorAll('.form-item--error-message');

        getAllElements.forEach((data)=>{
            data.remove();
        })

    },500);
}

window.addEventListener('DOMContentLoaded', ()=>{
    // try {
    //     hiddeModalGlobal();
    // } catch (error) {
    //     console.log(error);        
    // }
    // try {
    //     renderDate();
    // } catch (error) {  }
    // try {
    //     emailMirror();
    // } catch (error) { console.log(error) }
    // try {
    //     showLocalities();
    // } catch (error) { console.log(error) }
    // try {
    //     openModalPreferences();
    // } catch (error) { console.log(error) }
    // try {
    //     validateAge();
    // } catch (error) { console.log(error) }
    try {
        loopRemoveErrorMessageUnnecesary();
    } catch (error) { console.log(error) }
});