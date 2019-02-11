// Api key d8cce44ecc04724894670737aad0e414
// ejemplo de solicitud https://api.themoviedb.org/3/movie/550?api_key=d8cce44ecc04724894670737aad0e414
var api_key = "d8cce44ecc04724894670737aad0e414";
var page;
var total_pages;
var query;
$('#enviar').click(function(event) {
	query = $('#busqueda').val();
	if (query.length>1) {
		page = 1;
		showResults(page);
	}
});
$('#aceptar').click(function(event) {
	$('.resultados').hide();
});
$('#next').click(function(event) {
	if (page<total_pages) {
		page++;
		showResults(page);
	}
});
$('#prev').click(function(event) {
	if (page>1) {
		page--;
		showResults(page);
	}
});

function showResults(page){
	var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.themoviedb.org/3/search/movie?query="+query+"&api_key="+api_key+"&page="+page,
			"method": "GET",
		}
		$('.lista').html('');
		$.ajax(settings).done(function (response) {
			console.log(response);
			resultados = response;
			total_pages=resultados.total_pages;
			$('#cantidad').html(resultados.total_results);
			$('#current_page').html(page);
			$('#total_pages').html(total_pages);
			for (i = 0 ; i < resultados.total_results ;i++){
				current = resultados.results[i];
				var current_title = current.title;
				var current_release = current.release_date;
				var current_rate = current.vote_average;
				var current_description = current.overview;
				if (current.poster_path === null) {
					current_poster='img/no_image.jpg';
				}else{
					var current_poster = 'https://image.tmdb.org/t/p/original/'+current.poster_path;
				}
				$('.lista').append('<div class="resultado"><img class="movie_poster" src="'+current_poster+'" alt=""><div class="resultado_info"><h5 class="movie_title">'+current_title+'</h5><p><b>Sinopsis</b></p><p class="movie_description">'+current_description+'</p><p><b>Fecha de lanzamiento</b></p><p class="movie_release">'+current_release +'</p><p><b>Puntuacion</b></p><p class="movie_rate">'+current_rate+'</p></div></div>')
			}
		});
		$('.resultados').show();
}