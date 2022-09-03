//Base de Datos simulada de Usuarios
const usuarios = [{
        nombre: 'Sandra',
        mail: 'quevedosandra@gmail.com',
        pass: 'cabj1970'
    },
    {
        nombre: 'Martin',
        mail: 'palermomartin@eltitan.com',
        pass: '07tincho09'
    },
    {
        nombre: 'Sebastian',
        mail: 'vettelsebastian@redbull.com',
        pass: 'champion2012'
    }
]

//Base de Datos simulada de Productos (alimentos húmedos y secos para perros y gatos)

const producto = [{
    tipo: 'Alimento Seco',
    clase: 'Para Gato',
    nombre: 'EXCELLENT',
    descripcion: 'Adult Cat Smart 15Kg',
    antes: 18720,
    precio: 14400,
    img: './img/ID1.jpg'
}, {
    tipo: 'Alimento Seco',
    clase: 'Para Gato',
    nombre: 'ROYAL CANIN',
    descripcion: 'Regular Fit 15Kg',
    antes: 19630,
    precio: 15100,
    img: './img/ID2.jpg'
}, {
    tipo: 'Alimento Seco',
    clase: 'Para Gato',
    nombre: 'CAT CHOW',
    descripcion: 'Adultos Pescado 15Kg',
    antes: 13065,
    precio: 10050,
    img: './img/ID3.jpg'
}, {
    tipo: 'Alimento Humedo',
    clase: 'Para Gato',
    nombre: 'PROPLAN',
    descripcion: 'Pouch Sterilized Cat Caja de 12 sobres de 85gr c/u',
    antes: 4940,
    precio: 3800,
    img: './img/ID4.jpg'
}, {
    tipo: 'Alimento Humedo',
    clase: 'Para Gato',
    nombre: 'CAT CHOW',
    descripcion: 'Pouch Adultos Pescado Caja de 12 sobres de 85gr c/u',
    antes: 2990,
    precio: 2300,
    img: './img/ID5.jpg'
}, {
    tipo: 'Alimento Humedo',
    clase: 'Para Gato',
    nombre: 'ROYAL CANIN',
    descripcion: 'Pouch Instinctive Cat Caja de 12 sobres de 85gr c/u',
    antes: 6240,
    precio: 4800,
    img: './img/ID6.jpg'
}, {
    tipo: 'Alimento Seco',
    clase: 'Para Perro',
    nombre: 'EXCELLENT',
    descripcion: 'Dog Raza Mdna Y Gde Smart 15Kg',
    antes: 10790,
    precio: 8300,
    img: './img/ID7.jpg'
}, {
    tipo: 'Alimento Seco',
    clase: 'Para Perro',
    nombre: 'EUKANUBA',
    descripcion: 'Adult Large Breed 15Kg',
    antes: 14690,
    precio: 11300,
    img: './img/ID8.jpg'
}, {
    tipo: 'Alimento Seco',
    clase: 'Para Perro',
    nombre: 'ROYAL CANIN',
    descripcion: 'Maxi Adult 15Kg',
    antes: 17810,
    precio: 13700,
    img: './img/ID9.png'
}, {
    tipo: 'Alimento Humedo',
    clase: 'Para Perro',
    nombre: 'DOG CHOW',
    descripcion: 'Pouch Adult Dog Chicken Caja de 15 sobres de 100gr c/u',
    antes: 5590,
    precio: 4300,
    img: './img/ID10.jpg'
}, {
    tipo: 'Alimento Humedo',
    clase: 'Para Perro',
    nombre: 'ROYAL CANIN',
    descripcion: 'Pouch Mini Adult Caja de 12 sobres de 85gr c/u',
    antes: 3900,
    precio: 3000,
    img: './img/ID11.png'
}, {
    tipo: 'Alimento Humedo',
    clase: 'Para Perro',
    nombre: 'OPTIMUN',
    descripcion: 'Pouch Perro Adulto Raza Mediana Y Grande Caja de 12 sobres de 100gr c/u',
    antes: 2990,
    precio: 2300,
    img: './img/ID12.jpg'
}]

