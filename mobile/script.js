"use strict";
var icons = document.querySelectorAll('.icons');
const screen = document.querySelector('.on-screen');
const TL = new TimelineMax();


icons.forEach(icon => {
	icon.addEventListener('click', () => {
		screen.style.zIndex = 2;
		TL.fromTo(screen, 0.5, {y: '100%'}, {y: '0%'}).fromTo(screen, 0.5, {scale: '0'}, {scale: '1'}, "-=0.5");
	})
});

var home = document.querySelector('#home');

home.addEventListener('click', () => {
	TL.fromTo(screen, 0.5, {y: '0%'}, {y: '100%'}).fromTo(screen, 0.5, {scale: '1'}, {scale: '0', onComplete(){screen.style.zIndex = -1}}, "-=0.5");
	});


