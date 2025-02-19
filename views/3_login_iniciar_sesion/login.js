const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password-input')
const formulario = document.querySelector('#formulario')
const btnRegistro = document.querySelector('#form-btn')

//console.log(email)
const datosLogin = {
    email:'',
    password:''
}
emailInput.addEventListener('input', e=>{
   // valemail = e.target.value;
    datosLogin.email= e.target.value;
    console.log(datosLogin.email)
})

passwordInput.addEventListener('input', e=>{
    // valemail = e.target.value;
     datosLogin.password= e.target.value;      
    console.log(datosLogin.password)
 
 })


formulario.addEventListener('submit', async e=>{
    e.preventDefault()

  
    if (datosLogin.email && datosLogin.password) {
        const response = await axios.get('/api/users',datosLogin)
    }


})


const validar = (input,val)=>{ 

    
    btnRegistro.disabled = valname && valemail && valpassword && valmatch ? false : true;

    //console.log(valname,valpassword,valemail,valmatch)

    if(val){
       
        input.classList.add('focus:outline-green-700', 'outline-4'); 
    }else if(input.value === ''){
        input.classList.add('focus:outline-blue-600');
    }else{
      
        input.classList.add('focus:outline-red-700','outline-4')
    }
}