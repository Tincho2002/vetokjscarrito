const selectAnio = document.querySelector('#anio'),
    selectMes = document.querySelector('#mes'),
    selectProvincia = document.querySelector('#provincia'),
    selectAsunto = document.querySelector('#asunto'),
    form = document.querySelector('#formulario'),
    nombreNombre = document.querySelector('.inputNombre'),
    nombreDireccion = document.querySelector('.inputDireccion'),
    nombreCiudad = document.querySelector('.inputCiudad'),
    nombreEmail = document.querySelector('.inputEmail'),
    numeroTarjeta = document.querySelector('.inputNumTarjeta'),
    mesVencimiento = document.querySelector('.inputMes'),
    anioVencimiento = document.querySelector('.inputAnio'),
    selProvincia = document.querySelector('.inputProvincia'),
    codSeguridad = document.querySelector('.inputCodSeguridad'),
    codPostal = document.querySelector('.inputCodPostal'),
    btnEnviar = document.querySelector('#btnEnviar'),
    anios = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
    meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    provincia = ['Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Cordoba', 'Corrientes', 'Entre Rios', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquen', 'Rio Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tucuman'];


function cargarSelect(array, select) {
    array.forEach(element => {
        let option = `<option>${element}</option>`
        select.innerHTML += option;
    })
}

cargarSelect(anios, selectAnio);
cargarSelect(meses, selectMes);
cargarSelect(provincia, selectProvincia);

function agregarContenido(ingreso, info) {
    ingreso.oninput = () => {
        document.querySelector(info).innerText = ingreso.value;
    }
}

agregarContenido(nombreNombre, '.infoNombre');
agregarContenido(nombreDireccion, '.infoDireccion');
agregarContenido(nombreEmail, '.infoEmail');
agregarContenido(selProvincia, '.selProvincia');
agregarContenido(nombreCiudad, '.infoCiudad');
agregarContenido(numeroTarjeta, '.infoNumTarjeta');
agregarContenido(mesVencimiento, '.mesVencimiento');
agregarContenido(anioVencimiento, '.anioVencimiento');
agregarContenido(codSeguridad, '.infoCodPostal');
agregarContenido(codSeguridad, '.infoCodSeguridad');


let cleave = new Cleave(numeroTarjeta, {
    creditCard: true,
})

btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();


    const data = {
        nombre: nombreNombre.value,
        direccion: nombreDireccion.value,
        email: nombreEmail.value,
        ciudad: nombreCiudad.value,
        provincia: selProvincia.value,
        numeroTarjeta: numeroTarjeta.value,
        mes: mesVencimiento.value,
        anio: anioVencimiento.value,
        codPostal: codPostal.value,
        codSeguridad: codSeguridad.value
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