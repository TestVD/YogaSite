window.addEventListener('DOMContentLoaded', ()=>{
'use strict';

//tabs

let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContents = document.querySelectorAll('.info-tabcontent');

function hideTabContent(a) {
    for (let tabContent of tabContents) {
        tabContent.classList.remove('show');
        tabContent.classList.add('hide');
    }
}

hideTabContent(1);

function showTabContent(b) {
    if (tabContents[b].classList.contains('hide')){
        tabContents[b].classList.remove('hide');
        tabContents[b].classList.add('show');
    }
}

info.addEventListener('click', (event)=>{
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')){
        for (let i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                hideTabContent(0);
                showTabContent(i);
                break;
            }
        }
    }
});

//timer

let deadline = '2020-08-28';

function getTimeRemaining(endtime) {
     let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

    return {
        'total':t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function setClock(id, endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock(){
        let t = getTimeRemaining(endtime);
        function addZero(num) {
            if (num < 10) {
                return '0'+ num;
            } else {
                return num;
            }
        }

        hours.textContent = addZero(t.hours);
        minutes.textContent = addZero(t.minutes);
        seconds.textContent = addZero(t.seconds);
       
        if (t.total < 0) {
            clearInterval(timeInterval);
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
        }
    }
}

setClock('timer', deadline);

// Modal

let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close'),
    descriptionBtn = document.querySelectorAll('.description-btn');

function showModal() {
    overlay.style.display = 'block';
    more.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
}

more.addEventListener('click', ()=> {
    showModal();
});

close.addEventListener('click', ()=> {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
});

for (let tabContent of tabContents) {
    tabContent.addEventListener('click', (event)=> {
        if (event.target && event.target.classList.contains('description-btn')) {
            showModal();
        } 
    });
}
});