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
			arrows : false,
			dots: true,
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
	this.iconMouse = function(element){
		$('#icon-mouse').on('click', function(event){
			event.preventDefault();
			$('html, body').animate({
				scrollTop: $(element).offset().top - $('header').height()
			}, 700);
		})
	}
	this.initBacktop = function(element){
		$(window).on('load scroll' , function(){
			if ($(this).scrollTop() > 100) {
				$(element).addClass('is-active');
			} else {
				$(element).removeClass('is-active');
			}
		})

		//Click event to scroll to top
		$(element).click(function (event) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, 500);
			return false;
		});
	}
	this.initMap = function(element){
		
		if( $(element).length ){
			
		}
		
		function initialize() {
			var locats = []
			$('.item-location').each(function(index,el){
				var item = $(this).data('location')
				if( item ){
					locats.push(item)
				}
			})
			var mapOptions = {
				zoom: 15,
				center: new google.maps.LatLng(locats[0].lat, locats[0].lng),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

			
			var marker, i;
			var markers = [];
			var infowindow = new google.maps.InfoWindow();

			
			google.maps.event.addListener(map, 'click', function () {
				infowindow.close();
			});
			for (i = 0; i < locats.length; i++) {
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(locats[i].lat, locats[i].lng),
					map: map,
				});

				google.maps.event.addListener(marker, 'click', (function (marker, i) {
					return function () {
						map.setCenter(marker.getPosition());
						infowindow.setContent(
						'<div class="maker-info">'
							+ '<div><h6>' + locats[i].name
							+ '</h6><p><strong>Địa chỉ:</strong>' + locats[i].address
							+ '</p><p><strong>Điện thoại:</strong> ' + locats[i].phone
							+ '</p><p><strong>Fax:</strong> ' + locats[i].fax
							+ '</p></div><div class="clearfix"></div></div>'
						);
						infowindow.open(map, marker);
					}
				})(marker, i));

				markers.push(marker);
			}
			$('.item-location').on('click', '.item-location-name-icon' , function(){
				$('html, body').animate({
					scrollTop: $('#map_canvas').offset().top - $('header').height()
				}, 500);
				var item = $(this).parents('.item-location').data('location')
				if( item ){
					var { lat , lng } = item 
					map.setCenter({lat , lng});
				}
			})
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	}
    this.init = function(){
		this.banner();
		this.sticky();
		this.mobileNavbar();
		this.initWow();
		this.iconMouse ('#mouse-scroll-to');
		this.initBacktop('#btn-backtop')
		this.initMap('#map_canvas')
    }
    return this;
}
$(function(){
    var main  = new Main()
    main.init()
})