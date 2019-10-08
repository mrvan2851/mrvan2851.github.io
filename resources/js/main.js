function Main(){
    var vm = this;
	this.sticky = function(){
		var header = $('header.header');
		$(window).on('load scroll', function(){
			var scroll = $(window).scrollTop();
			if (scroll >= $('.header-top').height()){
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
	this.initModalVideo = function(element){
		var $videoSrc;
		var modal = $(element)
		var video = modal.find('iframe')
		var btn = $('.btn-modal-video')
		btn.click(function () {
			$videoSrc = $(this).data("src");
			modal.modal('show')
		});
		modal.on('shown.bs.modal', function (e) {
			video.attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
		})
		modal.on('hide.bs.modal', function (e) {
			video.attr('src', '');
		})
	}
	this.initModalArticle = function(element){
		var modal = $(element)
		var btn = $('.btn-modal-article')
		btn.click(function () {
			var box = $(this).data("box");
			$(box).addClass('is-active')
			modal.modal('show')
		});
		modal.on('hide.bs.modal', function (e) {
			modal.find('.box').removeClass('is-active')
		})
	}
    this.init = function(){
		this.sticky();
		smartScroll.init({
			activeClass:"is-active",
			offset: 60
		})
		this.initModalVideo('#modal-popup-video');
		this.initModalArticle('#modal-popup-article');
		this.mobileNavbar();
		
    }
    return this;
}
$(function(){
    var main  = new Main()
    main.init()
})