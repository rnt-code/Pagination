import { getOnePageData } from "../utility/getOnePageData.js";
import { cleanUpDataTableContent } from "../utility/cleanUpDataTableContent.js";
import { renderTableBody } from "./renderTableBody.js";
import { renderMetrics } from "./renderMetrics.js";
import { tableFiller } from "../utility/tableFiller.js";

function renderList(data, head_titles, page_parameters, records_quantity) {

    let { page_number, MAX_PAGES } = page_parameters

    const records_to_show_el = document.getElementById('records-to-show');
    let records_to_show = Number(records_to_show_el.value)

    const one_page_data = getOnePageData(data, page_number, records_to_show) 
    cleanUpDataTableContent();
    renderTableBody(one_page_data.length, head_titles.length)
    renderMetrics(page_number, MAX_PAGES, one_page_data.length, records_quantity);
    tableFiller(one_page_data, head_titles);
}

export { renderList }