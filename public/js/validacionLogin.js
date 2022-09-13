const correo = document.getElementById('correo');


const validCorreo= new RegExp("^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\\.[a-zA-Z]+");

  correo.addEventListener('input',(e)=>{
    if(!validCorreo.test(e.srcElement.value)){
      correo.className="form-control is-invalid";
      validacionLogin[0]=false;
    }
    else{
      correo.className="form-control valid";
      validacionLogin[2]=true;
    }
    if(validacionLogin[0] && validacionLogin[1]){
      submit.removeAttribute('disabled');
    }
    else{
      submit.disabled=true;
    }
  });
  
  
  