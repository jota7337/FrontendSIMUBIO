$(document).ready(function() {
    cargarRoles();
    $('#Roles').DataTable();
});

async function cargarRoles() {
    let email = localStorage.email;
    if (email) {

        const request = await fetch('api/rol', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const roles = await request.json();
        let lista= "";

        for(let rol of roles){



            let rolhtml = "<tr><td>"+rol.descripcion+"</td><td>"+rol.estado+"</td></tr>";
            lista+= rolhtml;
        }

        console.log(roles);

        document.querySelector('#Roles tbody').outerHTML =lista;

    } else {
        alert("El usuario no está registrado");
        window.location.href = "/login";
    }
}


