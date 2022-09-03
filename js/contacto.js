const
    selectAsunto = document.querySelector('#asunto'),
    form = document.querySelector('#formulario'),
    nombreNombre = document.querySelector('.inputNombre'),
    nombreEmail = document.querySelector('.inputEmail'),
    selAsunto = document.querySelector('.inputAsunto'),
    btnEnviar = document.querySelector('#btnEnviar'),
    asunto = ['Atencion Cliente', 'Cambios Roturas', 'Cancelacion Compra ', 'Contacto Proveedores', 'Devoluciones'];

function cargarSelect(array, select) {
    array.forEach(element => {
        let option = `<option>${element}</option>`
        select.innerHTML += option;
    })
}

cargarSelect(asunto, selectAsunto);

function agregarContenido(ingreso, info) {
    ingreso.oninput = () => {
        document.querySelector(info).innerText = ingreso.value;
    }
}

agregarContenido(nombreNombre, '.infoNombre');
agregarContenido(nombreEmail, '.infoEmail');
agregarContenido(selAsunto, '.selAsunto');

btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();


    const data = {
        nombre: nombreNombre.value,
        email: nombreEmail.value,
        asunto: selAsunto.value
    };


    Swal.fire({
        title: '¿Deseas guardar la Info de Contacto?',
        showCancelButton: true,
        position: 'top-center',
        width: 400,
        confirmButtonText: 'Guardar',
    }).then((result) => {
        formulario.reset();
        if (result.isConfirmed) {
            localStorage.setItem('data', JSON.stringify(data));
            Swal.fire('Datos guardados', '', 'success');
            setTimeout(() => {
                location.reload();
            }, 3000);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Los datos no se guardaron', 'Puede reintentar si lo desea', 'error ');
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    })

})