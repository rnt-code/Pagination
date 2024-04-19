import { buildMainContainers } from "./build/buildMainContainers.js";
import { buildButtonsContainer } from './build/buildButtonsContainers.js';
import { buildRecordsToShowContainer } from './build/buildRecordsToShowContainer.js';
import { buildTable } from './build/buildTable.js';
import { cleanUpAppContainer } from './utility/cleanUpAppContainer.js';
import { getTableHeadTitles } from './utility/getTableHeadTitles.js'
import { paintSelectedButton } from './src/scripts/paintSelectedButton.js'
import { renderDataTable } from "./templates/renderDataTable.js";
import { renderNoDataFound } from './templates/renderNoDataFound.js';
import { renderInitialList } from "./templates/renderInitialList.js";
import { renderOnePageList } from "./templates/renderOnePageList.js";
import { slowForward } from "./templates/slowForward.js";
import { slowReverse } from "./templates/slowReverse.js";
import { layerDown } from "./templates/layerDown.js";
import { layerUp } from "./templates/layerUp.js";
import { tableFiller } from './utility/tableFiller.js'

function buildDataTable(data = [], number_of_buttons = 0, custom_head_titles = undefined) {

    let page_parameters = {
            'page_number':1,
            'layer_counter':1,
            'layer_has_changed':false, 
            'MAX_LAYERS':0, 
            'number_of_buttons':0, 
            'MAX_PAGES':0
    }
   
    const place_for_list = document.getElementById('place-for-list');
    const exist = !!place_for_list;
    if(exist) {
        
        let head_titles = getTableHeadTitles(custom_head_titles, data);

        //**Limpia el contenido*/
        cleanUpAppContainer();

        //**Obtengo la cantidad de registros que vienen en data, es el crudo*/
        let records_quantity = data.length;

        //**Armo el 'esqueleto' de toda la estructura que contendrá la app*/
        buildMainContainers();
        buildButtonsContainer();
        buildRecordsToShowContainer();
        buildTable();

        //Si hay datos construyo la app, si no, muestro el mesaje de 'No data found'
        if(records_quantity != 0) {

            //**-----------------------Initial list rendering-----------------------*/
            page_parameters = renderInitialList(data, head_titles, number_of_buttons)
            navigationButtonsListeners()
            //-----------------------End Initial list rendering----------------------/

            //**---------------------Records to show rendering----------------------*/
            const records_to_show_el = document.getElementById('records-to-show');
            records_to_show_el.addEventListener("change", function(event) {
                event.preventDefault()
                page_parameters = renderOnePageList(data, head_titles, number_of_buttons, page_number)
                navigationButtonsListeners()
                return false
            })
            //----------------------End Records to show rendering-------------------*/

            //**-------------------------Nav buttons Events-------------------------*/  
            function navigationButtonsListeners() {

                const page_down_el = document.querySelector('.page-down'); // '<'
                const page_up_el = document.querySelector('.page-up'); // '>'
                const layer_down_el = document.querySelector('.layer-down'); // '<<'
                const layer_up_el = document.querySelector('.layer-up'); // '>>'
                
                pagingButtons();

                layer_down_el.addEventListener('click', function(event) {
                    event.preventDefault()
                    page_parameters = layerDown(page_parameters)
                    if(page_parameters.layer_has_changed) pagingButtons()
                    renderTable();
                    return false
                })
                
                page_down_el.addEventListener("click", function(event) {   
                    event.preventDefault()
                    page_parameters = slowReverse(page_parameters)
                    if(page_parameters.layer_has_changed) pagingButtons()
                    renderTable();
                    return false
                })
            
                page_up_el.addEventListener("click", function(event) {
                    event.preventDefault()
                    page_parameters = slowForward(page_parameters);
                    if(page_parameters.layer_has_changed) pagingButtons()
                    renderTable();
                    return false
                })
            
                layer_up_el.addEventListener('click', function(event) {
                    event.preventDefault()
                    page_parameters = layerUp(page_parameters)
                    if(page_parameters.layer_has_changed) pagingButtons()
                    renderTable();
                    return false
                })
                
                //Esta función es llamada cuando se lista por primera vez o ante una cambio del
                //número de registro a mostrar. Y luego, también se la llama cada vez que ocurre un cambio
                //de capa de botones. La idea es escanear la nueva capa visible y poder atender
                //los eventos de los botones de esa nueva capa. 
                function pagingButtons() {
                    page_parameters.layer_has_changed = false
                    const buttons_list = document.querySelectorAll('.pagei')
                    buttons_list.forEach(function(button) {
                        button.addEventListener('click', function(event) {
                            event.preventDefault()

                            page_parameters.page_number = Number(event.target.id)
                            paintSelectedButton(page_parameters.page_number)
                            renderTable()
                            return false
                        })
                    })
                }
            }
           //------------------------End Nav buttons Events-------------------------/
            // //captura del evento click del botón '<'
            // //**READY 2024*/
            // page_down_el.addEventListener("click", function(event) {   
            //     console.log('Se activo el botón <')            
            //     event.preventDefault()

            //     slowReverse();
            //     return false
            // })

            // //captura del evento click del botón '>'
            // //**READY 2024*/
            // page_up_el.addEventListener("click", function(event) {
            //     console.log('Se activo el botón >')
            //     event.preventDefault()

            //     slowForward();
            //     return false
            // })

            // //captura del evento click del botón '>>'
            //**READY 2024*/

            function renderTable() {

                //Desde qué registro comenzaremos la lista a mostrar (start)
                const records_to_show_el = document.getElementById('records-to-show');
                let records_to_show = Number(records_to_show_el.value)

                const starting_at = (page_parameters.page_number - 1) * records_to_show;
                const ending_in = starting_at + records_to_show;
                
                const one_page_data = data.slice(starting_at, ending_in);
                
                renderDataTable(one_page_data, head_titles);
                const metrics = `Página ${page_parameters.page_number} de ${page_parameters.MAX_PAGES}. Se lista(n) ${one_page_data.length} registro(s) de un total de ${records_quantity}.`
                
                document.getElementById('metrics-top').innerHTML = metrics;
                document.getElementById('metrics-bottom').innerHTML = metrics;

                tableFiller(one_page_data, head_titles);
            }
        }
        else {
            //**No hay datos, muestro el mensaje 'No data found'*/
            renderNoDataFound()
        }
    }
    else {
        //**No es posible correr la app */
        console.error('No existe el elemento html para desplegar la app. Ver documentación')
        console.error('El index.html debería contener el elemento: <div id="place-for-list"></div>')
    }
    return false
}

export { buildDataTable }