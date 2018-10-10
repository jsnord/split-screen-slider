var $mainSlider,
		slidesArray = [],
		animObject,
		checkAnim = false;

$(document).ready(function ($) {
	$mainSlider = $('.mainSlider');
	
	animObject = {
		'easeOne': Expo.easeOut,
		'sliderChangeTime': .8,
		'subtitleChangeTime': .4
	};

});

$(window).on('load', function () {
	loadFunc();
});

function loadFunc() {
	$('.slider_item', $mainSlider).each(function () {
		var $this = $(this);

		var sub_object = {
			'el': $this,
			'elDescr': $('.slider_descr', $this),
			'elBlockOne': $('.slider_col_in.v1_mod', $this),
			'elBlockTwo': $('.slider_col_in.v2_mod', $this),
			'elSubtitle': $('.slide_block_w_subtitle', $this),
			'elNumber': $('.slider_block_w_number', $this),
			'elImage': $('.slider_w_img', $this)
		};

		slidesArray.push(sub_object);
	});

	TweenMax.staggerFrom([$('.menu_wrap'), $('.logo_wrap'), $('.resources_list'), $('.lang_list')], .8, {
		cycle: {
			y: [-200, -200, 200, 200]
		},
		opacity: 0,
		ease: animObject.easeOne,
		onComplete: function() {
			TweenMax.set([$('.menu_wrap'), $('.logo_wrap'), $('.resources_list'), $('.lang_list')], {clearProps: 'all'});
		}
	})
	TweenMax.from($('.nav_arrows'), .8, {
		opacity: 0,
		x: 100,
		ease: animObject.easeOne,
		onComplete: function() {
			TweenMax.set($('.nav_arrows'), {clearProps: 'all'});
		}
	})

	TweenMax.set(slidesArray[0].el, {className: '+=active'});
	TweenMax.set([slidesArray[0].elBlockOne, slidesArray[0].elBlockTwo], {yPercent: -100});

	sliderInit();
}

function sliderInit() {

	$mainSlider.slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		speed: 0,
		touchMove: false,
		waitForAnimate: false,
		accessibility: false
		// arrows: false
	});

	$('.nav_arrows_control.prev_mod').click(function () {
		if(!checkAnim) {
			$mainSlider.slick("slickPrev");
		}
	});
	
	$('.nav_arrows_control.next_mod').click(function () {
		if(!checkAnim) {
			$mainSlider.slick("slickNext");
		}
	});

	$mainSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {

		if (currentSlide !== nextSlide) {
			slideAnim(nextSlide, currentSlide);
		} else {
			return false;
		}

	});

}

function slideAnim(nextSlide, currentSlide) {
	var tl = new TimelineMax(),
			subTl = new TimelineMax(),
			subTlSecond = new TimelineMax();

	subTl
		.addLabel('start')
		.fromTo(slidesArray[currentSlide].elNumber, animObject.subtitleChangeTime, {
			xPercent: 0
		}, {
			xPercent: -80
		})
		.fromTo(slidesArray[currentSlide].elSubtitle, animObject.subtitleChangeTime, {
			opacity: 1
		}, {
			opacity: 0
		}, 'start+=.2')

	subTlSecond
		.addLabel('start')
		.fromTo(slidesArray[nextSlide].elNumber, animObject.subtitleChangeTime, {
			xPercent: -80
		}, {
			xPercent: 0
		})
		.fromTo(slidesArray[nextSlide].elSubtitle, animObject.subtitleChangeTime, {
			opacity: 0
		}, {
			opacity: 1,
			onComplete: function() {
				checkAnim = false;
			}
		}, 'start+=.2')
	
	if (currentSlide < nextSlide && !checkAnim) {
		checkAnim = true;
		tl
			.add(subTl)
			.addLabel('start')
			.staggerFromTo([slidesArray[currentSlide].elBlockOne, slidesArray[currentSlide].elBlockTwo], animObject.sliderChangeTime, {
				cycle: {
					yPercent: [-100, -100]
				}
			}, {
				cycle: {
					yPercent: [-200, 0],
				},
				ease: animObject.easeOne
			})
			.staggerFromTo([slidesArray[nextSlide].elBlockOne, slidesArray[nextSlide].elBlockTwo], animObject.sliderChangeTime, {
				cycle: {
					yPercent: [100, -200]
				}
			}, {
				cycle: {
					yPercent: [-100, -100]
				},
				ease: animObject.easeOne,
			}, 0, 'start')
			.add(subTlSecond)
	} else if (!checkAnim) {
		checkAnim = true;
		tl
			.add(subTl)
			.addLabel('back')
			.staggerFromTo([slidesArray[currentSlide].elBlockOne, slidesArray[currentSlide].elBlockTwo], animObject.sliderChangeTime, {
				cycle: {
					yPercent: [-100, -100]
				}
			}, {
				cycle: {
					yPercent: [0, -200]
				},
				ease: animObject.easeOne
			})
			.staggerFromTo([slidesArray[nextSlide].elBlockOne, slidesArray[nextSlide].elBlockTwo], animObject.sliderChangeTime, {
				cycle: {
					yPercent: [-200, 100]
				}
			}, {
				cycle: {
					yPercent: [-100, -100],
				},
				ease: animObject.easeOne
			}, 0, 'back')
			.add(subTlSecond)
	}

}