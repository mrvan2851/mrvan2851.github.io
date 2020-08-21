function SocialPublish() {
	var vm = this
	const API_END_POINT = {
		publish : 'https://publish-api.socialhead.io/api/shopify/generate_url',
		shop : 'https://shop-api.socialhead.io/api/shopify/generate_url',
		widget : 'https://widget-api.socialhead.io/api/shopify/generate_url',
		reply : 'https://reply-api.socialhead.io/api/shopify/generate_url'
	}
    vm.init = function() {
        vm.header()
        vm.navbar()
        vm.collapse('#autopost-accordion')
		vm.carousel('#carousel')
		vm.sh_carousel('#sh-testimonial')
        vm.autopost('#autopost-carousel')
		vm.form_register('#modal-register')
		vm.sh_discover('#ist-items-discover')
		vm.scroll_to_element('.btn-scroll-to-element')
		vm.backtop('#btn-backtop')
		vm.subscribe('#form-subscribe')
    }
    vm.collapse = function(root_element) {
        var root = $(root_element)
        if (root.length) {
            var step = 1
            $('.autopost-btn').on('click', function(event) {
                var index = $(this).data('target')
                var desktop = $(this).data('event') == 'desktop' ? true : false
                if (index != step) {
                    $(this).addClass('is-active')
                    $('.autopost-btn').not(this).removeClass('is-active')
                    var target = root.find('.autopost-step-' + index)
                    root.find('.collapse').not(target).each(function() {
                        var effect = $(this).data('effect')
                        if (effect == 'slide' && desktop) {
                            $(this).slideUp(300, function() {
                                $(this).removeClass('show')
                            })
                        } else {
                            $(this).hide().removeClass('show')
                        }
                    })
                    target.each(function() {
                        var effect = $(this).data('effect')
                        if (effect == 'slide' && desktop) {
                            $(this).slideDown(300, function() {
                                $(this).addClass('show')
                            })
                        } else {
                            $(this).fadeIn(300, function() {
                                $(this).addClass('show')
                            })
                        }
                    })
                    step = index
                }
            })
        }
    }
    vm.header = function() {
        var header = $('#header')
        $(window).on('load scroll', function() {
            if ($(this).scrollTop() > header.height()) {
                header.addClass('header-sticky')
            } else {
                header.removeClass('header-sticky')
            }
        })
    }
    vm.navbar = function() {
        var collapse = false
        var navbar = $('#header .header-navbar')
        var main = $('.wrapper')
        var btn = $('#header .navbar-toggle')
        main.on('click', function(event) {
            var target = $(event.target)
            if (target.is('.navbar-toggle , .navbar-toggle *')) {
                if (!collapse) {
                    navbar.addClass('is-active')
                    main.addClass('navbar-is-opened')
                    btn.addClass('is-active')
                } else {
                    navbar.removeClass('is-active')
                    main.removeClass('navbar-is-opened')
                    btn.removeClass('is-active')
                }
                collapse = !collapse
            } else {
                if (collapse && !target.is('#header .header-navbar , #header .header-navbar *')) {
                    navbar.removeClass('is-active')
                    main.removeClass('navbar-is-opened')
                    btn.removeClass('is-active')
                    collapse = !collapse
                }
            }
        })
        if (navbar.attr('non-sticky') == undefined) {
            $('#header .header-navbar ul li a').on('click', function(event) {
                event.preventDefault()
                var id = $(this).attr('href')
                if (collapse) {
                    navbar.removeClass('is-active')
                    main.removeClass('navbar-is-opened')
                    btn.removeClass('is-active')
                    collapse = !collapse
                }
                if ($(id).length) {
                    $("body,html").animate({
                        scrollTop: $(id).offset().top - $('#header').height()
                    }, 300);
                }

            })
            $(window).on('load scroll', function() {
                var scrollPos = $(document).scrollTop();
                $('#header .header-navbar .navbar-link').each(function() {
                    var currLink = $(this);
                    var refElement = $(currLink.attr("href"));
                    if (refElement.length) {
                        if ((refElement.offset().top - $('#header').height() - 1) < scrollPos && refElement.position().top + refElement.outerHeight() > scrollPos) {
                            $('#header .header-navbar .navbar-link').removeClass("is-active");
                            currLink.addClass("is-active");
                        } else {
                            currLink.removeClass("is-active");
                        }
                    }
                });
            })
        }
    }
    vm.carousel = function(element) {
        if ($(element).length) {
            $(element).slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 2000,
                appendArrows: '.testimonial-navbar',
                nextArrow: '<button class="testimonial-navbar-next"></button>',
                prevArrow: '<button class="testimonial-navbar-prev"></button>'
            });
        }
	}
	vm.sh_carousel = function(element) {
        if ($(element).length) {
            $(element).slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: false,
                autoplay: true,
				autoplaySpeed: 2000,
				fade:true,
                prevArrow: '<button class="prev-arrow"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" class="svg-inline--fa fa-chevron-left fa-w-8"><path fill="currentColor" d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z" class=""></path></svg></button>',
                nextArrow: '<button class="next-arrow"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" class="svg-inline--fa fa-chevron-right fa-w-8"><path fill="currentColor" d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" class=""></path></svg></button>'
            });
        }
	}
	vm.sh_discover = function(element) {
        if ($(element).length && $(window).width() <= 768) {
            $(element).slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: false,
                autoplay: true,
				autoplaySpeed: 2000,
				arrows : false,
				dots: true,
			});
        }
	}
	vm.subscribe = function(element) {
		var _this = this;
		var form = $(element)
		var input = form.find('input')
		var btn = form.find('button')
		var end_point = form.attr('action')
		form.on('submit', function(event){
			event.preventDefault()
			if( form.hasClass('is-disabled')) return
			disable_form()
			var email = input.val().trim()
			if( email && validate_email(email)){
				send_request(email).then(function(res){
					if( res.status ){
						reset_form()
						vm.show_modal_subscribe_success()
					}else{
						enable_form()
					}
				})
				.catch(function(){
					enable_form()
				})
			}else{
				input.addClass('is-invalid')
				enable_form()
			}
		})
		input.on('focus' , function(){
			input.removeClass('is-invalid')
		})
		function reset_form() {
			enable_form()
			input.val('')
			input.addClass('is-invalid')
		}
		function disable_form() {
			form.addClass('is-disabled')
			btn.addClass('is-loading')
			btn.prop('disabled', true)
			input.prop('disabled', true)
		}
		function enable_form() {
			form.removeClass('is-disabled')
			btn.removeClass('is-loading')
			btn.prop('disabled', false)
			input.prop('disabled', false)
		}
		function validate_email(email) {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		}
		function send_request(email) {
            return new Promise(function(resolve, reject) {
				if( end_point ){
					$.post(end_point, { email: email } , "json")
                    .done(function(res) {
                        resolve(res)
                    })
                    .fail(function(err) {
                        reject(err)
                    })
				}else{
					reject()
				}
            });

        }
	}
    vm.autopost = function(element) {
        if ($(element).length) {
            $(element).slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
                dots: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
                appendDots: '.autopost-carousel-navbar'

            });
            $(window).on('resize', function() {
                if ($(window).width() <= 768) {
                    $(element).slick('setPosition')
                }
            })
        }
    }
    vm.form_register = function(element) {
		var _this = this;
		var app_name = null 
		var modal = $(element)
        var select_app = modal.find('.select-app')
		var register_app = modal.find('.register-app')
		var subscribe_app = modal.find('.subscribe-app')
		var form = modal.find('form')
		var input = form.find('input')
		var btn = form.find('button')
		
		$('.btn-show-modal').on('click', function(event){
			event.preventDefault()
			var app = $(this).data('app')
			if( app ){
				show_app_login(app)
			}else{
				select_app.show()
				register_app.hide()
				register_app.removeClass("app-publish app-shop app-widget app-reply")
			}
			modal.modal('show')
		})
		modal.find('.item-app').on('click', function(){
			show_app_login($(this).data('app'))
		})
		modal.on('hidden.bs.modal' ,function(){
			app_name = null 
			form.trigger("reset")
			select_app.hide()
			register_app.hide()
			subscribe_app.hide()
			input.removeClass('is-invalid')
			input.val('')
			register_app.removeClass("app-publish app-shop app-widget app-reply")
			form.removeClass('is-disabled')
			btn.prop('disabled', false)
			input.prop('disabled', false)
		})
		form.on('submit', function(event) {
			event.preventDefault()
			if ($(this).hasClass('is-disabled')) return
			$(this).addClass('is-disabled')
			btn.prop('disabled', true)
			btn.addClass('is-loading')
			input.prop('disabled', true)
			input.removeClass('is-invalid')
			var shop = input.val()
			if (shop) {
				var valid = test_shop_name(shop)
				if (valid) {
					$(this).removeClass('is-disabled')
					send_request(shop).then(function() {
							$(this).removeClass('is-disabled')
							btn.prop('disabled', false)
							btn.removeClass('is-loading')
							input.prop('disabled', false)
						})
						.catch(function() {
							$(this).removeClass('is-disabled')
							btn.prop('disabled', false)
							btn.removeClass('is-loading')
							input.prop('disabled', false)
						})
					return
				}
			}
			input.addClass('is-invalid')
			$(this).removeClass('is-disabled')
			btn.prop('disabled', false)
			input.prop('disabled', false)
		})
		input.on('focus', function() {
			if ($(this).hasClass('is-invalid')) {
				$(this).removeClass('is-invalid')
			}
		})
		var show_app_login = function(app) {
			app_name = app 
			subscribe_app.hide()
			select_app.hide()
			register_app.show()
			register_app.addClass("app-" + app)
		}
        var send_request  = function(shop ) {
            return new Promise(function(resolve, reject) {
				var url = API_END_POINT.hasOwnProperty(app_name) ? API_END_POINT[app_name] : null 
				if( url ){
					$.post(url, { shop: shop } , "json")
                    .done(function(res) {
                        if (res.status == true && res.data != null && res.data != '') {
                            window.location.href = res.data
                        }
                        resolve(res)
                    })
                    .fail(function(err) {
                        reject(err)
                    })
				}else{
					reject()
				}
            });

        }

        var test_shop_name  =  function(text) {
            var temp = text.replace(/.myshopify.com/gi, "");
            const regex = /[!@#$%^&*(),.?":{}|<>`']/gi;
            return !regex.test(temp)
		}
		this.show_modal_subscribe_success = function(){
			subscribe_app.show()
			register_app.hide()
			select_app.hide()
			modal.modal('show')
		}
		return this
	}
	vm.scroll_to_element = function(element){
		if( $(element).length ){
			$(element).on('click', function(event){
				event.preventDefault()
				var target = $(this).data('id')
				var duration = $(this).data('duration') 
				$('html, body').animate({
					scrollTop: $(target).offset().top - $('header').height()
				}, duration ? duration : 500);
			})
		}
	}
	vm.backtop = function(element){
		if( $(element).length ){
			$(window).scroll(function(){
				if ($(this).scrollTop() > 100) {
				$(element).addClass('is-active');
				} else {
				$(element).removeClass('is-active');
				}
			});
			
			$(element).click(function(){
				$('html, body').animate({scrollTop : 0},500);
				return false;
			});
		}
	}
    vm.init()
    return vm
}
$(function() {
    const SocialPublishMain = new SocialPublish()
})