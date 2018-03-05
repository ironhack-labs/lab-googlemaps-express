window.onload = () => {

  var restaurantId = document.getElementById('restaurantName').getAttribute('data-id');
  var url = `http://localhost:3000/api/${restaurantId}`;
  
  axios.get(url)
  .then(response => {
    const restaurant = response.data.restaurant;
    const position = { lat: restaurant.location.coordinates[1], lng: restaurant.location.coordinates[0] };
    const map = new google.maps.Map(document.getElementById('map'), { zoom: 15, center: position });
    const marker = new google.maps.Marker({
      position: position,
      map: map,
      title: restaurant.name
    });
  })
  .catch(error => {
    console.log(error)
  })
};