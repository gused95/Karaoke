const nombre = document.getElementById('nombre');
const apellido = document.getElementById("apellido");
const correo = document.getElementById('correo');
const password = document.getElementById('password');
const submit = document.getElementById('submit')
const validaciones=[false,false,false,false]

const validNombre= new RegExp('^[a-zA-ZñÑáéíóúAÁÉÍÓÚ ]+$');
const validCorreo= new RegExp("^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\\.[a-zA-Z]+");

nombre.addEventListener('input',(e)=>{
  if(!validNombre.test(e.srcElement.value)){
    nombre.className="form-control is-invalid";
    validaciones[0]=false;
  }
  else{
    nombre.className="form-control valid";
    validaciones[0]=true;
  }
  if(validaciones[0] && validaciones[1] && validaciones[2] && validaciones[3]){
    submit.removeAttribute('disabled');
  }
  else{
    submit.disabled=true;
  }
});
apellido.addEventListener('input',(e)=>{
  if(!validNombre.test(e.srcElement.value)){
    apellido.className="form-control is-invalid";
    validaciones[1]=false;
  }
  else{
    apellido.className="form-control valid";
    validaciones[1]=true;
  }
  if(validaciones[0] && validaciones[1] && validaciones[2] && validaciones[3]){
    submit.removeAttribute('disabled');
  }
  else{
    submit.disabled=true;
  }
});
correo.addEventListener('input',(e)=>{
  if(!validCorreo.test(e.srcElement.value)){
    correo.className="form-control is-invalid";
    validaciones[2]=false;
  }
  else{
    correo.className="form-control valid";
    validaciones[2]=true;
  }
  if(validaciones[0] && validaciones[1] && validaciones[2] && validaciones[3]){
    submit.removeAttribute('disabled');
  }
  else{
    submit.disabled=true;
  }
});

password.addEventListener('input',(e)=>{
  if(e.srcElement.value.length < 6){
    password.className="form-control is-invalid";
    validaciones[3]=false;
  }
  else{
    password.className="form-control valid";
    validaciones[3]=true;
  }
  if(validaciones[0] && validaciones[1] && validaciones[2] && validaciones[3]){
    submit.removeAttribute('disabled');
  }
  else{
    submit.disabled=true;
  }
});

