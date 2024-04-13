import { getTableHeadTitles } from './helpers/getTableHeadTitles.js'
import { buildContainers } from "./build/buildContainers.js";
import { renderUpDownButtons } from "./templates/renderUpDownButtons.js";
import { renderButtons } from "./templates/renderButtons.js";
import { paintSelectedButton } from './src/scripts/paintSelectedButton.js'
import { renderDataTable } from "./templates/renderDataTable.js";
import { listData } from "./modules/listData.js"
import { renderNoDataFound } from './templates/renderNoDataFound.js';
import { renderRecordsToShow } from './templates/renderRecordsToShow.js';

function buildDataTable(data = [], number_of_buttons = 6, custom_head_titles = undefined) {

    const place_for_list = document.getElementById('place-for-list');
    const exist = !!place_for_list;
    if(exist) {
        let headers = getTableHeadTitles(custom_head_titles, data);

        //Armo el 'esqueleto' de toda la estructura que contendrá la app
        buildContainers(); 
        
        //Si hay datos construyo la app, si no, muestro el mesaje de 'No data found'
        if(data.length != 0) {
            //Hay datos

            let MAX_PAGES = 0;
            let MAX_LAYERS = 0;
            let count = 0;
            let from = 0;
            let to = 0;
            let layer_counter = 1;
            let page_number = 1;

            //Renderizo el selector de registros a mostrar
            renderRecordsToShow()

            //Renderizo los botones up/down
            renderUpDownButtons();

            //Referencias a los botones up/down
            const page_down = document.querySelector('.page-down');
            const page_up = document.querySelector('.page-up');
            const layer_down = document.querySelector('.layer-down');
            const layer_up = document.querySelector('.layer-up');

            //Habilitar los botones de paginación
            layer_up.classList.remove('disabled');
            layer_down.classList.remove('disabled');
            page_down.classList.remove('disabled');
            page_up.classList.remove('disabled');

            //Cantidad de registros en la tabla
            let records_quantity = data.length;

            //Cantidad de registros a mostrar al iniciar la página
            const records_to_show = document.getElementById('records-to-show');
            count = parseInt(records_to_show.value);
            
            //Cantidad de páginas que se generarán según la cant. de registros y los registros a mostrar
            if(Number.isInteger(records_quantity / count)) {
                MAX_PAGES = records_quantity / count;
            }
            else {
                MAX_PAGES = Math.floor(records_quantity / count) + 1;
            }

            //**----------------------------------------------------------------------------- */
            //Renderizo la tabla
            renderTable(data, headers);

            //Renderizo los botones
            if(typeof(number_of_buttons) != 'number') {
                //si lo que ingresa no es un número, toma el valor por defecto
                number_of_buttons = 6;
            }
            else {
                //Si es un numero queda el valor absoluto del entero menor
                number_of_buttons = Math.abs(Math.floor(number_of_buttons));
            }

            //Si es cero queda en 1, y si es mayor de 10 queda en 10.
            if(number_of_buttons === 0) {
                number_of_buttons = 1;
            } else if(number_of_buttons > 10){
                number_of_buttons = 10;
            }

            //Determino la cantidad de botones a dibujar, que depende de las cantidad de páginas
            if(number_of_buttons >= MAX_PAGES) {
                from = page_number; //page_number =  1
                to = MAX_PAGES;
            }
            else {
                from = page_number;
                to = number_of_buttons;
            }

            //si from = to = 0, no dibuja los botones
            renderButtons(from, to);
            
            //Calculo cuantas capas de botones habrá
            if(Number.isInteger(MAX_PAGES / number_of_buttons)) {
                MAX_LAYERS = MAX_PAGES / number_of_buttons;
            }
            else {
                MAX_LAYERS = Math.floor(MAX_PAGES / number_of_buttons) + 1;
            }

            //----Lógica de encendido y apagado de botones de navegación-----//
            //Si MAX_LAYERS = 0 no se ejecuta esta parte
            if(MAX_LAYERS === 1) {
                layer_up.classList.add('disabled');
                layer_down.classList.add('disabled');
                page_down.classList.add('disabled');
            } 
            else if(MAX_LAYERS > 1) {
                layer_up.classList.remove('disabled'); //remove
                layer_down.classList.add('disabled');
                page_down.classList.add('disabled');
            }
            if(page_number === 1 && MAX_PAGES === 1) {
                page_up.classList.add('disabled');
            }
            //---------------------------------------------------------------//

            navButtonListener();
            paintSelectedButton(page_number); //si page_number = 0, oculta los botones

            /**--------------Enventos de los botones--------------*/
            records_to_show.addEventListener("change", function(event) {
                //event.preventDefault();

                from = 0;
                to = 0;
                layer_counter = 1;

                //Habilitar los botones de paginación
                layer_up.classList.remove('disabled');
                layer_down.classList.remove('disabled');
                page_down.classList.remove('disabled');
                page_up.classList.remove('disabled');
                
                //Cantidad de registros a mostrar que elige el operador
                const records_to_show = document.getElementById('records-to-show');
                if(records_quantity != 0) {
                    page_number = 1;
                    if(parseInt(records_to_show.value) > records_quantity) {
                        count = records_quantity;
                    }
                    else {
                        count = parseInt(records_to_show.value);
                    }
                }
                else {
                    page_number = 0;
                    count = parseInt(records_to_show.value);
                }
                
                //Cantidad de páginas que se generarán según la cant. de registros y los registros
                //a mostrar elegidos por el usuario
                if(Number.isInteger(records_quantity / count)) {
                    MAX_PAGES = records_quantity / count;
                }
                else {
                    MAX_PAGES = Math.floor(records_quantity / count) + 1;
                }

                //Calculo cuantas capas (layers) de botones habrá
                if(Number.isInteger(MAX_PAGES / number_of_buttons)) {
                    MAX_LAYERS = MAX_PAGES / number_of_buttons;
                }
                else {
                    MAX_LAYERS = Math.floor(MAX_PAGES / number_of_buttons) + 1;
                }

                if(MAX_PAGES <= number_of_buttons) {
                    from = page_number;
                    to = MAX_PAGES;
                }
                else {
                    from = page_number;
                    to = number_of_buttons;
                }

                //----Lógica de encendido y apagado de botones de navegación-----//
                if(MAX_LAYERS === 1) {
                    layer_up.classList.add('disabled');
                    layer_down.classList.add('disabled');
                    page_down.classList.add('disabled');
                } else if(MAX_LAYERS > 1) {
                    layer_up.classList.remove('disabled'); //remove
                    layer_down.classList.add('disabled');
                    page_down.classList.add('disabled');
                }
                if(page_number === 1 && MAX_PAGES === 1) {
                    page_up.classList.add('disabled');
                }
                //---------------------------------------------------------------//

                renderTable(data, headers);
                renderButtons(from, to);
                navButtonListener();
                paintSelectedButton(page_number)
            })

            document.addEventListener('keydown', function(event) {
                //event.preventDefault();
                
                if (event.key === 'ArrowLeft') {
                    slowReverse();
                } 
                else if (event.key === 'ArrowRight') {
                    slowForward();
                }
            });

            layer_down.addEventListener('click', function(event) {
                //event.preventDefault();

                if(layer_counter > 1) { 
                    layer_counter--;
                    renderButtons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
                }
                if(page_number > number_of_buttons) {
                    page_number = layer_counter * number_of_buttons;
                    
                }

                //---LAYER DOWN---Lógica de encendido y apagado de botones de navegación---//
                if(layer_counter > 1 && layer_counter < MAX_LAYERS) {
                    
                    layer_up.classList.remove('disabled')
                    layer_down.classList.remove('disabled')
                    if(page_number > 1 && page_number < MAX_PAGES) {
                        page_down.classList.remove('disabled');
                        page_up.classList.remove('disabled');
                    }
                } 
                if(layer_counter === 1) {
                    //console.log('downLayer...estamos en la primera capa');
                    layer_down.classList.add('disabled');
                    if(MAX_LAYERS >= 2) {
                        //console.log('downLayer...y hay más de una capa');
                        layer_up.classList.remove('disabled');
                        if(page_number === 1) {
                            //console.log('upLayer...y ahora en el extremo izquierdo1');
                            layer_up.classList.remove('disabled');
                        }
                        else {
                            //console.log('upLayer...y no llegamos aún al extremo izquierdo1');
                            page_up.classList.remove('disabled');
                        }
                    }
                    if(page_number === 1) {
                        //console.log('upLayer...y ahora en el extremo izquierdo2');
                        page_down.classList.add('disabled');
                        page_up.classList.remove('disabled');
                    }
                }
                //-------------------------------------------------------------------------//

                navButtonListener();
                paintSelectedButton(page_number);
                renderTable(data, headers);
            })

            page_down.addEventListener("click", function(event) {
                //event.preventDefault();
                
                slowReverse();
            })

            page_up.addEventListener("click", function(event) {
                //event.preventDefault();

                slowForward();
            })

            layer_up.addEventListener('click', function(event) {
                //event.preventDefault();
            
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
                    layer_up.classList.remove('disabled')
                    layer_down.classList.remove('disabled')
                    
                    if(page_number > 1 && page_number < MAX_PAGES) {
                        page_down.classList.remove('disabled');
                        page_up.classList.remove('disabled');
                    }
                }
                if(layer_counter === MAX_LAYERS) {
                    //console.log('upLayer...estamos en la última capa');
                    layer_up.classList.add('disabled');
                    if(MAX_LAYERS >= 2) {
                        //console.log('upLayer...y hay más de una capa');
                        layer_down.classList.remove('disabled');
                        if(page_number === MAX_PAGES) {
                            //console.log('upLayer...y ahora en el extremo derecho1');
                            layer_down.classList.remove('disabled');
                        }
                        else {
                            //console.log('upLayer...y no llegamos aún al extremo derecho1');
                            page_down.classList.remove('disabled');
                        }
                    }
                    
                    if(page_number === MAX_PAGES) {
                        //console.log('upLayer...y ahora en el extremo derecho2');
                        page_up.classList.add('disabled');
                        page_down.classList.remove('disabled');
                    }
                }
                //-------------------------------------------------------------------------//

                navButtonListener();
                paintSelectedButton(page_number);
                renderTable(data, headers);
            })

            function navButtonListener() {
            
                const buttons_list = document.querySelectorAll('.pagei');
                buttons_list.forEach(function(button) {

                    button.addEventListener('click', function(event) {
                        //event.preventDefault();
                        
                        page_number = parseInt(button.innerText);
                        if(MAX_LAYERS >= 2) {
                            if(layer_counter === 1) {
                                layer_up.classList.remove('disabled');
                                layer_down.classList.add('disabled');
                                if(page_number === 1) {
                                    page_down.classList.add('disabled');
                                }
                                else {
                                    page_down.classList.remove('disabled');
                                }
                            }
                            else if(layer_counter === MAX_LAYERS) {
                                layer_down.classList.remove('disabled');
                                layer_up.classList.add('disabled');
                                if(page_number === MAX_PAGES) {
                                    page_up.classList.add('disabled');
                                }
                                else {
                                    page_up.classList.remove('disabled');
                                }
                            } 
                            else {
                                layer_up.classList.remove('disabled');
                                layer_down.classList.remove('disabled');
                            }
                        }
                        else {
                            layer_down.classList.add('disabled');
                            layer_up.classList.add('disabled');
                            if(page_number === 1) {
                                page_down.classList.add('disabled');
                            }
                            else {
                                page_down.classList.remove('disabled');
                            }
                            if(page_number === MAX_PAGES) {
                                page_up.classList.add('disabled');
                            }
                            else {
                                page_up.classList.remove('disabled');
                            }
                        }

                        paintSelectedButton(page_number)
                        renderTable(data, headers);
                    })
                })
            }
            /**------------Fin Enventos de los botones------------*/
            
            /**-----------------Funciones locales-----------------*/
            function renderTable(data, headers) {

                //Desde qué registro comenzaremos la lista a mostrar (start)
                const start = (page_number - 1) * count;
                const end = start + count;
            
                const one_page_data = data.slice(start, end);
                
                renderDataTable(one_page_data, headers);
                const metrics = `Página ${page_number} de ${MAX_PAGES}. Se lista(n) ${one_page_data.length} registro(s) de un total de ${records_quantity}.`
            
                document.getElementById('metrics-top').innerHTML = metrics;
                document.getElementById('metrics-bottom').innerHTML = metrics;
            
                listData(one_page_data);
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
                    page_down.classList.remove('disabled'); //remove
                    page_up.classList.remove('disabled'); //remove
                    if(layer_counter > 1 && layer_counter < MAX_LAYERS) {
                        layer_up.classList.remove('disabled') //remove
                        layer_down.classList.remove('disabled') //remove
                    }
                    if(layer_counter === MAX_LAYERS) {
                        //console.log('up...estamos en la ULTIMA CAPA');
                        layer_up.classList.add('disabled');
                        if(MAX_LAYERS < 2) {
                            console.log('up...y solo hay una capa1');
                            layer_down.classList.add('disabled');
                        }
                        else {
                            //console.log('up...hay más de una capa1_');
                            layer_down.classList.remove('disabled'); //remove
                        }
                    }
                    else {
                        //console.log('up...aún no estamos en la ultima capa');
                        layer_up.classList.remove('disabled');
                    }
                }
                else if(page_number === MAX_PAGES) {
                    //console.log('up...estamos en la ULTIMA CAPA y en el extremo derecho');
                    page_up.classList.add('disabled');
                    if(MAX_LAYERS < 2) {
                        //console.log('up...y solo hay una capa2');
                        page_down.classList.remove('disabled'); //remove
                    }
                    else {
                        //console.log('up...hay más de una capa2');
                        layer_down.classList.remove('disabled');
                        layer_up.classList.add('disabled');
                    }
                }
                //-------------------------------------------------------------------------//

                navButtonListener();
                paintSelectedButton(page_number);
                renderTable(data, headers);
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
                    page_down.classList.remove('disabled'); //remove
                    page_up.classList.remove('disabled'); //remove
                    if(layer_counter > 1 && layer_counter < MAX_LAYERS) {
                        layer_up.classList.remove('disabled'); //remove
                        layer_down.classList.remove('disabled'); //remove
                    } 
                    if(layer_counter === 1) {
                        //console.log('down...estamos en la PRIMERA CAPA')
                        layer_down.classList.add('disabled');
                        if(MAX_LAYERS < 2) {
                            //console.log('down...y solo hay una capa1');
                            layer_up.classList.add('disabled');
                        }
                        else {
                            //console.log('down...hay más de una capa1');
                            layer_up.classList.remove('disabled'); //remove
                        }
                    }
                    else {
                        //console.log('down...aún no estamos en la primera capa');
                        layer_down.classList.remove('disabled');
                    }
                } 
                else if(page_number === 1 ) {
                    //console.log('down...estamos en la PRIMERA CAPA y en el extremo izquierdo');
                    page_down.classList.add('disabled');
                    if(MAX_LAYERS < 2) {
                        //console.log('down...y solo hay una capa2');
                        page_up.classList.remove('disabled'); //remove
                    }
                    else {
                        //console.log('down...hay más de una capa2');
                        layer_up.classList.remove('disabled');
                        layer_down.classList.add('disabled');
                    }
                }
                //-------------------------------------------------------------------------//

                navButtonListener();
                paintSelectedButton(page_number);
                renderTable(data, headers);
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
}

export { buildDataTable }