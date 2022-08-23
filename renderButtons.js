function renderbuttons(from, to) {

    if(from !=0 && to !=0 ) {

        //Referencia a los botones up y down
        const page_up = document.getElementById('page-up');
        const pagination_keys= document.querySelector('.pagination-keys');

        //Borro los botones que haya en el contenedor pagination
        const pagei_list = document.querySelectorAll('.pagei');
        pagei_list.forEach(function(pagei) {
            pagination_keys.removeChild(pagei);
        })

        //Dibujo los botones
        const li_btn = [];
        const a_btn = [];

        for(let i = from; i <= to; i++) {

            li_btn[i] = document.createElement('li');
            li_btn[i].classList.add('pageitem');
            li_btn[i].classList.add('pagei');
            a_btn[i] = document.createElement('a');
            a_btn[i].classList.add('pagelink');
            a_btn[i].href = '#';
            a_btn[i].innerText = i;
            li_btn[i].appendChild(a_btn[i]);
            pagination_keys.insertBefore(li_btn[i], page_up);
        }
    }
}

export { renderbuttons }