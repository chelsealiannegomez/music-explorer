// Load functions for index page or feature page
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('index')) {
        indexPage();
    }
    else if (document.body.classList.contains('featured')) {
        featurePage();
    }
})

// Function for fetching data from data.json in data folder
function callingToFetchData(){
    let url = "./data/data.json";
    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => console.error('Error:', error));
}

var num_playlists = 0;


// Adding Event Listeners for Modals 
function addCardListener(data) {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {        
        const card_id_elem = card.id;
        playlist = document.getElementById(card_id_elem);
        
        const card_id = findByID(data, card.id);

        // Adding Like Icon
        if (data[card_id].liked === false) {
            playlist.innerHTML += "<img src='./assets/img/heart.png' class='like'>"
        }
        else {
            playlist.innerHTML += "<img src='./assets/img/red_heart.png' class='like'>"
        }    

        like = playlist.getElementsByClassName('like')[0];

        // Adjusting number of likes and like icon on click
        like.addEventListener('click', function(event) {
            console.log('like added to ', data[card_id].playlist_name)
            event.preventDefault();
            if (data[card_id].liked === false) {
                data[card_id].liked = true;
                data[card_id].likes += 1
                new_like = document.getElementById(card_id_elem).getElementsByClassName("likes")[0];
                new_like.innerHTML = "Likes: " + data[card_id].likes;
                new_heart = document.getElementById(card_id_elem).getElementsByClassName('like')[0].src = './assets/img/red_heart.png';
            }
            else {
                data[card_id].liked = false;
                data[card_id].likes -= 1;
                new_like = document.getElementById(card_id_elem).getElementsByClassName("likes")[0];
                new_like.innerText = "Likes: " + data[card_id].likes;
                new_heart = document.getElementById(card_id_elem).getElementsByClassName('like')[0].src = './assets/img/heart.png';
            }
            event.stopPropagation();
        })

        // Card Click Event Listener
        playlist.addEventListener('click', function(event) {
            event.preventDefault();
            openModal(data[card_id]);
        })

    })
}

// Function to open Card Modal
function openModal(playlist) {
    const modal = document.getElementById("playlist-modal");
    const span = document.getElementsByClassName("close")[0];
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
                <div class="song-details">
                    <p class="song-title"> ${song.title} </p>
                    <p class="song-artist"> ${song.artist} </p>
                </div>
                <p class="song-album"> ${song.album.toUpperCase()} </p>
                <p class="song-duration"> ${song.duration} </p>
            </div>
        `;
        temp += artist;
    })

    tracks.innerHTML = temp;
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
                    <div class="song-details">
                        <p class="song-title"> ${song.title} </p>
                        <p class="song-artist"> ${song.artist} </p>
                    </div>
                    <p class="song-album"> ${song.album.toUpperCase()} </p>
                    <p class="song-duration"> ${song.duration} </p>
                </div>
            `;
            temp += artist;
        })
        order.innerHTML = temp;
    });
    
}


// Function for shuffling array
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

// Function to go into delete mode
function deleteMode(data){
    const delete_button = document.getElementById("delete-playlist");
    delete_button.innerText = "Go back to viewing mode";
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {        
        playlist = document.getElementById(card.id);
        playlist.innerHTML += "<img src='./assets/img/delete.png' class='delete_icon'>"
        
        to_delete = playlist.getElementsByClassName('delete_icon')[0];

        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1)';
        })

        to_delete.addEventListener('click', function (event) {
            event.preventDefault();
            data = deleteObjectById(data, card.id);
            event.stopPropagation();
            displayPlaylists(data);
        })

    })
    isToggled = !isToggled;
}

// Deletes object given playlistID
function deleteObjectById(jsonData, id) {
    console.log(id);
    const index = jsonData.findIndex((obj) => obj.playlistID === id);
    console.log('index', index);
    jsonData.splice(index, 1);
    console.log('new data', jsonData);
    return jsonData;
}

