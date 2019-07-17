window.onload = () => {
  
  let center = {
    lat: undefined,
    lng: undefined
  }; 
};
const ironhackBCN= {
  lat: 19.4213, 
  lng: -99.1630,
};

const markers = []

const map = new google.maps.Map(document.getElementById('map'), {
  zoom: 13,
  center: ironhackBCN
});

const myMarker = new google.maps.Marker ({
position: {
  lat: 19.4213,
  lng: -99.1630,
},
map: map,
title: "IronHack Mexico"
})

const getRestaurants = () => {
  fetch("/restaurants/api")
   .then( response => (response.json()))
   .then(res => {
     console.log(res.restaurants)
     placeRestaurants(res.restaurants);
   })
   .catch(err => {
     console.log(err);
   })
 }

 const placeRestaurants = restaurants => {
  restaurants.forEach(restaurant =>{
    const center = {
      lat: restaurant.location.coordinates[1],
      lng: restaurant.location.coordinates[0]
    };
    const pin = new google.maps.Marker({
      position: center,
      map: map,
      title: restaurant.name
    });
    markers.push(pin);
  });
}

getRestaurants();