// Elements HTML
var html_rouleaux = document.getElementById('rouleaux');
var html_points = document.getElementById('affichage_points');
var html_mise = document.getElementById('affichage_mise');
var html_gains = document.getElementById('gains');

// Variables 
var rouleaux = [0, 0, 0];
var points = 90;
var mise = 0;
var amiser = false;
var peutJouer = true;
var peutActualiser = false;
var gains = [{
        suite: [2, 2, 2],
        gain: parseInt(html_gains.firstElementChild.firstElementChild.children[1].children[1].innerText)
    },
    {
        suite: [3, 3, 3],
        gain: parseInt(html_gains.firstElementChild.firstElementChild.children[2].children[1].innerText)
    },
    {
        suite: [4, 4, 4],
        gain: parseInt(html_gains.firstElementChild.firstElementChild.children[3].children[1].innerText)
    }
];
var images = [
    "./media/cerise.png",
    "./media/seven.png",
    "./media/cloche.png",
    "./media/bar.png",
    "./media/croix.png"
];

// Images random dans les rouleux
function tourni() {
    let img1_tourni = Math.floor((Math.random() * 5) + 1);
    let img2_tourni = Math.floor((Math.random() * 5) + 1);
    let img3_tourni = Math.floor((Math.random() * 5) + 1);
    html_rouleaux.children[0].children[0].src = images[img1_tourni - 1];
    html_rouleaux.children[1].children[0].src = images[img2_tourni - 1];
    html_rouleaux.children[2].children[0].src = images[img3_tourni - 1];
}

// Met à jour les éléments 
function updateVue() {
    if (!peutActualiser) {
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

// Mise max et joue
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

// Mise
function miser() {
    amiser = true;
    mise++;
    if (mise > 3) {
        mise = 1;
    }
    updateVue();
    peutJouer = true;
}

// Joue
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

// Gains en fonction du résultat
function updateGains() {
    console.log("Points : " + points + " et la mise " + mise);
    if (img1 == img2 && img3 == img2) {
        for (let suite in gains) {
            if (gains[suite].img1 == img1 && gains[suite].img2 == img2 && gains[suite].img3 == img3) {
                points += gains[suite].resultat * mise;
            }
        }
    }
    if (img1 == 1 && img2 == 1 && img3 == 1) {
        points += mise * 2 * 2 * 2;
    } else if (img1 == 1 && img2 == 1 || img1 == 1 && img3 == 1 || img2 == 1 && img3 == 1) {
        points += mise * 2 * 2;
    } else {
        points += mise * 2;
    }
    console.log("Points : " + points + " et la mise " + mise);
}