// Displays all playlists given current data
function displayPlaylists(data) {
    const delete_button = document.getElementById("delete-playlist");
    delete_button.innerText = "Delete Playlist"
    const edit_playlist_button = document.getElementById('edit-playlist');
    edit_playlist_button.innerText = "Edit Playlist "
    const main = document.getElementById("all-playlists");
        if (data === undefined || data.length === 0) {
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
    isEditToggled = !isEditToggled;
}

// Displays featured playlist
function displayFeaturedPlaylist(playlist) {
    const featured = document.getElementById("featured");

    const songs = playlist.songs;
    if (songs.length === 0) {
        featured.innerHTML += `<p>Sorry, this playlist has no songs!</p>`
    }
    songs.forEach(song => {
        const song_div =
        `<div class="song">
                <img src=${song.art}>
                <div class="song-details">
                    <p class="song-title"> ${song.title} </p>
                    <p class="song-artist"> ${song.artist} </p>
                </div>
                <p class="song-album"> ${song.album.toUpperCase()} </p>
                <p class="song-duration"> ${song.duration} </p>
            </div>`
        featured.innerHTML += song_div;
    })
}

// Adding a playlist
function addPlaylist(data){
    openAddModal(data);
}

// Opening a modal for adding playlist
function openAddModal(data) {
    modal = document.getElementById('add-modal');
    const span = modal.getElementsByClassName("close")[0];
    modal.style.display = "block";

    const name = document.getElementById('playlist_name');
    name.value = "";

    const creator = document.getElementById('creator_name');
    creator.value = "";

    const img_add = document.getElementById('img_url');
    img_add.value = "";

    const add_songs = document.getElementsByClassName("add_songs")[0];

    // Initialize songs div with one song placeholder
    let id = 1;
    add_songs.innerHTML = `
        <div class="add-song">
        <label for="song${id}_name">Song #${id}</label><br>
        <input name="song${id}_name" id="song${id}_name" placeholder="Name" required><br>
        <input name="song${id}_artist" id="song${id}_artist" placeholder="Artist" required><br>
        <input name="song${id}_album" id="song${id}_album" placeholder="Album" required><br>
        <input name="song${id}_duration" id="song${id}_duration" placeholder="Duration" required><br>
        </div>`
    const add_btn = document.getElementById('add-btn');

    // Add button that when clicked will add another song placeholder
    add_btn.addEventListener('click', addSongHandler);

    function addSongHandler(event) {
        event.preventDefault();
        id += 1;
        add_songs.insertAdjacentHTML('beforeend', `
            <div class="add-song">
            <label for="song${id}_name">Song #${id}</label><br>
            <input name="song${id}_name" id="song${id}_name" placeholder="Name" required><br>
            <input name="song${id}_artist" id="song${id}_artist" placeholder="Artist" required><br>
            <input name="song${id}_album" id="song${id}_album" placeholder="Album" required><br>
            <input name="song${id}_duration" id="song${id}_duration" placeholder="Duration" required><br>
            </div>
            `);
        event.stopPropagation();
    }

    // Handle form submission
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.stopImmediatePropagation();
        const newPlaylist = handleSubmit(event);
        const to_add = parseInput(newPlaylist, id);
        data.push(to_add);
        console.log(data);
        displayPlaylists(data);
        modal.style.display = "none";
        id = 1;
        add_btn.removeEventListener('click', addSongHandler);
    });

    span.onclick = function () {
        modal.style.display = "none";
        add_btn.removeEventListener('click', addSongHandler);
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            add_btn.removeEventListener('click', addSongHandler);
        }
    }
}


// Handles form submission, turns form into object to be read by parseInput
function handleSubmit(event) {
    event.preventDefault();
    const form_data = new FormData(event.target);
    
    const new_playlist = Object.fromEntries(form_data.entries());
    return new_playlist;
}

// Parse Input for Adding playlist
function parseInput(playlist, num_songs) {
    console.log(playlist);
    const new_playlist = new Object();
    new_playlist.playlistID = num_playlists.toString();
    num_playlists += 1;
    console.log('new id', num_playlists);
    new_playlist.playlist_name = playlist.playlist_name;
    new_playlist.playlist_author = playlist.creator_name;
    new_playlist.playlist_art = playlist.img_url;
    new_playlist.likes = 0;
    new_playlist.liked = false;
    const keys = Object.keys(playlist);
    console.log('keys', keys);
    let new_songs = [];
    let id = 0;
    for (let i = 0; i < num_songs; i++) {
        id += 1;
        const new_song = new Object();
        new_song.artist = playlist[`song${id}_artist`];
        new_song.title = playlist[`song${id}_name`];
        new_song.album = playlist[`song${id}_album`];
        new_song.duration = playlist[`song${id}_duration`];
        new_song.art = "./assets/img/song.png";
        new_songs.push(new_song);
        console.log(new_song);
    }
    console.log(new_songs);
    new_playlist.songs = new_songs;
    return new_playlist;
}

