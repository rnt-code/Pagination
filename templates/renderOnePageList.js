import { cleanUpContainersForRegisters } from "../utility/cleanUpContainersForRegisters.js";
import { renderUpDownButtons } from "./renderUpDownButtons.js";
import { getMaxPages } from "../utility/getMaxPages.js";
import { getOnePageData } from "../utility/getOnePageData.js";
import { buildTableBodyAndMetricsContainers } from "../build/buildTableBodyAndMetricsContainers.js";
import { renderTableBody } from "./renderTableBody.js";
import { renderMetrics } from "./renderMetrics.js";
import { tableFiller } from "../utility/tableFiller.js";
import { getMaxLayers } from "../utility/getMaxLayers.js";
import { getLimitsOfButtonsToDraw } from "../utility/getLimitsOfButtonsToDraw.js";
import { renderButtons } from "./renderButtons.js";
import { paintSelectedButton } from "../src/scripts/paintSelectedButton.js";

function renderOnePageList(data, head_titles, init_number_of_buttons, page_number) {
    
    if(page_number) page_number = 1

    let records_quantity = data.length
    cleanUpContainersForRegisters();
    renderUpDownButtons();

    const records_to_show_el = document.getElementById('records-to-show');
    let records_to_show = parseInt(records_to_show_el.value);

    let MAX_PAGES = getMaxPages(records_quantity, records_to_show)
    let one_page_data = getOnePageData(data, page_number, records_to_show)
    buildTableBodyAndMetricsContainers();
    renderTableBody(one_page_data.length, head_titles.length);
    renderMetrics(page_number, MAX_PAGES, one_page_data.length, records_quantity);
    tableFiller(one_page_data, head_titles);

    let MAX_LAYERS = getMaxLayers(init_number_of_buttons, MAX_PAGES);
    let paging_buttons = getLimitsOfButtonsToDraw(page_number, MAX_PAGES, init_number_of_buttons);
    let { starting_at, ending_in, number_of_buttons } = paging_buttons;

    renderButtons(starting_at, ending_in);
    paintSelectedButton(page_number); //si page_number = 0, oculta los botones

    //**Lógica de encendido y apagado de botones de navegación*/
    const page_down_el = document.querySelector('.page-down'); // '<'
    const page_up_el = document.querySelector('.page-up'); // '>'
    const layer_down_el = document.querySelector('.layer-down'); // '<<'
    const layer_up_el = document.querySelector('.layer-up'); // '>>'

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
    let layer_counter = 1
    return {
        'page_number': page_number,
        'layer_counter': layer_counter, 
        'layer_has_changed':false,
        'MAX_LAYERS':MAX_LAYERS, 
        'number_of_buttons': number_of_buttons, 
        'MAX_PAGES':MAX_PAGES
    }
}

export { renderOnePageList }