import { rendertable } from "./renderTable.js";
import { renderupdownbuttons } from "./renderUpDownButtons.js";
import { renderbuttons } from "./renderButtons.js";

//**------------------------------------Página inicial----------------------------------- *//
console.log('*****Página inicial');

//Referencia a la cantidad de registros a mostrar elegida por el usuario
let count_el = document.getElementById('count');

//renderizo los botones up/down
renderupdownbuttons();

//Referencias a los botones up/down
const page_down = document.getElementById('page-down');
const page_up = document.getElementById('page-up');

//Traigo la cantidad de registros en la tabla
async function getNumber() {
    const response = await fetch(`./getRecordQty.php`);
    const regqty = await response.json();
    return regqty;
}
let regqty = (await getNumber()).n;

//Cantidad de páginas que se generarán según la cant. de registros totales y a los registros a mostrar eelegida por el usuario
let pages = Math.ceil(regqty / count_el.value);

info.innerHTML = `Pagina 1 de ${pages} página(s) . Mostrando ${count_el.value} registros de ${regqty}`;

//Renderizo la tabla en su primera página
rendertable(1, pages);

//Renderizo los botones
if(pages <= 10) {
    renderbuttons(1, pages);
}
else {
    renderbuttons(1, 10);
}

//Calculo cuantas capas (layers) de botones habrá, inicilizo el contador de capas
let layers = 0;
let layer_counter = 1;

if(Number.isInteger(pages / 10)) {
    layers = pages / 10;
}
else {
    layers = Math.floor(pages / 10) + 1;
}
console.log('layers: ', layers);
console.log('*****Fin página inicial');
//**----------------------------------Fin página inicial----------------------------------*//

//Listener de cambios en la cantidad de registros a mostrar
count_el.addEventListener("change", async function (event) {
    event.preventDefault();

    let from = 0;
    let to = 0;
    layer_counter = 1

    //Consulto la cantidad total de registros en la tabla. 
    async function getNumber() {
        const response = await fetch(`./getRecordQty.php`);
        const regqty = await response.json();
        return regqty;
    }
    let regqty = (await getNumber()).n;
    
    //Cantidad de registros a mostrar que elige el operador
    const count_el = document.getElementById('count');
    
    //Cantidad de páginas que se generarán según la cant. de registros totales y a los registros a mostrar eelegida por el usuario
    let pages = Math.ceil(regqty / count_el.value);

    //Calculo cuantas capas (layers) de botones habrá
    if(Number.isInteger(pages / 10)) {
        layers = pages / 10;
    }
    else {
        layers = Math.floor(pages / 10) + 1;
    }
    console.log('layers: ', layers);
    
    let page_number = 1

    info.innerHTML = `Pagina ${page_number} de ${pages} página(s) . Mostrando ${count_el.value} registros de ${regqty}`;

    if(pages <= 10) {
        from = 1;
        to = pages;
    }
    else {
        from = 1;
        to = 10;
    }

    rendertable(page_number, pages);
    renderbuttons(from, to);
})

page_down.addEventListener("click", function (event) {
    event.preventDefault();
    //console.log('down');
    
    if(layer_counter >= 1) { 
        if(layer_counter != 1) {
            layer_counter--;
            console.log('layer_count = ', layer_counter, ', range: ',layer_counter*10-9,layer_counter*10);
            renderbuttons(layer_counter*10-9, layer_counter*10);
        }
    }
    
})

page_up.addEventListener("click", function (event) {
    event.preventDefault();
    //console.log('up');
    
    if(layer_counter <= layers) {
        if(layer_counter != layers) {
            layer_counter++;
            console.log('layer_count = ', layer_counter, ', range: ',layer_counter*10-9,layer_counter*10);
            renderbuttons(layer_counter*10-9, layer_counter*10);
        }
    }
    
})