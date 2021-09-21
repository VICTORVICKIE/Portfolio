var myWindowFade = document.getElementById('start-window-fade'),
myWindow = document.getElementById('window');
myWindowFade.style.width = window.innerWidth + "px";
myWindowFade.style.height = window.innerHeight + "px";
myWindow.style.width = window.innerWidth + "px";
myWindow.style.height = window.innerHeight + "px";
window.onresize = function () {
  myWindowFade.style.width = window.innerWidth + "px";
  myWindowFade.style.height = window.innerHeight + "px";
  myWindow.style.width = window.innerWidth + "px";
  myWindow.style.height = window.innerHeight + "px";
};
var myVar = setInterval(myTimer, 1000);

function myTimer() {
  var date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString();
}

function showTimer() {
  'use strict';
  var myDiv = document.getElementById("history"),
  date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var dt = date.getDate();


  myDiv.textContent = dt + ' / ' + month + ' / ' + year;
}
showTimer();

document.getElementById('strat-win').onclick = function () {
  'use strict';
  if (document.getElementById('start-window-fade').style.opacity <= .1) {
    fadeInByMe(document.getElementById('start-window-fade'));
    fadeInByMe(document.getElementById('start-window'));
  } else if (document.getElementById('start-window-fade').style.opacity >= 1) {
    fadeOutByMe(document.getElementById('start-window-fade'));
    fadeOutByMe(document.getElementById('start-window'));
  }
};

document.getElementById('start-window-fade').onclick = function () {
  'use strict';
  fadeOutByMe(document.getElementById('start-window-fade'));
  fadeOutByMe(document.getElementById('start-window'));
};

document.querySelector('.icons').onclick = function () {
  'use strict';
  fadeOutByMe(document.getElementById('start-window-fade'));
  fadeOutByMe(document.getElementById('start-window'));
};

document.getElementById('show-window').onclick = function () {
  if (document.getElementById('start-window-fade').style.opacity >= 1) {
    fadeOutByMe(document.getElementById('start-window-fade'));
    fadeOutByMe(document.getElementById('start-window'));
  }
  const overlays = document.querySelectorAll('[id^="overlay-"]');

  for(let overlay of overlays){
    if (overlay.style.transform == "scale(1)") {
    overlay.style.transform = "scale(0)";
    let id = overlay.getAttribute('id').replace("overlay", "taskbar");
    document.getElementById(id).style.borderBottom = '2px solid #76b9ed';
  }
  }

};

function fadeOutByMe(element) {
  'use strict';
  var opacity = 1,
  timer = setInterval(function name(params) {
    if (opacity <= .1) {
      clearInterval(timer);
      element.style.display = 'none';
      document.getElementById('container-start').classList.remove('activecontainer');
    }
    element.style.opacity = opacity;
    opacity -= 0.1;
  }, 50);
}
var scor = document.getElementsByClassName('second-column')[0];

