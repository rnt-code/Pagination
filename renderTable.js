import { buildtable } from "./build_table.js";
import { listdata } from "./list_data.js"

async function rendertable(page_number, pages, count) {

    //Verifico que page_number esté dentro de su dominio
    if(page_number < 0) page_number = 1;
    if(page_number > pages) page_number = pages;

    //Desde qué registros comenzaremos la lista a mostrar(offset)
    let offset = (page_number - 1) * count;

    //Traigo los datos a mostrar
    async function getData() {
        const response = await fetch(`./getData.php?offset=${offset}&count=${count}`);
        const data = await response.json();
        return data;
    }
    const data = await getData();

    //Construyo la tabla y mustro los datos
    buildtable(data.length);
    listdata(data, true);
}

export { rendertable }