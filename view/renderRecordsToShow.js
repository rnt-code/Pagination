function renderRecordsToShow() {

    const hc_records_selector = document.getElementById('hc-records-selector');
    hc_records_selector.innerHTML = `
        <label>Mostrando 
            <select id="records-to-show">
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
            </select> registros
        </label>
    `
}

export { renderRecordsToShow }