import { buildMainContainers } from "./build/buildMainContainers.js";
import { buildButtonsContainer } from './build/buildButtonsContainers.js';
import { buildRecordsToShowContainer } from './build/buildRecordsToShowContainer.js';
import { buildTable } from './build/buildTable.js';
import { cleanUpAppContainer } from './utility/cleanUpAppContainer.js';
import { getTableHeadTitles } from './utility/getTableHeadTitles.js'
import { paintSelectedButton } from './src/scripts/paintSelectedButton.js'
import { renderButtons } from "./templates/renderButtons.js";
import { renderDataTable } from "./templates/renderDataTable.js";
import { renderNoDataFound } from './templates/renderNoDataFound.js';
import { tableFiller } from './utility/tableFiller.js'
import { renderInitialList } from "./templates/renderInitialList.js";
import { renderOnePageList } from "./templates/renderOnePageList.js";

function buildDataTable(data = [], number_of_buttons = 0, custom_head_titles = undefined) {

    let params = {
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
            params = renderInitialList(data, head_titles, number_of_buttons)
            console.log('initial params:', params)
            navigationButtonsListeners()
            //-----------------------End Initial list rendering----------------------/

            //**---------------------Records to show rendering----------------------*/
            const records_to_show_el = document.getElementById('records-to-show');
            records_to_show_el.addEventListener("change", function(event) {
                event.preventDefault()
                params = renderOnePageList(data, head_titles, number_of_buttons, page_number)
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
                    params = layerDown(params)
                    if(params.layer_has_changed) pagingButtons()
                    return false
                })
                
                page_down_el.addEventListener("click", function(event) {   
                    event.preventDefault()
                    params = slowReverse(params)
                    if(params.layer_has_changed) pagingButtons()
                    return false
                })
            
                page_up_el.addEventListener("click", function(event) {
                    event.preventDefault()
                    params = slowForward(params);
                    if(params.layer_has_changed) pagingButtons()
                    return false
                })
            
                layer_up_el.addEventListener('click', function(event) {
                    event.preventDefault()
                    params = layerUp(params)
                    if(params.layer_has_changed) pagingButtons()
                    return false
                })
                
                //Esta función es llamada cuando se lista por primera vez o ante una cambio del
                //número de registro a mostrar. Y luego se la llama cada vez que ocurre un cambio
                //de capa de botones. La idea es escanear la nueva capa visible y poder atender
                //los eventos de los botones de esa nueva capa. 
                function pagingButtons() {
                    params.layer_has_changed = false
                    
                    const buttons_list = document.querySelectorAll('.pagei')
                    buttons_list.forEach(function(button) {
                    button.addEventListener('click', function(event) {
                        event.preventDefault()
                        params.page_number = Number(event.target.id)
                        paintSelectedButton(params.page_number)
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

            //**READY 2024*/
            // function pagingButtons() {
        
            //     console.log('buttonListener')
            //     const page_down_el = document.querySelector('.page-down'); // '<'
            //     const page_up_el = document.querySelector('.page-up'); // '>'
            //     const layer_down_el = document.querySelector('.layer-down'); // '<<'
            //     const layer_up_el = document.querySelector('.layer-up'); // '>>'
            //     const buttons_list = document.querySelectorAll('.pagei');

            //     buttons_list.forEach(function(button) {
            //         page_number = parseInt(button.innerText);
            //         console.log('pagina: ', page_number)

            //         if(MAX_LAYERS >= 2) {
            //             if(layer_counter === 1) {
            //                 layer_up_el.classList.remove('disabled');
            //                 layer_down_el.classList.add('disabled');
            //                 if(page_number === 1) {
            //                     page_down_el.classList.add('disabled');
            //                 }
            //                 else {
            //                     page_down_el.classList.remove('disabled');
            //                 }
            //             }
            //             else if(layer_counter === MAX_LAYERS) {
            //                 layer_down_el.classList.remove('disabled');
            //                 layer_up_el.classList.add('disabled');
            //                 if(page_number === MAX_PAGES) {
            //                     page_up_el.classList.add('disabled');
            //                 }
            //                 else {
            //                     page_up_el.classList.remove('disabled');
            //                 }
            //             } 
            //             else {
            //                 layer_up_el.classList.remove('disabled');
            //                 layer_down_el.classList.remove('disabled');
            //             }
            //         }
            //         else {
            //             layer_down_el.classList.add('disabled');
            //             layer_up_el.classList.add('disabled');
            //             if(page_number === 1) {
            //                 page_down_el.classList.add('disabled');
            //             }
            //             else {
            //                 page_down_el.classList.remove('disabled');
            //             }
            //             if(page_number === MAX_PAGES) {
            //                 page_up_el.classList.add('disabled');
            //             }
            //             else {
            //                 page_up_el.classList.remove('disabled');
            //             }
            //         } 
            //         paintSelectedButton(page_number)
            //         //let records_to_show = parseInt(records_to_show_el.value);
            //         //one_page_data = getOnePageData(data, page_number, records_to_show)
            //         //cleanUpDataTableContent()
            //         //renderMetrics(page_number, MAX_PAGES, one_page_data.length, records_quantity)
            //         //buildTableBody()
            //         //renderTableBody(one_page_data.length, head_titles.length)
            //         //tableFiller(one_page_data, head_titles);
            //     })
            // }

            //**------------------------Funciones locales--------------------------*/
            
            function renderTable(data, head_titles, MAX_PAGES) {

                //Desde qué registro comenzaremos la lista a mostrar (start)
                const records_to_show_el = document.getElementById('records-to-show');
                let records_to_show = records_to_show_el.value
                
                // const starting_at = (page_number - 1) * records_to_show;
                // const ending_in = starting_at + records_to_show;
                let [starting_at, ending_in] = getLimitsOfButtonsToDraw(page_number, MAX_PAGES, number_of_buttons)
                
                console.log('star at: ', starting_at, 'end in:', ending_in)
                
                const one_page_data = data.slice(starting_at, ending_in);
                
                renderDataTable(one_page_data, head_titles);
                const metrics = `Página ${page_number} de ${MAX_PAGES}. Se lista(n) ${one_page_data.length} registro(s) de un total de ${records_quantity}.`
                
                document.getElementById('metrics-top').innerHTML = metrics;
                document.getElementById('metrics-bottom').innerHTML = metrics;

                console.log('one_page_data: ', one_page_data, 'head_titles: ', head_titles)
                tableFiller(one_page_data, head_titles);
                return false
            }

            //**READY 2024*/
            //Avance (>>) de 1 capa en 1
            function layerUp(params) {

                let { page_number, layer_counter, layer_has_changed, MAX_LAYERS, number_of_buttons, MAX_PAGES } = params

                if(layer_counter < MAX_LAYERS) {
                    layer_counter++;
                    layer_has_changed = true;

                    if(layer_counter * number_of_buttons > MAX_PAGES) {
                        renderButtons(number_of_buttons * (layer_counter - 1) + 1, MAX_PAGES);
                    }
                    else {
                        renderButtons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
                    }
                }
                
                if(number_of_buttons * (layer_counter - 1) + 1 === MAX_PAGES) {
                    page_number = MAX_PAGES;
                }
                else {
                    page_number = number_of_buttons * (layer_counter - 1) + 1;
                }

                //---LAYER UP---Lógica de encendido y apagado de botones de navegación-----//
                const page_down_el = document.querySelector('.page-down'); // '<'
                const page_up_el = document.querySelector('.page-up'); // '>'
                const layer_down_el = document.querySelector('.layer-down'); // '<<'
                const layer_up_el = document.querySelector('.layer-up'); // '>>'

                if(layer_counter > 1 && layer_counter < MAX_LAYERS) {
                    //console.log('up: estamos en el medio');
                    layer_up_el.classList.remove('disabled')
                    layer_down_el.classList.remove('disabled')
                    
                    if(page_number > 1 && page_number < MAX_PAGES) {
                        page_down_el.classList.remove('disabled');
                        page_up_el.classList.remove('disabled');
                    }
                }
                if(layer_counter === MAX_LAYERS) {
                    //console.log('upLayer...estamos en la última capa');
                    layer_up_el.classList.add('disabled');
                    if(MAX_LAYERS >= 2) {
                        //console.log('upLayer...y hay más de una capa');
                        layer_down_el.classList.remove('disabled');
                        if(page_number === MAX_PAGES) {
                            //console.log('upLayer...y ahora en el extremo derecho1');
                            layer_down_el.classList.remove('disabled');
                        }
                        else {
                            //console.log('upLayer...y no llegamos aún al extremo derecho1');
                            page_down_el.classList.remove('disabled');
                        }
                    }
                    
                    if(page_number === MAX_PAGES) {
                        //console.log('upLayer...y ahora en el extremo derecho2');
                        page_up_el.classList.add('disabled');
                        page_down_el.classList.remove('disabled');
                    }
                }
                //-------------------------------------------------------------------------//
                paintSelectedButton(page_number);
                //renderTable(data, head_titles, MAX_PAGES);
                console.log({     
                    'page_number': page_number,
                    'layer_counter': layer_counter, 
                    'layer_has_changed': layer_has_changed,
                    'MAX_LAYERS':MAX_LAYERS, 
                    'number_of_buttons': number_of_buttons, 
                    'MAX_PAGES':MAX_PAGES
                })
                return {     
                    'page_number': page_number,
                    'layer_counter': layer_counter, 
                    'layer_has_changed': layer_has_changed,
                    'MAX_LAYERS':MAX_LAYERS, 
                    'number_of_buttons': number_of_buttons, 
                    'MAX_PAGES':MAX_PAGES
                }
            }

            //Retroceso (<<) de 1 capa en 1
            //**READY 2024*/
            function layerDown(params) {

                let { page_number, layer_counter, layer_has_changed, MAX_LAYERS, number_of_buttons, MAX_PAGES } = params
                
                if(layer_counter > 1) { 
                    layer_counter--;
                    layer_has_changed = true;
                    renderButtons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
                }
                if(page_number > number_of_buttons) {
                    page_number = layer_counter * number_of_buttons;
                    
                }

                //---LAYER DOWN---Lógica de encendido y apagado de botones de navegación---//
                //---LAYER UP---Lógica de encendido y apagado de botones de navegación-----//
                const page_down_el = document.querySelector('.page-down'); // '<'
                const page_up_el = document.querySelector('.page-up'); // '>'
                const layer_down_el = document.querySelector('.layer-down'); // '<<'
                const layer_up_el = document.querySelector('.layer-up'); // '>>'

                if(layer_counter > 1 && layer_counter < MAX_LAYERS) {
                    
                    layer_up_el.classList.remove('disabled')
                    layer_down_el.classList.remove('disabled')
                    if(page_number > 1 && page_number < MAX_PAGES) {
                        page_down_el.classList.remove('disabled');
                        page_up_el.classList.remove('disabled');
                    }
                } 
                if(layer_counter === 1) {
                    //console.log('downLayer...estamos en la primera capa');
                    layer_down_el.classList.add('disabled');
                    if(MAX_LAYERS >= 2) {
                        //console.log('downLayer...y hay más de una capa');
                        layer_up_el.classList.remove('disabled');
                        if(page_number === 1) {
                            //console.log('upLayer...y ahora en el extremo izquierdo1');
                            layer_up_el.classList.remove('disabled');
                        }
                        else {
                            //console.log('upLayer...y no llegamos aún al extremo izquierdo1');
                            page_up_el.classList.remove('disabled');
                        }
                    }
                    if(page_number === 1) {
                        //console.log('upLayer...y ahora en el extremo izquierdo2');
                        page_down_el.classList.add('disabled');
                        page_up_el.classList.remove('disabled');
                    }
                }
                //-------------------------------------------------------------------------//
                paintSelectedButton(page_number);
                //renderTable(data, head_titles, MAX_PAGES);
                console.log({     
                    'page_number': page_number,
                    'layer_counter': layer_counter, 
                    'layer_has_changed': layer_has_changed,
                    'MAX_LAYERS':MAX_LAYERS, 
                    'number_of_buttons': number_of_buttons, 
                    'MAX_PAGES':MAX_PAGES
                })
                return {     
                    'page_number': page_number,
                    'layer_counter': layer_counter, 
                    'layer_has_changed': layer_has_changed,
                    'MAX_LAYERS':MAX_LAYERS, 
                    'number_of_buttons': number_of_buttons, 
                    'MAX_PAGES':MAX_PAGES
                }
            }

            //Avance (>) de 1 página en 1
            //**READY 2024*/
            function slowForward(params) {

                let starting_at
                let ending_in
                let { page_number, layer_counter, layer_has_changed, MAX_LAYERS, number_of_buttons, MAX_PAGES } = params
                layer_has_changed = false;

                if(page_number === layer_counter * number_of_buttons) {
                    if(layer_counter < MAX_LAYERS) {
                        layer_counter++;
                        layer_has_changed = true;

                        if(layer_counter * number_of_buttons > MAX_PAGES) {
                            starting_at = number_of_buttons * (layer_counter - 1) + 1
                            ending_in = MAX_PAGES;
                        }
                        else {
                            starting_at = number_of_buttons * (layer_counter - 1) + 1
                            ending_in = layer_counter * number_of_buttons;
                        }
                        renderButtons(starting_at, ending_in);
                    }
                }

                if(page_number < MAX_PAGES) {
                    page_number++;
                }

                //----UP----Lógica de encendido y apagado de botones de navegación---------//
                const page_down_el = document.querySelector('.page-down'); // '<'
                const page_up_el = document.querySelector('.page-up'); // '>'
                const layer_down_el = document.querySelector('.layer-down'); // '<<'
                const layer_up_el = document.querySelector('.layer-up'); // '>>'

                if(page_number > 1 && page_number < MAX_PAGES) {
                    //console.log('up: estamos en el medio');
                    page_down_el.classList.remove('disabled'); //remove
                    page_up_el.classList.remove('disabled'); //remove
                    if(layer_counter > 1 && layer_counter < MAX_LAYERS) {
                        layer_up_el.classList.remove('disabled') //remove
                        layer_down_el.classList.remove('disabled') //remove
                    }
                    if(layer_counter === MAX_LAYERS) {
                        //console.log('up...estamos en la ULTIMA CAPA');
                        layer_up_el.classList.add('disabled');
                        if(MAX_LAYERS < 2) {
                            //console.log('up...y solo hay una capa1');
                            layer_down_el.classList.add('disabled');
                        }
                        else {
                            //console.log('up...hay más de una capa1_');
                            layer_down_el.classList.remove('disabled'); //remove
                        }
                    }
                    else {
                        //console.log('up...aún no estamos en la ultima capa');
                        layer_up_el.classList.remove('disabled');
                    }
                }
                else if(page_number === MAX_PAGES) {
                    //console.log('up...estamos en la ULTIMA CAPA y en el extremo derecho');
                    page_up_el.classList.add('disabled');
                    if(MAX_LAYERS < 2) {
                        //console.log('up...y solo hay una capa2');
                        page_down_el.classList.remove('disabled'); //remove
                    }
                    else {
                        //console.log('up...hay más de una capa2');
                        layer_down_el.classList.remove('disabled');
                        layer_up_el.classList.add('disabled');
                    }
                }
                //-------------------------------------------------------------------------//
                paintSelectedButton(page_number);
                //renderTable(data, head_titles);
                console.log({     
                    'page_number': page_number,
                    'layer_counter': layer_counter, 
                    'layer_has_changed': layer_has_changed,
                    'MAX_LAYERS':MAX_LAYERS, 
                    'number_of_buttons': number_of_buttons, 
                    'MAX_PAGES':MAX_PAGES
                })
                return {     
                    'page_number': page_number,
                    'layer_counter': layer_counter, 
                    'layer_has_changed': layer_has_changed,
                    'MAX_LAYERS':MAX_LAYERS, 
                    'number_of_buttons': number_of_buttons, 
                    'MAX_PAGES':MAX_PAGES
                }
            }

            //Retroceso (<) de 1 página en 1
            //**READY 2024*/
            function slowReverse(params) {

                let starting_at
                let ending_in
                let { page_number, layer_counter, layer_has_changed, MAX_LAYERS, number_of_buttons, MAX_PAGES } = params
                layer_has_changed = false;

                if(page_number === number_of_buttons * (layer_counter - 1) + 1) {
                    if(layer_counter > 1) {
                        layer_counter--;
                        layer_has_changed = true;

                        starting_at = number_of_buttons * (layer_counter - 1) + 1
                        ending_in = layer_counter * number_of_buttons

                        renderButtons(starting_at, ending_in);
                    }
                }

                if(page_number > 1) {
                    page_number--;
                }
                
                //---DOWN---Lógica de encendido y apagado de botones de navegaciónr--------//
                const page_down_el = document.querySelector('.page-down'); // '<'
                const page_up_el = document.querySelector('.page-up'); // '>'
                const layer_down_el = document.querySelector('.layer-down'); // '<<'
                const layer_up_el = document.querySelector('.layer-up'); // '>>'

                if(page_number > 1 && page_number < MAX_PAGES) {
                    //console.log('down: en el medio');
                    page_down_el.classList.remove('disabled'); //remove
                    page_up_el.classList.remove('disabled'); //remove
                    if(layer_counter > 1 && layer_counter < MAX_LAYERS) {
                        layer_up_el.classList.remove('disabled'); //remove
                        layer_down_el.classList.remove('disabled'); //remove
                    } 
                    if(layer_counter === 1) {
                        //console.log('down...estamos en la PRIMERA CAPA')
                        layer_down_el.classList.add('disabled');
                        if(MAX_LAYERS < 2) {
                            //console.log('down...y solo hay una capa1');
                            layer_up_el.classList.add('disabled');
                        }
                        else {
                            //console.log('down...hay más de una capa1');
                            layer_up_el.classList.remove('disabled'); //remove
                        }
                    }
                    else {
                        //console.log('down...aún no estamos en la primera capa');
                        layer_down_el.classList.remove('disabled');
                    }
                } 
                else if(page_number === 1 ) {
                    //console.log('down...estamos en la PRIMERA CAPA y en el extremo izquierdo');
                    page_down_el.classList.add('disabled');
                    if(MAX_LAYERS < 2) {
                        //console.log('down...y solo hay una capa2');
                        page_up_el.classList.remove('disabled'); //remove
                    }
                    else {
                        //console.log('down...hay más de una capa2');
                        layer_up_el.classList.remove('disabled');
                        layer_down_el.classList.add('disabled');
                    }
                }
                //-------------------------------------------------------------------------//
                paintSelectedButton(page_number);
                //renderTable(data, head_titles);
                console.log({     
                    'page_number': page_number,
                    'layer_counter': layer_counter,
                    'layer_has_changed': layer_has_changed,
                    'MAX_LAYERS':MAX_LAYERS, 
                    'number_of_buttons': number_of_buttons, 
                    'MAX_PAGES':MAX_PAGES
                })
                return {     
                    'page_number': page_number,
                    'layer_counter': layer_counter, 
                    'layer_has_changed': layer_has_changed,
                    'MAX_LAYERS':MAX_LAYERS, 
                    'number_of_buttons': number_of_buttons, 
                    'MAX_PAGES':MAX_PAGES
                }
            }
            //**----------------------Fin Funciones locales------------------------*/
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