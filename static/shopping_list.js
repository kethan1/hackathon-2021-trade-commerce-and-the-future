let shopping_list;
let shopping_list_ul = document.getElementById("shopping_list_ul");
let add_input = document.getElementById("to_add");

if (localStorage.getItem("shoppingList") === null) {
    localStorage.setItem("shoppingList", JSON.stringify([]));
    shopping_list = [];
} else {
    shopping_list = JSON.parse(localStorage.getItem("shoppingList"));
}

for (let item of shopping_list) {
    let new_item = document.createElement("li");
    new_item.innerHTML = item + `  <a style="cursor: pointer;" onclick="deleteElement(this)">❌</a>`;
    shopping_list_ul.appendChild(new_item);
}

function addElement() {
    add_input.value = add_input.value.trim();
    if (!shopping_list.includes(add_input.value)) {
        if (add_input.value !== "") {
            let new_item = document.createElement("li");
            new_item.innerHTML = add_input.value + `  <a style="cursor: pointer;" onclick="deleteElement(this)">❌</a>`;
            shopping_list_ul.appendChild(new_item);
            shopping_list.push(add_input.value);
            localStorage.setItem("shoppingList", JSON.stringify(shopping_list));
        }
        categorize();
    } else {
        M.toast({html: "Item already in the list."})
    }
    add_input.value = "";
}

function deleteElement(elem) {
    elem = elem.parentNode;
    let index = 0;
    let elem_copy = elem;
    while ((elem_copy=elem_copy.previousElementSibling) !== null) ++index;
    shopping_list.splice(index, 1);
    localStorage.setItem("shoppingList", JSON.stringify(shopping_list));
    elem.remove();
    categorize();
}
