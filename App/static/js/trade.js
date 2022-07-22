document.addEventListener('DOMContentLoaded', function() {
    fetch("https://api.coingecko.com/api/v3/coins/" + window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1))
    .then(response => response.json())
    .then(data => {

        document.title = "Trade " + data["name"] + " - Bullion";

        document.querySelector(".page-header").innerHTML = "Trade " + data["name"] + ` | <img src="${data["image"]["large"]}">`;
        document.querySelector("#currency_img").src = data["image"]["large"];
        document.querySelector("#sym1").value = data["symbol"];
        document.querySelector("#sym2").value = data["symbol"];
        document.querySelector("#name1").value = data["name"];
        document.querySelector("#name2").value = data["name"];
        document.querySelector("#img1").value = data["image"]["large"];
        document.querySelector("#img2").value = data["image"]["large"];
    })

    document.querySelector("#buy_amount").onkeyup = async function() {
        document.querySelector("#value1").value = "Value: " + document.querySelector("#buy_amount").value * document.querySelector("#cur1").value;
    }
    document.querySelector("#sell_amount").onkeyup = async function() {
        document.querySelector("#value2").value = "Value: " + document.querySelector("#sell_amount").value * document.querySelector("#cur2").value;
    }

    load_price();

    tcount=setInterval(function(){
        tcount++
        if (tcount==5) {load_price(); tcount=0}
    }, 1000);
})

function load_price() {
    fetch("https://api.coingecko.com/api/v3/coins/" + window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1))
    .then(response => response.json())
    .then(data => {

        document.querySelector("#cur0").innerHTML = data["market_data"]["current_price"]["eur"];
        document.querySelector("#cur1").value = data["market_data"]["current_price"]["eur"];
        document.querySelector("#cur2").value = data["market_data"]["current_price"]["eur"];

        document.querySelector("#value1").value = "Value: " + document.querySelector("#buy_amount").value * document.querySelector("#cur1").value;
        document.querySelector("#value2").value = "Value: " + document.querySelector("#sell_amount").value * document.querySelector("#cur2").value;
    })
}
