function renderButtons(starting_at, ending_in) {

    if(starting_at !=0 && ending_in !=0 ) {

        //Referencia a los botones up y down
        const page_up_el = document.querySelector('.page-up');
        const pagination_keys_el = document.querySelector('.pagination-keys');

        //Borro los botones que haya en el contenedor pagination
        const pagei_list = document.querySelectorAll('.pagei');
        pagei_list.forEach(function(pagei) {
            pagination_keys_el.removeChild(pagei);
        })

        //Dibujo los botones
        const li_btn = [];
        const a_btn = [];

        for(let i = starting_at; i <= ending_in; i++) {
            
            //armo el i-ésimo: <li class="pagei"></li>
            li_btn[i] = document.createElement('li');
            li_btn[i].classList.add('pagei');

            //armo el i-ésimo: <a class="pagelink" id="<i>" href="#">i</a>
            a_btn[i] = document.createElement('a');
            a_btn[i].classList.add('pagelink');
            a_btn[i].id = i;
            a_btn[i].href = '#';
            a_btn[i].innerText = i;

            //agrego el <a> dentro del <li>:
            //<li class="pagei"><a class="pagelink" id="<i>" href="#">i</a></li>
            li_btn[i].appendChild(a_btn[i]);
            pagination_keys_el.insertBefore(li_btn[i], page_up_el);
        }
    }
    return false
}

export { renderButtons }