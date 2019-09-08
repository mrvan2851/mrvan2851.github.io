function Main(){
    var vm = this;
    this.banner = function(){
        $('#slider').slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay : true,
            autoplaySpeed : 5000,
            prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fal fa-chevron-right"></i></button>',
        });
        $('#article-slider').slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            autoplay : true,
            autoplaySpeed : 5000,
            prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-chevron-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="fal fa-chevron-right"></i></button>',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				}, 
				{
					breakpoint: 560,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
			]
        });
        $('#logo-sliders').slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            autoplay : true,
            autoplaySpeed : 5000,
            arrow:false,
        });
    }
    this.initWow = function(){
        var wow = new WOW({
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:      0,         // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            callback:     function(box) {
                console.log(box)
            },
            scrollContainer: null // optional scroll container selector, otherwise use window
        });
        wow.init();
	}
	this.sticky = function(){
		var header = $('header.header');
		$(window).on('load scroll', function(){
			var scroll = $(window).scrollTop();
			if (scroll >= 100){
				header.addClass('header-fixed');
			}else{
				header.removeClass('header-fixed');
			}
		})
	}
	this.mobileNavbar = function(){
		var body = $('body')
		var wrapper = $('.wrapper')
		var header = $('header.header');
		var btn = header.find('.header-toggle')
		var navbar = header.find('.header-container')
		var isOpen = false 
		btn.on('click', function(event){
			event.preventDefault();
			if( isOpen ){
				btn.removeClass('is-active')
				navbar.removeClass('is-active')
				body.removeClass('navbar-is-open')
			}else{
				btn.addClass('is-active')
				navbar.addClass('is-active')
				body.addClass('navbar-is-open')
			}
			isOpen = !isOpen
		})
		wrapper.on('click', function(event){
			if( !$(event.target).is('header.header , header.header *') && isOpen){
				btn.removeClass('is-active')
				navbar.removeClass('is-active')
				body.removeClass('navbar-is-open')
				isOpen = false
			}
		})
		$(window).on('resize' , function(){
			if( isOpen ){
				btn.removeClass('is-active')
				navbar.removeClass('is-active')
				body.removeClass('navbar-is-open')
				isOpen = false
			}
		})
	}
    this.init = function(){
		this.banner();
		this.sticky();
		this.mobileNavbar();
        this.initWow();
    }
    return this;
}
$(function(){
    var main  = new Main()
    main.init()
})