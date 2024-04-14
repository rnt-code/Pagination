import { getTableHeadTitles } from './utility/getTableHeadTitles.js'
import { buildContainers } from "./build/buildContainers.js";
import { renderUpDownButtons } from "./templates/renderUpDownButtons.js";
import { renderButtons } from "./templates/renderButtons.js";
import { paintSelectedButton } from './src/scripts/paintSelectedButton.js'
import { renderDataTable } from "./templates/renderDataTable.js";
import { tableFiller } from './utility/tableFiller.js'
import { renderNoDataFound } from './templates/renderNoDataFound.js';
import { renderRecordsToShow } from './templates/renderRecordsToShow.js';
import { getMaxPages } from './utility/getMaxPages.js';
import { getfinalNumberOfButtons } from './utility/getFinalNumberOfButtons.js';
import { getMaxLayers } from './utility/getMaxLayers.js';
import { getLimitsOfButtonsToDraw } from './utility/getLimitsOfButtonsToDraw.js';

function buildDataTable(data = [], number_of_buttons = 0, custom_head_titles = undefined) {

    const place_for_list = document.getElementById('place-for-list');
    const exist = !!place_for_list;
    if(exist) {
        let head_titles = getTableHeadTitles(custom_head_titles, data);

        //Cantidad de registros en la tabla
        let records_quantity = data.length;

        //Armo el 'esqueleto' de toda la estructura que contendrá la app
        buildContainers(); 
        
        //Si hay datos construyo la app, si no, muestro el mesaje de 'No data found'
        if(records_quantity != 0) {
            //Hay datos
            console.log('cantidad de registros=', records_quantity)

            let MAX_PAGES = 0;
            let MAX_LAYERS = 0;
            let records_to_show = 0;
            let layer_counter = 1;
            let page_number = 1;

            //Renderizo el selector de registros a mostrar
            renderRecordsToShow()

            //Renderizo los botones up/down
            renderUpDownButtons();

            //Referencias a los botones up/down
            const page_down_el = document.querySelector('.page-down');
            const page_up_el = document.querySelector('.page-up');
            const layer_down_el = document.querySelector('.layer-down');
            const layer_up_el = document.querySelector('.layer-up');

            //Habilitar los botones de paginación
            page_down_el.classList.remove('disabled');
            page_up_el.classList.remove('disabled');
            layer_down_el.classList.remove('disabled');
            layer_up_el.classList.remove('disabled');
            
            //Cantidad de registros a mostrar al iniciar la página
            const records_to_show_el = document.getElementById('records-to-show');
            records_to_show = parseInt(records_to_show_el.value);
            
            //Cantidad de páginas que se generarán según la cant. de registros y los registros a mostrar
            MAX_PAGES = getMaxPages(records_quantity, records_to_show)
            console.log('MAX_PAGES=', MAX_PAGES)

            //**----------------------------------------------------------------------------- */
            //**Renderizo la tabla*/
            renderTable(data, head_titles);

            //**Obtengo el número final de botones*/
            number_of_buttons = getfinalNumberOfButtons(number_of_buttons)
            console.log('number_of_buttons=', number_of_buttons)
            
            //**Obtengo la cantidad de botones a dibujar, que depende de las cantidad de páginas*/
            let [page_starting_at, page_ending_in] = getLimitsOfButtonsToDraw(page_number, MAX_PAGES, number_of_buttons)

            //**Renderizo los botones*/
            //si page_starting_at = page_ending_in = 0, no dibuja los botones
            renderButtons(page_starting_at, page_ending_in);
            console.log('page_starting_at=', page_starting_at, ', page_ending_in=', page_ending_in)

            //**Calculo cuantas capas de botones habrá*/
            MAX_LAYERS = getMaxLayers(number_of_buttons, MAX_PAGES)
            console.log('MAX_LAYERS=', MAX_LAYERS)

            //----Lógica de encendido y apagado de botones de navegación-----//
            //Si MAX_LAYERS = 0 no se ejecuta esta parte
            if(MAX_LAYERS === 1) {
                layer_up_el.classList.add('disabled');
                layer_down_el.classList.add('disabled');
                page_down_el.classList.add('disabled');
            } 
            else if(MAX_LAYERS > 1) {
                layer_up_el.classList.remove('disabled'); //remove
                layer_down_el.classList.add('disabled');
                page_down_el.classList.add('disabled');
            }
            if(page_number === 1 && MAX_PAGES === 1) {
                page_up_el.classList.add('disabled');
            }
            //---------------------------------------------------------------//

            navButtonListener();
            paintSelectedButton(page_number); //si page_number = 0, oculta los botones

            /**--------------Enventos de los botones--------------*/
            records_to_show_el.addEventListener("change", function(event) {
                event.preventDefault()

                page_starting_at = 0;
                page_ending_in = 0;
                layer_counter = 1;

                //Habilitar los botones de paginación
                layer_up_el.classList.remove('disabled');
                layer_down_el.classList.remove('disabled');
                page_down_el.classList.remove('disabled');
                page_up_el.classList.remove('disabled');
                
                //Cantidad de registros a mostrar que elige el operador
                const records_to_show_el = document.getElementById('records-to-show');

                if(records_quantity != 0) {
                    page_number = 1;
                    if(parseInt(records_to_show_el.value) > records_quantity) {
                        records_to_show = records_quantity;
                    }
                    else {
                        records_to_show = parseInt(records_to_show_el.value);
                    }
                }
                else {
                    page_number = 0;
                    records_to_show = parseInt(records_to_show_el.value);
                }
                
                //Cantidad de páginas que se generarán según la cant. de registros y los registros
                //a mostrar elegidos por el usuario
                if(Number.isInteger(records_quantity / records_to_show)) {
                    MAX_PAGES = records_quantity / records_to_show;
                }
                else {
                    MAX_PAGES = Math.floor(records_quantity / records_to_show) + 1;
                }

                //Calculo cuantas capas (layers) de botones habrá
                if(Number.isInteger(MAX_PAGES / number_of_buttons)) {
                    MAX_LAYERS = MAX_PAGES / number_of_buttons;
                }
                else {
                    MAX_LAYERS = Math.floor(MAX_PAGES / number_of_buttons) + 1;
                }

                if(MAX_PAGES <= number_of_buttons) {
                    page_starting_at = page_number;
                    page_ending_in = MAX_PAGES;
                }
                else {
                    page_starting_at = page_number;
                    page_ending_in = number_of_buttons;
                }

                //----Lógica de encendido y apagado de botones de navegación-----//
                if(MAX_LAYERS === 1) {
                    layer_up_el.classList.add('disabled');
                    layer_down_el.classList.add('disabled');
                    page_down_el.classList.add('disabled');
                } else if(MAX_LAYERS > 1) {
                    layer_up_el.classList.remove('disabled'); //remove
                    layer_down_el.classList.add('disabled');
                    page_down_el.classList.add('disabled');
                }
                if(page_number === 1 && MAX_PAGES === 1) {
                    page_up_el.classList.add('disabled');
                }
                //---------------------------------------------------------------//

                renderTable(data, head_titles);
                renderButtons(page_starting_at, page_ending_in);
                navButtonListener();
                paintSelectedButton(page_number)
                return false;
            })

            //botones del teclado: arrow-left '<-' y arrow-rigth '->'
            document.addEventListener('keydown', function(event) {

                if(page_number <= MAX_PAGES && page_number >= 1) {
                    console.log('arrow keys: page_number=', page_number)
                    if (event.key === 'ArrowLeft') {                    
                        slowReverse();
                    } 
                    if (event.key === 'ArrowRight') {
                        slowForward();
                    }
                }
                return false
            });

            layer_down_el.addEventListener('click', function(event) {
                event.preventDefault()

                if(layer_counter > 1) { 
                    layer_counter--;
                    renderButtons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
                }
                if(page_number > number_of_buttons) {
                    page_number = layer_counter * number_of_buttons;
                    
                }

                //---LAYER DOWN---Lógica de encendido y apagado de botones de navegación---//
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

                navButtonListener();
                paintSelectedButton(page_number);
                renderTable(data, head_titles);
                return false
            })

            page_down_el.addEventListener("click", function(event) {               
                event.preventDefault()

                slowReverse();
                return false
            })

            page_up_el.addEventListener("click", function(event) {
                event.preventDefault()

                slowForward();
                return false
            })

            layer_up_el.addEventListener('click', function(event) {
                event.preventDefault()

                if(layer_counter < MAX_LAYERS) {
                    layer_counter++;

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

                navButtonListener();
                paintSelectedButton(page_number);
                renderTable(data, head_titles);
                return false
            })

            function navButtonListener() {

                const buttons_list = document.querySelectorAll('.pagei');
                buttons_list.forEach(function(button) {

                    button.addEventListener('click', function(event) {
                        event.preventDefault()

                        page_number = parseInt(button.innerText);
                        if(MAX_LAYERS >= 2) {
                            if(layer_counter === 1) {
                                layer_up_el.classList.remove('disabled');
                                layer_down_el.classList.add('disabled');
                                if(page_number === 1) {
                                    page_down_el.classList.add('disabled');
                                }
                                else {
                                    page_down_el.classList.remove('disabled');
                                }
                            }
                            else if(layer_counter === MAX_LAYERS) {
                                layer_down_el.classList.remove('disabled');
                                layer_up_el.classList.add('disabled');
                                if(page_number === MAX_PAGES) {
                                    page_up_el.classList.add('disabled');
                                }
                                else {
                                    page_up_el.classList.remove('disabled');
                                }
                            } 
                            else {
                                layer_up_el.classList.remove('disabled');
                                layer_down_el.classList.remove('disabled');
                            }
                        }
                        else {
                            layer_down_el.classList.add('disabled');
                            layer_up_el.classList.add('disabled');
                            if(page_number === 1) {
                                page_down_el.classList.add('disabled');
                            }
                            else {
                                page_down_el.classList.remove('disabled');
                            }
                            if(page_number === MAX_PAGES) {
                                page_up_el.classList.add('disabled');
                            }
                            else {
                                page_up_el.classList.remove('disabled');
                            }
                        }

                        paintSelectedButton(page_number)
                        renderTable(data, head_titles);
                        return false
                    })
                })
            }
            /**------------Fin Enventos de los botones------------*/
            
            /**-----------------Funciones locales-----------------*/
            function renderTable(data, head_titles) {

                //Desde qué registro comenzaremos la lista a mostrar (start)
                const start = (page_number - 1) * records_to_show;
                const end = start + records_to_show;
            
                const one_page_data = data.slice(start, end);
                
                renderDataTable(one_page_data, head_titles);
                const metrics = `Página ${page_number} de ${MAX_PAGES}. Se lista(n) ${one_page_data.length} registro(s) de un total de ${records_quantity}.`
            
                document.getElementById('metrics-top').innerHTML = metrics;
                document.getElementById('metrics-bottom').innerHTML = metrics;
            
                tableFiller(one_page_data);
                return false
            }

            //Avance (--->) de 1 página en 1
            function slowForward() {

                if(page_number === layer_counter * number_of_buttons) {

                    if(layer_counter < MAX_LAYERS) {
                        layer_counter++;
                        if(layer_counter * number_of_buttons > MAX_PAGES) {
                            renderButtons(number_of_buttons * (layer_counter - 1) + 1, MAX_PAGES);
                        }
                        else {
                            renderButtons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
                        }
                    }
                }

                if(page_number < MAX_PAGES) {
                    page_number++;
                }

                //----UP----Lógica de encendido y apagado de botones de navegación---------//
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
                            console.log('up...y solo hay una capa1');
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

                navButtonListener();
                paintSelectedButton(page_number);
                renderTable(data, head_titles);
                return false
            }

            //Retroceso (<---) de 1 página en 1
            function slowReverse() {

                if(page_number === number_of_buttons * (layer_counter - 1) + 1) {
                    if(layer_counter > 1) { 
                        layer_counter--;
                        renderButtons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
                    }
                }

                if(page_number > 1) {
                    page_number--;
                }
                
                //---DOWN---Lógica de encendido y apagado de botones de navegaciónr--------//
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

                navButtonListener();
                paintSelectedButton(page_number);
                renderTable(data, head_titles);
                return false
            }
            /**---------------Fin Funciones locales---------------*/
        }
        else {
            //No hay datos, muestro el mensaje 'No data found
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