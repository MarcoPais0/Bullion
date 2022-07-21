document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.content').hidden = true;
    load_coins();

    tcount=setInterval(function(){
        tcount++
        if (tcount==30) {load_coins(); tcount=0}
    }, 1000);
})

function load_coins() {

    //console.log("loading coins");

    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h")
    .then(response => response.json())
    .then(data => {

        //console.log(data);

        const list_area = document.querySelector('#list_area');
        list_area.innerHTML = `
        <tr class="table_header">
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24 %</th>
            <th>Market Cap</th>
        </tr>
        `;

        for (var i = 0; i < data["length"]; i++) {
            
            //console.log(data[i]);

            const elem = document.createElement('tr');
            elem.classList.add('list_coin');
            let color = "--text-white";
            if (data[i]["price_change_percentage_24h"].toFixed(2) > 0) {
                color = "--green";
            } else if (data[i]["price_change_percentage_24h"].toFixed(2) < 0) {
                color = "--red";
            }

            elem.innerHTML = `
            <td>${data[i]["market_cap_rank"]}</td>
            <td><img src="${data[i]["image"]}"><a href="currencies/${data[i]["id"]}">${data[i]["name"]}</a></td>
            <td>${numFormatter(data[i]["current_price"])}&euro;</td>
            <td style="color: var(${color});">${data[i]["price_change_percentage_24h"].toFixed(2)}%</td>
            <td>${numFormatter(data[i]["market_cap"])}&euro;</td>
            `
            ;
            list_area.append(elem);
        }

        document.querySelector('.content').hidden = false;
    })
}

function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(2) + 'K';
    } else if (num > 1000000000) {
        return (num / 1000000000).toFixed(2) + 'B';
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if(num < 1) {
        try {
            return num.toFixed(4);    
        } catch (error) {
            return num;   
        }
    } else if (num < 1000) {
        return num;
    }
}
