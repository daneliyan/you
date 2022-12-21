$(document).ready(function () {

	// -------------------- Read more -----------------------
	const ReadMore = (() => {
		let s;

		return {

			settings() {
				return {
					content: document.querySelectorAll('.js-read-more'),
					originalContentArr: [],
					truncatedContentArr: [],
					moreLink: "Читать полностью...",
					lessLink: "Свернуть",
				}
			},

			init() {
				s = this.settings();
				this.bindEvents();
			},

			bindEvents() {
				ReadMore.truncateText();
			},

			/**
			 * Count Words
			 * Helper to handle word count.
			 * @param {string} str - Target content string.
			 */
			countWords(str) {
				return str.split(/\s+/).length;
			},

			/**
			 * Ellpise Content
			 * @param {string} str - content string.
			 * @param {number} wordsNum - Number of words to show before truncation.
			 */
			ellipseContent(str, wordsNum) {
				return str.split(/\s+/).slice(0, wordsNum).join(' ') + '...';
			},

			/**
			 * Truncate Text
			 * Truncate and ellipses contented content
			 * based on specified word count.
			 * Calls createLink() and handleClick() methods.
			 */
			truncateText() {

				for (let i = 0; i < s.content.length; i++) {
					//console.log(s.content)
					const originalContent = s.content[i].innerHTML;
					const numberOfWords = s.content[i].dataset.rmWords;
					const truncateContent = ReadMore.ellipseContent(originalContent, numberOfWords);
					const originalContentWords = ReadMore.countWords(originalContent);

					s.originalContentArr.push(originalContent);
					s.truncatedContentArr.push(truncateContent);

					if (numberOfWords < originalContentWords) {
						s.content[i].innerHTML = s.truncatedContentArr[i];
						let self = i;
						ReadMore.createLink(self)
					}
				}
				ReadMore.handleClick(s.content);
			},

			/**
			 * Create Link
			 * Creates and Inserts Read More Link
			 * @param {number} index - index reference of looped item
			 */
			createLink(index) {
				const linkWrap = document.createElement('span');

				linkWrap.className = 'read-more__link-wrap';

				linkWrap.innerHTML = `<a id="read-more_${index}" class="read-more__link" style="cursor:pointer;">${s.moreLink}</a>`;

				// Inset created link
				s.content[index].parentNode.insertBefore(linkWrap, s.content[index].nextSibling);

			},

			/**
			 * Handle Click
			 * Toggle Click eve
			 */
			handleClick(el) {
				const readMoreLink = document.querySelectorAll('.read-more__link');

				for (let j = 0, l = readMoreLink.length; j < l; j++) {

					readMoreLink[j].addEventListener('click', function () {

						const moreLinkID = this.getAttribute('id');
						let index = moreLinkID.split('_')[1];

						el[index].classList.toggle('is-expanded');

						if (this.dataset.clicked !== 'true') {
							el[index].innerHTML = s.originalContentArr[index];
							this.innerHTML = s.lessLink;
							this.dataset.clicked = true;
						} else {
							el[index].innerHTML = s.truncatedContentArr[index];
							this.innerHTML = s.moreLink;
							this.dataset.clicked = false;
						}
					});
				}
			},

			/**
			 * Open All
			 * Method to expand all instances on the page.
			 */
			openAll() {
				const instances = document.querySelectorAll('.read-more__link');
				for (let i = 0; i < instances.length; i++) {
					content[i].innerHTML = s.truncatedContentArr[i];
					instances[i].innerHTML = s.moreLink;
				}
			}
		}
	})();

	ReadMore.init()

	// ----------------- Password input ---------------------
	$('body').on('click', '#loginPasswordControl', function () {
		if ($('#loginPasswordInput').attr('type') == 'password') {
			$(this).addClass('view');
			$('#loginPasswordInput').attr('type', 'text');
		} else {
			$(this).removeClass('view');
			$('#loginPasswordInput').attr('type', 'password');
		}
		return false;
	});
	$('body').on('click', '#signPasswordControl', function () {
		if ($('#signPasswordInput').attr('type') == 'password') {
			$(this).addClass('view');
			$('#signPasswordInput').attr('type', 'text');
		} else {
			$(this).removeClass('view');
			$('#signPasswordInput').attr('type', 'password');
		}
		return false;
	});
	$('body').on('click', '#signVerifyPasswordControl', function () {
		if ($('#signVerifyPasswordInput').attr('type') == 'password') {
			$(this).addClass('view');
			$('#signVerifyPasswordInput').attr('type', 'text');
		} else {
			$(this).removeClass('view');
			$('#signVerifyPasswordInput').attr('type', 'password');
		}
		return false;
	});

	// -------------------- burger --------------------------
	const navMenu = document.getElementById('nav-menu'),
		navToggle = document.getElementById('nav-toggle'),
		navClose = document.getElementById('nav-close'),
		body = document.querySelector('body');

	/*===== MENU SHOW =====*/
	if (navToggle) {
		navToggle.addEventListener('click', () => {
			navMenu.classList.add('show-menu');
		})
	}

	/*===== MENU HIDDEN =====*/
	if (navClose) {
		navClose.addEventListener('click', () => {
			navMenu.classList.remove('show-menu');
		})
	}

	/*=============== REMOVE MENU MOBILE ===============*/
	const navLink = document.querySelectorAll('.nav__link')

	const linkAction = () => {
		const navMenu = document.getElementById('nav-menu')
		navMenu.classList.remove('show-menu');
		body.classList.remove('dis-scroll');
	}
	navLink.forEach(n => n.addEventListener('click', linkAction));

	// --------------------- Tabs ---------------------------
	var tab = $('#tabs .tabs-items > div');
	tab.hide().filter(':first').show();
	// Клики по вкладкам.
	$('#tabs .tabs-nav a').click(function () {
		tab.hide();
		tab.filter(this.hash).show();
		$('#tabs .tabs-nav a').removeClass('active');
		$(this).addClass('active');
		return false;
	}).filter(':first').click();
	// Клики по якорным ссылкам.
	$('.tabs-target').click(function () {
		$('#tabs .tabs-nav a[href=' + $(this).attr('href') + ']').click();
	});
	// Отрытие вкладки из хеша URL
	if (window.location.hash) {
		$('#tabs-nav a[href=' + window.location.hash + ']').click();
		window.scrollTo(0, $("#".window.location.hash).offset().top);
	};
	// --------------------- Charact Tabs ---------------------------
	var tab = $('#charact-tabs .tabs-items > div');
	tab.hide().filter(':first').show();
	// Клики по вкладкам.
	$('#charact-tabs .tabs-nav a').click(function () {
		tab.hide();
		tab.filter(this.hash).show();
		$('#charact-tabs .tabs-nav a').removeClass('active');
		$(this).addClass('active');
		return false;
	}).filter(':first').click();
	// Клики по якорным ссылкам.
	$('.tabs-target').click(function () {
		$('#charact-tabs .tabs-nav a[href=' + $(this).attr('href') + ']').click();
	});
	// Отрытие вкладки из хеша URL
	if (window.location.hash) {
		$('#charact-tabs-nav a[href=' + window.location.hash + ']').click();
		window.scrollTo(0, $("#".window.location.hash).offset().top);
	};
	
	//--------------- fancybox -----------

	$('[data-fancybox="galleryKp"]').fancybox({
		Thumbs: false,
		Toolbar: false,
		Image: {
			zoom: false,
			click: false,
			wheel: "slide",
		},
		backFocus: false,
		lang: 'ru',
		hideScrollbar: false,
		i18n: {
			ru: {
				CLOSE: 'Закрыть',
				NEXT: 'Вперёд',
				PREV: 'Назад',
				FULL_SCREEN: 'На весь экран',
			}
		},
		buttons: [
			"fullScreen",
			"close"
		]
	});
	$('[data-fancybox="galleryJk"]').fancybox({
		Thumbs: false,
		Toolbar: false,
		Image: {
			zoom: false,
			click: false,
			wheel: "slide",
		},
		backFocus: false,
		lang: 'ru',
		hideScrollbar: false,
		i18n: {
			ru: {
				CLOSE: 'Закрыть',
				NEXT: 'Вперёд',
				PREV: 'Назад',
				FULL_SCREEN: 'На весь экран',
			}
		},
		buttons: [
			"fullScreen",
			"close"
		]
	});
	$('[data-fancybox="galleryApart"]').fancybox({
		Thumbs: false,
		Toolbar: false,
		Image: {
			zoom: false,
			click: false,
			wheel: "slide",
		},
		backFocus: false,
		lang: 'ru',
		hideScrollbar: false,
		i18n: {
			ru: {
				CLOSE: 'Закрыть',
				NEXT: 'Вперёд',
				PREV: 'Назад',
				FULL_SCREEN: 'На весь экран',
			}
		},
		buttons: [
			"fullScreen",
			"close"
		]
	});

	// -------------------- svg--------------------------
	function svg() {
		$('img[src$=".svg"]').each(function () {
			var $img = $(this);
			var imgURL = $img.attr('src');
			var attributes = $img.prop('attributes');
			if ($img.hasClass('svg')) {
				$.get(imgURL, function (data) {
					var $svg = jQuery(data).find('svg');
					$svg = $svg.removeAttr('xmlns:a');
					$.each(attributes, function () {
						$svg.attr(this.name, this.value);
					});
					$img.removeClass('svg').replaceWith($svg);
				}, 'xml');
			}
		});
	}
	svg();	

	// ----------------- SWIPER ----------------------
	var swiper = new Swiper(".heroSwiper", {
    spaceBetween: 5,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
    },
    breakpoints: {
      320: {
        autoHeight: true,
      },
      1025: {
        autoHeight: false,
      }
    }
	});

	var swiper = new Swiper(".specialSwiper", {
		grabCursor: true,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		navigation: {
			nextEl: ".specialSwiper-next",
			prevEl: ".specialSwiper-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        navigation: false,
        autoHeight: true,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: true,
        autoHeight: false,
      }
    }
	});

	var swiper = new Swiper(".jk-blSwiper", {
		slidesPerView: 3,
		spaceBetween: 20,
    grabCursor: true,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		navigation: {
			nextEl: ".jk-blSwiper-next",
			prevEl: ".jk-blSwiper-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        autoHeight: true,
      },
      769: {
        slidesPerView: 2,
        spaceBetween: 10,
        autoHeight: false,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
        autoHeight: false,
      }
    }
	});

	var swiper = new Swiper(".videosSwiper", {
		centeredSlides: true,
		loop: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      1025: {
        slidesPerView: 3,
        spaceBetween: 0,
      }
    }
	});

	var swiper = new Swiper(".consultSwiper", {
		slidesPerView: 1,
    spaceBetween: 20,
    pagination: true,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		navigation: {
			nextEl: ".consultSwiper-next",
			prevEl: ".consultSwiper-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
	});

	var swiper = new Swiper(".partnersSwiper", {
		slidesPerView: 4,
		spaceBetween: 48,
		grabCursor: true,
		loop: true,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		pagination: {
			el: ".partnersSwiper-pagination",
			clickable: true,
    },
    navigation: {
      nextEl: ".partnersSwiper-next",
      prevEl: ".partnersSwiper-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      400: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1025: {
        spaceBetween: 48,
        autoplay: {
          delay: 6000,
        },
      }
    }
	});

	var swiper = new Swiper(".advantSwiper", {
		slidesPerView: 1,
		spaceBetween: 20,
		grabCursor: true,
		// loop: true,
		navigation: {
			nextEl: ".advantSwiper-next",
			prevEl: ".advantSwiper-prev",
		},
		pagination: {
			el: ".advantSwiper-pagination",
			clickable: true,
		},
	});

	var swiperKp = new Swiper(".kpSecondSwiper", {
		spaceBetween: 16,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
		breakpoints: {
			320: {
				slidesPerView: 4,
			},
			576: {
				slidesPerView: 5,
			},
			768: {
				slidesPerView: 7,
			},
			1024: {
				slidesPerView: 11,
			}
		}
	});
	var swiper2 = new Swiper(".kpMainSwiper", {
		spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next--fluid",
			prevEl: ".swiper-button-prev--fluid",
		},
		thumbs: {
			swiper: swiperKp,
		},
	});

	var swiperJk = new Swiper(".jkSecondSwiper", {
		spaceBetween: 16,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
		breakpoints: {
			320: {
				slidesPerView: 4,
			},
			576: {
				slidesPerView: 5,
			},
			768: {
				slidesPerView: 7,
			},
			1024: {
				slidesPerView: 11,
			}
		}
	});
	var swiper2 = new Swiper(".jkMainSwiper", {
		spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next--fluid",
			prevEl: ".swiper-button-prev--fluid",
		},
		thumbs: {
			swiper: swiperJk,
		},
	});

	var swiperApart = new Swiper(".apartSecondSwiper", {
		spaceBetween: 16,
		freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        spaceBetween: 8,
        slidesPerView: 5,
      },
      1025: {
        spaceBetween: 16,
        slidesPerView: 7,
      },
    },
	});
	var swiper2 = new Swiper(".apartMainSwiper", {
		spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next--fluid",
			prevEl: ".swiper-button-prev--fluid",
		},
		pagination: {
			el: ".swiper-pagination--fluid",
			clickable: true,
		},
		thumbs: {
			swiper: swiperApart,
		},
	});

	var swiper = new Swiper(".similarSwiper", {
		grabCursor: true,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
    },
    breakpoints: {
      320: {
        spaceBetween: 10,
        slidesPerView: 1,
      },
      576: {
        spaceBetween: 14,
        slidesPerView: 2,
      },
      1025: {
        spaceBetween: 26,
        slidesPerView: 3,
      },
    },
	});

	// ------------------- Choices Select ------------------
	const multiDefault = () => {
		const elements = document.querySelectorAll('.select-default');
		elements.forEach(element => {
			// const choices = new Choices(el, {
			// 	searchEnabled: false,
			// 	noResultsText: 'Ничего не найдено'
			// });
			const choices = new Choices(element, {
				searchEnabled: false,
				itemSelectText: '',
			});
		});
	}
	multiDefault();

	const multiWallet = () => {
		const elements = document.querySelectorAll('.select-wallet');
		elements.forEach(element => {
			const choices = new Choices(element, {
				searchEnabled: false,
				itemSelectText: '',
			});
		});
	}
	multiWallet();

	const multiSort = () => {
		const elements = document.querySelectorAll('.select-sort');
		elements.forEach(element => {
			const choices = new Choices(element, {
				searchEnabled: false,
				itemSelectText: '',
			});
		});
	}
	multiSort();


	// -------------------------modal----------------------
	$('.to-state').on('click', function (event) {
		event.preventDefault();
		$('div').removeClass('active');
		$('.state').removeClass('active');
		var state = $(this).attr('data-state');
		$('.state[data-state=' + state + ']').addClass('active');
	});
	$('.icon-close').on('click', function (event) {
		$(this).parents().removeClass('active');
	});
	jQuery(function ($) {
		$(document).mouseup(function (e) { // событие клика по веб-документу
			var div = $(".state-box"); // тут указываем ID элемента
			if (!div.is(e.target) // если клик был не по нашему блоку
				&& div.has(e.target).length === 0) { // и не по его дочерним элементам
				div.parents().removeClass('active'); // скрываем его
				$('body').removeClass('modal-open');
			}
		});
	});

});


