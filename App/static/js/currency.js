document.addEventListener('DOMContentLoaded', function() {
    load_stats();

    tcount=setInterval(function(){
        tcount++
        if (tcount==30) {load_stats(); tcount=0}
    }, 1000);
})

function load_stats() {

    fetch("https://api.coingecko.com/api/v3/coins/" + window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1))
    .then(response => response.json())
    .then(data => {

        document.title = data["name"] + " - Bullion";

        document.querySelector(".page-header").innerHTML = `<img src="${data["image"]["large"]}">` + " | " + data["name"];

        const stats_area = document.querySelector(".stats_area");
        stats_area.innerHTML = "";

        var elem = document.createElement('div');
        elem.classList.add('stats_title');
        elem.innerHTML = `
        Market Cap Rank: #${data["market_cap_rank"]}
        `;
        stats_area.append(elem);

        var colorh = "--text-white";
        if (data["market_data"]["price_change_percentage_24h"].toFixed(2) > 0) {colorh = "--green";}
        if (data["market_data"]["price_change_percentage_24h"].toFixed(2) < 0) {colorh = "--red";}

        var colory = "--text-white";
        if (data["market_data"]["price_change_percentage_1y"].toFixed(2) > 0) {colory = "--green";}
        if (data["market_data"]["price_change_percentage_1y"].toFixed(2) < 0) {colory = "--red";}

        elem = document.createElement('div');
        elem.classList.add('stats_row');
        elem.innerHTML = `
        <table class="stats_left">
            <tr>
                <td><h6>Category</h6> <h5>${getCategory(data["categories"])}</h5></td>
                <td><h6>Webpage</h6> <a href="${data["links"]["homepage"][0]}" target="_blank"><h5>Visit Here</h5></a></td>
            </tr>
            <tr>
                <td><h6>Current Price</h6> <h5>${numFormatter(data["market_data"]["current_price"]["eur"])}&euro;</h5></td>
                <td><h6>Market Cap</h6> <h5>${numFormatter(data["market_data"]["market_cap"]["eur"])}&euro;</h5></td>
            </tr>
            <tr>
                <td><h6>24H Change Percentage</h6> <h5 style="color: var(${colorh});">${data["market_data"]["price_change_percentage_24h"].toFixed(2)}%</h5></td>
                <td><h6>1Y Change Percentage</h6> <h5 style="color: var(${colory});">${data["market_data"]["price_change_percentage_1y"].toFixed(2)}%</h5></td>
            </tr>
            <tr>
                <td><h6>Total Supply</h6> <h5>${numFormatter(data["market_data"]["total_supply"])}</h5></td>
                <td><h6>Circulating Supply</h6> <h5>${numFormatter(data["market_data"]["circulating_supply"])}</h5></td>
            </tr>
            <tr>
                <td><h6>ATH</h6> <h5>${numFormatter(data["market_data"]["ath"]["eur"])}&euro;</h5></td>
                <td><h6>ATH Change Percentage</h6> <h5>${data["market_data"]["ath_change_percentage"]["eur"].toFixed(2)}%</h5></td>
            </tr>
            <tr>
                <td><h6>ATL</h6> <h5>${numFormatter(data["market_data"]["atl"]["eur"])}&euro;</h5></td>
                <td><h6>ATL Change Percentage</h6> <h5>${data["market_data"]["atl_change_percentage"]["eur"].toFixed(2)}%</h5></td>
            </tr>
        </table>

        <div class="stats_right">
            <div><h5>Description</h5></div>
            <div class="stats_desc">${data["description"]["en"]}</div>
        </div>
        `;
        stats_area.append(elem);
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

function getCategory(categories) {
    for (var i = 0; i < categories.length; i++) {
        if (categories[i] === "Stablecoins" || categories[i] === "Smart Contract Platform" || categories[i] === "Cryptocurrency"  
        || categories[i] === "Infrastructure" || categories[i] === "Exchange-based Tokens" || categories[i] === "Storage" 
        || categories[i] === "Privacy Coins" || categories[i] === "Business Platform" || categories[i] === "Artificial Intelligence"
        || categories[i] === "Internet of Things (IOT)" || categories[i] === "Protocol" || categories[i] === "Centralized Exchange (CEX)"
        || categories[i] === "Play To Earn" || categories[i] === "Metaverse" || categories[i] === "Gaming"
        || categories[i] === "Non-Fungible Tokens (NFT)" || categories[i] === "Decentralized Finance (DeFi)" || categories[i] === "Governance"
        || categories[i] === "Yield Farming" || categories[i] === "Lending/Borrowing") {
            return categories[i];
        }
    }
    return "None";
}
