
let map, marker, geocoder, responseDiv, response


function initMap(){
  map = new google.maps.Map(document.getElementById("map1"),{
    zoom: 10,
    center: { lat: 19.4326077, lng: -99.133208 },
    mapTypeControl: false,
  });

  geocoder = new google.maps.Geocoder();

const submitButton = document.getElementById('submit')

const inputText = document.getElementById('address');

  marker = new google.maps.Marker({
    map,
  });

  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });

  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );


  clear();
}

function clear() {
  marker.setMap(null);
}

function geocode(request) {
  clear();

  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

     

const desired = JSON.stringify(result, null, 2);
const desiredObject = JSON.parse(desired)
console.log("lo qe deseo",desiredObject.results[0].formatted_address) //nota que al hacer stringify, volviste json todas las funciones que tenías en la respuesta del API
//luego al parsearlo, lo volviste objeto y pon ende, accesible con los métodos de array y object

const desiredAddress= JSON.stringify(desiredObject.results[0], null, 2);

const addressObject = JSON.parse(desiredAddress)

console.log("el address corregido", addressObject);

const latInput = document.getElementById('lat')
const longInput = document.getElementById('long')

const latResult = document.getElementById('latResult')
const longResult = document.getElementById('longResult')

latInput.value = desiredObject.results[0].geometry.location.lat
longInput.value = desiredObject.results[0].geometry.location.lng

latResult.value = latInput.value
longResult.value = longInput.value

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      


      
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}



initMap()

//formatted_address: