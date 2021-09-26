'use strict';   // Mode strict du JavaScript




/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/
let sliderFigure = document.querySelectorAll("figure");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const playButton = document.getElementById("play-pause");
const randomButton = document.getElementById("random");
let timeoutId ;
let count = 0; 
/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/
function refresh()
{
    document.querySelector('.active').classList.remove('active');
    sliderFigure[count].classList.add('active');
}


function onClickPrev()
{
    count --;
    // sliderFigure[count].classList.remove('active');
    if (count == -1){
        count = sliderFigure.length-1;
        // document.querySelector('.active').classList.remove('active');
        // sliderFigure[count].classList.add('active');
        removeDotStyle();
        refresh();
        dotStyle();
    }else{
        // sliderFigure[count].classList.add('active');
        removeDotStyle();
        refresh();
        dotStyle();
        // let listeLi = document.querySelectorAll('div.slider-layout li');// liste li
        // for (let li of listeLi){
        //     let liStyle = li.getAttribute('data-index');
        //     if (count == parseInt(liStyle)) {
        //     li.setAttribute('style','background-color:orange');
        //     break;
        //     }
        // }

        
        // event.setAttribute('style','background-color:orange');
    }
}

function onClickNext()
{
    count ++;
    // sliderFigure[count].classList.remove('active');
    if (count == sliderFigure.length){       
        count = 0 ;
        // sliderFigure[count].classList.add('active');
        removeDotStyle();
        refresh();
        dotStyle();
    }else{
        // sliderFigure[count].classList.add('active');
        removeDotStyle();
        refresh();
        dotStyle();


    }
}

function onClickPlay(event)
{
    // let currentB = event.target;  ALTERNATIVES
    // currentB..classList.contains('fa-play');
    document.querySelector('button i').classList.toggle('fa-play');
    document.querySelector('button i').classList.toggle('fa-pause');
    if(document.querySelector('button i').classList.contains('fa-play')){
        clearInterval(timeoutId);
        }else{timeoutId = setInterval(onClickNext, 1000);
    }
}

function onClickRandom ()
{
    let random;
    do{
        random = getRandomInteger(0,sliderFigure.length-1);
    }while(random == count);
    count = random;
    removeDotStyle();
    refresh();
    dotStyle();
};

function onClickKey(event)
{
    switch(event.key){
        case 'ArrowLeft': 
            onClickPrev();
            break;
        case 'ArrowRight':
            onClickNext();
            break;
        case 'Space':
            onClickPlay();
    }
};

function removeDotStyle()
{
    let listeLi = document.querySelectorAll('div.slider-layout li');
    for (let li of listeLi){
            let liStyle = li.getAttribute('style');
            if(liStyle){
                li.removeAttribute('style');
                break;
            }
        }
};

function dotStyle()
{
    let listeLi = document.querySelectorAll('div.slider-layout li');// liste li
    for (let li of listeLi){
        let liStyle = li.getAttribute('data-index');
        if (count == parseInt(liStyle)) {
        li.setAttribute('style','background-color:orange');
        break;
        }
    }

}
/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

/**
 * Code principal : code JavaScript exécuté dès le chargement de la page
 *
 * Pour s'assurer que le DOM est chargé (puisqu'on va le manipuler), on écoute l'événement 'DOMContentLoaded'
 * sur le document entier. Cet événement est lancé lorsque le navigateur a terminé de constuire le DOM.
 *
 * https://developer.mozilla.org/fr/docs/Web/Events/DOMContentLoaded
 *
 * On utilise en général comme fonction gestionnaire d'événement associée une fonction anonyme car
 * on ne l'appellera jamais ailleurs nous-même.
*/
document.addEventListener('DOMContentLoaded', function(){

prevButton.addEventListener('click', onClickPrev);
nextButton.addEventListener('click', onClickNext);

playButton.addEventListener('click', onClickPlay);
randomButton.addEventListener('click', onClickRandom);

document.addEventListener('keydown', onClickKey);

let oldiv = document.createElement('ol');// on cree une ol
oldiv.className= "slider-dots";
document.querySelector("div.slider-layout").appendChild(oldiv); // on rajoute une ul
for (let i=0 ; i < 6 ; i++){
    let liul = document.createElement('li');// on cree  et on rajoute les li
    liul.setAttribute('data-index', i);
    oldiv.appendChild(liul);
}

oldiv.addEventListener('click', function(e){
    removeDotStyle();
    let event = e.target;
    //condition pour cibler les points en non tout le ul.
    if (parseInt(event.getAttribute('data-index'))>=0 && (parseInt(event.getAttribute('data-index'))<6 )){
        count = parseInt(event.getAttribute('data-index'));
        event.setAttribute('style','background-color:orange');
        refresh();
    }
    
    });

dotStyle();

});