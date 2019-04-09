function setNativeValue() {
    var value = 'mot hai ba'
    var element = document.getElementById('contactPerson')
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    } else {
        valueSetter.call(element, value);
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
}
setNativeValue();


var script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    script.async = true; 
    document.getElementsByTagName("head")[0].appendChild(script);

setTimeout(function () {
    var country = $('.addr-select > .zoro-ui-select.zoro-ui-search-select')
    country.find('.next-select-trigger').trigger('click')
    setTimeout(function () {
        country.find('.dropdown-content li .css-flag.css-br').parents('li').trigger('click')
        setTimeout(function () {
            country.find('.next-select-trigger').trigger('click')
            setTimeout(function () {
                country.find('.dropdown-content li .css-flag.css-us').parents('li').trigger('click')
                setTimeout(function () {
                    if( country.find('.next-select-trigger .country-item .css-flag.css-us').length   ){
                        var state = $('.addr-select').find('.search-select').first()
                        var city = $('.addr-select').find('.search-select').last()
                        state.find('.next-select-trigger').trigger('click')
                        setTimeout(function () {
                            var stateName = 'District of Columbia'
                            $(".zoro-ui-select-dropdown .dropdown-content li[title='"+stateName+"']").trigger('click')
                            setTimeout(function () {
                                city.find('.next-select-trigger').trigger('click')
                                setTimeout(function () {
                                    var cityName = 'Washington'
                                    city.find("li[title='"+cityName+"']").trigger('click')
                                }, 10);
                            }, 2000);
                        }, 2000);
                    }
                }, 2000);
            }, 2000);
        }, 2000);
    }, 2000);
}, 2000);
