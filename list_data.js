function listdata(one_page_data, istoday) {

    const one_page_data_length = one_page_data.length;
    const headers = Object.keys(one_page_data[0]);

    const td = tdatos.querySelectorAll('td');
    let i = 0;
    
    /*
    //DESC mode
    for(let j = (one_page_data_length - 1); j >= 0; j--) {

        i = headers.length * (data_length - 1) - headers.length * j;  
        td[i].innerHTML = data[j][headers[0]];
        td[i+1].innerHTML = data[j][headers[1]];
        td[i+2].innerHTML = data[j][headers[2]];
        td[i+3].innerHTML = data[j][headers[3]];
        td[i+4].innerHTML = data[j][headers[4]];
        td[i+5].innerHTML = data[j][headers[5]];
        td[i+6].innerHTML = data[j][headers[6]];
    }
    */
    
    //ASC mode
    for(let j = 0; j < one_page_data_length; j++) {

        let i = headers.length * j;

        td[i].innerHTML = one_page_data[j][headers[0]];
        td[i+1].innerHTML = one_page_data[j][headers[1]];
        td[i+2].innerHTML = one_page_data[j][headers[2]];
        td[i+3].innerHTML = one_page_data[j][headers[3]];
        td[i+4].innerHTML = one_page_data[j][headers[4]];
        td[i+5].innerHTML = one_page_data[j][headers[5]];
        td[i+6].innerHTML = one_page_data[j][headers[6]];
    }
}

export { listdata }