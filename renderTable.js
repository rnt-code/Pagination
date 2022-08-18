import { buildtable } from "./build_table.js";
import { listdata } from "./list_data.js"

async function rendertable(page_number, pages) {

    //Cantidad de registros a mostrar elegido por el usuario
    let count_el = document.getElementById('count');

    //verifico que page_number esté dentro de su dominio
    if(page_number < 0) page_number = 1;
    if(page_number > pages) page_number = pages;

    //Desde qué registros comenzaremos la lista a mostrar(offset)
    let offset = (page_number - 1) * count_el.value;

    //console.log('offset: ', offset);
    //console.log('count:le.value: ', count_el.value);

    //Traigo los datos a mostrar
    async function getData() {
        const response = await fetch(`./getData.php?offset=${offset}&count=${count_el.value}`);
        const data = await response.json();
        return data;
    }
    const data = await getData();

    //construyo la tabla y mustro los datos
    buildtable(data.length);
    listdata(data, true);
}

export { rendertable }