// Edit Playlist mode
function editPlaylist(data) {
    const cards = document.querySelectorAll(".card");
    edit_button = document.getElementById('edit-playlist');
    edit_button.innerText = "Go back to viewing mode";
    
    // Add event listeners for editing for each card
    cards.forEach((card) => {        
        playlist = document.getElementById(card.id);
        playlist.innerHTML += "<div class='edit-playlist-icon'>EDIT</div>"
        
        to_edit = playlist.getElementsByClassName('edit-playlist-icon')[0];

        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1)';
        })

        to_edit.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            openEditModal(data[findByID(data, card.id)], data);
        })

    })
    isEditToggled = !isEditToggled;
}

// Opens Edit Modal
function openEditModal(playlist, data) {
    modal = document.getElementById('edit-modal');
    const span = modal.getElementsByClassName("close")[0];
    modal.style.display = "block";
    console.log('playlist', playlist);

    console.log(playlist.playlist_name);

    const edit_name = document.getElementById("edit_playlist_name");
    edit_name.setAttribute('value', playlist.playlist_name);

    const edit_creator = document.getElementById("edit_creator_name");
    edit_creator.value = playlist.playlist_author;
    
    // Load all songs with values pre-filled
    let song_entries = ""
    for (let id = 0; id < playlist.songs.length; id++) {
        song_entries += `
            <div class="edit-songs">
            <label for="song${id}_name">Song #${id+1}</label><br>
            <input name="song${id}_name" id="song${id}_name" value="${playlist.songs[id].title}"><br>
            <input name="song${id}_artist" id="song${id}_artist" value="${playlist.songs[id].artist}"><br>
            <input name="song${id}_album" id="song${id}_album" value="${playlist.songs[id].album}"><br>
            <input name="song${id}_duration" id="song${id}_duration" value="${playlist.songs[id].duration}"><br>
            </div>
        `
    }

    let song_form = document.getElementById('edit-modal').getElementsByClassName("songs")[0];
    song_form.innerHTML = song_entries;

    // Handle form submission

    const form = document.getElementById('edit-modal').querySelector('form');

    form.addEventListener('submit', (event) => {
        modal.style.display = "none";
        const edited_playlist = handleSubmit(event);
        console.log(edited_playlist)
        if (edited_playlist.playlist_name !== "") {
            data[findByID(data, playlist.playlistID)].playlist_name = edited_playlist.playlist_name;
        } 
        if (edited_playlist.creator_name !== "") {
            data[findByID(data, playlist.playlistID)].playlist_author = edited_playlist.creator_name;
        } 
        
        for (let i = 0; i < playlist.songs.length; i++) {
            data[findByID(data, playlist.playlistID)].songs[i].artist = edited_playlist[`song${i}_artist`];
            data[findByID(data, playlist.playlistID)].songs[i].title = edited_playlist[`song${i}_name`];
            data[findByID(data, playlist.playlistID)].songs[i].album = edited_playlist[`song${i}_album`];
            data[findByID(data, playlist.playlistID)].songs[i].duration = edited_playlist[`song${i}_duration`];
        }
        displayPlaylists(data);
    });

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Search by Title
function searchTitle(data) {
    const searchBar = document.getElementById('searchBar');
    const enter = document.getElementById('enter-search');
    const clear = document.getElementById('clear-search');
    document.getElementsByName('search-bar')[0].placeholder = "Searching by title..."

    // Add event listener for enter key
    enter.addEventListener('click', searchingByTitle);
    searchBar.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            searchingByTitle();
        }
    })

    // Returns objects that include the search term in playlist name and displays the results
    function searchingByTitle() {
        console.log('searching');
        const searchTerm = searchBar.value.toLowerCase();
        const filteredObjects = data.filter(obj => obj.playlist_name.toLowerCase().includes(searchTerm));
        displayPlaylists(filteredObjects);
    }

    // Clears search bar input, displays data
    clear.addEventListener('click', function() {
        searchBar.value = "";
        displayPlaylists(data);
    })
}

