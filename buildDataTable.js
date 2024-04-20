import { buildMainContainers } from "./build/buildMainContainers.js";
import { buildButtonsContainer } from './build/buildButtonsContainers.js';
import { buildRecordsToShowContainer } from './build/buildRecordsToShowContainer.js';
import { buildTable } from './build/buildTable.js';
import { buttonLogic } from "./templates/buttonLogic.js";
import { cleanUpAppContainer } from './utility/cleanUpAppContainer.js';
import { getTableHeadTitles } from './utility/getTableHeadTitles.js'
import { layerBackward } from "./templates/layerBackward.js";
import { layerForward } from "./templates/layerForward.js";
import { pageForward } from "./templates/pageForward.js";
import { pageBackward } from "./templates/pageBackward.js";
import { renderNoDataFound } from './templates/renderNoDataFound.js';
import { renderInitialList } from "./templates/renderInitialList.js";
import { renderOnePageList } from "./templates/renderOnePageList.js";
import { renderList } from "./templates/renderList.js";

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

        //**Limpia el contenedor de la app*/
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
                page_parameters = renderOnePageList(data, head_titles, number_of_buttons, page_parameters.page_number)
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
                    page_parameters = layerBackward(page_parameters)
                    if(page_parameters.layer_has_changed) pagingButtons()
                    renderList(data, head_titles, page_parameters, records_quantity)
                    return false
                })
                
                page_down_el.addEventListener("click", function(event) {   
                    event.preventDefault()
                    page_parameters = pageBackward(page_parameters)
                    if(page_parameters.layer_has_changed) pagingButtons()
                    renderList(data, head_titles, page_parameters, records_quantity)
                    return false
                })
            
                page_up_el.addEventListener("click", function(event) {
                    event.preventDefault()
                    page_parameters = pageForward(page_parameters);
                    if(page_parameters.layer_has_changed) pagingButtons()
                    renderList(data, head_titles, page_parameters, records_quantity)
                    return false
                })
            
                layer_up_el.addEventListener('click', function(event) {
                    event.preventDefault()
                    page_parameters = layerForward(page_parameters)
                    if(page_parameters.layer_has_changed) pagingButtons()
                    renderList(data, head_titles, page_parameters, records_quantity)
                    return false
                })
                
                function pagingButtons() {
                    page_parameters.layer_has_changed = false;
                    const buttons_list = document.querySelectorAll('.pagei');
                    buttons_list.forEach(function(button) {
                        button.addEventListener('click', function(event) {
                            event.preventDefault();
                            if(event.target.id !== '') {
                                page_parameters.page_number = Number(event.target.id);
                                buttonLogic(page_parameters);
                                renderList(data, head_titles, page_parameters, records_quantity)
                            }
                            return false
                        })
                    })
                }
            }
           //------------------------End Nav buttons Events-------------------------/
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