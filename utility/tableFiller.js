function tableFiller(one_page_data, head_titles) {

    if(one_page_data.length != 0) {

        const one_page_data_length = one_page_data.length;
        const raw_head_titles = Object.keys(one_page_data[0]);

        //**Set head titles on table header */
        const tr_headers_el = document.getElementById('tr-headers')
        const thh_el = tr_headers_el.querySelectorAll('th');
        for(let k = 0; k < head_titles.length; k++) {
            thh_el[k].innerHTML = head_titles[k];
        }

         //**Set head titles on table footer */
        const tr_foot_el = document.getElementById('tr-foot')
        const thf_el = tr_foot_el.querySelectorAll('th');
        for(let k = 0; k < head_titles.length; k++) {
            thf_el[k].innerHTML = head_titles[k];
        }

        //**Fill one-page-data on table body - DESC mode*/
        // const tr_data_el = document.querySelectorAll('.tr-data')
        // for(let j = (one_page_data_length - 1); j >= 0; j--) {
        //     const td_el = tr_data_el[j].querySelectorAll('td');
        //     let i = raw_head_titles.length * (one_page_data.length - 1) - raw_head_titles.length * j;
        //     for(let k = 0; k < raw_head_titles.length; k++) {
        //         td_el[k].innerHTML = one_page_data[j][raw_head_titles[k]];
        //     }
        // }
        
        //**Fill one-page-data on table body - ASC mode*/
        const tr_data_el = document.querySelectorAll('.tr-data')
        for(let j = 0; j < one_page_data_length; j++) {
            const td_el = tr_data_el[j].querySelectorAll('td');
            let i = raw_head_titles.length * j;
            for(let k = 0; k < raw_head_titles.length; k++) {
                td_el[k].innerHTML = one_page_data[j][raw_head_titles[k]];
            }
        }
    }
    return false
}

export { tableFiller }