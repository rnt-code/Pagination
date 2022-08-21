import { renderupdownbuttons } from "./renderUpDownButtons.js";
import { renderbuttons } from "./renderButtons.js";
import { tablecontainer } from "./view_table_container.js";
import { buildtable } from "./build_table.js";
import { listdata } from "./list_data.js"

tablecontainer();

let data = [];
let count = 0;
let pages = 0;
let from = 0;
let to = 0;
let layers = 0;
let layer_counter = 1;
let page_number = 1;
const number_of_buttons = 6;

//Referencia a la cantidad de registros a mostrar al iniciar la página
const count_el = document.getElementById('count');

//renderizo los botones up/down
renderupdownbuttons();

//Referencias a los botones up/down
const page_down = document.getElementById('page-down');
const page_up = document.getElementById('page-up');

//**------------------------------------Página inicial----------------------------------- *//


//Traigo la cantidad de registros en la tabla
let regqty = parseInt((await getNumber()).n);

//Cantidad de registros a mostrar al iniciar la página
if(parseInt(count_el.value) > regqty) {
    count = regqty;
}
else {
    count = parseInt(count_el.value);
}

//Cantidad de páginas que se generarán según la cant. de registros y los registros a mostrar
if(Number.isInteger(regqty / count)) {
    pages = regqty / count;
}
else {
    pages = Math.floor(regqty / count) + 1;
}

//Renderizo la tabla (la página 1)
rendertable();

//Renderizo los botones
if(pages <= number_of_buttons) {
    from = page_number;
    to = pages;
}
else {
    from = page_number;
    to = number_of_buttons;
}
renderbuttons(from, to);

//Calculo cuantas capas (layers) de botones habrá
if(Number.isInteger(pages / number_of_buttons)) {
    layers = pages / number_of_buttons;
}
else {
    layers = Math.floor(pages / number_of_buttons) + 1;
}
//**----------------------------------Fin página inicial----------------------------------*//

navbuttonlistenner();

//Listener de cambios en la cantidad de registros a mostrar
count_el.addEventListener("change", async function (event) {
    event.preventDefault();

    page_number = 1;
    from = 0;
    to = 0;
    pages = 0;
    layer_counter = 1;

    //Consulto la cantidad total de registros en la tabla. 
    let regqty = parseInt((await getNumber()).n);
    
    //Cantidad de registros a mostrar que elige el operador
    const count_el = document.getElementById('count');
    if(parseInt(count_el.value) > regqty) {
        count = regqty;
    }
    else {
        count = parseInt(count_el.value);
    }
    
    //Cantidad de páginas que se generarán según la cant. de registros y los registros a mostrar elegidos por el usuario
    if(Number.isInteger(regqty / count)) {
        pages = regqty / count;
    }
    else {
        pages = Math.floor(regqty / count) + 1;
    }

    //Calculo cuantas capas (layers) de botones habrá
    if(Number.isInteger(pages / number_of_buttons)) {
        layers = pages / number_of_buttons;
    }
    else {
        layers = Math.floor(pages / number_of_buttons) + 1;
    }

    if(pages <= number_of_buttons) {
        from = page_number;
        to = pages;
    }
    else {
        from = page_number;
        to = number_of_buttons;
    }

    rendertable();
    renderbuttons(from, to);
    navbuttonlistenner();
})

//Listener del botón DOWN
page_down.addEventListener("click", function (event) {
    event.preventDefault();
    
    if(layer_counter >= 1) { 
        if(layer_counter != 1) {
            layer_counter--;
            renderbuttons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
        }
    }
    navbuttonlistenner();
})

//Listener del botón UP
page_up.addEventListener("click", function (event) {
    event.preventDefault();

    if(layer_counter <= layers) {
        if(layer_counter != layers) {
            layer_counter++;
            if(layer_counter * number_of_buttons > pages) {
                renderbuttons(number_of_buttons * (layer_counter - 1) + 1, pages);
            }
            else {
                renderbuttons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
            }
        }
    }
    navbuttonlistenner();
})

async function getNumber() {
    const response = await fetch(`./getRecordQty.php`);
    const regqty = await response.json();
    return regqty;
}

function navbuttonlistenner() {
    const nav_buttons = document.querySelectorAll('.pagei');

    nav_buttons.forEach(function(nav_button) {

        nav_button.addEventListener('click', function(event) {
            event.preventDefault();

            page_number = parseInt(nav_button.innerText);
            rendertable();
        })
    })
}

async function rendertable() {

    //Verifico que page_number esté dentro de su dominio
    // if(page_number < 0) page_number = 1;
    // if(page_number > pages) page_number = pages;

    //Desde qué registros comenzaremos la lista a mostrar (offset)
    let offset = (page_number - 1) * count;

    //Traigo los datos a mostrar
    async function getData() {
        const response = await fetch(`./getData.php?offset=${offset}&count=${count}`);
        const data = await response.json();
        return data;
    }
    data = await getData();

    info.innerHTML = `Página ${page_number} de ${pages} página(s). Mostrando ${data.length} registros de ${regqty}`;
    
    //Construyo la tabla y muestro los datos
    buildtable(data.length);
    listdata(data, true);
}