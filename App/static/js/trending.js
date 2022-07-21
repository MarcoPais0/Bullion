document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('.content_c').hidden = true;
    trend();

    tcount=setInterval(function(){
        tcount++
        if (tcount==60) {trend(); tcount=0}
    }, 1000);
})

function trend() {
        
    fetch("https://api.coingecko.com/api/v3/search/trending")
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

            const elem = document.createElement('tr');
            elem.classList.add('list_coin');

            elem.innerHTML = `
            <td>${data["coins"][i]["item"]["market_cap_rank"]}</td>
            <td><img src="${data["coins"][i]["item"]["large"]}"><a href="currencies/${data["coins"][i]["item"]["id"]}">${data["coins"][i]["item"]["name"]}</a></td>
            `
            ;
            list_area.append(elem);
        }

        document.querySelector(".content_c").hidden = false;
    })
}