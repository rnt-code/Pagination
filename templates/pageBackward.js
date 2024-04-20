import { paintSelectedButton } from "../templates/paintSelectedButton.js";
import { renderButtons } from "./renderButtons.js";

//Retroceso (<) de 1 página en 1
function pageBackward(page_parameters) {

    let starting_at
    let ending_in
    let { page_number, layer_counter, layer_has_changed, MAX_LAYERS, number_of_buttons, MAX_PAGES } = page_parameters
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
    return {     
        'page_number': page_number,
        'layer_counter': layer_counter, 
        'layer_has_changed': layer_has_changed,
        'MAX_LAYERS':MAX_LAYERS, 
        'number_of_buttons': number_of_buttons, 
        'MAX_PAGES':MAX_PAGES
    }
}

export { pageBackward }