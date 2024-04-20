import { paintSelectedButton } from "../src/scripts/paintSelectedButton.js";

function buttonLogic(page_parameters) {
              
    let { page_number, layer_counter, layer_has_changed, MAX_LAYERS, number_of_buttons, MAX_PAGES } = page_parameters

    const page_down_el = document.querySelector('.page-down'); // '<'
    const page_up_el = document.querySelector('.page-up'); // '>'
    const layer_down_el = document.querySelector('.layer-down'); // '<<'
    const layer_up_el = document.querySelector('.layer-up'); // '>>'

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
    paintSelectedButton(page_number);
}

export { buttonLogic }