import { builddatatable } from './pagination_modules/buildDataTable.js'

//Obtención datos a listar
async function getData() {

    const response = await fetch(`./getData.php`);
    const data = await response.json();
    return data;
}

const refresh_button = document.getElementById('refresh-button');

refresh_button.addEventListener('click', async function(event) {
    event.preventDefault();

    const data = await getData();
    const number_of_buttons = 6;
    const custom_header = ['Id', 'Nombre', 'Apellido', 'Dirección', 'Ciudad', 'Teléfono', 'e-mail','Compañia', 'Posición', 'Oficina', 'Edad', 'Fecha inicio'];

    //console.log(data);

    //Entry point
    builddatatable(data, number_of_buttons, custom_header);

})

