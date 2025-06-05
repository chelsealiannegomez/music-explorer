// Function for fetching data
function callingToFetchData(){
    console.log("Calling To Fetch Data");
    let url = "./data/data.json";
    return fetch(url)
        .then(response => {
            console.log("Response");
            return response.json();
        })
        .then(data => {
            console.log("Data is here: ");
            console.log(data);
            return data;
        })
        .catch(error => console.error('Error:', error));
}


// Adding Event Listeners for Modals

function addCardListener(data) {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {        
        const card_id = card.id;
        playlist = document.getElementById(card_id);
        playlist.innerHTML += "<img src='./assets/img/heart.png' class='like'>"
        
        like = playlist.getElementsByClassName('like')[0];

        like.addEventListener('click', function(event) {
            event.preventDefault();
            if (data[card_id].liked === false) {
                data[card_id].liked = true;
                data[card_id].likes += 1
                new_like = document.getElementById(card_id).getElementsByClassName("likes")[0];
                new_like.innerHTML = "Likes: " + data[card_id].likes;
                new_heart = document.getElementById(card_id).getElementsByClassName('like')[0].src = './assets/img/red_heart.png';
            }
            else {
                data[card_id].liked = false;
                data[card_id].likes -= 1;
                new_like = document.getElementById(card_id).getElementsByClassName("likes")[0];
                new_like.innerText = "Likes: " + data[card_id].likes;
                new_heart = document.getElementById(card_id).getElementsByClassName('like')[0].src = './assets/img/heart.png';
            }
            event.stopPropagation();
        })

        playlist.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('card clicked');
            openModal(data[card_id]);
        })

    })
}

// Opening Modal
function openModal(playlist) {
    const modal = document.getElementById("playlist-modal");
    const span = document.getElementsByClassName("close")[0];
    console.log("playlist", playlist);
    document.getElementById("playlist-name").innerText = playlist.playlist_name;
    document.getElementById("playlist-author").innerText = playlist.playlist_author;
    document.getElementById("playlist-art").src = playlist.playlist_art;
    document.getElementById("shuffle").innerText = "Shuffle";

    const tracks = document.getElementById("songs");
    let temp = "";
    const allSongs = playlist.songs;
    allSongs.forEach(song => {
        const artist = `
            <div class="song">
                <img src=${song.art}>
                <p> ${song.title} </p>
                <p> ${song.artist} </p>
                <p> ${song.album} </p>
            </div>
        `;
        temp += artist;
    })

    tracks.innerHTML = temp;
    console.log(allSongs);
    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    //Shuffle Songs
    const button = document.getElementById("shuffle");

    button.addEventListener('click', function(event) {
        const order = document.getElementById("songs");
        const new_order = shuffle(playlist.songs);
        console.log(shuffle(playlist.songs));
        temp = "";
        new_order.forEach(song => {
            const artist = `
                <div class="song">
                    <img src=${song.art}>
                    <p> ${song.title} </p>
                    <p> ${song.artist} </p>
                    <p> ${song.album} </p>
                </div>
            `;
            temp += artist;
        })
        order.innerHTML = temp;
    });
    
}


// Function for shuffling
function shuffle(songs) {
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    return songs;
}

callingToFetchData().then(data => {
    const main = document.getElementById("all-playlists");

    if (data === undefined) {
        main.innerText = "No playlists to display";
    }
    else {
        console.log("Data:");
        console.log(data);
        data.forEach(playlist => {
            const content = `
                <div class="card" id="${playlist.playlistID}">
                    <img class="card-img" src="${playlist.playlist_art}">
                    <h3>${playlist.playlist_name}</h3>
                    <p class='author'>${playlist.playlist_author}</p>
                    <p class='likes'>Likes: ${playlist.likes}</p>
                </div>
            `;
            main.innerHTML += content;
        })
        addCardListener(data);
    }
});