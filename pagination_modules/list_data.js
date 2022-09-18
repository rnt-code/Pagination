//import { message } from '../modules/barMessageHandler.js';

function listdata(one_page_data, istoday) {

    if(one_page_data.length != 0) {

        const data_length = one_page_data.length;
        const td = tdatos.querySelectorAll('td');
        const clipboard = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        </svg>
                        `
                        
        const check2 = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-check2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        `

        let i = 0;
        let countpass = 0;
        let countfail = 0;

        for(let j = (data_length - 1); j >= 0; j--) {
            
            i = 7 * (data_length - 1) - 7 * j; 
            td[i].innerHTML = one_page_data[j].id_es_test_report;
            td[i+1].innerHTML = one_page_data[j].start_time;
            td[i+2].innerHTML = (parseFloat(one_page_data[j].test_time)).toFixed(3);
            td[i+3].innerHTML = `
                                <label>${one_page_data[j].serial_number}&nbsp</label>
                                <a href="#" class="snumber">${clipboard}</a>
                                `;
            if(istoday) {
                if(one_page_data[j].test_result === 'PASS') {
                    const passparent = td[i+4].parentElement;
                    passparent.style.backgroundColor = 'rgb(213,255,211)';
                    td[i+4].innerHTML = 'PASS';
                    countpass++;
                }
                if(one_page_data[j].test_result === 'FAIL') {
                    const failparent = td[i+4].parentElement;
                    failparent.style.backgroundColor = 'rgb(255,226,226)';
                    td[i+4].innerHTML = 'FAIL';
                    countfail++;
                }
            }
            else {
                if(one_page_data[j].test_result === 'PASS') {
                    const passparent = td[i+4].parentElement;
                    passparent.style.backgroundColor = 'rgb(216,216,216)';
                    td[i+4].innerHTML = 'PASS';
                    countpass++;
                }
                if(one_page_data[j].test_result === 'FAIL') {
                    const failparent = td[i+4].parentElement;
                    failparent.style.backgroundColor = 'rgb(255,203,203)';
                    td[i+4].innerHTML = 'FAIL';
                    countfail++;
                }
            }

            if(one_page_data[j].hp_test_result === 'HP_NULL') {
                td[i+5].innerHTML = 'n/exec';
            }
            else {
                if(one_page_data[j].hp_test_result === 'HP_PASS') {
                    td[i+5].innerHTML = 'PASS';
                }
                else {
                    td[i+5].innerHTML = 'FAIL';
                }
            }
        
            if(one_page_data[j].gb_test_result === 'GB_NULL') {
                td[i+6].innerHTML = 'n/exec';
            }
            else {
                if(one_page_data[j].gb_test_result === 'GB_PASS') {
                    td[i+6].innerHTML = 'PASS';
                }
                else {
                    td[i+6].innerHTML = 'FAIL';
                }
            }
        }
        const results = `Resultados: ${countpass} PASS y ${countfail} FAIL`;
        //message(results, 'Fin del listado.');
        
        const symbol = document.querySelectorAll('.snumber');
        
        symbol.forEach(element => {
            element.addEventListener("click", async function (event) {
                event.preventDefault();
                element.innerHTML = check2;
                setTimeout(function(){
                        element.innerHTML = clipboard;
                }, 3500);
                sninput.value = element.previousElementSibling.innerText.trimEnd();
                async function copyToClipboard() {
                    try {
                        await navigator.clipboard.writeText(sninput.value);
                        console.log('serial number copied to clipboard');
                    }
                    catch(e) {
                        console.err('Failed to copy: ', e);
                    }
                }
                copyToClipboard;
            })
        })

        //document.getElementById('sninput').removeAttribute('disabled','');
        //document.getElementById('searchbutton').removeAttribute('disabled','');
        //sninput.focus();
        //NProgress.done();
    }
}

export { listdata }