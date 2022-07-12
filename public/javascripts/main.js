window.addEventListener('load', () => {



  const ironhackBCN = {
    lat: -12.0547601,
    lng: -77.0909803
  };

 
 //initicializamos la variable map 

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ironhackBCN
  });


let markers =[]
  function getRestaurants() {
    axios
      .get('/restaurants/api')
      .then(response => {
        console.log("yo soy la respuesta",response)
        placeRestaurants(response.data.restaurants);
        
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  function placeRestaurants(restaurants) {
    for (let restaurant of restaurants) {
      const center = {
        lat: restaurant.location.coordinates[1],
        lng: restaurant.location.coordinates[0]
      };
      console.log("yo soy el restaurat",center)
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: restaurant.name
      });
      markers.push(pin);
    }
  }
  getRestaurants();

  

});



 
