function renderMetrics(page_number, MAX_PAGES, one_page_data_length, records_quantity) {

    const metrics = `Página ${page_number} de ${MAX_PAGES}. Se lista(n) ${one_page_data_length} registro(s) de un total de ${records_quantity}.`
    document.getElementById('metrics-top').innerHTML = metrics;
    document.getElementById('metrics-bottom').innerHTML = metrics;
}

export { renderMetrics }