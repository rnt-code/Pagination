import { updatetable } from "./updateTable.js";

let count = document.getElementById('count');

count.addEventListener("change", function (event) {
    event.preventDefault();
    
    updatetable();
})


