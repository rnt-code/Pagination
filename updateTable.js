import { buildtable } from "./build_table.js";
import { listdata } from "./list_data.js"
import { buildpagebuttons } from './buildPageButtons.js'

async function updatetable() {

    const info = document.getElementById('info');
    let layer_counter = 1;

    async function getNumber() {
        const response = await fetch(`./getRecordQty.php`);
        const regqty = await response.json();
        return regqty;
    }
    
    let regqty = await getNumber();
    //console.log('Cantidad de registros: '+regqty.n);
    
    //Cantidad de registros a mostrar 
    let count = document.getElementById('count').value;
    
    //Cantidad de página que tendrá el libro de listas
    let pages = Math.ceil(parseFloat(regqty.n) / parseFloat(count));
    
    //renderizo los botones para la navegación por las páginas del libro
    let layers = 0;
    console.log('pages: ', pages);
    
    if(Number.isInteger(pages / 10)) {
        layers = pages / 10;
    }
    else {
        layers = Math.floor(pages / 10) + 1;
    }
    console.log('layers: ', layers);

    if(pages <= 10) {
        buildpagebuttons(1, pages);
    }
    else {
        buildpagebuttons(1, 10);
    }

    info.innerHTML = `Mostrando ${count} registros de ${regqty.n}`;
    const page_down = document.getElementById('page-down');
    const page_up = document.getElementById('page-up');

    page_down.addEventListener("click", function (event) {
        event.preventDefault();
        //console.log('down');
        if(layer_counter >= 1) { 
            if(layer_counter != 1) {
                layer_counter--;
                console.log('layer = ', layer_counter, 'range: ',layer_counter*10-9,layer_counter*10);
                //buildpagebuttons(layer_counter*10-9, layer_counter*10);
            }
        }
    })

    page_up.addEventListener("click", function (event) {
        event.preventDefault();
        //console.log('up');
        if(layer_counter <= layers) {
            if(layer_counter != layers) {
                layer_counter++;
                console.log('layer = ', layer_counter, 'range: ',layer_counter*10-9,layer_counter*10);
                //buildpagebuttons(layer_counter*10-9, layer_counter*10);
            }
        }
    })

    //muesto la página 1 como prueba
    const page = 1;

    //Cantidad de registros a mostrar (offset)
    let offset = (page - 1) * count;

    //console.log('Mostrando ', count, ' registros de ', regqty.n);
    //console.log('Página '+page+ ' de '+pages);
    //console.log('Datos para la consulta SQL: offset: '+offset+'. count: '+count);
    
    async function getData() {
        const response = await fetch(`./getData.php?offset=${offset}&count=${count}`);
        const data = await response.json();
        return data;
    }
    
    const data = await getData();

    // console.log('data: ', data);
    // console.log('data.length: '+data.length);

    buildtable(data.length);
    listdata(data, true);
}

export { updatetable }