function renderpagebuttons(from, to) {

    if(from !=0 && to !=0 ) {

        //Referencia al botón up y al contenedor 'paginate' de los botones
        const pageup = document.getElementById('page-up');
        const paginate = document.getElementById('paginate');
        const spam = document.createElement('spam');
        paginate.insertBefore(spam, pageup);
    

        //Borro los botones que haya en el contenedor pagination
        const paginatebutton_list = document.querySelectorAll('.paginate-button');
        paginatebutton_list.forEach(function(paginatebutton) {
            spam.removeChild(paginatebutton);
        })

        //Dibujo los botones
        const li_btn = [];
        const a_btn = [];

        for(let i = from; i <= to; i++) {

            //li_btn[i] = document.createElement('li');
            //li_btn[i].classList.add('pagei');
            a_btn[i] = document.createElement('a');
            a_btn[i].classList.add('paginate-button');
            a_btn[i].href = '#';
            a_btn[i].innerText = i;
            spam.appendChild(a_btn[i]);
        }
    }
}

export { renderpagebuttons }