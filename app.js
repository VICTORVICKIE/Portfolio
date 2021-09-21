$(document).ready(function(e) {
	$('img[usemap]').rwdImageMaps();
	// $('img[usemap]').maphilight();
});

var monitor = document.querySelector('#Monitor');
const modal = document.querySelector('.modal');
const display = document.querySelector('.outer');
const container = document.querySelector('.container');
const header = document.querySelector('.header');

monitor.addEventListener('click', (e) => {
	modal.classList.add('open');
	display.classList.add('open');
	container.classList.add('open');
	header.style.opacity = 0;

});

document.querySelector('body').addEventListener('click', (e) => {
	if (e.target.classList.contains('modal')){
		modal.classList.remove('open');
		display.classList.remove('open');
		container.classList.remove('open');
		header.style.opacity = 1;

	}
});

var map = document.querySelector(".map");

const divs = ["tooltip", "pin", "tooltip-content", "arrow", "content"]

const locations = {"Globe":["47%", "19%"],
				   "Frame":["40.5%", "36%"],
				   "Monitor":["45%", "75%"],
				   "Mobile":["64%", "33%"],
				   "Clock":["24%", "33%"]
					}

const tooltips_array = [];

for(area of map.children){
	var area_name = area.getAttribute("title");
	const elements = [];
	const tags = {"h2": "Hello", "p": area_name};
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
}


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

    if (pin.offsetLeft + content.offsetWidth / 2 > fullDiv.offsetWidth) {
      const extraLeft = fullDiv.offsetWidth - (pin.offsetLeft + content.offsetWidth / 2);
      content.style.left = pin.offsetLeft - content.offsetWidth / 2 + extraLeft - 30+ 'px';
      content.style.top = pin.offsetTop + 30 + 'px';
    } 

    else if (pin.offsetLeft + container.offsetLeft < content.offsetWidth / 2 ){
      content.style.left = - container.offsetLeft +'px';
      content.style.top = pin.offsetTop + 30 + 'px';
    } 

    else {
      content.style.left = pin.offsetLeft - content.offsetWidth / 2 + 'px';
      content.style.top = pin.offsetTop + 30 + 'px';
    }
    arrow.style.left = pin.offsetLeft - content.offsetLeft + pin.offsetWidth/2 + 'px';
  })
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