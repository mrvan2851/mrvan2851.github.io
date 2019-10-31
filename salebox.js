const SALESBOX_API = 'https://salesboxapi.fireapps.io/api/';
const SALESBOX_STATS_API = 'https://salesboxstats.fireapps.io/';
const GET_IP_SERVER = 'https://api.ipify.org/?format=json';

function getParamsUrl(param) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    return url.searchParams.get(param);
}
function Salesbox($) {
	var self = this;
	this.init = function(){
		self.getData();
	}
    this.addHtml = function(setting, html){
        var select_element = '';
        var position = '';
        if (setting.position_type == 'custom_element') {
            select_element = $(setting.custom_element);
            position = setting.custom_element_position;
        } else {
            var length = $('form[action="/cart/add"] button').length;
            if (length > 0) {
                var form_select_element = $('form[action="/cart/add"]').first();
                select_element = form_select_element.find('button').last();
            }
            position = setting.position_type;
            if(select_element)
                select_element = self.getParentAddToCart(select_element);
        }
        if (position == 'after') {
            $(select_element).after(html);
        } else {
            $(select_element).before(html);
        }
        self.addAction();

    }
    this.getParentAddToCart = function(select_element)
    {

        var parent = $(select_element).parent();
        if(parent.prop("tagName") != 'FORM'  && parent.prop("tagName") != 'BODY' && parent.prop("tagName") != "undefined") {
            return this.getParentAddToCart(parent);
        }else{
            return select_element;
        }

    }
    this.sendStatisticsChangeLocation = function()
    {
        var data = {
            'messageId': self.message_id,
            'shopId': self.shop_id,
            'changeLocation': 1
        };

        $.post(SALESBOX_STATS_API + 'click_message', data);
    }

    this.addAction = function()
    {

        $('#salesbox-change-location').appendTo('body');
        $('.salesbox-href').click(function () {
            var data = {
                'messageId': self.message_id,
                'shopId': self.shop_id,
                'specificLink': $(this).attr('href')
            };
            $.post(SALESBOX_STATS_API + 'click_message', data);
        });
        $(".salesbox-change-location-item").click(function () {
            self.sendStatisticsChangeLocation();
            $('#salesbox-change-location').fadeIn();
        });
        $('.salesbox-box-icon-close').click(function () {
            $('#salesbox-change-location').fadeOut();
        });

        $('.salesbox-box-select').on('change',function () {
            var product_id = $('#salesbox-product-id').val() || '';
            if (!product_id)
                return false;

            var data = {
                "country_code": $(this).val(),
                "product_id": product_id,
                "myshopify_domain"  : $('#salesbox-shop-domain').val()
            };
            var url = SALESBOX_API + 'messages/get_data';
            $('#salesbox-change-location-details').addClass('salesbox-is-loading');
            $.post(url, data, function (results) {
                if(results == '')
                {
                    results = $('#salesbox-noresult').text();
                }
                $('#salesbox-change-location-details').html(results).removeClass('salesbox-is-loading');
            })
        });
    }
    this.getData = function(){
//        var offer_id = getParamsUrl('salesbox-offer-id') || '20';
//        var country_code = getParamsUrl('salesbox-country_code') || '';
//        var myshopify_domain = $('#salesbox-shop-domain').val() || 'saleboxthach.myshopify.com';
        var offer_id = getParamsUrl('salesbox-offer-id') || '';
        var country_code = getParamsUrl('salesbox-country_code') || '';
        var myshopify_domain = $('#salesbox-shop-domain').val();

        if (offer_id) {
            var data = {
                "salesbox-offer-id": offer_id,
                "country_code": country_code
            };
            var url = SALESBOX_API + 'messages/preview';
        } else {
            var product_id = $('#salesbox-product-id').val() || '';
            if (!product_id)
                return false;

            var data = {
                "product_id": product_id
            };
            var url = SALESBOX_API + 'messages/get_data';
        }
        data['myshopify_domain'] = myshopify_domain;
        $.post(url, data, function (results) {
            if (results) {
                self.addHtml(results.setting, results.html);
                self.message_id = results.message_id;
                self.shop_id = results.shop_id;
            }

        })
	}
	this.init()
}
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
function SalesboxAppendElement($){
    var self = this;
    this.init = function() {
        self.class = 'fireapps-highlight';
        self.class_top = 'fireapps-highlight-top';
        self.class_bottom = 'fireapps-highlight-bottom';
        self.class_invalid = 'fireapps-highlight-invalid';
        self.element = 'div,span,h1,h2,h3,h4,input,a,button,img';
        self.iniData();
    }
    this.iniData= function() {
        self.access_token = getParamsUrl('salesbox-accesstoken') || '';
        if (self.access_token)
        {
            self.addHover();
        }
    }
    this.addHover= function() {
        $("body").append('<style> .fireapps-highlight{ cursor: crosshair !important; } .fireapps-highlight.fireapps-highlight-invalid{ cursor: not-allowed !important; outline: 1px solid red !important; }.fireapps-highlight.fireapps-highlight-invalid *{cursor: not-allowed !important} .fireapps-highlight-bottom { } .fireapps-highlight-top { } .fireapps-highlight{ outline: 1px solid #0000ff24 !important; } .fireapps-highlight-top::before, .fireapps-highlight-bottom::after { padding-top: 4.5px; padding-bottom: 4.5px; content: "insert here"; text-align: center; width:100%; font-weight: bold; display: block; background-color: #f0f2ff; outline: 4px dashed #1800ff; text-transform: uppercase; z-index: 1; position: relative; } </style>');
        $(this.element).mouseenter(function () {
            $(self.element).removeClass(self.class + ' ' + self.class_top + ' ' + self.class_bottom + ' ' + self.class_invalid);
            var temp = self.getClassParents($(this));
            if ($(temp).length > 1) {
                $(this).addClass(self.class_invalid);
            } else {
                $(this).addClass(self.class_top);
            }
            $(this).addClass(self.class);

        });
        $('body').on('mousemove', '.fireapps-highlight-top,.fireapps-highlight-bottom', function (event) {
            var top = event.pageY - $(this).offset().top;
            if (top > 25) {
                $(this).removeClass(self.class_top);
                $(this).addClass(self.class_bottom);
            } else {
                $(this).removeClass(self.class_bottom);
                $(this).addClass(self.class_top);
            }
        });
        $('body').on('click', '.fireapps-highlight', function (event) {

            event.preventDefault();
            if ($(this).hasClass(self.class_invalid)) {
                alert("This element cannot be used as an integration point because it does not have a specific enough class or ID. Please contact your developer or the Fera support team for help with modifying your store's content if you really want it at this location");
                return false;
            }
            var position = 'after';
            if ($(this).hasClass(self.class_top)) {
                var position = 'before';
            }
            $(this).removeClass(self.class + ' ' + self.class_top + ' ' + self.class_bottom + ' ' + self.class_invalid);
            var data = {
                'class': self.getClassParents($(this)),
                'position': position
            };
            $.ajax({
                url: SALESBOX_API + 'setting/choose_element',
                type: 'POST',
                data: data,
                headers: {
                    "Authorization": self.access_token
                },
                dataType: 'json',
                success: function (data) {
                    if (!data.status) {
                         alert(data.message);
                    }
                }
            });
            return false;
        });
    }
    this.getClassParents= function(_this) {
        var tag_name = $(_this).prop("tagName");
        var current_element = tag_name;

//        if ($(_this).attr('id') != undefined) {
//            return current_element + '#' + $(_this).attr("id").trim();
//        } else
        if ($(_this).attr('class') != undefined && $(_this).attr('class')) {
            var temp = $(_this).attr("class").replace(/ +(?= )/g, '').trim();
            if (temp) {
                current_element += '.' + temp.replaceAll(' ', '.');
            }
            if($(current_element).length == 1){
                return current_element;
            }

        }

        if (tag_name == 'BODY') {
            return current_element;
        } else {
            return this.getClassParents($(_this).parent()) + ' ' + current_element;
        }
    }
	this.init()
}


function SalesBoxloadScript(url, callback)
{
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}


if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.7)) {
    SalesBoxloadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function () {
        var jQuery191 = jQuery.noConflict(true);
        var _salesbox = new Salesbox(jQuery191);
        var _temp = new SalesboxAppendElement(jQuery191);
    });
} else {
    var _salesbox = new Salesbox(jQuery);
    var _temp = new SalesboxAppendElement(jQuery);
}


