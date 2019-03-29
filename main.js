/* globals fetch */

// const apiUrl = 'https://itunes-api-proxy.glitch.me/search?'


function query(selector) {
    return document.querySelector(selector);
}

function queryAll(selector) {
    return document.querySelectorAll(selector);
}

const searchDiv = query('#search-button');
const searchButton = document.createElement('div');
searchButton.innerText = 'Search Button';
searchButton.addEventListener('click', function() {
    updateInfo(name);
})
searchDiv.appendChild(searchButton);
searchButton.classList.add('search-button');


function getInfo(input) {
    (encodeURIComponent(input));
    let promise = fetch(`https://itunes-api-proxy.glitch.me/search?term=${input}`)
    .then(function(response) {
        if (!response.ok) {
            console.log("error");
            throw Error(response.statusText);
        }
        console.log("past error");
        return response.json();
        
    })
    console.log("to promise");
    return promise;  
}

function updateInfo(name) {
    getInfo(name);
    console.log(name)
    .then(function (searchResult) {
        const trackDiv = query('#track');
        const artist = name;
        query('#artist').innerText = artist;
        let index;
        for (index = 0; index < searchResult.results.length; index++){
            trackItem.innerText = searchResult.results[index].trackName;
        }
    })
}





document.addEventListener('DOMContentLoaded', function() {
    query('#name').addEventListener('change ', function(event){
        console.log(event.target.value)
        updateInfo(event.target.value)
    })
})