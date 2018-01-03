function initMap(){

    var map;
    var lansing = {lat: 42.732536, lng: -84.555534};

    var map = new google.maps.Map(document.getElementById("map"), {
      center: lansing,
      zoom: 11
    });


function AppViewModel(){
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
    }
    //when any of the elements in ul are clicked run this function
    this.zoomOnLocation = function(){
      //zooms in on the location you clicked
      map.setZoom(18);
      map.setCenter(marker.getPosition());
    }
 }
  ko.applyBindings(new AppViewModel());
}
