import { renderupdownbuttons } from "./renderUpDownButtons.js";
import { renderbuttons } from "./renderButtons.js";
import { tablecontainer } from "./tableContainer.js";
import { buildtable } from "./build_table.js";
import { listdata } from "./list_data.js"

function builddatatable(data = [], number_of_buttons = 6) {

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

    //Cantidad de registros en la tabla
    let records_quantity = data.length; //candidato a se un const

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

    //Renderizo la tabla
    rendertable(data);

    //Renderizo los botones
    if(typeof(number_of_buttons) != 'number') {
        number_of_buttons = 6;
    }
    else {
        number_of_buttons = Math.abs(Math.floor(number_of_buttons));
    }

    if(number_of_buttons === 0) {
        number_of_buttons = 1;
    } else if(number_of_buttons > 10){
        number_of_buttons = 10;
    }

    if(number_of_buttons >= MAX_PAGES) {
        from = page_number;
        to = MAX_PAGES;
    }
    else {
        from = page_number;
        to = number_of_buttons;
    }

    renderbuttons(from, to);

    if(Number.isInteger(MAX_PAGES / number_of_buttons)) {
        MAX_LAYERS = MAX_PAGES / number_of_buttons;
    }
    else {
        MAX_LAYERS = Math.floor(MAX_PAGES / number_of_buttons) + 1;
    }

    navbuttonlistener();
    paintselectedbutton(page_number);

    count_el.addEventListener("change", function(event) {
        event.preventDefault();

        //page_number = 0;
        from = 0;
        to = 0;
        layer_counter = 1;
        
        //Cantidad de registros a mostrar que elige el operador
        const count_el = document.getElementById('count');
        if(records_quantity != 0) {
            if(parseInt(count_el.value) > records_quantity) {
                count = records_quantity;
            }
            else {
                count = parseInt(count_el.value);
            }
        }
        else {
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

        if(MAX_PAGES <= number_of_buttons) {
            from = page_number;
            to = MAX_PAGES;
        }
        else {
            from = page_number;
            to = number_of_buttons;
        }

        rendertable(data);
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

        if(layer_counter >= 1) { 
            if(layer_counter != 1) {
                layer_counter--;
                renderbuttons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
            }
        }

        if(page_number > number_of_buttons) {
            page_number = layer_counter * number_of_buttons;
        }
        
        navbuttonlistener();
        paintselectedbutton(page_number);
        rendertable(data);
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

        if(layer_counter <= MAX_LAYERS) {
            if(layer_counter != MAX_LAYERS) {
                layer_counter++;
                if(layer_counter * number_of_buttons > MAX_PAGES) {
                    renderbuttons(number_of_buttons * (layer_counter - 1) + 1, MAX_PAGES);
                }
                else {
                    renderbuttons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
                }
            }
        }
        
        if((page_number + number_of_buttons) <= MAX_PAGES) {
            page_number = number_of_buttons * (layer_counter - 1) + 1;
        }
        else {
            page_number = MAX_PAGES;
        }

        navbuttonlistener();
        paintselectedbutton(page_number);
        rendertable(data);
    })

    function rendertable(data) {

        //Desde qué registro comenzaremos la lista a mostrar (start)
        const start = (page_number - 1) * count;
        const end = start + count;

        const one_page_data = data.slice(start, end);
        info.innerHTML = `Página ${page_number} de ${MAX_PAGES}. Registros totales: ${records_quantity}`;
       
        //Construyo la tabla y muestro los datos

        //console.log(one_page_data);

        buildtable(one_page_data);
        listdata(one_page_data, true);
    }
    
    function navbuttonlistener() {
        
        const buttons_list = document.querySelectorAll('.pagei');
        buttons_list.forEach(function(button) {

            button.addEventListener('click', function(event) {
                event.preventDefault();
                
                page_number = parseInt(button.innerText);
                paintselectedbutton(page_number)
                rendertable(data);
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

    function slowforward() {

        if(page_number === layer_counter * number_of_buttons) {

            if(layer_counter < MAX_LAYERS) {
                layer_counter++;
            }

            if(layer_counter * number_of_buttons > MAX_PAGES) {
                
                renderbuttons(number_of_buttons * (layer_counter - 1) + 1, MAX_PAGES);
            }
            else {
                renderbuttons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
            }
        }

        if(page_number < MAX_PAGES) {
            page_number++;
        }

        navbuttonlistener();
        paintselectedbutton(page_number);
        rendertable(data);
    }

    function slowreverse() {

        if(page_number === number_of_buttons * (layer_counter - 1) + 1) {
            if(layer_counter >= 1) { 
                if(layer_counter != 1) {
                    layer_counter--;
                    renderbuttons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
                }
            }
        }

        if(page_number > 1) {
            page_number--;
        }

        navbuttonlistener();
        paintselectedbutton(page_number);
        rendertable(data);
    }
}

export { builddatatable }