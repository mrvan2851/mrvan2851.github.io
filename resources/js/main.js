function Main(){
    var vm = this;
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
		var navbar = header.find('#navbar')
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
		this.sticky();
		smartScroll.init({
			activeClass:"is-active",
			offset: 60
		})
		this.mobileNavbar();
		// this.initWow();
    }
    return this;
}
$(function(){
    var main  = new Main()
    main.init()
})