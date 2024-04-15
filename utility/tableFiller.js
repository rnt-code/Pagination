function tableFiller(one_page_data, head_titles) {

    if(one_page_data.length != 0) {

        const one_page_data_length = one_page_data.length;
        const raw_head_titles = Object.keys(one_page_data[0]);
        const td = tdatos.querySelectorAll('td');
        const th = tdatos.querySelectorAll('th');
        
        //fill with titles
        for(let k = 0; k < head_titles.length; k++) {
            th[k].innerHTML = head_titles[k];
        }

        /*
        //DESC mode
        for(let j = (one_page_data_length - 1); j >= 0; j--) {
            i = raw_head_titles.length * (one_page_data.length - 1) - raw_head_titles.length * j;
            for(let k = 0; k < raw_head_titles.length; k++) {
                td[i + k].innerHTML = one_page_data[j][raw_head_titles[k]];
            }
        }
        */
    
        //ASC mode
        for(let j = 0; j < one_page_data_length; j++) {
            let i = raw_head_titles.length * j;
            for(let k = 0; k < raw_head_titles.length; k++) {
                td[i + k].innerHTML = one_page_data[j][raw_head_titles[k]];
            }
        }
    }
    return false
}

export { tableFiller }