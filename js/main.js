var $mainSlider,
		slidesArray = [],
		animObject,
		checkAnim = false;

$(document).ready(function ($) {
	$mainSlider = $('.mainSlider');
	
	animObject = {
		easeOne: Expo.easeOut
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
			'elSubtitle': $('.slide_block_w_subtitle', $this),
			'elImage': $('.slider_w_img', $this)
		};

		slidesArray.push(sub_object);
	});
	
	sliderInit();

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

function slideAnim(nextSlide, currentSlide, $delay) {
	
	if (!currentSlide && !checkAnim) {
		checkAnim = true;
	} else if (!checkAnim) {
		checkAnim = true;
	}

}