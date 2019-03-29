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
let trackName = document.createElement('div')
const allTracks = query('.tracks')
const allAlbums = query('.albums')


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
        console.log(trackList)
        const tracksDiv = query('.tracks')
        tracksDiv.innerText = "";
        for (let track of trackList.results) {
            songInfoDiv = document.createElement('div')
            addTrackName(track);
            addAlbum(track);
            
        }
    })
}

function addTrackName(song) {
    let trackName = document.createElement('div')
    trackName.classList.add("tracks")
    allTracks.append(trackName)
    trackName.innerHTML = `<span class="label">Track: </span>${song.trackName}`
}

function addAlbum(song) {
    let collectionName = document.createElement('div')
    allAlbums.append(collectionName)
    collectionName.innerText = `${song.collectionName}`;
}

document.addEventListener('DOMContentLoaded', function() {
    query('.search').addEventListener('change', function(event){
        console.log(event.target.value)
        updateMusic(event.target.value)

    })
})