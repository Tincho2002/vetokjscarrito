// -------------- Creo mi constructor para los objetos que mi programa va a manejar --------------
class PostItem {
    constructor(marca, puntaje, description) {
            this.id = parseInt(Math.random() * 100000).toString(); // Genero un id único, para poder referenciarlos luego
            this.marca = marca;
            this.puntaje = puntaje;
            this.description = description;
            this.isValorar = false; // Defino falso por defecto
            this.date = new Date().toDateString();
        }
        // puedo manejar esta propiedad mediante un método propio de la clase
    handleValorar() {
        this.isValorar = !this.isValorar;
    }
}

// -------------- Inicializo mis variables y constantes del programa --------------

const items = [];

// -------------- Declaro funciones --------------

// Agregar nuevo item
const addItem = (marca, puntaje, description) => {
    const newItem = new PostItem(marca, puntaje, description);
    items.push(newItem);
}

// Borrar un item
const deleteItem = (objectId) => {
    const itemIndex = items.findIndex(item => item.id === objectId);
    items.splice(itemIndex, 1);
}

// Editar item
const EditItemDescription = (objectId, newDescription) => {
    const itemIndex = items.findIndex(item => item.id === objectId);
    items[itemIndex].description = newDescription;
}

// Mostrar/Actualizar vista de la lista
const showItemList = () => {
    const listSection = document.getElementById('listSection');
    listSection.innerHTML = ''; // Verifico que esté vacío antes de imprimir info actualizada
    // Separo los items que son Valorados, para luego iterarlos por separado
    const valItems = items.filter(item => item.isValorar === true);
    // Lo mismo hago con los otros elementos, que NO son Valorados
    const noValItems = items.filter(item => item.isValorar === false);
    // Itero el array de Valorados
    valItems.forEach((item) => {
        listSection.innerHTML += `
      <div class="itemCard val" id="${item.id}">
        <div class="card-head">
          <h3>${item.marca}</h3>
          <p>${item.puntaje}</p>
        </div>
        <p class="card-description">${item.description}</p>
        <button class="editBtn">Editar</button>
        <button class="deleteBtn">Borrar</button>
        <button class="valBtn">Valorar</button>
      </div>`;
    })


    // Itero el array de No Valorados
    noValItems.forEach((item) => {
        listSection.innerHTML += `
    <div class="itemCard" id="${item.id}">
      <div class="card-head">
        <h3>${item.marca}</h3>
        <p>${item.puntaje}</p>
      </div>
      <p class="card-description">${item.description}</p>
      <button class="editBtn">Editar</button>
      <button class="deleteBtn">Borrar</button>
      <button class="valBtn">No Valorar</button>
    </div>`;
    })


    // Defino eventos de los botones
    const editBtnList = document.getElementsByClassName(`editBtn`);
    // Itero el array de botones, para que escuchen un evento cada uno.
    for (const btn of editBtnList) {
        btn.addEventListener('click', (e) => {
            showEditInput(e.target.parentNode.id); // Le paso por parámetro el id que recibo gracias al evento
        })
    }
    const deleteBtnList = document.getElementsByClassName(`deleteBtn`);
    for (const btn of deleteBtnList) {
        btn.addEventListener('click', (e) => {
            // Ejecuto para borrar item
            deleteItem(e.target.parentNode.id);
            // Actualizo la vista de la lista
            showItemList();
        })
    }
    const valBtnList = document.getElementsByClassName(`valBtn`);
    for (const btn of valBtnList) {
        btn.addEventListener('click', (e) => {
            markAsVal(e.target.parentNode.id);
        })
    }
}

const showEditInput = (cardId) => {
    const itemCard = document.getElementById(cardId);
    // Guardo en variable el item que voy a modificar, para tener info anterior
    const foundItem = items.find((item) => item.id === cardId);
    // Y uso esa info para mostrar lo que tenía dentro de descripción
    itemCard.innerHTML = `
    <textarea type="text" id="newDescription">${foundItem.description}</textarea>
    <button id="confirmEdit">Aceptar</button>
    <button id="cancelEdit">cancelar</button>`;
    // Guardo en variables los nuevos botones
    const confirmEdit = document.getElementById('confirmEdit');
    const cancelEdit = document.getElementById('cancelEdit');
    // Defino los eventos para ellos
    confirmEdit.addEventListener('click', () => {
        // Me guardo el valor del textarea
        const newDescription = document.getElementById('newDescription').value;
        // Ejecuto función para editar el objeto
        EditItemDescription(cardId, newDescription);
        // Reinicio la lista
        showItemList();
    });
    cancelEdit.addEventListener('click', () => showItemList());
}

const markAsVal = (cardId) => {
    // Busco el elemento que quiero modificar
    const valItemIndex = items.findIndex((item) => item.id === cardId);
    // Modifico el array directamente, usando el indice para indicar cual es, y ejecuto el método para cambiar la propiedad
    items[valItemIndex].handleValorar();
    // Actualizo la lista en el DOM
    showItemList();
}

// -------------- Ejecución --------------

// Tomo el elemento form del HTML y lo guardo en la constante
const inputForm = document.getElementById('inputForm');
// Le agrego el evento submit
inputForm.addEventListener('submit', (e) => {
    // Recibo el evento del parámetro, y ejecuto el preventDefault para que no se ejecute de forma predeterminada
    e.preventDefault();
    // Obtengo los datos de los input, usando la información del evento
    const marcaInput = e.target.marca.value;
    const puntajeInput = e.target.puntaje.value;
    const descriptionInput = e.target.description.value;
    // Ejecuto la función para agregar, pasando como parámetros las constantes (en orden)
    addItem(marcaInput, puntajeInput, descriptionInput);
    e.target.reset() // Para reiniciar el formulario
    showItemList() // Actualiza la pantalla
})