function fadeInByMe(element) {
  'use strict';
  var opacity = 0.1,
  timer = setInterval(function name(params) {
    if (opacity >= 1) {
      clearInterval(timer);
    }
    if (opacity >= .5) {
      document.getElementById('container-start').classList.add('activecontainer');
    }
    element.style.opacity = opacity;
    opacity += 0.1;
  }, 50);
  element.style.display = 'block';
}
var computer = document.getElementById('icon-computer');
$('#myTabs a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

// FXNS
const icons = document.querySelector('#icons').children;

for(let icon of icons) {
  let id = icon.getAttribute('id').replace("icon", "overlay");
  icon.addEventListener('dblclick', (e) => open(id))
}


function open(id) {
  var computerOverlay = document.getElementById(id);
  computerOverlay.style.transform = "scale(1)";
  let task_id = id.replace("overlay", "taskbar");
  document.getElementById(task_id).style.display = "block";
}

const x_icons = document.querySelectorAll('[id^="close-"]');

for(let x_icon of x_icons) {
  let id = x_icon.getAttribute('id').replace("close", "overlay");
  x_icon.addEventListener('click', (e) => close(id))
}

function close(id) {
  var computerOverlay = document.getElementById(id);
  computerOverlay.style.transform = "scale(0)";
  let task_id = id.replace("overlay", "taskbar");
  document.getElementById(task_id).style.display = "none";
}

const max_icons = document.querySelectorAll('[id^="maxi-"]');

for(let max_icon of max_icons) {
  let id = max_icon.getAttribute('id').replace("maxi", "overlay");
  max_icon.addEventListener('click', (e) => close_open(id))
}


function close_open(id) {
  var computerOverlay = document.getElementById(id);  
  computerOverlay.style.transform = "scale(0)";
  let task_id = id.replace("overlay", "taskbar");
  document.getElementById(task_id).style.display = "block";
  document.getElementById(task_id).style.borderBottom = '2px solid #76b9ed';
}

const taskbar_icons = document.querySelectorAll('[id^="taskbar-"]');

for(let taskbar_icon of taskbar_icons) {
  let id = taskbar_icon.getAttribute('id').replace("taskbar", "overlay");
  taskbar_icon.addEventListener('click', (e) => open_close(id));
}

function open_close(id) {
    
    var computerOverlay = document.getElementById(id);
    if (computerOverlay.style.transform == "scale(1)") {
    computerOverlay.style.transform = "scale(0)";
    computerOverlay.style.borderBottom = '2px solid #76b9ed';
  } else {
    computerOverlay.style.transform = "scale(1)";
    computerOverlay.style.border = 'none';
  }
}


const overlays = document.querySelectorAll('[id^="overlay-"]');

for(let overlay of overlays) {
  let mouseclick = overlay.querySelector('#first-row-win');
  let isDown;
  mouseclick.addEventListener('mousedown', function (e) {
    isDown = true;
    offset = [
    overlay.offsetLeft - e.clientX,
    overlay.offsetTop - e.clientY];

  }, true);

  document.addEventListener('mouseup', function () {
    isDown = false;
  }, true);

  document.addEventListener('mousemove', function (e) {
    e.preventDefault();
    if (isDown) {
      mousePosition = {

        x: e.clientX,
        y: e.clientY };


      overlay.style.left = mousePosition.x + offset[0] + 'px';
      overlay.style.top = mousePosition.y + offset[1] + 'px';
    }
  }, true);

}

const resizers = document.querySelectorAll('[id^="resizer-"]');

for(let resizer of resizers){

resizer.addEventListener('mousedown', initDrag, false);
let id = resizer.getAttribute('id')
let overlay_id = id.replace("resizer", "overlay");
let overlay = document.getElementById(overlay_id);
overlay.onresize = function () {
  resizer.style.bottom = 0;
  resizer.style.right = 0;
};

let startX, startY, startWidth, startHeight;

function initDrag(e) {
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(document.defaultView.getComputedStyle(overlay).width, 10);
  startHeight = parseInt(document.defaultView.getComputedStyle(overlay).height, 10);
  document.documentElement.addEventListener('mousemove', doDrag, false);
  document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
  overlay.style.width = startWidth + e.clientX - startX + 'px';
  overlay.style.height = startHeight + e.clientY - startY + 'px';
}

function stopDrag(e) {
  document.documentElement.removeEventListener('mousemove', doDrag, false);
  document.documentElement.removeEventListener('mouseup', stopDrag, false);
}
overlay.onscroll = function () {
  resizer.style.bottom = 0 - overlay.scrollTop + "px";
  resizer.style.right = 0;
};
}


const upper_icons = document.querySelectorAll('[id^="upper-"]');

for(let upper_icon of upper_icons){
  upper_icon.addEventListener('click', (e) => upper(upper_icon))
}

function upper(upper_icon) {
  let id = upper_icon.getAttribute('id')
  let div_id = id.replace('upper', 'overlay')
  let div = document.getElementById(div_id)
  div.style.width = "100%";
  div.style.top = "0";
  div.style.left = "0";
  div.style.height = "95.3vh";
  document.getElementById(id).style.display = "none";
  restore_icon = id.replace("upper", "restore")
  document.getElementById(restore_icon).style.display = "inline";
}


const restore_icons = document.querySelectorAll('[id^="restore-"]');

for(let restore_icon of restore_icons){
  restore_icon.addEventListener('click', (e) => restore(restore_icon))
}
function restore(restore_icon) {
  let id = restore_icon.getAttribute('id')
  let div_id = id.replace('restore', 'overlay')
  let div = document.getElementById(div_id)
  div.style.width = "48%";
  div.style.top = "20%";
  div.style.left = "15%";
  div.style.height = "50%";
  document.getElementById(id).style.display = "none";
  upper_icon = id.replace("restore", "upper")
  document.getElementById(upper_icon).style.display = "inline";
}
var body = document.querySelector('body');

function powerOff() {
  body.classList.remove('on');
  body.classList.add('off');
  fadeOutByMe(myWindow);
}


body.addEventListener('dblclick', () => {
  if (body.classList.contains('off')) {
  body.classList.add('on');
  body.classList.remove('off');
  fadeInByMe(myWindow);
  }
});