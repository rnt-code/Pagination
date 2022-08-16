import { buildtable } from "./build_table.js";
import { listdata } from "./list_data.js"

fetch('./getData.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        buildtable(data.length)
        listdata(data, true);
    })

