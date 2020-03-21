function socialWidgetLoadScript1(url, callback){
	var script = document.createElement("script")
	script.type = "text/javascript";
	if (script.readyState){
		script.onreadystatechange = function(){
			if (script.readyState == "loaded" ||
					script.readyState == "complete"){
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
var loadSocialWidget1 = function(widget_jquery) {
	socialWidgetLoadScript1("http://localhost:5500/social-widget.js", function(){
		console.log('load done');
	})
}

if ((typeof jQuery === "undefined") || (parseFloat(jQuery.fn.jquery) < 1.7)) {
	socialWidgetLoadScript1("https://salesbox.fireapps.io/libs/jquery-3.1.1.min.js", function(){
		jQuery191 = jQuery.noConflict(true);
		loadSocialWidget1(jQuery191);
	});
} else {
	loadSocialWidget1(jQuery);
}