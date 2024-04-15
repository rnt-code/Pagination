function renderRecordsToShow() {

    //<label id='hc-records-selector'></label>
    const hc_records_selector_el = document.getElementById('hc-records-selector');

    const pre1 = document.createElement('pre')
    hc_records_selector_el.append(pre1)
    pre1.append(`Mostrando `);
    
    const select = document.createElement('select');
    select.id = 'records-to-show';
    select.innerHTML = `
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15" selected>15</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="300">300</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
    `
    hc_records_selector_el.append(select);

    const pre2 = document.createElement('pre')
    hc_records_selector_el.append(pre2);
    pre2.append(` registros`);

    return false
}

export { renderRecordsToShow }