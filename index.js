import { builddatatable } from './buildDataTable.js'

//Obtención datos a listar
async function getData() {

    //const response = await fetch(`./getData.php`);
    const response = await fetch(`./getDataToList.php?idqry=2007grl-l&inidate=2022-07-20&enddate=2022-07-20&turno=mañana&linesd=16`);
    const data = await response.json();
    return data;
}

const data = await getData();
const custom_header = ['Id', 'Serial#', 'Resultado', 'Hi-Pot', 'GB', 'Fecha', 'Inicio', 'Final', 'Duración'];

//Entry point
builddatatable(data,6,custom_header);