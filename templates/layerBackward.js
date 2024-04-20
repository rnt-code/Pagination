import { paintSelectedButton } from "../templates/paintSelectedButton.js";
import { renderButtons } from "./renderButtons.js";

//Retroceso (<<) de 1 capa en 1
function layerBackward(page_parameters) {

    let { page_number, layer_counter, layer_has_changed, MAX_LAYERS, number_of_buttons, MAX_PAGES } = page_parameters
    
    if(layer_counter > 1) { 
        layer_counter--;
        layer_has_changed = true;
        renderButtons(number_of_buttons * (layer_counter - 1) + 1, layer_counter * number_of_buttons);
    }
    if(page_number > number_of_buttons) {
        page_number = layer_counter * number_of_buttons;
        
    }

    //---LAYER DOWN---Lógica de encendido y apagado de botones de navegación---//
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
    return {     
        'page_number': page_number,
        'layer_counter': layer_counter, 
        'layer_has_changed': layer_has_changed,
        'MAX_LAYERS':MAX_LAYERS, 
        'number_of_buttons': number_of_buttons, 
        'MAX_PAGES':MAX_PAGES
    }
}

export { layerBackward }