function SalesBoxFunctionFrontEnd($){
        var app = this 
        this.salesBoxHtml = $('<div id="fireapps-salesbox-for-shippings"></div>')
        this.salesBoxHtml.append("<h1>Hello</h1>")
        this.selectors = {
            formAddToCart : $('form[action="/cart/add"]').first()
        }
        this.SalesBoxFunction = ()=>{
            console.log('SalesBoxFunction')
            this.selectors.formAddToCart.append(this.salesBoxHtml)
        }   
        
        $(document).ready(function(){
            console.log('salebox on ready')
            $('form[action="/cart/add"]').off()
        }.bind(this))
    }
    function InjectSript(url, callback){
        var script = document.createElement("script")
        script.type = "text/javascript";
        if (script.readyState){
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function(){
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    if ((typeof jQuery === "undefined") || (parseFloat(jQuery.fn.jquery) < 1.7)) {
        InjectSript("https://salesbox.fireapps.io/libs/jquery-3.1.1.min.js", function(){
            jQuery311 = jQuery.noConflict(true);
            SalesBoxFunctionFrontEnd(jQuery311)
        });
    } else {
        SalesBoxFunctionFrontEnd(jQuery)
    }
