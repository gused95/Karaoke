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
    //aux.innerHTML(inner)
}

const editarEvento=()=>{
    const aux=document.querySelector('#form-evento')
    const inner=`<body class="">
    <div class="fondo3">
        <form action="/user/new-event" method="post">
            <div class="inicio">
                <h1>Datos del evento.</h1>
                <label for=""> Nombre del evento:
                    <input type="text" name="eventName" id="" class='control' value="{{event.eventName}}">
                </label>
                <label for=""> Fecha del evento:
                    <input type="datetime-local" name="eventDate" id="" class='control' value="{{event.eventDate}}">
                </label>
                <button type="submit">Actualizar evento</button>
            </div>
        </form>
    </div>    
</body>`
aux.innerHTML=inner
}

