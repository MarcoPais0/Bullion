document.addEventListener('DOMContentLoaded', function() {
    check();

    tcount=setInterval(function(){
        tcount++
        if (tcount==30) {check(); tcount=0}
    }, 1000);
})

function check() {
    fetch("https://api.coingecko.com/api/v3/ping")
    .then(response => {

        if (response.status != 200) {
            document.querySelector("#api").innerHTML = "API DOWN";
        }
    })
}
