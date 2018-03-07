'use strict';

let html_rouleaux = document.getElementById('rouleaux');
let html_points = document.getElementById('points');
let html_mise = document.getElementById('mise');
let img1 = 0,
    img2 = 0,
    img3 = 0;
let points = 90;
let mise = 0;
let gains_data = gains;
let amiser = false;

updateVue();

function updateVue() {
    html_points.innerHTML = "Points : " + points;
    html_mise.innerHTML = "Mise : " + mise;
    html_rouleaux.children[0].innerText = img1;
    html_rouleaux.children[1].innerText = img2;
    html_rouleaux.children[2].innerText = img3;
}

function miser(new_mise) {
    if (mise < 3) {
        mise += new_mise;
        points = points - mise;
        amiser = true;
        updateVue();    
        console.log("Mise OK");
        updateVue();
    }
}

function jouer() {
    if (amiser) {
        console.log("je joue");
        amiser = false;
        mise = 0;
        img1 = Math.floor((Math.random() * 4) + 1);
        img2 = Math.floor((Math.random() * 4) + 1);
        img3 = Math.floor((Math.random() * 4) + 1);
        console.log(img1 + " " + img2 + " " + img3);
        updateGains();
        updateVue();
    } else {
        alert("Vous devez miser");
    }
}

function updateGains() {
    for (let suite in gains) {
        if (gains[suite].img1 == img1 && gains[suite].img2 == img2 && gains[suite].img3 == img3) {
            points += gains[suite].resultat;
        }
    }
}