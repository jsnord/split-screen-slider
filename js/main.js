var $mainSlider,
		slidesArray = [],
		checkAnim = false;

$(document).ready(function ($) {
	$mainSlider = $('.mainSlider');
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