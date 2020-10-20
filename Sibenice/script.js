const slovnik = ["velikonoční vajíčko", "m e z e r y", "internetové prezentace", "metoda", "třida", "konstruktor", "proměnná", "počítač", "hierarchie", "oprávnění", "přetypování", "ukládání", "načítání", "rovnák na ohejbák", "myš", "klávesnice", "monitor", "vlákno", "paměť", "přemýšlení", "slovník", "myšlenka", "prostředí", "program", "programátor", "céčko", "objekt", "funkce", "lokální", "rychlost", "stabilita", "učebnice", "posloupnost", "univerzální", "multiplatformní", "náhoda", "data", "soubor", "registr", "přístup", "administrátor", "uživatel", "důchodce", "řešení", "úkol", "ipčka", "originalita", "středník", "syntaxe", "zkušenost", "zklamání", "deprese", "naděje", "radost", "nadšení", "život", "okna", "tučňák", "spánek", "čas", "termín", "napětí", "proud", "odpor", "práce", "sebekontrola", "vzrušení", "náhoda", "preemptivní", "konkurence", "kooperativní", "systém", "tečka", "čárka", "vykřičník", "otazník", "jmenný prostor", "jemný porost", "implementace", "antikoncepce", "portál", "operační systém", "systematika", "syntetické sladidlo", "syntetické ředidlo", "selektivní výběr", "subjektivní názor", "objektivní realita", "jelenovi pivo nelej", "defenestrace", "metafora", "metonymie", "aliterace", "epizeuxis", "anafora", "kakofonie", "věta jednoduchá", "souvětí", "mocnina", "odmocnina", "logaritmus", "logaritmická funkce", "slovní úloha", "paradox", "nekonečno", "pád programu", "deficit", "úpadek společnosti", "pud sebezáchovi", "zákon schválnosti", "střední škola informatiky a ekonomie"];
let nahodneSlovo = "";
let pismenaSlovo = [];
let pouzitaPismena = [];
let spatnePismena = [];
let abeceda = ['a', 'á', 'b', 'c', 'č', 'd', 'ď', 'e', 'é', 'ě', 'f', 'g', 'h', 'i', 'í', 'j', 'k', 'l', 'm', 'n', 'ň', 'o', 'ó', 'p', 'q', 'r', 'ř', 's', 'š', 't', 'ť', 'u', 'ú', 'ů', 'v', 'w', 'x', 'y', 'ý', 'z', 'ž']
let pocetZivotu = 0;
let pocetVyher = 0;

const inputSlovo = document.getElementById("inputSlovo");
const inputPismeno = document.getElementById("inputPismeno");
const gameStart = document.getElementById("gameStart");
const gamePlayground = document.getElementById("gamePlayground");
const obtiznost = document.getElementById("obtiznost");
const hadaneSlovo = document.getElementById("hadaneSlovo");
const zivoty = document.getElementById("zivoty");
const spatnaPismena = document.getElementById("spatnaPismena");
const gameNewStart = document.getElementById("gameNewStart");
const input = document.getElementById("input");
const uhodnuta_slova = document.getElementById("uhodnuta_slova");
const BTNewStart = document.getElementById("BTNewStart");

