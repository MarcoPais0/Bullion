document.addEventListener('DOMContentLoaded', function() {
    fetch("https://api.coingecko.com/api/v3/coins/" + window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1))
    .then(response => response.json())
    .then(data => {

        document.querySelector("#link").href = "https://www.tradingview.com/symbols/"+ data["symbol"].toUpperCase() + "USD/?exchange=BINANCE";
        document.querySelector("#description").textContent = data["symbol"].toUpperCase() + "USD Chart";
        new TradingView.widget(
            {
            "autosize": true,
            "symbol": "BINANCE:" + data["symbol"].toUpperCase() + "USD",
            "interval": "H",
            "timezone": "Europe/Lisbon",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "withdateranges": true,
            "save_image": false,
            "container_id": "tradingview_e0046"
            }
        );
    })
})
