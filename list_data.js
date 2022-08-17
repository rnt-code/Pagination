function listdata(data, istoday) {

    const len = data.length;
    const td = tdatos.querySelectorAll('td');
    let i = 0;
    
    for(let j = (len-1); j >= 0; j--) {

        i = 7 * (len - 1) - 7 * j;  
        td[i].innerHTML = data[j].id;
        td[i+1].innerHTML = data[j].name;
        td[i+2].innerHTML = data[j].last_name;
        td[i+3].innerHTML = data[j].position;
        td[i+4].innerHTML = data[j].office;
        td[i+5].innerHTML = data[j].age;
        td[i+6].innerHTML = data[j].start_date;
    }
}

export { listdata }