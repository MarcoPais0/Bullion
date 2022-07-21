document.addEventListener('DOMContentLoaded', function() {

    document.querySelector(".content_c").hidden = true;
    document.querySelector("#search").onkeyup = function() {
        
        if (this.value.length == 0) {
            document.querySelector(".content_c").hidden = true;
            return;
        }

        fetch("https://api.coingecko.com/api/v3/search?query=" + this.value)
        .then(response => response.json())
        .then(data => {
    
            const list_area = document.querySelector('#list_area');
            list_area.innerHTML = `
            <tr class="table_header">
                <th>#</th>
                <th>Name</th>
            </tr>
            `;

            for (var i = 0; i < data["coins"].length; i++) {

                if (i > 100) {break;}

                const elem = document.createElement('tr');
                elem.classList.add('list_coin');

                elem.innerHTML = `
                <td>${data["coins"][i]["market_cap_rank"]}</td>
                <td><img src="${data["coins"][i]["large"]}"><a href="currencies/${data["coins"][i]["id"]}">${data["coins"][i]["name"]}</a></td>
                `
                ;
                list_area.append(elem);
            }

            document.querySelector(".content_c").hidden = false;
        })
    }
})
