import { renderRecordsToShow } from "./renderRecordsToShow.js";
import { renderUpDownButtons } from "./renderUpDownButtons.js";
import { getMaxPages } from "../utility/getMaxPages.js";
import { getOnePageData } from "../utility/getOnePageData.js";
import { renderDataTable } from "./renderDataTable.js";
import { renderMetrics } from "./renderMetrics.js";
import { tableFiller } from "../utility/tableFiller.js";
import { NumberOfButtonsParser } from "../utility/NumberOfButtonsParser.js";
import { getMaxLayers } from "../utility/getMaxLayers.js";
import { getLimitsOfButtonsToDraw } from "../utility/getLimitsOfButtonsToDraw.js";
import { renderButtons } from "./renderButtons.js";
import { paintSelectedButton } from "../src/scripts/paintSelectedButton.js";

function renderInitialList(data, head_titles, init_number_of_buttons) {

    let page_number = 1;
    let records_quantity = data.length;

    //**Renderizo el selector de registros a mostrar*/
    renderRecordsToShow();
    const records_to_show_el = document.getElementById('records-to-show');

    //**Cantidad de registros a mostrar al iniciar la página*/
    let records_to_show = parseInt(records_to_show_el.value);
    
    //**Renderizo los botones up/down '<<'  '<'  '>'  '>>'
    renderUpDownButtons();

    //**Cantidad de páginas que se generarán según la cant. de registros y los registros a mostrar*/
    let MAX_PAGES = getMaxPages(records_quantity, records_to_show)

    //**Obtengo los datos de la página a mostrar*/
    let one_page_data = getOnePageData(data, page_number, records_to_show)

    //**Dibujo la tabla (vacia) en función de one_page_data.length y head_titles.length*/
    renderDataTable(one_page_data.length, head_titles.length);

    //**Agrego las métricas a la tabla*/
    renderMetrics(page_number, MAX_PAGES, one_page_data.length, records_quantity)
    
    //**Lleno la tabla con los datos de una página y con los títulos*/
    tableFiller(one_page_data, head_titles);

    //**Obtengo el número final de botones*/
    let numbButtonsParsed = NumberOfButtonsParser(init_number_of_buttons)
    
    //**Calculo cuantas capas de botones habrá*/
    let MAX_LAYERS = getMaxLayers(numbButtonsParsed, MAX_PAGES)
    
    //**Obtengo los límites de los botones a dibujar, que depende de las cantidad de páginas*/
    let paging_buttons = getLimitsOfButtonsToDraw(page_number, MAX_PAGES, numbButtonsParsed);
    let { starting_at, ending_in, number_of_buttons } = paging_buttons

    //console.log('Initial paging buttons:', paging_buttons)

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
    let layer_counter = 1;
    return {
        'page_number': page_number,
        'layer_counter': layer_counter,
        'layer_has_changed':false,
        'MAX_LAYERS':MAX_LAYERS, 
        'number_of_buttons': number_of_buttons, 
        'MAX_PAGES':MAX_PAGES
    }
}

export { renderInitialList }