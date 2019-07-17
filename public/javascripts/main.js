window.onload = () => {
  let center = {
    lat: undefined,
    lng: undefined
  };
};

const ironHackBCN = {
  lat: 41.38623,
  lng: 2.17498
};

const markers = [];
const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 13,
  center: ironHackBCN
});

// const myMarker = new google.maps.Marker({
//   position: {
//     lat: 41.38623,
//     lng: 2.17498
//   },
//   map: map,
//   title: "IronHack BCN"
// });

const getRestaurants = () => {
  fetch("/restaurants/api")
    .then(response => (response.json()))
    .then(res => {
      placeRestaurants(res.restaurants);
    })
    .catch(err => {
      console.log(err);
    });
};

const placeRestaurants = restaurants => {
  restaurants.forEach(restaurant => {
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
};

getRestaurants();
