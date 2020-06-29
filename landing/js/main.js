function SocialPublish(){
	var vm = this 
	vm.init = function(){
		vm.header()
		vm.navbar()
		vm.collapse('#autopost-accordion')
		vm.carousel('#carousel')
	}
	vm.collapse = function(root_element){
		var root = $(root_element)
		if( root.length ){
			var step = 1
			$('.autopost-btn').on('click', function(event){
				var index = $(this).data('target')
				var desktop =  $(this).data('event') == 'desktop' ? true : false 
				if( index != step )	{
					$(this).addClass('is-active')
					$('.autopost-btn').not(this).removeClass('is-active')
					var target = root.find('.autopost-step-' + index) 
					root.find('.collapse').not(target).each(function(){
						var effect = $(this).data('effect')
						if( effect == 'slide' &&  desktop){
							$(this).slideUp( 300 ,function(){
								$(this).removeClass('show')
							})
						}else {
							$(this).hide().removeClass('show')
						}
					})
					target.each(function(){
						var effect = $(this).data('effect')
						if( effect == 'slide' && desktop){
							$(this).slideDown( 300 ,function(){
								$(this).addClass('show')
							})
						}else{
							$(this).fadeIn( 300 ,function(){
								$(this).addClass('show')
							})
						}
					})
					step = index 
				}
			})
		}
	}
	vm.header = function (){
		var header = $('#header')
		$(window).on('load scroll', function(){
			if ( $(this).scrollTop() > header.height()) {
				header.addClass('header-sticky')
			} else {
				header.removeClass('header-sticky')
			}
		})
	}
	vm.navbar = function(){
		var collapse = false 
		var navbar = $('#header .header-navbar')
		var main = $('.wrapper')
		var btn = $('#header .navbar-toggle')
		main.on('click', function(event){
			var target = $(event.target )
			if( target.is('.navbar-toggle , .navbar-toggle *')){
				if( !collapse ){
					navbar.addClass('is-active')
					main.addClass('navbar-is-opened')
					btn.addClass('is-active')
				}else{
					navbar.removeClass('is-active')
					main.removeClass('navbar-is-opened')
					btn.removeClass('is-active')
				}
				collapse = !collapse 
			}else{
				if( collapse && !target.is('#header .header-navbar , #header .header-navbar *')){
					navbar.removeClass('is-active')
					main.removeClass('navbar-is-opened')
					btn.removeClass('is-active')
					collapse = !collapse 
				}
			}	
		})
		$('#header .header-navbar ul li a').on('click', function(event){
			event.preventDefault()
			var id = $(this).attr('href')
			if( collapse  ){
				navbar.removeClass('is-active')
				main.removeClass('navbar-is-opened')
				btn.removeClass('is-active')
				collapse = !collapse 
			}
			if( $(id).length ){
				$("body,html").animate({
					scrollTop: $(id).offset().top - $('#header').height()
				},300);
			}
			
		})
		$(window).on('load scroll' , function(){
			var scrollPos = $(document).scrollTop();
			$('#header .header-navbar ul li a').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if ((refElement.offset().top - $('#header').height() - 1 ) < scrollPos && refElement.position().top + refElement.outerHeight() > scrollPos) {
					$('#header .header-navbar ul li a').removeClass("is-active");
					currLink.addClass("is-active");
				}
				else{
					currLink.removeClass("is-active");
				}
			});
		})
	}
	vm.carousel = function(element){
		if( $(element).length ){
			$(element).slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll:1,
				adaptiveHeight: true,
				appendArrows : '.testimonial-navbar',
				nextArrow : '<button class="testimonial-navbar-next"></button>',
				prevArrow : '<button class="testimonial-navbar-prev"></button>'
			});
		}
		
	}
	vm.init()
	return vm 
}
const SocialPublishMain = new SocialPublish()