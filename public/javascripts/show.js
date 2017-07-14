$(document).ready(function(){

	var titleTag = document.getElementById('restaurantName');

	var url = 'http://localhost:3000/' + titleTag.dataset.id;

	$.ajax({
    url: url,
    method: 'GET',
    success: printMapAndMarker,
    error: function(error) {
      console.log('error');
    }
  });

  function printMapAndMarker(restaurant){

  	 const lat = Number(document.getElementById('lat').innerHTML);
  	 const lng = Number(document.getElementById('lng').innerHTML);

	console.log (lat, lng);
		const position = {
		lat: lat,
		lng: lng
		};

  	const map = new google.maps.Map(document.getElementById('map'), {
  	  zoom: 15,
  	  center: position
  	});

  	var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: restaurant.name
    });
  }
});