// Search by Author
function searchAuthor(data) {
    const searchBar = document.getElementById('searchBar');
    const enter = document.getElementById('enter-search');
    const clear = document.getElementById('clear-search');
    document.getElementsByName('search-bar')[0].placeholder = "Searching by author..."

    
     // Add event listener for enter key
    enter.addEventListener('click', searchingByAuthor);
    searchBar.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            searchingByAuthor();
        }
    })

    // Returns objects that include the search term in playlist name and displays the results
    function searchingByAuthor() {
        console.log('searching');
        const searchTerm = searchBar.value.toLowerCase();
        const filteredObjects = data.filter(obj => obj.playlist_author.toLowerCase().includes(searchTerm));
        displayPlaylists(filteredObjects);
    }

    // Clears search bar input, displays data
    clear.addEventListener('click', function() {
        searchBar.value = "";
        displayPlaylists(data);
    })
}

// Function for index.html
var isToggled = false;
var isEditToggled = false;
function indexPage() { 
    callingToFetchData().then(data => {
        num_playlists = data.length;
        displayPlaylists(data);

        const sort_playlists = document.getElementsByClassName('dropbtn')[0];
        sort_playlists.addEventListener('click', function(event) {
            console.log('sort clicked');
            document.getElementsByClassName("dropdown-content")[0].style.display = "block";

            window.onclick = function(event) {
                if (!event.target.matches('.dropbtn')) {
                const dropdowns = document.getElementsByClassName("dropdown-content")[0];
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
            sort_playlists.innerText = "Sorted By: Title (A-Z)"
        });

        const sort_by_likes_button = document.getElementById("sort-by-likes");
        sort_by_likes_button.addEventListener('click', function(event) {
            document.getElementsByClassName("dropdown-content")[0].style.display = "none";
            data.sort(function(a,b) {
                const textA = Number(a.likes);
                const textB = Number(b.likes);
                return (textA < textB) ? 1: (textA > textB) ? -1: 0;
            });
            displayPlaylists(data);
            sort_playlists.innerText = "Sorted By: Most Popular"
        });

        const sort_by_data_button = document.getElementById("sort-by-date");
        sort_by_data_button.addEventListener('click', function(event) {
            document.getElementsByClassName("dropdown-content")[0].style.display = "none";
            data.sort(function(a,b) {
                const textA = Number(a.playlistID);
                const textB = Number(b.playlistID);
                return (textA < textB) ? 1: (textA > textB) ? -1: 0;
            });
            displayPlaylists(data);
            sort_playlists.innerText = "Sorted By: Date Added"
        });

        // Add delete button
        const delete_button = document.getElementById("delete-playlist");

        delete_button.addEventListener('click', function(event) {
            if (isToggled) {
                deleteMode(data);
            }
            else {
                displayPlaylists(data);
            }
        });

        // Add add button
        const add_playlist_button = document.getElementById("add-playlist");

        add_playlist_button.addEventListener('click', function(event) {
            addPlaylist(data);
        });

        // Add edit button
        const edit_playlist_button = document.getElementById("edit-playlist");

        edit_playlist_button.addEventListener('click', function(event) {
            if (isEditToggled) {
                editPlaylist(data);
            }
            else {
                displayPlaylists(data);
            }
        });

        //Add search by dropdown
        const search_playlists = document.getElementsByClassName('dropbtn-search')[0];
        search_playlists.addEventListener('click', function(event) {
            console.log('search clicked');
            document.getElementsByClassName("dropdown-search-content")[0].style.display = "block";

            window.onclick = function(event) {
                if (!event.target.matches('.dropbtn-search')) {
                    const dropdowns = document.getElementsByClassName("dropdown-search-content")[0];
                    dropdowns.style.display = "none";
            }}
        })
        // Default is search by title
        searchTitle(data);


        // Add search by author
        const search_title = document.getElementById("search-title");
        search_title.addEventListener('click', function(event) {
            searchTitle(data);
        });

        const search_author = document.getElementById("search-author");
        search_author.addEventListener('click', function(event) {
            searchAuthor(data);
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
        
        const featured_title = document.getElementById('featured-title');
        featured_title.innerText = data[rand].playlist_name;

        const featured_img = document.getElementById('featured-img');
        featured_img.src = data[rand].playlist_art;
    });
}
