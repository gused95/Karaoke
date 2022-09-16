const crearEvento=()=>{
  const aux = document.querySelector('#form-evento')
  const inner= `
    <form action="/user/new-event" method="post">
      <div class="inicio">
        <h1>Datos del evento.</h1>
        <label for="">
          Nombre del evento:
          <input type="text" name="eventName" id="" class="control" />
        </label>
        <label for="">
          Fecha del evento:
          <input
            type="datetime-local"
            name="eventDate"
            id=""
            class="control"
          />
        </label>
        <button type="submit">Crear Evento</button>
      </div>
    </form>
  `

  aux.innerHTML = inner
}

const editarEvento=(name,fecha,id)=>{
  const aux= document.querySelector('#form-evento')
  const inner=`
    <div class="fondo3">
        <form action="/user/edit-event/${id}" method="post">
            <div class="inicio">
                <h1>Datos del evento.</h1>
                <label for=""> 
                  Nombre del evento:
                  <input type="text" name="eventName" class='control' value="${name}">
                </label>
                <label for=""> 
                  Fecha del evento:
                  <input type="datetime-local" name="eventDate" class='control' value="${fecha}">
                </label>
                <button type="submit">Actualizar evento</button>
            </div>
        </form>
    </div>    
  `
  aux.innerHTML=inner
}