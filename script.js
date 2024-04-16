const gamePole = document.querySelector('.pole');
const gameBall = document.querySelector('.ball');
const score = document.querySelector('.score')
const img = document.querySelector('img');
const ul = document.querySelector('ul');
const averageDiv = document.querySelector('.average');
const button = document.querySelector('.clear');
const audio = new Audio('./audio/zoidberg.mp3');
const audioBtn = document.createElement('button');

let lastClickTime = null;
let totalInterval = 0;
let clickCount = 0;
let isAudioEnabled = true; //аудио

audioBtn.textContent = '🔊';
audioBtn.className = 'audio'
score.appendChild(audioBtn);
// скролл фикс
ul.style.maxHeight = '900px';
ul.style.overflow = 'auto';
ul.style.scrollbarWidth = 'none'; // для файра
ul.style.msOverflowStyle = 'none';  // экслорер и эдж
ul.style.webkitScrollbar = 'none'; // остальные

// добавить в локал
let data = JSON.parse(localStorage.getItem('data'));
if (data !== null) {
    totalInterval = data.totalInterval;
    clickCount = data.clickCount;
    ul.innerHTML = data.htmlContent;
    averageDiv.innerHTML = `Average time:<i class = "time"> ${(totalInterval / clickCount).toFixed(2)} s</i>`;
}

gameBall.addEventListener('click', function () {
  const now = new Date().getTime();
  if (isAudioEnabled) {
    audio.play();
  }
  if (lastClickTime) {
    const secondsPassed = ((now - lastClickTime) / 1000);
    ul.innerHTML += `<li>${secondsPassed.toFixed(2)}</li>`;
    
    totalInterval += secondsPassed;
    clickCount++;
    averageDiv.innerHTML = `Average time: ${(totalInterval / clickCount).toFixed(2)}s `;
  }
  
  lastClickTime = now;

  let parentHeight = this.parentNode.offsetHeight - this.offsetHeight;
  let parentWidth = this.parentNode.offsetWidth - this.offsetWidth;
  let randomTop = Math.floor(Math.random() * parentHeight);
  let randomLeft = Math.floor(Math.random() * parentWidth);
  this.style.top = randomTop + 'px';
  this.style.left = randomLeft + 'px';

  // записывается в локал
  data = {totalInterval: totalInterval, clickCount: clickCount, htmlContent: ul.innerHTML};
  localStorage.setItem('data', JSON.stringify(data));
});

// очистить результы из локал стораге 
button.addEventListener('click', function () {
  ul.innerHTML = '';
  averageDiv.innerHTML = '';
  totalInterval = 0;
  clickCount = 0;
  lastClickTime = null;
  localStorage.removeItem('data');
});

audioBtn.addEventListener('click', function() {
  // аудио переключалка
  isAudioEnabled = !isAudioEnabled;
  this.innerHTML = isAudioEnabled ? '🔊' : '🔈';
});