document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('index')) {
        indexPage();
    }
    else if (document.body.classList.contains('featured')) {
        featurePage();
    }
})

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
        const card_id_elem = card.id;
        playlist = document.getElementById(card_id_elem);
        playlist.innerHTML += "<img src='./assets/img/heart.png' class='like'>"
        
        const card_id = findByID(data, card.id);
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

    // Shuffle Songs
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

// Function for finding playlist with targetID and returning index
function findByID(jsonData, targetID) {
    for (let i = 0; i < jsonData.length; i ++) {
        if (jsonData[i].playlistID === targetID) return i;
    }
    return -1;
}

// Function to go into edit mode
function editMode(data){
    console.log('edit mode');
    const edit_button = document.getElementById("edit");
    edit_button.innerText = "Go back to viewing mode";
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {        
        const card_id_elem = card.id;
        playlist = document.getElementById(card_id_elem);
        playlist.innerHTML += "<img src='./assets/img/delete.png' class='delete_icon'>"
        
        const card_id = findByID(data, card.id);

        to_delete = playlist.getElementsByClassName('delete_icon')[0];

        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1)';
        })

        // card.addEventListener('mouseout', () => {
        //     card.style.transform = 'scale(1)';
        // })

        to_delete.addEventListener('click', function(event) {
            event.preventDefault();
            console.log("event deleted")
            data = deleteObjectById(data, card_id);
            console.log(data);
            event.stopPropagation();
            displayPlaylists(data);
        })

    })
    isToggled = !isToggled;
}

function deleteObjectById(jsonData, id) {
    const index = jsonData.findIndex((obj) => obj.id === id);
    jsonData.splice(index, 1);
    return jsonData;
}

function displayPlaylists(data) {
    const edit_button = document.getElementById("edit");
    edit_button.innerText = "Edit"
    const main = document.getElementById("all-playlists");
        if (data === undefined) {
            main.innerText = "No playlists to display";
        }
        else {
            let main_content = ""
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
                main_content += content;
            })
            main.innerHTML = main_content;
            addCardListener(data);
        }
    isToggled = !isToggled;
}

function displayFeaturedPlaylist(playlist) {
    const featured = document.getElementById("featured");
    featured.innerHTML += `<p>${playlist.playlist_name}</p>`

    const songs = playlist.songs;
    if (songs.length === 0) {
        featured.innerHTML += `<p>Sorry, this playlist has no songs!</p>`
    }
    songs.forEach(song => {
        const song_div =
        `<div>
            <img src='${song.art}'>
            <h2>${song.title}</h2>
            <h3>${song.artist}</h3>
            <p>${song.duration}</p>
        </div>`
        featured.innerHTML += song_div;
    })
}

function addPlaylist(data){
    openAddModal(data);
}

function openAddModal(data) {
    modal = document.getElementById('add-modal');
    const span = modal.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Function for index.html
var isToggled = false;
function indexPage() { 
    callingToFetchData().then(data => {
        displayPlaylists(data);

        const sort_playlists = document.getElementsByClassName('dropbtn')[0];
        sort_playlists.addEventListener('click', function(event) {
            console.log('sort clicked');
            document.getElementsByClassName("dropdown-content")[0].style.display = "block";

            window.onclick = function(event) {
                if (!event.target.matches('.dropbtn')) {
                const dropdowns = document.getElementsByClassName("dropdown-content");
                document.getElementsByClassName("dropdown-content")[0].style.display = "none";
            }}
        })

        // Add sort by title button

        const sort_by_title_button = document.getElementById("sort-by-title");
        sort_by_title_button.addEventListener('click', function(event) {
            document.getElementsByClassName("dropdown-content")[0].style.display = "none";
            data.sort(function(a,b) {
                const textA = a.playlist_name.toUpperCase();
                const textB = b.playlist_name.toUpperCase();
                return (textA < textB) ? -1: (textA > textB) ? 1: 0;
            });
            displayPlaylists(data);
        });

        // Add edit button
        const edit_button = document.getElementById("edit");

        edit_button.addEventListener('click', function(event) {
            console.log(isToggled);
            if (isToggled) {
                editMode(data);
            }
            else {
                displayPlaylists(data);
            }
        });

        // Add add button
        const add_button = document.getElementById("add-playlist");

        add_button.addEventListener('click', function(event) {
            addPlaylist(data);
        });
    });
}

// Function for featured.html
function featurePage() {
    callingToFetchData().then(data => {
        // Select a random playlist
        const rand = Math.floor(Math.random()*data.length);
        const featured_playlist = data[rand];
        // Display Playlist Information
        displayFeaturedPlaylist(featured_playlist);
    });
}
