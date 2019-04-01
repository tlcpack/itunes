/* globals fetch */

// const apiUrl = 'https://itunes-api-proxy.glitch.me/search?'


function query(selector) {
    return document.querySelector(selector);
}

function queryAll(selector) {
    return document.querySelectorAll(selector);
}

const searchValue = query('.search input')
const searchbutton = query('.search button')
const search = query('.search_button')

const allTracks = query('.tracks')
const allAlbums = query('.albums')


const songInfoDiv = document.createElement('div')



function getMusic(name) {
    const promise = fetch(
        `https://itunes-api-proxy.glitch.me/search?term=${name}`
        ).then(function (response) {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            return response.json()
        })
        return promise
}

function updateMusic(name) {
    getMusic(name)
    .then(function (trackList) {
        
        allTracks.innerHTML = "";
        for (let track of trackList.results) {
            
            addTrackName(track)
            // addAlbum(track)
            
            
        }
    })
}

function addTrackName(song) {
    // makes the div
    
    let trackName = document.createElement('div')
    
    trackName.classList.add("song_box")
    // trackName.classList.add("tracks")
    // puts the div into the tracks class
    allTracks.append(trackName)
    // adding HTML
    trackName.innerHTML = `<div class="track_info"><img class="image" src="${song.artworkUrl100}"/><div class="song"><br>Track: "${song.trackName}" from the album ${song.collectionName}</div></div><br>Preview:<br><br><audio controls loop src="${song.previewUrl}">Your browser does not support the <code>audio</code> element.</audio>`
    


}

function addAlbum(song) {
    let collectionName = document.createElement('div')
    allAlbums.append(collectionName)
    // collectionName.innerText = `${song.collectionName}`;
}

document.addEventListener('DOMContentLoaded', function() {
    query('.search').addEventListener('change', function(event){
        console.log(event.target.value)
        
        updateMusic(event.target.value)

    })
})