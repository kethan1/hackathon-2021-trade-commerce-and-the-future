function categorize() {
    let categories = document.getElementById("categories");
    categories.innerHTML = "";
    let show = {};
    for (let item of shopping_list) {
        if (item in catergory_dict) {
            let category = catergory_dict[item];
            if (category in show) {
                show[category].push(item);
            } else {
                show[category] = [item];
            }
        } else {
            if (!("Unknown" in show)) {
                show["Unknown"] = [item];
            } else {
                show["Unknown"].push(item);
            }
        }        
    }
    console.log(show)
    for (let category in show) {
        let items_in_str = "";
        for (let item of show[category]) {
            items_in_str += `<li>${item}</li>`;
        }
        console.log(items_in_str)
        categories.innerHTML += `<li><b style="font-size: 1.25em">${category}</b>
            <ul class="browser-default">
                ${items_in_str}
            </ul>
        </li>`
    }
}

categorize();
