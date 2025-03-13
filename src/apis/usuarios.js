// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
  $('#usuarios').DataTable();
});

 async function cargarUsuarios() {
     let email = localStorage.email;
     if (email) {

    const request = await fetch('api/usuarios', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const usuarios = await request.json();
    let lista= "";

    for(let usuario of usuarios){

        let btelminar = "<a href=\"#\" onclick='eliminarUsuario("+usuario.id+")' class=\"btn btn-danger btn-circle\">\n" +
            "                                        <i class=\"fas fa-trash\"></i>\n" +
            "                                    </a>";

        let telefonoP= usuario.telefono == null ? "--" : usuario.telefono;

        let usuariohtml = "<tr><td>"+usuario.id+"</td><td>"+usuario.nombre+" "+usuario.apellido+"</td>" +
            " <td>"+usuario.email+"</td> <td>"+telefonoP+"</td>" +
            " <td>"+btelminar+"</td> </tr>";
           lista+= usuariohtml;
    }

    console.log(usuarios);

document.querySelector('#usuarios tbody').outerHTML =lista;

     } else {
         alert("El usuario no está registrado");
         window.location.href = "/login";
     }
}


async function eliminarUsuario(id){


     if (!confirm ("quiere eliminar el usuario")){
         return;
     }

         const request = await fetch('api/usuarios/' + id, {
             method: 'DELETE',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
             },
         });
         location.reload()

}