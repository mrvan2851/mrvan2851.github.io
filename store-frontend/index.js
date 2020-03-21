function loadScript(url, callback){
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

var loadSocialWidget = function($) {
	$.ajax({
		url: "http://localhost:4000/api/users",
		dataType: "json",
		success : function(data) {
			$("#social-widget").append( data.data.html );
			
		}
	});
}

if ((typeof jQuery === "undefined") || (parseFloat(jQuery.fn.jquery) < 1.7)) {
	loadScript("https://salesbox.fireapps.io/libs/jquery-3.1.1.min.js", function(){
		jQuery191 = jQuery.noConflict(true);
		loadSocialWidget(jQuery191);
	});
} else {
	loadSocialWidget(jQuery);
}