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


//en el get del axios debe ir algo asi3
//`/restaurants/api/${id}`
// no llega: console.log("hey", req.params.id)
                        //id

let url = window.location.href

//http://localhost:3000/restaurants/62c5d52e8ee0d26aa86320e0
let id = url.slice(34)
console.log(id)
                        
  function getRestaurant() {
    axios
      .get(`/restaurants/api/${id}`)
      .then(response => {
        //console.log("yo soy la respuesta",response)
        placeRestaurants(response.data.restaurant);
        
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  function placeRestaurants(restaurant) {
    
      const center = {
        lat: restaurant.location.coordinates[1],
        lng: restaurant.location.coordinates[0]
      };
      //console.log("yo soy el restaurat",center)
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: restaurant.name
      });
     
    
  } 


  getRestaurant();

});



 
