const SOCIAL_WIDGET_API = "https://widget-api-dev.socialhead.dev/api";
const SOCIAL_WIDGET_ID = "#social-widget-wrapper";
const SOCIAL_WIDGET_CLASS_NAME = ".social-widget-wrapper";
const SOCIAL_WIDGET_DOMAIN = "#social-widget-shop-domain";
const SOCIAL_WIDGET_JQUERY = "https://widget-api.socialhead.io/store-front/jquery.min.js";
const SOCIAL_WIDGET_MOBILE_BREAKPOINT = 768;
const SOCIAL_WIDGET_COLLAGE_STYLES = {
    "1": 12,
    "2": 9,
    "3": 8,
    "4": 7,
    "5": 5,
    "highlight":7
};
const SOCIAL_WIDGET_MOBILE_COLLAGE_STYLES = {
    1: 12,
    2: 9,
    "highlight":7
};

const SOCIAL_WIDGET_MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const SocialWidgetApp = function ($, root) {
    var widget_popup = null,
        widget_wrapper = $(root);
    const widget_id = $(root).data("widget-id");
    const shop_domain = $(SOCIAL_WIDGET_DOMAIN).val();
    var options = null 
    var products = []
    var fetchApi = function (params) {
        $.get(SOCIAL_WIDGET_API + '/store/widget', params).done((res) => {
        	let { status = false, data } = res
        	if (status) {
                options = data 
        		RenderSocialWidget()
        	}
        })
    };
    var RenderSocialWidget = function () {
        var lazyloadThrottleTimeout = null;
        var slider = null;
        var popup = false;
        var window_width = 0;
        var version = "";
        var renderHTML = function () {
            var config = loadConfigForDevice(version);
            console.log(config);
            var container = $('<div class="social-widget"><div class="sw-instagram sw-instagram-box"><div class="sw-instagram-header"></div><div class="sw-instagram-body"><div class="sw-instagram-row"></div></div><div class="sw-instagram-footer"></div></div></div>');
            renderWidgetHeader(container,config)
            renderWidgetBody(container,config)
            renderWidgetFooter(container,config)
            renderWidgetStyle(container,config)
            setWidgetPosition(container,config)
            renderWidgetPopup(config)
        };
        var renderWidgetHeader = function(container,config){
            if( config.is_enable_heading_title ){
                container.find('.sw-instagram-header').append('<div class="sw-instagram-header-title">'+config.title+'</div>')
            }
            if( config.is_enable_heading_description ){
                container.find('.sw-instagram-header').append(config.description)
            }
        }
        var renderWidgetBody = function(container,config){
            var row = container.find(".sw-instagram-row");
            config.images.forEach((item) => {
                var element = $('<div class="sw-instagram-col"><a  class="sw-instagram-item"><div class="sw-instagram-item-img" ></div><div class="sw-instagram-item-overlay"></div></a></div>');
                var element_item = element.find(".sw-instagram-item");
                if (config.on_image_click == "popup") {
                    element_item.attr({
                        "data-id": item.id,
                        href: "javascript:void(0);",
                    });
                } else {
                    element_item.attr({
                        "data-id": item.id,
                        href: item.permalink,
                        target: options.on_image_click_target_link,
                    });
                }
                element
                    .find(".sw-instagram-item-img")
                    .attr("data-image", item.media_type == "VIDEO" ? item.thumbnail_url : item.media_url)
                    .addClass("sw-instagram-lazyload");
                if(config.is_enable_item_hover_effect){
                    element.find(".sw-instagram-item").addClass("sw-instagram-default");
                    element.find(".sw-instagram-item-overlay").append('<div class="sw-instagram-item-overlay-content"><div class="sw-instagram-item-overlay-row sw-instagram-item-overlay-caption"></div><div class="sw-instagram-item-overlay-row sw-instagram-item-overlay-statistic"><div class="sw-instagram-item-overlay-like"><div class="sw-instagram-item-overlay-icon"> <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.00065 11.8333L6.07023 11.0391C2.76565 8.2154 0.583984 6.35207 0.583984 4.07198C0.583984 2.20865 2.13361 0.75 4.11315 0.75C5.22965 0.75 6.30123 1.23924 7.00065 2.00933C7.70007 1.23924 8.77165 0.75 9.88815 0.75C11.8677 0.75 13.4173 2.20865 13.4173 4.07198C13.4173 6.35207 11.2357 8.2154 7.93107 11.0391L7.00065 11.8333Z" stroke="currentColor" stroke-width="1.5"/> </svg></div><div class="sw-instagram-item-overlay-like-content"></div></div><div class="sw-instagram-item-overlay-comment"><div class="sw-instagram-item-overlay-icon"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.1204 11.9284L10.3576 11.2169C10.1436 11.1456 9.90897 11.1743 9.71856 11.2951L10.1204 11.9284ZM11.9286 10.1201L11.2953 9.7183C11.1745 9.9087 11.1458 10.1433 11.2171 10.3573L11.9286 10.1201ZM12.8327 12.8325L12.5956 13.544C12.8651 13.6339 13.1622 13.5637 13.3631 13.3629C13.564 13.162 13.6341 12.8649 13.5443 12.5954L12.8327 12.8325ZM6.99935 13.5827C8.2938 13.5827 9.5031 13.2083 10.5222 12.5617L9.71856 11.2951C8.93265 11.7938 8.00088 12.0827 6.99935 12.0827V13.5827ZM0.416016 6.99935C0.416016 10.6352 3.36347 13.5827 6.99935 13.5827V12.0827C4.1919 12.0827 1.91602 9.8068 1.91602 6.99935H0.416016ZM6.99935 0.416016C3.36347 0.416016 0.416016 3.36347 0.416016 6.99935H1.91602C1.91602 4.1919 4.1919 1.91602 6.99935 1.91602V0.416016ZM13.5827 6.99935C13.5827 3.36347 10.6352 0.416016 6.99935 0.416016V1.91602C9.8068 1.91602 12.0827 4.1919 12.0827 6.99935H13.5827ZM12.5619 10.5219C13.2084 9.50283 13.5827 8.29365 13.5827 6.99935H12.0827C12.0827 8.00077 11.7939 8.93244 11.2953 9.7183L12.5619 10.5219ZM11.2171 10.3573L12.1212 13.0697L13.5443 12.5954L12.6401 9.88291L11.2171 10.3573ZM13.0699 12.121L10.3576 11.2169L9.88322 12.6399L12.5956 13.544L13.0699 12.121Z" fill="currentColor"/> </svg></div><div class="sw-instagram-item-overlay-comment-content"></div></div></div><div class="sw-instagram-item-overlay-row sw-instagram-item-overlay-date"></div></div>');
                    var overlay_caption = element.find('.sw-instagram-item-overlay-caption')
                    var overlay_like = element.find('.sw-instagram-item-overlay-like-content')
                    var overlay_comment = element.find('.sw-instagram-item-overlay-comment-content')
                    var overlay_date = element.find('.sw-instagram-item-overlay-date')
                    config.is_enable_popup_caption ? overlay_caption.append(item.caption ? item.caption : '') : overlay_caption.remove()
                    config.is_enable_popup_likes_count ? overlay_like.append(item.like_count) : overlay_date.remove()
                    config.is_enable_popup_caption ? overlay_comment.append(item.comments_count) : overlay_comment.remove()
                    if( config.is_enable_popup_caption) {
                        
                        if( item.timestamp ){
                            var date = socialWidgetFormatDate(item.timestamp)
                            overlay_date.append(date)
                        }
                    }else{
                        overlay_date.remove()
                    }
                    
                    if(  !(config.is_enable_popup_likes_count || config.is_enable_popup_caption)  ){
                        element.find('.sw-instagram-item-overlay-statistic').remove()
                    }

                }else{
                    element.find(".sw-instagram-item-overlay").remove()
                }
                row.append(element);
            });
            console.log(config.display_layout);
            switch (config.display_layout) {
                case 'grid' : 
                   
                    break
                case "slider":
                    if( config.images.length > config.item_no_of_slider ){
                        slider = new SocialWidgetSlider($, row[0], {
                            adaptiveHeight: true,
                            arrows: true,
                            autoplay: config.auto_play_slider,
                            autoplaySpeed: config.auto_play_duration * 1000,
                            slidesToShow: config.item_no_of_slider,
                            swipeToSlide: true,
                            speed: 500,
                            prevArrow:
                                '<div class="sw-instagram-nav nav-prev" ><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg></div>',
                            nextArrow:
                                '<div class="sw-instagram-nav nav-next"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg></div>',
                        });
                        row.addClass("sw-instagram-slider");
                    }else{
                        css['--sw-item-no-of-columns'] = config.item_no_of_slider
                    }
                    break;
                case "collage":
                    row.addClass(`sw-instagram-collage sw-instagram-collage-style-${config.collage_style}`);
                    if (config.images.length < config.total_collage_image) {
                        for (let i = 1; i <= config.total_collage_image - config.images.length; i++) {
                            row.append('<div class="sw-instagram-col"><a  data-id="" class="sw-instagram-item"><div class="sw-instagram-item-img" ></div><div class="sw-instagram-item-overlay"></div></a></div>');
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        var renderWidgetFooter = function(container,config){
            if( config.is_enable_load_more_btn ){
                var btn_load_more = $(config.load_more_btn_text).addClass('sw-instagram-footer-load-more')
                container.find('.sw-instagram-footer').append(btn_load_more)
            }else{
                container.find('.sw-instagram-footer').remove()
            }
        }
        var setWidgetPosition = function(container,config){
            if (options.page_position == "custom" && $(options.page_custom_element)) {
                if (options.page_custom_position == "after") {
                    $(options.page_custom_element).after(container).fadeIn(300);
                } else if (options.page_custom_position == "before") {
                    $(options.page_custom_element).before(container).fadeIn(300);
                } else if (options.page_custom_position == "append") {
                    $(options.page_custom_element).append(container).fadeIn(300);
                } else if (options.page_custom_position == "prepend") {
                    $(options.page_custom_element).prepend(container).fadeIn(300);
                }
            } else {
                $(root).append(container)
                    .fadeIn(300, function () {
                        if( config.display_layout == 'slider'){
                            slider.setPosition()
                        }
                    });
            }
            addLazyLoadImages();
        }
        var renderWidgetStyle = function(container, config){
            var css = getWidgetStyle(config)
            for (const key in css) {
                container[0].style.setProperty(key, css[key])
            }
        }
        var reRenderHtml = function () {
            if (slider) {
                slider.destroy();
                slider = null;
            }
            widget_wrapper.find(".social-widget").remove();
            renderHTML();
        };
        var renderWidgetPopup = function (config) {
            if( widget_popup ){
                widget_popup.remove()
            }
            if (config.on_image_click == "popup") {
                widget_popup = new SocialWidgetPopup(config);
                popup = true;
            }
        };
        var addEventListener = function () {
            window_width = $(window).width();
            $(window).on("resize", (event) => {
                var width = $(window).width();
                if (window_width != width) {
                    window_width = width;
                    var current_version = checkVersion();
                    if (version != current_version) {
                        version = current_version;
                        reRenderHtml();
                    }
                }
            });
        };
        var getWidgetStyle = function(config){
            var css = Object.assign(config.var_css);
            switch (config.display_layout) {
                case 'grid':
                    css['--sw-item-no-of-columns'] = config.item_no_of_slider
                    break;
                case 'slider':
                    if( config.images.length <= config.item_no_of_slider ){
                        css['--sw-item-no-of-columns'] = config.item_no_of_slider
                    }
                    break;
                case 'collage':
                    
                    break;
                default:
                    break;
            }
            if( !config.is_enable_max_width ){
                css['--sw-layout-max-width'] = '100%';
            }
            return css 
        }
        var loadConfigForDevice = function (version) {
            var prefix = version == "mobile" ? 'mobile_' : ''
            var images = [];
            var display_layout = options[prefix + 'display_layout'];
            var total_collage_image = 0;
            if (display_layout == "slider") {
                images = options.images;
            } else if (display_layout == "grid") {
                images = getNumberImage(options[prefix+'item_no_of_rows'] * options[prefix+'item_no_of_columns']);
            } else if (display_layout == "collage") {
                total_collage_image = SOCIAL_WIDGET_COLLAGE_STYLES.hasOwnProperty(options.collage_style) ? SOCIAL_WIDGET_COLLAGE_STYLES[options.collage_style] : 10;
                images = getNumberImage(total_collage_image);
            }
            return {
                version: "desktop",
                display_layout,
                item_no_of_rows: options[prefix+'item_no_of_rows'],
                item_no_of_columns: options[prefix+'item_no_of_columns'],
                item_no_of_slider: options[prefix+'item_no_of_slider'],
                auto_play_slider: options[prefix+'auto_play_slider'],
                auto_play_duration: options[prefix+'auto_play_duration'],
                images: images,
                total_collage_image: total_collage_image,
                on_image_click: options[prefix+'on_image_click'],
                title : options[prefix+'title'],
                description : options[prefix+'description'],
                var_css: options[prefix+'var_css'],
                is_enable_item_hover_effect: options['is_enable_item_hover_effect'],
                is_enable_popup_follow_btn: options['is_enable_popup_follow_btn'],
                is_enable_popup_caption: options['is_enable_popup_caption'],
                is_enable_popup_likes_count: options['is_enable_popup_likes_count'],
                is_enable_popup_comments_count: options['is_enable_popup_comments_count'],
                is_enable_popup_date: options['is_enable_popup_date'],
                is_enable_heading_title:  options[prefix+'is_enable_heading_title'],
                is_enable_heading_description:  options[prefix+'is_enable_heading_description'],
                collage_style: options[prefix+'collage_style'],
                display_product_item:  options[prefix+'display_product_item'],
                is_enable_popup_user_profile:  options[prefix+'is_enable_popup_user_profile'],
                popup_user_profile_click_action:  options[prefix+'popup_user_profile_click_action'],
                on_image_click:  options[prefix+'on_image_click'],
                is_enable_load_more_btn:  options[prefix+'is_enable_load_more_btn'],
                load_more_btn_text:  options[prefix+'load_more_btn_text'],
                is_enable_max_width:  options[prefix+'is_enable_max_width'],
                popup_follow_btn_text: options[prefix+'popup_follow_btn_text'],
                display_product_item: options[prefix+'display_product_item'],
            };
        };
        var isHTML = function(str) {
            var a = document.createElement('div');
            a.innerHTML = str;
          
            for (var c = a.childNodes, i = c.length; i--; ) {
              if (c[i].nodeType == 1) return true; 
            }
          
            return false;
        }
        var checkVersion = function () {
            return $(window).width() <= SOCIAL_WIDGET_MOBILE_BREAKPOINT ? "mobile" : "desktop";
        };
        var getNumberImage = function (number) {
            let total = number > options.images.length ? options.images.length : number;
            var result = [];
            for (let i = 0; i < total; i++) {
                result.push(options.images[i]);
            }
            return result;
        };
        var addLazyLoadImages = function () {
            var images = widget_wrapper.find(".sw-instagram-lazyload");
            if (images.length >= 1) {
                if ("IntersectionObserver" in window) {
                    var lazyloadImages = document.querySelectorAll(".sw-instagram-lazyload");
                    var imageObserver = new IntersectionObserver(function (entries, observer) {
                        entries.forEach(function (entry) {
                            if (entry.isIntersecting) {
                                var image = entry.target;
                                var img = $(image).attr("data-image");
                                $(image)
                                    .css({ "background-image": "url(" + img + ")" })
                                    .removeClass("sw-instagram-lazyload");
                                imageObserver.unobserve(image);
                            }
                        });
                    });
                    lazyloadImages.forEach(function (image) {
                        imageObserver.observe(image);
                    });
                } else {
                    addEventListenerLazy();
                }
            }
        };
        var addEventListenerLazy = function () {
            document.addEventListener("scroll", lazyload);
            document.addEventListener("resize", lazyload);
            document.addEventListener("load", lazyload);
        };
        var removeEventListenerLazy = function () {
            document.removeEventListener("scroll", lazyload);
            document.removeEventListener("resize", lazyload);
            document.removeEventListener("load", lazyload);
        };
        var addLoadMoreEvent = function(params) {
            
        }
        var lazyload = function () {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }
            lazyloadThrottleTimeout = setTimeout(() => {
                var scrollTop = $(window).scrollTop();
                var lazyloadImages = $(".sw-instagram-lazyload");
                lazyloadImages.each(function () {
                    var image = $(this);
                    if (image.offset().top - scrollTop < window.innerHeight) {
                        image
                            .css({
                                "background-image": "url(" + image.attr("data-image") + ")",
                            })
                            .removeClass("sw-instagram-lazyload");
                        lazyloadImages = $(".sw-instagram-lazyload");
                    }
                });
                if (lazyloadImages.length == 0) {
                    removeEventListenerLazy();
                }
            }, 20);
        };
        var init = function () {
            version = checkVersion();
            renderHTML();
            addEventListener();
        };
        init();
    };

    var SocialWidgetPopup = function (config) {
        let { images = [],  id = "" } = config;
        var root = "root";
        var data = images;
        var scrollY = 0;
        var current_item = null;
        var carousel = null;
        var carousel_product_tags = []
        var current_carousel_item = null 
        var product_carousel = null 
        var request_tag = null
        var container_html =
            '<div class="social-widget social-widget-modal"><div class="sw-instagram-modal"><div class="sw-instagram-modal-close"></div><div class="sw-instagram-modal-container"><div class="sw-instagram-modal-nav sw-instagram-modal-nav-prev"><div></div></div><div class="sw-instagram-modal-nav sw-instagram-modal-nav-next"><div></div></div><div class="sw-instagram-modal-wrap"><div class="sw-instagram-modal-body"><div class="sw-instagram-modal-col sw-instagram-modal-col-left"><div class="sw-instagram-modal-col-wrap"><div class="sw-instagram-modal-col-content sw-instagram-modal-image"><div class="sw-instagram-modal-image-relative"></div></div></div></div><div class="sw-instagram-modal-col sw-instagram-modal-col-right"><div class="sw-instagram-modal-col-wrap"><div class="sw-instagram-modal-col-content"><div class="sw-instagram-modal-info"><div class="sw-instagram-modal-info-header"><div class="sw-popup-info-account"></div><div class="sw-spacer"></div><div class="sw-popup-info-action"></div></div><div class="sw-instagram-modal-info-body"><div class="sw-popup-info-caption"></div><div class="sw-popup-info-products"></div></div><div class="sw-instagram-modal-info-footer"><div class="sw-popup-info-row"><div class="sw-popup-info-like"></div><div class="sw-popup-info-comment"></div></div><div class="sw-popup-info-row"><div class="sw-popup-info-date"></div></div></div></div></div></div></div></div></div></div></div></div>';
        var container = $(container_html);
        var body = $("body");
        var fields = {
            preview: ".sw-instagram-modal-image-relative",
            profile: ".sw-popup-info-account",
            follow: ".sw-popup-info-action",
            date: ".sw-popup-info-date",
            like: ".sw-popup-info-like",
            comment: ".sw-popup-info-comment",
            caption: ".sw-popup-info-caption",
            products : ".sw-popup-info-products",
        };
        var fields_html = {
            image: $('<img class="sw-instagram-single-image" src=""/>'),
            video: $('<video autoplay="true" controls><source src="" type="video/mp4"></video>'),
            prev:
                '<svg class="sw-instagram-carousel-prev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.fa-secondary{opacity:.4}</style></defs><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm72.5 349.6a23.9 23.9 0 0 1 0 33.9l-17 17a23.9 23.9 0 0 1-33.9 0L142.1 273a24 24 0 0 1 0-34l135.5-135.5a23.9 23.9 0 0 1 33.9 0l17 17a23.9 23.9 0 0 1 0 33.9L226.9 256z" fill="rgba(255,255,255,1)"/><path d="M142.1 239l135.5-135.5a23.9 23.9 0 0 1 33.9 0l17 17a23.9 23.9 0 0 1 0 33.9L226.9 256l101.6 101.6a23.9 23.9 0 0 1 0 33.9l-17 17a23.9 23.9 0 0 1-33.9 0L142.1 273a24 24 0 0 1 0-34z" fill="transparent"/></svg>',
            next:
                '<svg class="sw-instagram-carousel-next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs></defs><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm113.9 265L234.4 408.5a23.9 23.9 0 0 1-33.9 0l-17-17a23.9 23.9 0 0 1 0-33.9L285.1 256 183.5 154.4a23.9 23.9 0 0 1 0-33.9l17-17a23.9 23.9 0 0 1 33.9 0L369.9 239a24 24 0 0 1 0 34z" fill="rgba(255,255,255,1)"/><path d="M369.9 273L234.4 408.5a23.9 23.9 0 0 1-33.9 0l-17-17a23.9 23.9 0 0 1 0-33.9L285.1 256 183.5 154.4a23.9 23.9 0 0 1 0-33.9l17-17a23.9 23.9 0 0 1 33.9 0L369.9 239a24 24 0 0 1 0 34z"  fill="transparent"/></svg>',
            carousel: $('<div class="sw-instagram-carousel"><div class="sw-instagram-carousel-wrap"></div><div class="sw-instagram-carousel-dots"></div></div>'),
        };
        var modal = container.find(".sw-instagram-modal");
        
        var init = function () {
            container.appendTo(body);
            handleAddEventListener();
        };
        var handleAddEventListener = function () {
            widget_wrapper.on("click", ".sw-instagram-item", function (event) {
                event.preventDefault();
                var id = $(this).attr("data-id");
                var item = data.find((el) => el.id == id);
                if (item) {
                    showModal(item);
                }
            });
            modal.on("click", (event) => {
                var target = $(event.target);
                if (!target.is('.sw-instagram-modal-wrap, .sw-instagram-modal-wrap *')) {
                    hideModal();
                }
            });
            modal.on("click", ".sw-instagram-preview-nav-next", () => {
                nextImage();
            });
            modal.on("click", ".sw-instagram-preview-nav-prev", () => {
                prevImage();
            });
            window.addEventListener("load", () => {
                scrollY = window.scrollY + "px";
            });
            window.addEventListener("scroll", () => {
                scrollY = window.scrollY + "px";
            });
        };
        var showModal = function (item) {
            setContent(item);
            modal.addClass('is-active')
            disableScroll();
        };
        var hideModal = function () {
            modal.removeClass('is-active')
            enableScroll();
            clearContent()
        };
        var onHideModal = function () {
            
        };
        var clearContent = function(){
            if( carousel ){
                carousel.destroy()
            }
            for (const key in fields) {
                if (Object.hasOwnProperty.call(fields, key)) {
                    modal.find(fields[key]).empty()
                }
            }
            
            carousel = null
        }
        var setContent = function (item) {
            current_item = JSON.parse(JSON.stringify(item)) 
            clearContent()
            setContentPreview(current_item)
            setContentInfo(current_item)
        };
       
        var setContentPreview = function (item) {
            if (item.media_type == "IMAGE") {
                setContentImage(item);
            } else if (item.media_type == "VIDEO") {
                setContentVideo(item);
            } else if (item.media_type == "CAROUSEL_ALBUM") {
                setContentCarousel(item);
            }
        };
        var setContentInfo = function(item){
            var arr = item.timestamp.split(/-|\s|:/);
            var date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
            var time = socialWidgetTimeAgo(date);
            var account_avatar = $('<div class="sw-popup-info-account-avatar"></div>')
            if( item.source && item.source.social_account && item.source.social_account.avatar){
                $("<img />").attr('src',item.source.social_account.avatar).appendTo(account_avatar)
            }else{
                account_avatar.html('<svg width="16" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" class="svg-inline--fa fa-instagram fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>')
            }
            var account_name = $('<div class="sw-popup-info-account-title">'+item.username+'</div>') 
            modal.find(fields.profile).append(account_avatar)
            modal.find(fields.profile).append(account_name)
            modal.find(fields.date).append(time);
            modal.find(fields.like).append(item.like_count + ' likes');
            modal.find(fields.comment).append(item.comments_count + ' comments');
            modal.find(fields.caption).append(item.caption);
            var btn_follow = $(config.popup_follow_btn_text).addClass('sw-popup-info-follow')
            modal.find(fields.follow).append(btn_follow);
            if( config.display_product_item != 'vertical'){
                modal.find('.sw-instagram-modal-info-body').addClass('is-hozizontal')
            }else{
                modal.find('.sw-instagram-modal-info-body').removeClass('is-hozizontal')
            }
        }
        var getProductPricing = function (variants) {
            var min_price = "";
            var max_price = "";
            variants.forEach((item) => {
                var price = parseFloat(item.price);
                if (min_price == "") {
                    min_price = price;
                } else if (min_price > price) {
                    min_price = price;
                }
                if (max_price == "") {
                    max_price = price;
                } else if (max_price < price) {
                    max_price = price;
                }
            });
            return {
                min_price,
                max_price,
            };
        };
        var fetchProductJSON = function (tag) {
            return new Promise((resolve, reject) => {
                let { product_id } = tag 
                if( products.hasOwnProperty(product_id) ){
                    resolve(convertProductDataToTag(tag , products[product_id]));
                }else{
                    $.get(tag.product_url + ".json")
                    .done((res) => {
                        let { product } = res;
                        if (product) {
                            products[product_id] = product
                            resolve(convertProductDataToTag(tag , product));
                        } else {
                            resolve();
                        }
                    })
                    .fail((err) => {
                        resolve();
                    });
                }
            });
        };
        var convertProductDataToTag = function(tag , product){
            let { product_url , tag_type = 'product' , product_id = '' , variant_id = '' , badge} = tag 
            let { id, image, handle, title, variants = [] , images = [] } = product;
            var _id =socialWidgetCreateId()
            if( tag_type == 'product' ){
                return Object.assign({}, tag, {
                    product_url,
                    title,
                    tag_type,
                    main_image: image.src,
                    price: getProductPricing(variants),
                    _id,
                    badge
                });
            }else{
                var variant = variants.find(el=>el.id == variant_id)
                if( variant ){
                    var variant_image = images.find(el=>el.id == variant.image_id)
                    return Object.assign({}, tag, {
                        product_url,
                        title : title +' - ' + variant.title,
                        tag_type,
                        main_image: variant_image ? variant_image.src : image.src,
                        price: variant.price,
                        _id,
                        badge
                    });
                }
                return Object.assign({}, tag, {
                    product_url,
                    title,
                    tag_type,
                    main_image: image.src,
                    price: getProductPricing(variants),
                    _id,
                    badge
                });
            }
            
        }
        var loadImage = function (src) {
            var vm = this;
            var img = new Image();
            img.style.opacity = "0";
            return new Promise((resolve, reject) => {
                img.style.opacity = "0";
                img.removeAttribute("crossOrigin");
                if (src.match(/^https?:\/\/|^\/\//)) {
                    img.setAttribute("crossOrigin", "anonymous");
                }
                img.onload = function (event) {
                    img.style.opacity = "1";
                    setTimeout(() => {
                        resolve(img);
                    }, 1);
                };
                img.onerror = function (err) {
                    img.style.opacity = 1;
                    setTimeout(function () {
                        reject(err);
                    }, 1);
                };
                img.src = src;
            });
        };
        var setProductTagPoint = function ( wrap , image_box, tag, index) {
            let { currency_symbol = ''} = options 
            var pop = {
                width: 168,
                height: 48,
            };
            var pos = {
                x: tag.x + 12,
                y: tag.y + 12,
            };
            var result = setPositionPopover(image_box, pos, pop);
            var item = $('<a class="item-point" href="" target="_blank"><span class="item-point-center"><span class="item-point-arrow"></span><span class="item-point-popover"><span class="item-point-popover-content"><span class="item-point-popover-title"></span><span class="item-point-popover-price"></span><span class="item-point-popover-arrow"></span></span></span></span></a>');
            item.attr({
                "href" : tag.product_url,
                "data-id" : tag._id
            });
            item.find(".item-point-popover-title").text(tag.title);
            if( typeof tag.price == 'object' ){
                if (tag.price.min_price == tag.price.max_price) {
                    item.find(".item-point-popover-price").text(`${currency_symbol}${tag.price.max_price}`);
                } else {
                    item.find(".item-point-popover-price").text(`${currency_symbol}${tag.price.min_price}- ${currency_symbol}${tag.price.max_price}`);
                }
            }else if( typeof tag.price == 'string' ){
                item.find(".item-point-popover-price").text(`${currency_symbol}${tag.price}`);
            }
            item.find(".item-point-popover-arrow").html('<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-angle-right fa-w-6"><path fill="currentColor" d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" class=""></path></svg>');
            item.addClass(result.className).css({
                left: tag.x,
                top: tag.y,
                "z-index": index,
            }).attr('title',tag.title);
            var popover = item.find(".item-point-popover");
            if (result.durationY == "top") {
                popover.css("bottom", 7);
                item.find(".item-point-arrow").addClass("arrow-down");
            } else {
                popover.css("top", 7);
                item.find(".item-point-arrow").addClass("arrow-up");
            }
            if (result.durationX == "left") {
                popover.css("right", result.offset);
            } else if (result.durationX == "right") {
                popover.css("left", result.offset);
            } else {
                popover.css("left", result.offset);
            }
            item.hover( function(){
                    var slide = $('#' + tag._id)
                    item.addClass("is-active");
                    slide.addClass('is-on-hover')
                    var index = slide.parents('.sw-carousel-slide').attr('data-sw-carousel-index')
                    product_carousel.slickGoTo(parseInt(index))
                },
                function(){
                    var slide = $('#' + tag._id)
                    slide.removeClass('is-on-hover')
                    item.removeClass("is-active");
                },
            );
            wrap.append(item);
        };
        var setPositionPopover = function (wrap, pos, pop) {
            var durationX = "";
            var durationY = "";
            var offset = 0;
            if (pos.y + pop.height > wrap.height - 10) {
                durationY = "top";
            } else {
                durationY = "bottom";
            }
            if (pos.x - pop.width * 0.5 < 0) {
                (durationX = "right"), (offset = -pos.x + 5);
            } else if (pos.x + pop.width * 0.5 > wrap.width) {
                durationX = "left";
                offset = -(wrap.width - pos.x) + 5;
            } else {
                durationX = "center";
                offset = -pop.width * 0.5;
            }
            return {
                durationX,
                durationY,
                offset,
                className: durationY + "-" + durationX,
            };
        };
        var setContentImage = function (item) {
            modal.find(".item-point").remove();
            var image = fields_html.image.clone();
            image.attr("src", item.media_url);
            modal.find(fields.preview).append(image);
            getImageProductTag(item)
        };
        var setContentVideo = function (item) {
            var video = fields_html.video.clone();
            video.find("source").attr({
                poster: item.thumbnail_url,
                src: item.media_url,
            });
            modal.find(fields.preview).append(video);
            getImageProductTag(item)
        };
        var setContentCarousel = function (item) {
            if( item.media_carousel.length ){
                var slide = fields_html.carousel.clone();
                var row = slide.find(".sw-instagram-carousel-wrap");
                item.media_carousel.forEach((el, index) => {
                    row.append('<div class="sw-instagram-carousel-item" data-image-id="'+el.id+'"><img  src="' + el.media_url + '"/></div>');
                });
                modal.find(fields.preview).append(slide)
                carousel = new SocialWidgetSlider($, row , {
                    adaptiveHeight: false,
                    arrows: true,
                    autoplay: false,
                    slidesToShow: 1,
                    swipeToSlide: true,
                    speed: 500,
                    dots: true,
                    infinite:false,
                    draggable:false,
                    appendDots: modal.find(".sw-instagram-carousel-dots"),
                    change : function(index){
                        var id = item.media_carousel[index].id 
                        modal.find('.sw-instagram-carousel-item').find('.item-point').remove()
                        var current = modal.find(".sw-instagram-info-products-list") 
                        if( current.length ){
                            current.fadeOut(300 , function(){
                                $(this).remove()
                                getImageProductTag(item, id )
                            })
                        }else{
                            getImageProductTag(item, id )
                        }
                    },
                });
                getImageProductTag(item, item.media_carousel[0].id )
                
            }
        };
        var nextImage = function (item) {
            var index = findItemIndex(current_item.id);
            if (index >= 0 && index < data.length - 1) {
                var item = data[index + 1];
                setContent(item);
                onSetContent(item);
            } else {
                hideModal();
            }
        };
        var prevImage = function (item) {
            var index = findItemIndex(current_item.id);
            if (index > 0 && index < data.length) {
                var item = data[index - 1];
                setContent(item);
                onSetContent(item);
            } else {
                hideModal();
            }
        };
        var findItem = function (value) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i][["id"]] === value) {
                    return data[i];
                }
            }
            return undefined;
        };
        var findItemIndex = function (value) {
            for (var i = 0; i < data.length; i++) {
                if (data[i][["id"]] === value) {
                    return i;
                }
            }
            return -1;
        };
        var disableScroll = function () {
            var bodyWidth = body.innerWidth();
            body.css("overflow", "hidden");
            body.css("marginRight", (body.css("marginRight") ? "+=" : "") + (body.innerWidth() - bodyWidth));
        };
        var enableScroll = function () {
            var bodyWidth = body.innerWidth();
            body.css("overflow", "");
            body.css("marginRight", "-=" + (bodyWidth - body.innerWidth()));
        };
        var getImageProductTag = function(item , child_internal_id  = null ){
            let payload = {
                shop_domain,
                widget_id,
                gallery_id : options.gallery_id,
                media_id : current_item.id ,
                source_id : current_item.source_id
            }
            if( item.media_type == 'CAROUSEL_ALBUM'){
                payload['child_internal_id'] = child_internal_id
                if(carousel_product_tags.hasOwnProperty(child_internal_id)){
                    if( carousel_product_tags[child_internal_id].length ){
                        modal.find('.sw-instagram-modal-info-body').addClass('has-products')
                        getProductTagContent(carousel_product_tags[child_internal_id] , payload)
                    }else{
                        modal.find('.sw-instagram-modal-info-body').removeClass('has-products')
                    }
                    return
                }
            }
            if (request_tag != null){ 
                request_tag.abort();
                request_tag = null;
            }
            request_tag = $.get(SOCIAL_WIDGET_API + '/store/tag' , payload).done((res) => {
                let { status = false, data } = res
                if (status && data.length) {
                    modal.find('.sw-instagram-modal-info-body').addClass('has-products')
                    getProductTagContent(data , payload)
                }else{  
                    modal.find('.sw-instagram-modal-info-body').removeClass('has-products')
                }
            })
        }
        var getProductTagContent = function ( product_tag , payload ) {
            var arr = [];
            product_tag.forEach((el) => {
                arr.push(fetchProductJSON(el));
            });
            Promise.all(arr)
                .then(async (res) => {
                    let { media_type , media_carousel = [] } = current_item
                    if( res.length ){
                        if (media_type == "IMAGE") {
                            renderSingleImageProductTag( current_item , res);
                        } else if (media_type == "VIDEO") {
                            
                        } else if (media_type == "CAROUSEL_ALBUM") {
                            console.log(res);
                            let { child_internal_id = '' } = payload
                            if( !carousel_product_tags.hasOwnProperty(child_internal_id) ){
                                carousel_product_tags[child_internal_id] = product_tag
                            }
                            var find_child_carousel_item = media_carousel.find(el=>el.id == child_internal_id)
                            if( find_child_carousel_item ){
                                renderCarouselProductTag(find_child_carousel_item , res);
                            }
                        }
                        renderProductList(res)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        var renderSingleImageProductTag = async function( item, tags){
            var img = modal.find('.sw-instagram-single-image');
            var naturalImage = await loadImage(item.media_url);
            var img_box = {
                width: img.width(),
                height: img.height(),
            };
            var scale = img_box.width / naturalImage.width;
            var wrap = modal.find(fields.preview)
            tags.filter(Boolean).map((el) => {
                el["x"] = parseFloat(el.x) * scale;
                el["y"] = parseFloat(el.y) * scale;
                return el;
            }).forEach((tag, index) => {
                setProductTagPoint(wrap,img_box, tag, index + 1);
            });
        }
        var renderCarouselProductTag = async function(item,tags){
            var img = modal.find('.sw-instagram-carousel-item[data-image-id="'+item.id+'"]');
            var naturalImage = await loadImage(item.media_url);
            var img_box = {
                width: img.width(),
                height: img.height(),
            };
            var scale = img_box.width / naturalImage.width;
            tags.filter(Boolean).map((el) => {
                el["x"] = parseFloat(el.x) * scale;
                el["y"] = parseFloat(el.y) * scale;
                return el;
            }).forEach((tag, index) => {
                setProductTagPoint(img ,img_box, tag, index + 1);
            });
        }
        var renderVideoProductTag = async function(item,data){
            
        }
        var renderProductList = function(data){
            let { currency_symbol = ''} = options 
            var wrap = $('<div class="sw-instagram-info-products-list" />')
            
            data.forEach((product)=>{
                var item = $('<div class="sw-instagram-modal-product"><div class="sw-instagram-modal-product-wrap"><div class="sw-instagram-modal-product-header"><div class="sw-instagram-modal-product-image"><div class="sw-instagram-modal-product-image-badge"></div><div class="sw-instagram-modal-product-image-wrap"></div></div></div><div class="sw-instagram-modal-product-body"><div class="sw-instagram-modal-product-title"></div><div class="sw-instagram-modal-product-price"></div></div></div></div>').attr({
                    id : product._id
                })
                if( product.badge){
                    $('<img />').attr({
                        'src' : product.badge,
                        'alt' : product.badge
                    }).appendTo(item.find('.sw-instagram-modal-product-image-badge'))
                }
                $('<img />').attr({
                    'src' : product.main_image,
                    'alt' : product.product_url
                }).appendTo(item.find('.sw-instagram-modal-product-image-wrap'))


                item.find('.sw-instagram-modal-product-title').text(product.title).attr('title', product.title)
                if( typeof product.price == 'object' ){
                    if (product.price.min_price == product.price.max_price) {
                        item.find('.sw-instagram-modal-product-price').text(`${currency_symbol}${product.price.max_price}`);
                    } else {
                        item.find('.sw-instagram-modal-product-price').text(`${currency_symbol}${product.price.min_price}- ${currency_symbol}${product.price.max_price}`);
                    }
                }else if( typeof product.price == 'string' ){
                    item.find('.sw-instagram-modal-product-price').text(`${currency_symbol}${product.price}`);
                }
                wrap.append(item)
            })
            modal.find(fields.products).append(wrap)
            product_carousel = new SocialWidgetSlider($, wrap , {
                adaptiveHeight: false,
                arrows: true,
                autoplay: false,
                slidesToShow: 2,
                swipeToSlide: true,
                speed: 500,
                dots: false,
                infinite:true,
                draggable:false,
                variableWidth : true,
            });
        }
        init();
    };

    var init = (function () {
        fetchApi({
            shop_domain,
            widget_id,
        });
    })();
};

(function () {
    if (typeof jQuery === "function" && parseFloat(jQuery.fn.jquery) >= 1.7) {
        initSocialWidget(jQuery);
    } else {
        socialWidgetLoadScript(SOCIAL_WIDGET_JQUERY, function () {
            let jQuery191 = jQuery.noConflict(true);
            initSocialWidget(jQuery191);
        });
    }
})(window);
