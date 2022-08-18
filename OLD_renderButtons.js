function renderbuttons(from, to) {

    const li_btn = [];
    const a_btn = [];

    //container para los botones
    const nav_buttons = document.getElementById('nav-buttons');

    //borro lo que haya en el contenedor nav_buttons
    const isbuttons = !!nav_buttons.children[0];
    if(isbuttons) {
        nav_buttons.children[0].remove();
    }

    //creo el contenedor de Boostrap
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'example');
    nav_buttons.appendChild(nav);
    
    //creo la lista desordenada (unordered list)
    const ul = document.createElement('ul');
    ul.classList.add('pagination');
    ul.classList.add('justify-content-center');
    nav.appendChild(ul);

    const pagination = document.querySelector('.pagination');

    //creo el primer list item
    const li_prev = document.createElement('li');
    li_prev.classList.add('page-item');
    pagination.appendChild(li_prev);

    //creo el botón de avance a la izquierda <<
    const a_prev = document.createElement('a');
    a_prev.classList.add('page-link');
    a_prev.id = 'page-down';
    a_prev.innerText = '<<';
    a_prev.href = '#';
    li_prev.appendChild(a_prev);

    //console.log('from, to : ', from, to);
    for(let i = from; i <= to; i++) {

        li_btn[i] = document.createElement('li');
        li_btn[i].classList.add('page-item');
        a_btn[i] = document.createElement('a');
        a_btn[i].classList.add('page-link');
        a_btn[i].href = '#';
        a_btn[i].innerText = i;
        li_btn[i].appendChild(a_btn[i]);
        pagination.appendChild(li_btn[i]);
    }
    
    //creo el último list item
    const li_nxt = document.createElement('li');
    li_nxt.classList.add('page-item');
    pagination.appendChild(li_nxt);

    //creo el boton de avance a la derecha >>
    const a_nxt = document.createElement('a');
    a_nxt.classList.add('page-link');
    a_nxt.id = 'page-up';
    a_nxt.innerText = '>>';
    a_nxt.href = '#';
    li_nxt.appendChild(a_nxt);
}

export { renderbuttons }