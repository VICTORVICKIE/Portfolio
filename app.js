$(document).ready(function(e) {
	$('img[usemap]').rwdImageMaps();
	// $('img[usemap]').maphilight();
});


console_text(words = ["VK's Portfolio", "VK's Résumé"], id = "Title", 
						colors = [["#eee", "#333"],
											["hsl(98, 100%, 62%)", "hsl(204, 100%, 59%)"],
											["hsl(20, 87%, 63%)", "hsl(345, 85%, 67%)"],
											["rgb(224,255,255)", "rgb(0,255,255)"], 
											["rgb(201,242,39)", "rgb(242,161,39)"]], wait = true);

console_text(words = ["This is an Interactive Image, Click over the Objects to know about me. Responsive Version Coming Soon for small devices!"], id = "info", colors = ['#000'], wait = true);

function console_text(words, id, colors, wait = false) {
  if (colors === undefined) colors = ['#000'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id);
	if (id === "Title"){
	  target.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + colors[0][0] + ',' + colors[0][1] + ')';
	  target.style.WebkitBackgroundClip = "text";
	  target.style.WebkitTextFillColor = "transparent";
	}
	else{
		target.style.fontSize = "20px";
		target.style.color = colors[0];
	}
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
  			if (id === "Title"){
				  target.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + colors[0][0] + ',' + colors[0][1] + ')';
				  target.style.WebkitBackgroundClip = "text";
				  target.style.WebkitTextFillColor = "transparent";
				}
				else{
				target.style.fontSize = "20px";

				target.style.color = colors[0];
			}
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = wait;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}



var monitor = document.querySelector('#Monitor');
const modal = document.querySelector('.modal');
const display = document.querySelector('.outer');
const container = document.querySelector('.container');
const header = document.querySelector('#Title');
const underscore = document.querySelector('.console-underscore');
var image = document.querySelector('.inner');

monitor.addEventListener('click', (e) => {
	modal.classList.add('open');
	display.classList.add('open');
	container.classList.add('open');
	header.style.opacity = 0;
	underscore.style.opacity = 0;
	console.log(image.clientWidth, image.clientHeight);

});

document.querySelector('body').addEventListener('click', (e) => {
	if (e.target.classList.contains('modal')){
		modal.classList.remove('open');
		display.classList.remove('open');
		container.classList.remove('open');
		header.style.opacity = 1;
		underscore.style.opacity = 1;

	}
});

var map = document.querySelector(".map");

const divs = ["tooltip", "pin", "tooltip-content", "arrow", "content"]

const locations = {"Globe":["57%", "73.5%", "top"],
								   "Frame":["40.5%", "26%", "bottom"],
								   "Monitor":["0%", "0%", "empty"],
								   "Mobile":["72%", "65.5%", "bottom"],
								   "Clock":["11%", "20%", "top"]
									}

const contents = {"Globe": "Villivakkam, Chennai, TN, India",
								   "Frame":"My Father, N Saravana Kumar, <br/> Parlay's Business Sub-Dealer",
								   "Monitor":"",
								   "Mobile":"Contact : +91-8056113969 <br/> Email : vigneshkumar.s.2018.aero@rajalakshmi.edu.in",
								   "Clock":"Date of Birth : 02 / 09 / 2000"

}

const tooltips_array = [];

for(area of map.children){
	var area_name = area.getAttribute("title");
	const elements = [];
	const tags = {"h2": "", "p": area_name};
	for (let div of divs) {
		var div_tag = document.createElement("div");
		div_tag.classList.add(div);
		elements.push(div_tag);
	}

	for (const [key, value] of Object.entries(tags)) {
		var html_tag = document.createElement(key);
		var text = document.createTextNode(value);
		html_tag.appendChild(text);
		elements.push(html_tag);

	}

	while (elements.length > 1){
		n = elements.length;
		elements[n - 3].append(elements[n - 2], elements[n - 1]);

		for (let i = 0; i < 2; i++) {
			elements.splice(-1, 1);
		}
	}
	elements[0].classList.add(area_name + "-tooltip");
	tooltips_array.push(elements[0]);
}

