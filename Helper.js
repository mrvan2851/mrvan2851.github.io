function SocialWidgetSelectPosition($, { action, token, shop_id }) {
    this.action = action
    this.token = token
    this.shop_id = shop_id
    this.class = 'social-widget-highlight'
    this.class_top = 'social-widget-highlight-top'
    this.class_bottom = 'social-widget-highlight-bottom'
    this.class_invalid = 'social-widget-highlight-invalid'
    this.element = 'div,span,h1,h2,h3,h4,input,a,button,img'

    this.init = function () {
        var self = this
        $(this.element).mouseenter(function () {
            $(self.element).removeClass(
                self.class +
                ' ' +
                self.class_top +
                ' ' +
                self.class_bottom +
                ' ' +
                self.class_invalid
            )
            var temp = self.getClassParents($(this))
            if ($(temp).length > 1) {
                $(this).addClass(self.class_invalid)
            } else {
                $(this).addClass(self.class_top)
            }
            $(this).addClass(self.class)
        })
        $('body').on(
            'mousemove',
            '.social-widget-highlight-top,.social-widget-highlight-bottom',
            function (event) {
                var top = event.pageY - $(this).offset().top
                if (top > 25) {
                    $(this).removeClass(self.class_top)
                    $(this).addClass(self.class_bottom)
                } else {
                    $(this).removeClass(self.class_bottom)
                    $(this).addClass(self.class_top)
                }
            }
        )
        $('body').on('click', '.social-widget-highlight', function (event) {
            event.preventDefault()
            if ($(this).hasClass(self.class_invalid)) {
                alert(
                    "This element cannot be used as an integration point because it does not have a specific enough class or ID. Please contact your developer or support team for help with modifying your store's content if you really want it at this location"
                )
                return false
            }
            var position = 'after'
            if ($(this).hasClass(self.class_top)) {
                var position = 'before'
            }
            $(this).removeClass(
                self.class +
                ' ' +
                self.class_top +
                ' ' +
                self.class_bottom +
                ' ' +
                self.class_invalid
            )
            var data = {
                class: self.getClassParents($(this)),
                position: position,
            }
            $.ajax({
                url: SOCIAL_WIDGET_API + '/social_widget/widgets/choose-element',
                type: 'POST',
                data: data,
                headers: {
                    authorization: self.token,
                    appid: 'social_widget',
                    language: 'en',
                    shopid: self.shop_id,
                },
                dataType: 'json',
                success: function (data) {
                    console.log(data)
                    if (!data.status) {
                        alert(data.message)
                    }
                },
            })
            return false
        })
    }
    this.getClassParents = function (_this) {
        var tag_name = $(_this).prop('tagName')
        var current_element = tag_name
        if ($(_this).attr('class') != undefined && $(_this).attr('class')) {
            var temp = $(_this)
                .attr('class')
                .replace(/ +(?= )/g, '')
                .trim()
            if (temp) {
                current_element += '.' + temp.socialWidgetReplaceAll(' ', '.')
            }
            if ($(current_element).length == 1) {
                return current_element
            }
        }
        if (tag_name == 'BODY') {
            return current_element
        } else {
            return this.getClassParents($(_this).parent()) + ' ' + current_element
        }
    }

    this.init()
}

function initSocialWidget($) {
    var action = socialWidgetGetParamsUrl('action')
    var token = socialWidgetGetParamsUrl('token')
    var shop_id = socialWidgetGetParamsUrl('shop_id')
    if (action && token) {
        new SocialWidgetSelectPosition($, { action, token, shop_id })
    } else {
        var widget_ids = []
        $(SOCIAL_WIDGET_ID).each(function () {
            var id = $(this).data('widget-id')
            if (id) {
                widget_ids.push(this)
            }
        })
        $(SOCIAL_WIDGET_CLASS_NAME).each(function () {
            var id = $(this).data('widget-id')
            if (id) {
                widget_ids.push(this)
            }
        })
        widget_ids.forEach((el) => {
            new SocialWidgetApp($, el)
        })
    }
}
function socialWidgetFormatDate(timestamp) {
    const date = new Date(timestamp)
    const day = date.getDate()
    const month = SOCIAL_WIDGET_MONTH_NAMES[date.getMonth()]
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`
}
function getSWFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate()
    const month = SOCIAL_WIDGET_MONTH_NAMES[date.getMonth()]
    const year = date.getFullYear()
    const hours = date.getHours()
    let minutes = date.getMinutes()

    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    if (prefomattedDate) {
        return `${prefomattedDate} at ${hours}:${minutes}`
    }

    if (hideYear) {
        return `${day}. ${month} at ${hours}:${minutes}`
    }

    return `${day}. ${month} ${year}. at ${hours}:${minutes}`
}

function socialWidgetTimeAgo(date) {
    var today = new Date().getTime()
    var ms = today - date.getTime()
    var ago = Math.floor(ms / 1000)
    var part = 0

    if (ago < 2) {
        return 'a moment ago'
    }
    if (ago < 5) {
        return 'moments ago'
    }
    if (ago < 60) {
        return ago + ' seconds ago'
    }

    if (ago < 120) {
        return '1 minute ago'
    }
    if (ago < 3600) {
        while (ago >= 60) {
            ago -= 60
            part += 1
        }
        return part + ' minutes ago'
    }

    if (ago < 7200) {
        return '1 hour ago'
    }
    if (ago < 86400) {
        while (ago >= 3600) {
            ago -= 3600
            part += 1
        }
        return part + ' hours ago'
    }

    if (ago < 172800) {
        return '1 day ago'
    }
    if (ago < 604800) {
        while (ago >= 172800) {
            ago -= 172800
            part += 1
        }
        return part + ' days ago'
    }

    if (ago < 1209600) {
        return '1 week ago'
    }
    if (ago < 2592000) {
        while (ago >= 604800) {
            ago -= 604800
            part += 1
        }
        return part + ' weeks ago'
    }

    if (ago < 5184000) {
        return '1 month ago'
    }
    if (ago < 31536000) {
        while (ago >= 2592000) {
            ago -= 2592000
            part += 1
        }
        return part + ' months ago'
    }

    if (ago < 1419120000) {
        return 'more than year ago'
    }
    return 'never'
}

function socialWidgetLoadScript(url, callback) {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null
                callback()
            }
        }
    } else {
        script.onload = function () {
            callback()
        }
    }
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
}

function socialWidgetGetParamsUrl(param) {
    var url_string = window.location.href
    var url = new URL(url_string)
    return url.searchParams.get(param)
}

function socialWidgetReplaceAll(search, replacement) {
    var target = this
    return target.split(search).join(replacement)
}
function socialWidgetCreateId() {
    var text = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (
        text() +
        text() +
        '' +
        text() +
        '' +
        text() +
        '' +
        text() +
        '' +
        text() +
        text() +
        text()
    )
}