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

function renderOnePageList(data, head_titles, number_of_buttons) {
    
    let page_number = 1;
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

    let MAX_LAYERS = getMaxLayers(number_of_buttons, MAX_PAGES)
    let [starting_at, ending_in] = getLimitsOfButtonsToDraw(page_number, MAX_PAGES, number_of_buttons)
    let final_number_of_buttons = ending_in - starting_at + 1
    // console.log(
    //     'number_of_butons_final', ending_in-starting_at+1,
    //      'starting_at', starting_at, 
    //      'ending_in', ending_in,
    //      'number_of_buttons', number_of_buttons
    // )
    renderButtons(starting_at, ending_in);
    paintSelectedButton(page_number); //si page_number = 0, oculta los botones

    //**Lógica de encendido y apagado de botones de navegación para la página inicial*/
    //Son los botones de avance/retroceso de páginas y de capas
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
    return [layer_counter, MAX_LAYERS, final_number_of_buttons, MAX_PAGES]
}

export { renderOnePageList }