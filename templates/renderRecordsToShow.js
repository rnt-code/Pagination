function renderRecordsToShow() {

    //container para el selector
    const text1_el = document.getElementById('text1') //<pre>
    const text2_el = document.getElementById('text2') //<pre>
    const records_to_show_el = document.getElementById('records-to-show') //<select>
    records_to_show_el.removeAttribute('hidden')

    text1_el.innerHTML = `Mostrando `
    records_to_show_el.innerHTML = `
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
    text2_el.innerHTML = ` registros`;

    return false
}

export { renderRecordsToShow }