var element = document.getElementById("all-tooltip");
for(let tooltip of tooltips_array){
element.append(tooltip);}

for (let area of map.children){
	var area_name = area.getAttribute("title");
	const pin_div = document.querySelector("." + area_name + "-tooltip .pin");
	pin_div.style.visibility = "hidden";
	pin_div.style.top = locations[area_name][0];
	pin_div.style.left = locations[area_name][1];
	pin_div.classList.add(locations[area_name][2]);
}


const content_tag = document.querySelectorAll(".content");
content_tag.forEach(tag => {
	id = tag.querySelector('p').textContent;
	tag.innerHTML = contents[id];
})


const tooltip_content = document.querySelectorAll('.tooltip-content .content');

const tooltips = document.querySelectorAll('.all-tooltip .tooltip');
const fullDiv = document.querySelector('section');
// const container = document.querySelector('.container')

window.addEventListener('DOMContentLoaded', content_position);
window.addEventListener('resize', content_position);

function content_position(){
  tooltips.forEach(tooltip => {

    const pin = tooltip.querySelector('.pin');
    const content = tooltip.querySelector('.tooltip-content')
    const arrow = tooltip.querySelector('.arrow');
    var content_height = 0;
			if (pin.classList.contains('bottom'))
			{
				arrow.style.borderBottomColor = "rgb(255, 255, 255)";
				content_height = 30;
			} 

			else if (pin.classList.contains('top'))
			  {
			  	arrow.style.borderTopColor = "rgb(255, 255, 255)";
			  	arrow.style.top = content.offsetHeight + (content.offsetHeight * 0.20) + 'px';
			  	content_height = -content.offsetHeight;
			  }

    	if (pin.offsetLeft + content.offsetWidth / 2 > fullDiv.offsetWidth) {
          const extraLeft = fullDiv.offsetWidth - (pin.offsetLeft + content.offsetWidth / 2);
          content.style.left = pin.offsetLeft - content.offsetWidth / 2 + extraLeft - 30+ 'px';
          content.style.top = pin.offsetTop + content_height + 'px';
        } 
    
        else if (pin.offsetLeft + container.offsetLeft < content.offsetWidth / 2 ){
          content.style.left = - container.offsetLeft +'px';
          content.style.top = pin.offsetTop + content_height + 'px';
        } 
    
        else {
          content.style.left = pin.offsetLeft - content.offsetWidth / 2 + 'px';
          content.style.top = pin.offsetTop + content_height + 'px';
        }
        arrow.style.left = pin.offsetLeft - content.offsetLeft + pin.offsetWidth/2 + 'px';
  });
}

tooltips.forEach(tooltip => {
	var object = tooltip.classList[1].replace('-tooltip', '')
	const pin = document.getElementById(object);

		pin.addEventListener('click', (event) => {
			tooltips.forEach(tooltip => {
			tooltip.classList.remove("active");
			});
		event.stopPropagation();
		tooltip.classList.add("active");
	})
	
	const section = document.querySelector("section");

	section.addEventListener('click', () => {
		tooltip.classList.remove("active");
	})
})


function media_query(query) {
  var iframe = document.querySelector("#iframe");
  if (query.matches) {
  	// console.log("Mobile", iframe);
  	iframe.src = "./mobile/mobile.html"
  	iframe.style.cssText = "  top: 8.5%; left: 15.5%; bottom: 0; right: 0; width: 70.75%; height: 86.5%;  position: absolute; border: none;"

  } else {
    console.log("Not Mobile");
  	iframe.src = "./windows/windows.html"
  	iframe.style.cssText = "  top: 19.9%; left: 25.90%; bottom: 0; right: 0; width: 47%; height: 48.9%;  position: absolute; border: none;"
	}
}

var query = window.matchMedia("(max-width: 768px)")
media_query(query)
query.addListener(media_query)

// iframe.style.cssText = "  top: 11.5vh; left: 15vw; bottom: 0; right: 0; width: 72.5vw; height: 80vh;"
