function tableFiller(one_page_data) {

    if(one_page_data.length != 0) {

        const one_page_data_length = one_page_data.length;
        const headers = Object.keys(one_page_data[0]);
        const td = tdatos.querySelectorAll('td');
        let i = 0;
        
        /*
        //DESC mode
        for(let j = (one_page_data_length - 1); j >= 0; j--) {
            i = headers.length * (one_page_data.length - 1) - headers.length * j;
            for(let k = 0; k < headers.length; k++) {
                td[i + k].innerHTML = one_page_data[j][headers[k]];
            }
        }
        */
    
        //ASC mode
        for(let j = 0; j < one_page_data_length; j++) {
            let i = headers.length * j;
            for(let k = 0; k < headers.length; k++) {
                td[i + k].innerHTML = one_page_data[j][headers[k]];
            }
        }
    }
    return false
}

export { tableFiller }