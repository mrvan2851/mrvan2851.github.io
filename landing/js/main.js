function SocialPublish() {
    var vm = this
    vm.init = function() {
        vm.header()
        vm.navbar()
        vm.collapse('#autopost-accordion')
		vm.carousel('#carousel')
		vm.ShCarousel('#sh-testimonial')
        vm.autopost('#autopost-carousel')
		vm.form_register('#modal-register-form')
		vm.ShDiscover('#ist-items-discover')
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
	vm.ShCarousel = function(element) {
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
	vm.ShDiscover = function(element) {
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
        var form = $(element)
        if (form.length) {
            var input = form.find('input')
            var btn = form.find('button')
            form.on('submit', function(event) {
                event.preventDefault()
                if ($(this).hasClass('is-disabled')) return
                $(this).addClass('is-disabled')
                btn.prop('disabled', true)
                input.removeClass('is-invalid')
                var shop = input.val()
                if (shop) {
                    var valid = test_shop_name(shop)
                    if (valid) {
                        $(this).removeClass('is-disabled')
                        send_request(shop).then(function() {
                                $(this).removeClass('is-disabled')
                                btn.prop('disabled', false)
                            })
                            .catch(function() {
                                $(this).removeClass('is-disabled')
                                btn.prop('disabled', false)
                            })
                        return
                    }
                }
                input.addClass('is-invalid')
                $(this).removeClass('is-disabled')
                btn.prop('disabled', false)

            })
            input.on('focus', function() {
                if ($(this).hasClass('is-invalid')) {
                    $(this).removeClass('is-invalid')
                }
            })
        }

        function send_request(shop) {
            return new Promise(function(resolve, reject) {
                $.post("https://publish-api.socialhead.io/api/shopify/generate_url", { shop: shop })
                    .done(function(res) {
                        if (res.status == true && res.data != null && res.data != '') {
                            window.location.href = res.data
                        }
                        resolve(res)
                    })
                    .fail(function(err) {
                        reject(err)
                    })
            });

        }

        function test_shop_name(text) {
            var temp = text.replace(/.myshopify.com/gi, "");
            const regex = /[!@#$%^&*(),.?":{}|<>`']/gi;
            return !regex.test(temp)
        }
    }
    vm.init()
    return vm
}
$(function() {
    const SocialPublishMain = new SocialPublish()
})