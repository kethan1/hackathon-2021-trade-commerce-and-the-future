function addImageProcess(src) {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
}

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

async function showMap() {
    let ele = document.getElementById("store_selection");
    let item_not_found = document.getElementById("item_not_found");
    if (ele.value == "") {
        return;
    }
    item_not_found.innerHTML = "";
    var myCanvas = document.getElementById("mapCanvas");
    var ctx = myCanvas.getContext("2d");
    var img = new Image;
    let marker = await addImageProcess("/static/marker.png");
    img.onload = async function() {
        ctx.drawImage(img, 0, 0);
        let data = await fetch(`/api/get_store_products/${ele.value}`);
        let json = await data.json();
        for (let item of shopping_list) {
            if (item.toLowerCase() in json["items"]) {
                // ctx.drawImage(marker, json[item][0] * 25 + 12.5, json[item][1] * 25 + 12.5);
                ctx.beginPath();
                ctx.fillStyle = "#FF0000";
                ctx.font = '15px Georgia';
                ctx.textAlign="center"; 
                if (json["items_positioning"] === "new") {
                    ctx.fillText(item, json["items"][item][0], json["items"][item][1] + 15);
                    ctx.arc(json["items"][item][0], json["items"][item][1], 5, 0, 2 * Math.PI);
                } else {
                    ctx.fillText(item, json["items"][item][0] * 25 + 12.5, json["items"][item][1] * 25 + 12.5 + 15);
                    ctx.arc(json["items"][item][0] * 25 + 12.5, json["items"][item][1] * 25 + 12.5, 5, 0, 2 * Math.PI);
                }
                ctx.fill();
            } else {
                item_not_found.innerHTML += `${capitalize(item)} was not found in this store.<br>`;
            }
        }
    };
    img.src = `/static/stores/${ele.value}/store_complex.png`;
}
