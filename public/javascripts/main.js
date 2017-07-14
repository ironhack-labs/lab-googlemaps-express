$(document).ready(function(){

  const sol = {
  lat: 40.417080,
  lng: -3.703612
  };

  // Create and Initialize Map
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: sol
  });

  // Add restaurant markers to map
  let markers = [];
  console.log(myRestaurants);
  myRestaurants.forEach(function(restaurant){
    let title = restaurant.name;
    let position = {
      lat: restaurant.location.coordinates[1],
      lng: restaurant.location.coordinates[0]
    };

    console.log(position);
    var pin = new google.maps.Marker({ position, map, title  });
    markers.push(pin)
  });
});
