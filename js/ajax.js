$(function(){

	//Manera larga

	/*$.get("logos_footer.html",function(codiguito){
		$("footer").append(codiguito);
	});*/

	//Manera corta
	$("footer .logos").load("logos_footer.html #maestrosdelweb"); 

	$.get("usuario.json", function(info){
		var avatar = new Image();

		avatar.src = info.avatar;
		avatar.title = info.nombre+" "+info.apellido;

		$("#avatar").append(avatar);

	})

});

var base_url = "http://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat, lon){
	var query = 'SELECT * FROM geo.placefinder WHERE text="'+lat+', '+lon+'" AND gflags="R"';

	query = encodeURIComponent(query);

	$.ajax({
		url: base_url+"q="+query,
		dataType: "jsonp",
		jsonpCallback: "procesarGeoInfo",
		data: {
			format: "json"
		}
	});
}

function procesarGeoInfo(datos){
	var resultado = datos.query.results.Result;
	var barrio = resultado.street;
	var ciudad = resultado.city;
	var pais = resultado.country;
	var woeid = resultado.woeid;

	$("#geo").append("<p><strong>"+barrio+"</strong><br>"+ciudad+", "+pais+"</p>")

	obtenerClima(woeid);
}

function obtenerClima(woeid){
	var query = 'SELECT * FROM weather.forecast WHERE woeid="'+woeid+'" AND u="c"';

	query = encodeURIComponent(query);

	$.ajax({
		url: base_url+"q="+query,
		dataType: "jsonp",
		jsonpCallback: "procesarClima",
		data: {
			format: "json"
		}
	});
}

function procesarClima(datos){

	var clima = datos.query.results.channel;
	var temp = clima.item.condition.temp;
	var unit = clima.units.temperature;

	$("#clima").append(clima.item.description);

}