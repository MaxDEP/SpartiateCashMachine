'use strict';

let html_rouleaux = document.getElementById('rouleaux');
let html_points = document.getElementById('affichage_points');
let html_mise = document.getElementById('affichage_mise');
let img1 = 0,
    img2 = 0,
    img3 = 0;
let points = 90;
let mise = 0;
let gains_data = gains;
let amiser = false;
let images = [
    "./media/cerise.png",
    "./media/seven.png",
    "./media/cloche.png",
    "./media/bar.png",
    "./media/croix.png"
]
let peutJouer = true;
let peutActualiser = false;

function tourni() {
    let img1_tourni = Math.floor((Math.random() * 5) + 1);
    let img2_tourni = Math.floor((Math.random() * 5) + 1);
    let img3_tourni = Math.floor((Math.random() * 5) + 1);
    html_rouleaux.children[0].children[0].src = images[img1_tourni - 1];
    html_rouleaux.children[1].children[0].src = images[img2_tourni - 1];
    html_rouleaux.children[2].children[0].src = images[img3_tourni - 1];
}

function updateVue() {
    if(!peutActualiser) {
        html_mise.innerHTML = "<p>" + mise + "</p>";
    } else {
        html_mise.innerHTML = "<p>" + mise + "</p>";
        let yolo_tourni = setInterval(tourni, 950);
        setTimeout(function () {
            clearInterval(yolo_tourni);
            html_rouleaux.children[0].children[0].src = images[img1 - 1];
            html_rouleaux.children[1].children[0].src = images[img2 - 1];
            html_rouleaux.children[2].children[0].src = images[img3 - 1];
            peutJouer = true;
            peutActualiser = false;
            html_points.innerHTML = "<p>" + points + "</p>";
        }, 3500);
    }
}

function miserMax() {
    amiser = true;
    mise = 3;
    if (peutJouer) {
        peutActualiser = true;
        updateVue();
        jouer();
        peutJouer = false;
    }
}

function miser() {
    amiser = true;
    mise++;
    if (mise > 3) {
        mise = 1;
    }
    updateVue();
    peutJouer = true;
}

function jouer() {
    if (amiser) {
        if (peutJouer) {
            console.log("je joue");
            points = points - mise;
            img1 = Math.floor((Math.random() * 5) + 1);
            img2 = Math.floor((Math.random() * 5) + 1);
            img3 = Math.floor((Math.random() * 5) + 1);
            console.log(img1 + " " + img2 + " " + img3);
            peutJouer = false;
            peutActualiser = true;
            updateGains();
            updateVue();
        }
    } else {
        alert("Vous devez miser");
    }
}

function updateGains() {
    for (let suite in gains) {
        if (gains[suite].img1 == img1 && gains[suite].img2 == img2 && gains[suite].img3 == img3) {
            points += gains[suite].resultat * mise;
        }
    }
    console.log("Points : " + points + " et la mise " + mise);
    if (img1 == 1 || img2 == 1 || img3 == 1) {
        if (img1 == 1 && img2 == 1 || img1 == 1 && img3 == 1 || img2 == 1 && img3 == 1) {
            points += mise * 2 * 2;
        } else {
            points += mise * 2;
        }
    }
    console.log("Points : " + points + " et la mise " + mise);
}