function buildpagebuttons(pages) {
    
    const nav_buttons = document.getElementById('nav-buttons');
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'example');
    nav_buttons.appendChild(nav);
    const ul = document.createElement('ul');
    ul.classList.add('pagination');
    ul.classList.add('justify-content-center');
    nav.appendChild(ul);

    const pagination = document.querySelector('.pagination');
    const li_prev = document.createElement('li');
    li_prev.classList.add('page-item');
    pagination.appendChild(li_prev);

    const a_prev = document.createElement('a');
    a_prev.classList.add('page-link');
    a_prev.innerText = '<<';
    a_prev.href = '#'
    li_prev.appendChild(a_prev);

    const li_btn = [];
    const a_btn = [];

    for(let i = 1; i <= pages; i++) {

        li_btn[i] = document.createElement('li')
        li_btn[i].classList.add('page-item')
        a_btn[i] = document.createElement('a');
        a_btn[i].classList.add('page-link');
        a_btn[i].href = '#'
        a_btn[i].innerText = i;
        li_btn[i].appendChild(a_btn[i]);
        pagination.appendChild(li_btn[i]);
    }

    const li_nxt = document.createElement('li');
    li_nxt.classList.add('page-item');
    pagination.appendChild(li_nxt);

    const a_nxt = document.createElement('a');
    a_nxt.classList.add('page-link');
    a_nxt.innerText = '>>';
    a_nxt.href = '#'
    li_nxt.appendChild(a_nxt);
}

export { buildpagebuttons }