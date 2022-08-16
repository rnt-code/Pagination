import { buildtable } from "./build_table.js";
import { listdata } from "./list_data.js"

/*
fetch('./getData.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        buildtable(data.length)
        listdata(data, true);
    })
*/

async function getResponse() {
    const response = await fetch(`./getData.php?offset=0&count=20`);
    const data = await response.json();
    return data;
}

const data = await getResponse();
buildtable(data.length);
listdata(data, true);
