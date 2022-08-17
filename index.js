import { buildtable } from "./build_table.js";
import { listdata } from "./list_data.js"
import { buildpagebuttons } from './buildPageButtons.js'

async function getNumber() {
    const response = await fetch(`./getRecordQty.php`);
    const regqty = await response.json();
    return regqty;
}

let regqty = await getNumber();
console.log('Cantidad de registros: '+regqty.n);

//este número tengo que enviar como parámetro, es el número registros a mostrar
let count = document.getElementById('count').value;
//console.log('count: '+count); 

let pages = Math.ceil(parseFloat(regqty.n) / parseFloat(count));

buildpagebuttons(pages);

//este número tengo que enviar como parámetro, es el número de página
let page = 10;
let offset = (page - 1) * count;
console.log('Mostrando '+count+' ítems de '+regqty.n);
console.log('Página '+page+ ' de '+pages);
console.log(' offset: '+offset+'. count: '+count);

async function getResponse() {
    const response = await fetch(`./getData.php?offset=${offset}&count=${count}`);
    const data = await response.json();
    return data;
}

const data = await getResponse();
buildtable(data.length);
listdata(data, true);