inputSlovo.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        zkusSlovo();
        inputSlovo.value = "";
    }
});
inputPismeno.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        zkusPismeno();
        inputPismeno.value = "";
    }
});
function vyberNahodneSlovo() {
    nahodneSlovo = slovnik[Math.floor(Math.random() * slovnik.length)];
    for (let i = 0; i < nahodneSlovo.length; i++) {
        if (nahodneSlovo[i] == " ") {
            pismenaSlovo.push(false);
        }
        else pismenaSlovo.push(true);
    }
}
function spustNovouHru() {
    pocetZivotu = obtiznost.value;
    gamePlayground.style.display = "block";
    gameStart.style.display = "none";
    spatnaPismena.innerHTML = "";
    gameNewStart.style.display = "none";
    input.style.display = "flex";
    inputPismeno.value = "";
    inputSlovo.value = "";

    vynulovaniVyhranychHer();
    nulovaniHry();
    vyberNahodneSlovo();
    vykresliSlovo();
    vykresliZivoty();
    //console.log(nahodneSlovo);
}
function nulovaniHry() {
    nahodneSlovo = "";
    pismenaSlovo = [];
    pouzitaPismena = [];
    spatnePismena = [];
}
function vykresliSlovo() {
    hadaneSlovo.innerHTML = "";
    for (let i = 0; i < pismenaSlovo.length; i++) {
        let bunka = document.createElement("div");
        //Hubený 2020
        bunka.classList.add("bunkaPismeno");
        if (nahodneSlovo[i] == " ") {
            hadaneSlovo.appendChild(bunka);
            continue;
        }
        bunka.innerText = "_";
        hadaneSlovo.appendChild(bunka);
    }
}
function aktualizujSlovo() {
    const bunky = document.querySelectorAll(".bunkaPismeno");
    for (let i = 0; i < bunky.length; i++) {
        if (pismenaSlovo[i]) {
            bunky[i].innerText = "_";
        }
        else if (i == 0) bunky[i].innerText = nahodneSlovo[i].toUpperCase();
        else bunky[i].innerText = nahodneSlovo[i];
    }
}
function vykresliZivoty() {
    zivoty.innerHTML = "";
    for (let i = 0; i < pocetZivotu; i++) {
        let bunka = document.createElement("img");
        bunka.src = "https://gamepedia.cursecdn.com/minecraft_gamepedia/a/a7/Heart.svg?version=6706cd9e26fc573b58bf84952a2a7f0d";
        bunka.alt = "hp";
        zivoty.appendChild(bunka);
    }
}
function zkusPismeno() {
    const pismeno = testChybVstupu(inputPismeno.value);
    inputPismeno.value = "";
    if (pismeno === "zkusPismenoReturnError") {
        return;
    }

    //řešení diakritiky
    let moznaPismena = [];
    if (pismeno == "a" || pismeno == "á") {
        moznaPismena = ['a', 'á'];
    }
    else if (pismeno == 'č' || pismeno == "c") {
        moznaPismena = ['c', 'č'];
    }
    else if (pismeno == 'ď' || pismeno == "d") {
        moznaPismena = ['d', 'ď'];
    }
    else if (pismeno == 'é' || pismeno == "e" || pismeno == 'ě') {
        moznaPismena = ['e', 'ě', 'é'];
    }
    else if (pismeno == 'í' || pismeno == "i") {
        moznaPismena = ['i', 'í'];
    }
    else if (pismeno == 'ň' || pismeno == "n") {
        moznaPismena = ['n', 'ň'];
    }
    else if (pismeno == 'ó' || pismeno == "o") {
        moznaPismena = ['o', 'ó'];
    }
    else if (pismeno == 'ř' || pismeno == "r") {
        moznaPismena = ['r', 'ř'];
    }
    else if (pismeno == 'š' || pismeno == "s") {
        moznaPismena = ['s', 'š'];
    }
    else if (pismeno == 'ť' || pismeno == "t") {
        moznaPismena = ['t', 'ť'];
    }
    else if (pismeno == 'ú' || pismeno == "u" || pismeno == 'ů' || pismeno == "u") {
        moznaPismena = ['u', 'ú', 'ů'];
    }
    else if (pismeno == 'ý' || pismeno == "y") {
        moznaPismena = ['y', 'ý'];
    }
    else if (pismeno == 'ž' || pismeno == "z") {
        moznaPismena = ['z', 'ž'];
    }
    else moznaPismena = [pismeno];

    //kontrola, zda písmena nebyla použita
    for (let i = 0; i < moznaPismena.length; i++) {
        for (let item of pouzitaPismena) {
            if (item == moznaPismena[i]) {
                return;
            }
        }
    }

    //kontrola, zda je písmeno v řetězci
    let podminka = true;
    for (let item of moznaPismena) {
        pouzitaPismena.push(item);
        for (let i = 0; i < pismenaSlovo.length; i++) {
            if (nahodneSlovo[i] == item) {
                podminka = false;
                pismenaSlovo[i] = false;
            }
        }
    }
    if (podminka) {
        podminka = false;
        pocetZivotu--;
        bliknutiCerveneBarvy();
        vykresliZivoty();
        //Hubený2020
        pridejSpatnePismeno(moznaPismena);
        kontrolaHry();
    }
    else {
        aktualizujSlovo();
        kontrolaHry();
    }
}
function testChybVstupu(vstup) {
    vstup = vstup.toLowerCase();
    for (let item of abeceda) {
        if (item === vstup) {
            return vstup;
        }
    }
    return "zkusPismenoReturnError";
}
function pridejSpatnePismeno(pismena) {
    for (let item of pismena) {
        let bunka = document.createElement("div");
        bunka.classList.add("bunkaSpatnePismeno");
        bunka.innerText = item.toUpperCase();
        spatnaPismena.appendChild(bunka);
    }
}
function zkusSlovo() {
    let slovo = inputSlovo.value;
    inputSlovo.value = "";
    slovo = slovo.toLowerCase();
    if (slovo === nahodneSlovo) {
        //výhra
        konecneVykresleni();
        pricteniVyhranychHer();
    }
    else if (slovo === "") {
        return;
    }
    else {
        pocetZivotu -= 3;
        bliknutiCerveneBarvy();
        vykresliZivoty();
        kontrolaHry();
    }
}
function kontrolaHry() {
    if (pocetZivotu <= 0) {
        konecneVykresleni();
        pocetVyher = 0;
    }
    else {
        //výhra
        for (let item of pismenaSlovo) {
            if (item) {
                return;
            }
        }
        konecneVykresleni();
        pricteniVyhranychHer();
    }
}
function konecneVykresleni() {
    for (let i = 0; i < pismenaSlovo.length; i++) {
        pismenaSlovo[i] = false;
    }
    aktualizujSlovo();
    gameNewStart.style.display = "block";
    input.style.display = "none";
    //Hubený2020
}
function pricteniVyhranychHer() {
    pocetVyher++;
    uhodnuta_slova.innerText = `Počet uhodnutých slov: ${pocetVyher}`;
    BTNewStart.innerText = "Další slovo";
}
function vynulovaniVyhranychHer() {
    uhodnuta_slova.innerText = `Počet uhodnutých slov: ${pocetVyher}`;
    BTNewStart.innerText = "Nová hra";
}
function bliknutiCerveneBarvy() {
    document.body.classList.toggle("bodyBlik");
    setTimeout(function () {
        document.body.classList.toggle("bodyBlik");
    }, 50);
}