if ($('.gallerySwiper').length > 0) { //some-slider-wrap-in
	let swiperInstances = [];
	$(".gallerySwiper").each(function (index, element) { //some-slider-wrap-in
		const $this = $(this);
		$this.addClass("instance-" + index); //instance need to be unique (ex: some-slider)
		$this.parent().find(".swiper-pagination--fluid").addClass("pagination-" + index);
		$this.parent().find(".swiper-button-prev--fluid").addClass("prev-" + index); //prev must be unique (ex: some-slider-prev)
		$this.parent().find(".swiper-button-next--fluid").addClass("next-" + index); //next must be unique (ex: some-slider-next)
		swiperInstances[index] = new Swiper(".instance-" + index, { //instance need to be unique (ex: some-slider)
			spaceBetween: 4,
			navigation: {
				prevEl: ".prev-" + index,  //prev must be unique (ex: some-slider-prev)
				nextEl: ".next-" + index, //next must be unique (ex: some-slider-next)
			},
			pagination: {
				el: '.pagination-' + index,
				clickable: true
			},
		});
	});

	// Now you can call the update on a specific instance in the "swiperInstances" object
	// e.g.
	swiperInstances[3].update();
	//or all of them
	setTimeout(function () {
		for (const slider of swiperInstances) {
			slider.update();
		}
	}, 50);
}