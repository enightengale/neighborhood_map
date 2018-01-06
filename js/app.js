function initMap(){

  var map;
  var lansing = {lat: 42.732536, lng: -84.555534};

  var map = new google.maps.Map(document.getElementById("map"), {
    center: lansing,
    zoom: 11,
    mapTypeId: "roadmap"
  });

function AppViewModel(){

  //CREDIT GOES TO GOOGLE DEVELOPERS ON YOUTUBE
  //for the autocomplete logic
  //Create lat and lng so that autocomplete will target
  //anything that is typed inside of these bounds!
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(42.732536, -84.555534)
  );
  //throw the bounds in an object
  var options = {
    bounds: defaultBounds
  }
  //get the input element
  var input = document.querySelector(".input");
  //create autocomplete and pass in the options object
  var autocomplete = new google.maps.places.Autocomplete(input, options);


  //hard coding the locations, giving each a lat and lng
  this.locations = ko.observableArray([
    {title: "Espresso Royale", location: {lat: 42.733857, lng: -84.477448}},
    {title: "Strange Matter Coffee", location: {lat: 42.733741, lng: -84.52225}},
    {title: "Blue Owl Coffee", location: {lat: 42.720327, lng: -84.552019}},
    {title: "Bloom Roasters Coffee", location: {lat: 42.748565, lng: -84.549241}},
    {title: "Iorio's Gelate & Caffé", location: {lat: 42.720089, lng: -84.495629}},
    {title: "Allegro Coffee Company", location: {lat: 42.728180, lng: -84.452994}}
  ]);

  var marker;
  //loop through locations
  for(let i = 0; i < this.locations().length; i++){
    //make a marker for each location on the map
    marker = new google.maps.Marker({
      position: this.locations()[i].location,
      map: map,
      title: this.locations()[i].title,
      animation: google.maps.Animation.DROP
    });
    console.log(this.locations()[i]);

    // when any of the elements in ul are clicked run this function
    this.zoomOnLocation = function(data){
      //zooms in on the location you clicked
      map.setZoom(18);
      map.setCenter(data.location);
    }
  }

 }
  ko.applyBindings(new AppViewModel());
}
