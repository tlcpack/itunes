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
    .then(trackData => { for(let song of Object.values((trackData))[1])
        addTrackName(song)
    })
}

function addTrackName(song) {
    let trackName = document.createElement('div')
    allTracks.append(trackName)
    trackName.innerText = `${song.trackName}`
}

document.addEventListener('DOMContentLoaded', function() {
    query('.search').addEventListener('change', function(event){
        console.log(event.target.value)
        updateMusic(event.target.value)

    })
})