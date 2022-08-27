import { builddatatable } from './buildDataTable.js'

//Obtención datos a listar
async function getData() {

    const response = await fetch(`./getData.php`);
    const data = await response.json();
    return data;
}

const data = await getData();


/*builddatatable([
{
    'id': 3,
    'name': 'Jose',
    'last_name': 'Perez',
    'position': 'Officer',
    'office': 'San Diego',
    'age': 56,
    'start_date': '2001-05-04'
}]);*/

//Entry point
builddatatable(data);