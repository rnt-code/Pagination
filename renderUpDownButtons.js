function renderupdownbuttons() {

    //container para los botones
    const nav_buttons = document.getElementById('nav-buttons');

    //borro lo que haya en el contenedor nav_buttons
    const isbuttons = !!nav_buttons.children[0];
    if(isbuttons) {
        nav_buttons.children[0].remove();
    }

    //creo el contenedor de Boostrap
    // const nav = document.createElement('nav');
    // nav.setAttribute('aria-label', 'example');
    // nav_buttons.appendChild(nav);
    
    //creo la lista desordenada (unordered list)
    const ul = document.createElement('ul');
    ul.classList.add('pagination-keys');
    //ul.classList.add('justify-content-center');
    nav_buttons.appendChild(ul);

    const pagination_keys = document.querySelector('.pagination-keys');

    //creo el primer list item
    const li_prev = document.createElement('li');
    li_prev.classList.add('pageitem');
    li_prev.id = 'page-down';
    pagination_keys.appendChild(li_prev);

    //creo el botón de avance a la izquierda <<
    const a_prev = document.createElement('a');
    a_prev.classList.add('pagelink');
    //a_prev.id = 'page-down';
    a_prev.innerText = '<<';
    a_prev.href = '#';
    li_prev.appendChild(a_prev);

    //creo el último list item
    const li_nxt = document.createElement('li');
    li_nxt.classList.add('pageitem');
    li_nxt.id = 'page-up';
    pagination_keys.appendChild(li_nxt);

    //creo el boton de avance a la derecha >>
    const a_nxt = document.createElement('a');
    a_nxt.classList.add('pagelink');
    
    a_nxt.innerText = '>>';
    a_nxt.href = '#';
    li_nxt.appendChild(a_nxt);

}
export { renderupdownbuttons }