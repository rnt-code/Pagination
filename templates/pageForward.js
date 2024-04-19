import { paintSelectedButton } from "../src/scripts/paintSelectedButton.js";
import { renderButtons } from "./renderButtons.js";

//Avance (>) de 1 página en 1
function pageForward(page_parameters) {

    let starting_at
    let ending_in
    let { page_number, layer_counter, layer_has_changed, MAX_LAYERS, number_of_buttons, MAX_PAGES } = page_parameters
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
    return {     
        'page_number': page_number,
        'layer_counter': layer_counter, 
        'layer_has_changed': layer_has_changed,
        'MAX_LAYERS':MAX_LAYERS, 
        'number_of_buttons': number_of_buttons, 
        'MAX_PAGES':MAX_PAGES
    }
}

export { pageForward }