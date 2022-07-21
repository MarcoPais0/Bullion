document.addEventListener('DOMContentLoaded', function() {

    fav = document.querySelector("#fav");
    fav.addEventListener('click', favorite);
    id = fav.attributes.value.value;
    fetch("/favorite?coin=" + id)
    .then(response => {

        if (response.status == 200) {
            fav.innerHTML = "&#9733;";
        } else if (response.status == 201) {
            fav.innerHTML = "&#9734;";
        } else {
            fav.innerHTML = "";
        }
    })
})

function favorite() {
    
    fav = document.querySelector("#fav");
    id = fav.attributes.value.value;
    
    fetch("https://api.coingecko.com/api/v3/coins/" + id)
    .then(response => response.json())
    .then(coin_data => {

        let data = {
            'id': coin_data["id"],
            'symbol': coin_data["symbol"],
            'name': coin_data["name"],
            'image': coin_data["image"]["large"],
        };
        let csrftoken = getCookie('csrftoken');
        fetch("/favorite", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "X-CSRFToken": csrftoken }
        })
        .then(response => {
            fetch("/favorite?coin=" + id)
            .then(response => {

                if (response.status == 200) {
                    fav.innerHTML = "&#9733;";
                } else if (response.status == 201) {
                    fav.innerHTML = "&#9734;";
                }
            })
        })
    })
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
