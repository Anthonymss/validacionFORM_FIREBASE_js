const firebaseConfig = {
    apiKey: "AIzaSyBFXMyb1NyNKPn2DcqH9dsqweb3UfOPI3I",
    authDomain: "datos-formulario-c0fb5.firebaseapp.com",
    projectId: "datos-formulario-c0fb5",
    storageBucket: "datos-formulario-c0fb5.appspot.com",
    messagingSenderId: "547384310644",
    appId: "1:547384310644:web:af56d8e3d80cd63696ca21",
    measurementId: "G-BW32VXK6BV"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit',(event)=>{
    event.preventDefault()
    //validar campo de nombre
    let entradaNombre=document.getElementById('name')
    let errorNombre=document.getElementById('nameError')
    if(entradaNombre.value.trim()===''){
        errorNombre.textContent='Por favor ingresa tu nombre';
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent='';
        errorNombre.classList.remove('error-message')
    }
    //validar correo electronico
    let emailEntrada=document.getElementById('email')
    let errorEmail=document.getElementById('emailError')
    let emailPattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailPattern.test(emailEntrada.value)){
        errorEmail.textContent='Por favor ingresa un email valido';
        errorEmail.classList.add('error-message')
    }else{
        errorEmail.textContent='';
        errorEmail.classList.remove('error-message')
    }
    //validar la contraseña
    let contraseñaEntrada =document.getElementById('password')
    let contraseñaError=document.getElementById('passwordError')

    //mayusculas, minusculas, numeros y caracteres especiales
    let passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    if(!passwordPattern.test(contraseñaEntrada.value)){
        contraseñaError.textContent='La contraseña debe  tener al menos 8 caracteres'
        contraseñaError.classList.add('error-message')
    }else{
        contraseñaError.textContent='';
        contraseñaError.classList.remove('error-message')
    }
    //si todos los campos son validos enviar formulario
    if(!errorNombre.textContent && !errorEmail.textContent && !contraseñaError.textContent){
        //Backend recibe la info

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contraseñaEntrada.value
        })
        .then((docRef) => {
            alert('El Formulario se ha enviado con exito ',docRef.id)
            document.getElementById('formulario').reset();
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            alert(error)
        });

        
    }
});


