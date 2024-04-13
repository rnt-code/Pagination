function getTableHeadTitles(custom_head_titles, data) {

    let head_titles = [];
    if(data.length != 0) {
            
        if(custom_head_titles === undefined || custom_head_titles.length === 0 || !Array.isArray(custom_head_titles)) {
            head_titles = Object.keys(data[0]);
        }
        else {
            head_titles = Object.keys(data[0]);
            let difference = Math.abs(head_titles.length - custom_head_titles.length);
            if(custom_head_titles.length < head_titles.length) {
                for(let i = 0; i < difference; i++) {
                    custom_head_titles.push('-');
                }
            }
            if(custom_head_titles.length > head_titles.length) {
                for(let i = 0; i < difference; i++) {
                    custom_head_titles.pop();
                }
            }
            head_titles = custom_head_titles;
        }
    }
    return head_titles
}

export { getTableHeadTitles }