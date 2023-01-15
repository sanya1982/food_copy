'use strict';
window.addEventListener('DOMContentLoaded', () => {

	//TABS
	const tabHead = document.querySelectorAll('.tabheader__item'),
		tabContent = document.querySelectorAll('.tabcontent'),
		tabHeads = document.querySelector('.tabheader__items');
	
	function hideTabs() {
		tabContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		tabHead.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}
	function showTabs(i = 0) {
		tabContent[i].classList.add('show', 'fade');
		tabContent[i].classList.remove('hide');
		tabHead[i].classList.add('tabheader__item_active');
	}
	hideTabs();
	showTabs();

	tabHeads.addEventListener('click', (event) => {
		const eTarg = event.target;
		if (eTarg && eTarg.classList.contains('tabheader__item')) {
			tabHead.forEach((item, i) => {
				if(eTarg == item) {
					hideTabs();
					showTabs(i);
				}
			});
		}
	});

	//TIMER
	const deadline = '2023-02-01 GMT+0200';

	function timeLeft(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date());
		let days, hours, minutes, seconds;
		days = Math.floor((t / (1000 * 60 * 60 * 24)));
		hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		minutes = Math.floor((t / (1000 * 60)) % 60);
		seconds = Math.floor((t / (1000)) % 60);
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};		
	}
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}
	function setClock(selector, endtime) {
		let timer = document.querySelector(selector);
		let days, hours, minutes, seconds, timeInterval;
		days = timer.querySelector('#days');
		hours = timer.querySelector('#hours');
		minutes = timer.querySelector('#minutes');
		seconds = timer.querySelector('#seconds');
		timeInterval = setInterval(updateClock, 1000);
		updateClock();

		function updateClock() {
			const t = timeLeft(endtime);
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadline);

	//MODAL
	const contactWithUs = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		btnClose = document.querySelector('[data-close]');

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}
	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	contactWithUs.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	btnClose.addEventListener('click', closeModal);
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});
	const modalTimerId = setInterval(openModal, 5000);

	function scrollOpenModal() {
		if (scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', scrollOpenModal);
		}
	}
	window.addEventListener('scroll', scrollOpenModal);

	//класс для карточек

	class menuCard {
		constructor(src, alt, title, descr, price, parent, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parentClass = document.querySelector(parent);
			this.current = 40;
			this.classes = classes;
			this.exchange();
		}
		exchange() {
			this.price = this.price * this.current;
		}
		render() {
			const element = document.createElement('div');
			this.classes.forEach(className => element.classList.add(className));
			element.innerHTML = `
			<img src="${this.src}" alt="${this.alt}">
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			</div>
			`;
			this.parentClass.append(element);
		}
	}
	new menuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		5.5,
		'.menu .container',
		'menu__item'
	).render();
	new menuCard(
		'img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		14,
		'.menu .container',
		'menu__item'
	).render();
	new menuCard(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		11,
		'.menu .container',
		'menu__item'
	).render();
	

});



// создать класс для карточек с методом по переводу с доллара в гривну и с методом по внесению изменений на страницу
// Создать функцию которая открывает модальное окно при доскроливании страницы до конца(возможно обновить pageYOffset если устарел). И сделать ее одноазовой, что бы она повторно не включалась.