//Elementos del DOM...
const mailLogin = document.getElementById('emailLogin'),
    passLogin = document.getElementById('passwordLogin'),
    recordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById('tarjetas'),
    toggles = document.querySelectorAll('.toggles');


//Guardar los datos que recuperamos de la database en el storage
function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.mail,
        'pass': usuarioDB.pass
    }

    if (storage === 'sessionStorage') {
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
    }

    if (storage === 'localStorage') {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }
}

//Limpiar los storages
function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

//Recuperar los datos que se guardaron y su retorno
function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}

//Cambios en el dom para mostrar el nombre del usuario logueado, usando los datos del storage
function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span> a VET-OK! FOOD!`
}

//Crear HTML dinámico para mostrar la información de los productos (alimentos) a partir del array de la Base de Datos
function mostrarInfoProducto(array) {
    contTarjetas.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="cardProducto" id="tarjeta${element.nombre}">
                <h5 class="card-header" id="nombreProducto">${element.nombre}</h5>
                <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoProducto">
                <div class="card-body">
                    <h5 class="card-text" id="tipoProducto"> ${element.tipo}</h5>
                    <h5 class="card-text" id="claseProducto"> ${element.clase}</h5>
                    <h6 class="card-text" id="descripcionProducto"> ${element.descripcion}</h6>
                    <h6 class="card-text" id="antesProducto"> Precio de Lista: $ ${element.antes}</h6>
                    <h5 class="card-text" id="precioProducto">Precio: $ ${element.precio}</h5>
                </div>
            </div>`;
        contTarjetas.innerHTML += html;
    });
}

//Función que permite intercambiar la visualizaión de los elementos del DOM, agregando o sacando la clase d-none. Si el elemento la tiene, se la saco, y si no la tiene, se la agrego. 
function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

//Función que revisa si hay un usuario guardado en el storage, y en ese caso evita todo el proceso de login 
function isLogged(usuario) {

    if (usuario) {
        saludar(usuario);
        mostrarInfoProducto(producto);
        presentarInfo(toggles, 'd-none');
    }
}


//La función de validar se aprovecha del tipo de return que hace el método find (el objeto si lo encuentra, o undefined si no encuentra ninguno que cumpla con la condición)
function validateUser(usersDB, user, pass) {
    let isFound = usersDB.find((userDB) => userDB.mail == user);

    //console.log('Usuario encontrado por validate '+ typeof isFound);

    if (typeof isFound === 'undefined') {
        return 'Usuario y/o contraseña incorrectos A' //En realidad, sabemos que significa que el usuario no existe, pero no vamos a dar información extra a posibles estafadores
    } else {
        //si estoy en este punto, quiere decir que el mail existe, sólo queda comparar la contraseña
        if (isFound.pass != pass) {
            return 'Usuario y/o contraseña incorrectos B'
        } else {
            return isFound;
        }
    }
}


btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    //Validar que ambos campos estén completos
    if (!mailLogin.value || !passLogin.value) {
        alert('Todos los campos son requeridos');
    } else {
        //Chequear si el return de la función validate es un objeto o un string. Si es un objeto, fue una validación exitosa y se utilizan los datos. Si no, no se utilizan los strings para mostrarle al usuario eso en un alert
        let data = validateUser(usuarios, mailLogin.value, passLogin.value);

        if (typeof data === 'string') {
            alert(`No pudimos validar el login 
            ${data}`)
        } else {

            //Revisar si elige persistir la info aunque se cierre el navegador o no
            if (recordar.checked) {
                guardarDatos(data, 'localStorage');
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, 'sessionStorage');
                saludar(recuperarUsuario(sessionStorage));
            }
            //Cerrar el cuadrito de login
            modal.hide();
            //Mostrar la info para usuarios logueados
            mostrarInfoProducto(producto);
            presentarInfo(toggles, 'd-none');
        }

    }


});

btnLogout.addEventListener('click', () => {
    borrarDatos();
    presentarInfo(toggles, 'd-none');
});

isLogged(recuperarUsuario(localStorage));