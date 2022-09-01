import { renderupdownbuttons } from "./renderUpDownButtons.js";
import { renderbuttons } from "./renderButtons.js";
import { tablecontainer } from "./tableContainer.js";
import { buildtable } from "./build_table.js";
import { listdata } from "./list_data.js"

function builddatatable(data = [], number_of_buttons = 6, custom_headers = undefined) {

    let headers = [];
    let difference = 0;
    //console.log(data.length);
    if(data.length != 0) {
        
        if(custom_headers === undefined) {
            headers = Object.keys(data[0]);
        } 
        else if(custom_headers.length === 0) {
            headers = Object.keys(data[0]);
        }
        else if(!Array.isArray(custom_headers)) {
            headers = Object.keys(data[0]);
        }
        else {
            headers = Object.keys(data[0]);
            difference = Math.abs(headers.length - custom_headers.length);

            //console.log(difference);

            if(custom_headers.length < headers.length) {
                for(let i = 0; i < difference; i++) {
                    custom_headers.push('-');
                }
            }
            if(custom_headers.length > headers.length) {
                for(let i = 0; i < difference; i++) {
                    custom_headers.pop();
                }
            }
            headers = custom_headers;
        }
    }
    //console.log('headers: ', headers);
    tablecontainer();

    let MAX_PAGES = 0;
    let MAX_LAYERS = 0;
    let count = 0;
    let from = 0;
    let to = 0;
    let layer_counter = 1;
    
    let page_number = 0;
    if(data.length != 0) {
        page_number = 1;
    }

    //Renderizo los botones up/down
    renderupdownbuttons();

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
    const count_el = document.getElementById('count');
    count = parseInt(count_el.value);
    
    //Cantidad de páginas que se generarán según la cant. de registros y los registros a mostrar
    if(Number.isInteger(records_quantity / count)) {
        MAX_PAGES = records_quantity / count;
    }
    else {
        MAX_PAGES = Math.floor(records_quantity / count) + 1;
    }
    console.log('MAX_PAGES: ', MAX_PAGES);
    //Renderizo la tabla
    rendertable(data, headers);

    //Renderizo los botones
    if(typeof(number_of_buttons) != 'number') {
        //si lo que ingresa no es un número, toma el valo por defecto
        number_of_buttons = 6;
    }
    else {
        //Si es un numero queda el valor absoluto del entero menor
        number_of_buttons = Math.abs(Math.floor(number_of_buttons));
    }

    // Si es cero queda en 1, y si es mayor de 10 queda en 10.
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
    //console.log('number of buttons: ', number_of_buttons);
    renderbuttons(from, to);
    
    console.log('Botones iniciales que se imprimirán en pantalla: ', to - from + 1);

    //Calculo cuantás capas de botones habrá
    if(Number.isInteger(MAX_PAGES / number_of_buttons)) {
        MAX_LAYERS = MAX_PAGES / number_of_buttons;
    }
    else {
        MAX_LAYERS = Math.floor(MAX_PAGES / number_of_buttons) + 1;
    }
    console.log('Init: MAX_LAYERS=', MAX_LAYERS)

    //Lógica de habilitar y deshabilitar los botones de paginación
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
    //---------------------------------------------------------------

    if(layer_counter === 1 && MAX_LAYERS === 1) {
        console.log('Init: Hay una sola capa de botones');
    }

    navbuttonlistener();
    paintselectedbutton(page_number);

    count_el.addEventListener("change", function(event) {
        event.preventDefault();

        from = 0;
        to = 0;
        layer_counter = 1;

        //Habilitar los botones de paginación
        layer_up.classList.remove('disabled');
        layer_down.classList.remove('disabled');
        page_down.classList.remove('disabled');
        page_up.classList.remove('disabled');
        
        //Cantidad de registros a mostrar que elige el operador
        const count_el = document.getElementById('count');
        if(records_quantity != 0) {
            page_number = 1;
            if(parseInt(count_el.value) > records_quantity) {
                count = records_quantity;
            }
            else {
                count = parseInt(count_el.value);
            }
        }
        else {
            page_number = 0;
            count = parseInt(count_el.value);
        }
        
        //Cantidad de páginas que se generarán según la cant. de registros y los registros a mostrar elegidos por el usuario
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

        console.log('count: MAX_LAYERS=', MAX_LAYERS)

        if(MAX_PAGES <= number_of_buttons) {
            from = page_number;
            to = MAX_PAGES;
        }
        else {
            from = page_number;
            to = number_of_buttons;
        }

        console.log('Botones iniciales que se imprimirán en pantalla: ', to - from + 1);

        //Lógica de habilitar y deshabilitar los botones de paginación
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
        //---------------------------------------------------------------

        if(layer_counter === 1 && MAX_LAYERS === 1) {
            console.log('Count: Hay una sola capa de botones');
        }

        rendertable(data, headers);
        renderbuttons(from, to);
        navbuttonlistener();
        paintselectedbutton(page_number)
    })

    document.addEventListener('keydown', function(event) {
        event.preventDefault();
        
        if (event.key === 'ArrowLeft') {
            slowreverse();
        } 
        else if (event.key === 'ArrowRight') {
            slowforward();
        }
    });

    layer_down.addEventListener('click', function(event) {
        event.preventDefault();

        if(layer_counter > 1) { 
            layer_counter--;
            renderbuttons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
        }

        if(page_number > number_of_buttons) {
            page_number = layer_counter * number_of_buttons;
            
        }
        //----LAYER DOWN---Lógica para los botones de paginación------------------//
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
        // if(page_number === 1) page_down.classList.add('disabled');
        // if(page_number === MAX_PAGES) page_up.classList.add('disabled');

        // if(layer_counter === 1) layer_down.classList.add('disabled');
        // if(layer_counter === MAX_LAYERS) layer_up.classList.add('disabled');
        //-------------------------------------------------------------------------//

        navbuttonlistener();
        paintselectedbutton(page_number);
        rendertable(data, headers);
    })

    page_down.addEventListener("click", function(event) {
        event.preventDefault();
        
        slowreverse();
    })

    page_up.addEventListener("click", function(event) {
        event.preventDefault();

        slowforward();
    })

    layer_up.addEventListener('click', function(event) {
        event.preventDefault();
      
        if(layer_counter < MAX_LAYERS) {
            layer_counter++;

            if(layer_counter * number_of_buttons > MAX_PAGES) {
                renderbuttons(number_of_buttons * (layer_counter - 1) + 1, MAX_PAGES);
            }
            else {
                renderbuttons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
            }
        }
        
        if(number_of_buttons * (layer_counter - 1) + 1 === MAX_PAGES) {
            page_number = MAX_PAGES;
        }
        else {
            page_number = number_of_buttons * (layer_counter - 1) + 1;
        }
        
        //-----LAYER UP-----Lógica para los botones de paginación------------------//
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
        
        // else if(layer_counter === MAX_LAYERS && page_number === MAX_PAGES) {
        //     console.log('estamos en la última capa y en el extremo derecho');
        //     page_up.classList.add('disabled');
        //     layer_up.classList.add('disabled');
        //     page_down.classList.remove('disabled')
        //     layer_down.classList.remove('disabled')
        // }
        // else if(layer_counter === MAX_LAYERS) {
        //     console.log('estoy en la última capa')
        //     layer_up.classList.add('disabled');
        // }
        //-------------------------------------------------------------------------//
        navbuttonlistener();
        paintselectedbutton(page_number);
        rendertable(data, headers);
    })

    function rendertable(data, headers) {

        //Desde qué registro comenzaremos la lista a mostrar (start)
        const start = (page_number - 1) * count;
        const end = start + count;

        const one_page_data = data.slice(start, end);
        info.innerHTML = `Página ${page_number} de ${MAX_PAGES}. Registros totales: ${records_quantity}`;
       
        //Construyo la tabla y muestro los datos

        //console.log(one_page_data);

        buildtable(one_page_data, headers);
        listdata(one_page_data, true);
    }
    
    function navbuttonlistener() {
        
        const buttons_list = document.querySelectorAll('.pagei');
        buttons_list.forEach(function(button) {

            button.addEventListener('click', function(event) {
                event.preventDefault();
                
                page_number = parseInt(button.innerText);
                console.log('pressed button: ', page_number);

                //Lógica de habilitación/deshabilitación de botones de navegación 
                if(page_number === 1) {
                    //extremo inferior, estamos en el layer_couenter=1
                    page_down.classList.add('disabled');
                    page_up.classList.remove('disabled');
                    layer_down.classList.add('disabled');
                } 
                else if(page_number === MAX_PAGES) {
                    //extremo superior, estamos en layer_coeunter=MAX_LAYERS
                    page_up.classList.add('disabled');
                    page_down.classList.remove('disabled');
                    layer_up.classList.add('disabled');
                } 
                else {
                    //en el medio
                    if(layer_counter === 1) {
                        layer_up.classList.remove('disabled');
                        layer_down.classList.add('disabled');
                    }
                    if(layer_counter === MAX_LAYERS) {
                        layer_down.classList.remove('disabled');
                        layer_up.classList.add('disabled');
                    }
                    page_down.classList.remove('disabled');
                    page_up.classList.remove('disabled');
                    
                }
                //---------------------------------------------------------------

                paintselectedbutton(page_number)
                rendertable(data, headers);
            })
        })
    }

    function paintselectedbutton(page_number) {

        if(page_number != 0) {

            document.getElementById('nav-buttons').hidden = false;

            const selected_button = document.querySelector('.selected');
            const button = document.getElementById(page_number);

            if(selected_button) {
                selected_button.style.color = 'black';
                selected_button.classList.remove('selected');
            }
            
            button.classList.add('selected');
            button.style.color = 'black';
        }
        else {
            document.getElementById('nav-buttons').hidden = true;
        }
    }

    //Avance (--->) de 1 pagina en 1
    function slowforward() {

        if(page_number === layer_counter * number_of_buttons) {

            if(layer_counter < MAX_LAYERS) {
                layer_counter++;
                if(layer_counter * number_of_buttons > MAX_PAGES) {
                    renderbuttons(number_of_buttons * (layer_counter - 1) + 1, MAX_PAGES);
                }
                else {
                    renderbuttons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
                }
            }
        }

        if(page_number < MAX_PAGES) {
            page_number++;
        }

        //----UP----Lógica para los medios de page_number y layer_counter---------//
        if(page_number > 1 && page_number < MAX_PAGES) {
            //console.log('up: estamos en el medio');
            page_down.classList.remove('disabled'); //remove
            page_up.classList.remove('disabled'); //remove
            if(layer_counter > 1 && layer_counter < MAX_LAYERS) {
                layer_up.classList.remove('disabled') //remove
                layer_down.classList.remove('disabled') //remove
            }
            if(layer_counter === MAX_LAYERS) {
                console.log('up...estamos en la ULTIMA CAPA');
                layer_up.classList.add('disabled');
                if(MAX_LAYERS < 2) {
                    console.log('up...y solo hay una capa1');
                    layer_down.classList.add('disabled');
                }
                else {
                    console.log('up...hay más de una capa1_');
                    layer_down.classList.remove('disabled'); //remove
                }
            }
            else {
                console.log('up...aún no estamos en la ultima capa');
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
                layer_down.classList.add('disabled');
            }
        }
        //-------------------------------------------------------------------------//

        navbuttonlistener();
        paintselectedbutton(page_number);
        rendertable(data, headers);
    }

    //Retroceso (<---) de 1 página en 1
    function slowreverse() {

        if(page_number === number_of_buttons * (layer_counter - 1) + 1) {
            if(layer_counter > 1) { 
                layer_counter--;
                renderbuttons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
            }
        }

        if(page_number > 1) {
            page_number--;
        }
        
        //---DOWN---Lógica para los medios de page_number y layer_counter----------//
        if(page_number > 1 && page_number < MAX_PAGES) {
            console.log('down: en el medio');
            page_down.classList.remove('disabled'); //remove
            page_up.classList.remove('disabled'); //remove
            if(layer_counter > 1 && layer_counter < MAX_LAYERS) {
                layer_up.classList.remove('disabled'); //remove
                layer_down.classList.remove('disabled'); //remove
            } 
            if(layer_counter === 1) {
                console.log('down...estamos en la PRIMERA CAPA')
                layer_down.classList.add('disabled');
                if(MAX_LAYERS < 2) {
                    console.log('down...y solo hay una capa1');
                    layer_up.classList.add('disabled');
                }
                else {
                    console.log('down...hay más de una capa1');
                    layer_up.classList.remove('disabled'); //remove
                }
            }
            else {
                console.log('down...aún no estamos en la primera capa');
                layer_down.classList.remove('disabled');
            }
        } 
        else if(page_number === 1 ) {
            console.log('down...estamos en la PRIMERA CAPA y en el extremo izquierdo');
            page_down.classList.add('disabled');
            if(MAX_LAYERS < 2) {
                console.log('down...y solo hay una capa2');
                page_up.classList.remove('disabled'); //remove
            }
            else {
                console.log('up...hay más de una capa2');
                layer_up.classList.add('disabled');
            }
        }
        //-------------------------------------------------------------------------//

        navbuttonlistener();
        paintselectedbutton(page_number);
        rendertable(data, headers);
    }
}

export { builddatatable }