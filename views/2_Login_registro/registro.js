console.log('prueba')

const formulario = document.querySelector('#formulario')
const nameInput = document.querySelector('#name-input')
const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password-input')
const matchInput = document.querySelector('#match-input')
const btnRegistro = document.querySelector('#form-btn')

import { createNotification } from "../components/notificaciones.js"
const notificacion = document.querySelector('#notificacion')

//validar
const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
//la g es que es global
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/gm;
//el gm es que coincide desde el inicio hasta el final
const nameVal = /[a-zA-Z]+( [a-zA-Z]+)?$/g;

let valemail = false; //para iniciarlizar el email
let valpassword = false;
let valmatch = false;
let valname = false;

nameInput.addEventListener('input', e=>{
    valname = nameVal.test(e.target.value)
    validar(nameInput,valname);

})

emailInput.addEventListener('input', e=>{
    valemail = emailVal.test(e.target.value)

    validar(emailInput,valemail)
    
})



passwordInput.addEventListener('input', e=>{
    
    valpassword = passwordVal.test(e.target.value)
    //console.log(valpassword)
    validar(passwordInput,valpassword)
    validar(matchInput,valmatch);
})

matchInput.addEventListener('input', e=>{
    //console.log(e.target.value);
    valmatch = e.target.value === passwordInput.value;
    //console.log(valmatch)
    validar(matchInput,valmatch);
    validar(passwordInput,valpassword)
})

formulario.addEventListener('submit', async e=>{
    e.preventDefault();
    

    try{
        const newUser = {
        name:nameInput.value,
        email:emailInput.value,
        password:passwordInput.value,
        password2:matchInput.value
    }
        console.log(newUser) 
         if(valname && valemail && valpassword && valmatch){
            const response = await axios.post('/api/users',newUser) 
            console.log(response);
             setTimeout(() => {
                window.location.href = '/sesion/';
            }, 1000);
    
        }else{
            createNotification(true,'algunos de los campos no cumple con los requerimientos')
            setTimeout(()=>{
                notificacion.innerHTML = ''
            },3000)
        }

    }catch(error){
        createNotification(true,error.response.data.error)
        setTimeout(()=>{
            notificacion.innerHTML = ''
        },3000)
        console.log(error.response.data.error)
    }

})


const validar = (input,val)=>{ 

    btnRegistro.disabled = valname && valemail && valpassword && valmatch ? false : true;

    //console.log(valname,valpassword,valemail,valmatch)

    if(val){
        input.classList.remove('focus:outline-blue-600');
        input.classList.remove('focus:outline-red-700','outline-4')
        input.classList.add('focus:outline-green-700', 'outline-4'); 
    }else if(input.value === ''){
        input.classList.remove('focus:outline-green-700', 'outline-4')
        input.classList.remove('focus:outline-red-700','outline-4')
        input.classList.add('focus:outline-blue-600');
    }else{
        //caso de que el test sea false
        input.classList.remove('focus:outline-blue-600');
        input.classList.remove('focus:outline-green-700', 'outline-4');
        input.classList.add('focus:outline-red-700','outline-4')
    }
}

//----------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------





