import { buildtable } from "./build_table.js";
import { listdata } from "./list_data.js"
import { buildpagebuttons } from './buildPageButtons.js'

async function updatetable() {

    async function getNumber() {
        const response = await fetch(`./getRecordQty.php`);
        const regqty = await response.json();
        return regqty;
    }
    
    let regqty = await getNumber();
    console.log('Cantidad de registros: '+regqty.n);
    
    //Cantidad de registros a mostrar 
    let count = document.getElementById('count').value;
    
    //Cantidad de página que tendrá el libro de listas
    let pages = Math.ceil(parseFloat(regqty.n) / parseFloat(count));
    
    //renderizo los botones para la navegación por las páginas del libro
    buildpagebuttons(pages);
    
    //muesto la página 1 como prueba
    const page = 1;

    //Cantidad de registros a mostrar (offset)
    let offset = (page - 1) * count;

    console.log('Mostrando '+count+' registros de '+regqty.n);
    console.log('Página '+page+ ' de '+pages);
    console.log('Datos para la consulta SQL: offset: '+offset+'. count: '+count);
    
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