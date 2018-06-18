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

	console.log(animObject.easeOne);

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
	TweenMax.set(slidesArray[0].el, {opacity: 1})

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
	var tl = new TimelineMax();
	
	if (currentSlide < nextSlide && !checkAnim) {
		checkAnim = true;
		tl
			.to(slidesArray[currentSlide].elNumber, animObject.subtitleChangeTime, {xPercent: -100})
			.to(slidesArray[currentSlide].elSubtitle, animObject.subtitleChangeTime, {opacity: 0})
			.staggerTo([slidesArray[currentSlide].elBlockOne, slidesArray[currentSlide].elBlockTwo], animObject.sliderChangeTime, {
				cycle: {
					yPercent: [-100, 100]
				},
				ease: animObject.easeOne
			})
			.set(slidesArray[currentSlide].el, {opacity: 0})
			.set(slidesArray[nextSlide].el, {opacity: 1})
			.staggerFromTo([slidesArray[nextSlide].elBlockOne, slidesArray[nextSlide].elBlockTwo], animObject.sliderChangeTime, {
				cycle: {
					yPercent: [100, -100]
				}
			}, {
				yPercent: 0,
				ease: animObject.easeOne,
			})
			.from(slidesArray[nextSlide].elNumber, animObject.subtitleChangeTime, {xPercent: -100})
			.from(slidesArray[nextSlide].elSubtitle, animObject.subtitleChangeTime, {
				opacity: 0,
				onComplete: function() {
					checkAnim = false;
				}
			})
	} else if (!checkAnim) {
		checkAnim = true;
		tl
			// .addLabel('start')
			.to(slidesArray[currentSlide].elNumber, animObject.subtitleChangeTime, {xPercent: -100})
			.to(slidesArray[currentSlide].elSubtitle, animObject.subtitleChangeTime, {opacity: 0})
			.staggerTo([slidesArray[currentSlide].elBlockOne, slidesArray[currentSlide].elBlockTwo], animObject.sliderChangeTime, {
				cycle: {
					yPercent: [100, -100]
				},
				ease: animObject.easeOne
			})
			.set(slidesArray[currentSlide].el, {opacity: 0})
			.set(slidesArray[nextSlide].el, {opacity: 1}, '-=.6')
			.staggerFromTo([slidesArray[nextSlide].elBlockOne, slidesArray[nextSlide].elBlockTwo], animObject.sliderChangeTime, {
				cycle: {
					yPercent: [-100, 100]
				}
			}, {
				yPercent: 0,
				ease: animObject.easeOne
			})
			.fromTo(slidesArray[nextSlide].elNumber, animObject.subtitleChangeTime, {
				xPercent: -100
			}, {
				xPercent: 0
			})
			.to(slidesArray[nextSlide].elSubtitle, animObject.subtitleChangeTime, {
				opacity: 1,
				onComplete: function() {
					checkAnim = false;
				}
			})
	}

}