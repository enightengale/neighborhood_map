function googleError(){
  alert("We could not connect with google to provide a map, please try again later");
}

function initMap(){


  var lansing = {lat: 42.732536, lng: -84.555534};


  //creating a map by giving it a lat and lng above
  //Mapping goes to google api team
  //https://enterprise.google.com/maps/
  var map = new google.maps.Map(document.getElementById("map"), {
    center: lansing,
    zoom: 11,
    mapTypeId: "roadmap"
  });

  //set icon size and url
  var icon = {
    scaledSize: new google.maps.Size(50, 50),
    url: "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/ultra-glossy-silver-buttons-icons-food-beverage/058902-ultra-glossy-silver-button-icon-food-beverage-drink-coffee-tea1.png"
  };


  //hard coding the locations, giving each a lat and lng, img, title, and a marker
  var locations = [
    {information: {position: {lat: 42.733857, lng: -84.477448}, map: map, img: "https://pbs.twimg.com/profile_images/77346209/866162933_l.jpg", title: "Espresso-Royale", visible: true, icon: icon, animation: google.maps.Animation.DROP}},
    {information: {position: {lat: 42.733741, lng: -84.52225}, map: map, img: "https://atasteoflansing.files.wordpress.com/2014/08/dsc_0068.jpg", title: "Strange-Matter-Coffee", visible: true, icon: icon, animation: google.maps.Animation.DROP}},
    {information: {position: {lat: 42.720327, lng: -84.552019}, map: map, img: "http://mediad.publicbroadcasting.net/p/wkar/files/styles/x_large/public/201705/BLUEOWL.JPG", title: "Blue-Owl-Coffee", visible: true, icon: icon, animation: google.maps.Animation.DROP}},
    {information: {position: {lat: 42.734803, lng: -84.553355}, map: map, img: "https://igx.4sqi.net/img/general/200x200/46385009_cT-rmDX4ylYsOqftjFgKPb-Tj0G_0Yn8t8-fnbKfuX4.jpg", title: "Biggby-Coffee", visible: true, icon: icon, animation: google.maps.Animation.DROP}},
    {information: {position: {lat: 42.659817, lng: -84.536947}, map: map, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz_FZMqwM54biwMO3B2wkCML53H5riFa192UIAIs-2SIIgOeG4", title: "Starbucks", visible: true, icon: icon, animation: google.maps.Animation.DROP}}
  ];




  var marker;
  var infowindow;
  //loop through locations
  for(let i = 0; i < locations.length; i++){




    var proxyURL = "https://cors-anywhere.herokuapp.com";
    var review;
    var rating;
    var user;
    var settings = {
  	  "async": true,
  	  "crossDomain": true,
  	  "url": proxyURL + "/https://api.yelp.com/v3/businesses/" + locations[i].information.title + "-lansing" + "/reviews",
  	  "method": "GET",
  	  "headers": {
  	    "authorization": "Bearer 0W7PDC_nxF9zrWkuPuwLH2yfiCfptMgPhKp9ySfAA5GccWvP7LiCMKG4vHDqMI02OgWi8KngO-DarZrkOxVR6VLbZISD1frYpS-UxWzPU6LnmrYyuZaxLE-p5cVXWnYx",
  	    "cache-control": "no-cache",
  	  }
  	};

    $.ajax(settings).done(function (response) {
      //Big thanks to yelp api for getting the reviews and ratings
      //https://www.yelp.com/developers/documentation/v3/business_reviews
      review = response.reviews[0].text;
      rating = response.reviews[0].rating;
      user = response.reviews[0].user.name;


      //make a marker for each location on the map
      marker = new google.maps.Marker(locations[i].information);


      //create infowindow and give it content
      infowindow = new google.maps.InfoWindow({
        content: "<h1>" + marker.title + "</h1><img src=" + marker.img + ">\n                  <strong>" + user + "</strong><p>\"" + review + "\"</p>\n                  <strong>Rating</strong><p>" + rating + "/5</p><p><em>Powered by Yelp</em></p>",
        maxWidth: 200
      });


      //give the markers the infowindow I created above^^
      marker.infowindow = infowindow;

      //when markers clicked open in infowindow
      marker.addListener("click", (function(marker){
        return function(){
          marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
              marker.setAnimation(null);
            }, 1000);
            //open infowindow
            this.infowindow.open(map, this);
        };
      })(marker));

    })
    .fail(function() {
      alert("We couldn't recieve information from our api,this is not your fault please close your browser and try again");
    });


  }
  //In viewModel we had to empty locations but if we make a duplicate
  //then we can use it to display the locations at the start of the app!
  var displayedLocations = [];
  for (var location in locations) {
    displayedLocations.push(locations[location]);
  }



  var viewModel = {

    locations: ko.observableArray(displayedLocations),
    query: ko.observable(''),


    // when any of the elements in ul are clicked run this function
    zoomOnLocation: function(data){
      //zooms in on the location you clicked
      map.setZoom(18);
      map.setCenter(data.information.position);
    },

    //search functionality goes to Peter
    //https://gist.github.com/hinchley/5973926
    search: function(value) {


      viewModel.locations.removeAll();
      viewModel.locations.information.visible = false;


      if (value === "") return;

      for (var location in locations) {
        if (locations[location].information.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          viewModel.locations.push(locations[location]);
        }
      }
    },
    //when the input is empty the push all locations into viewModel.locations array
    empty: function(value) {


      if (value === "") {
        for (var location in locations) {
          viewModel.locations.push(locations[location]);
        }
      }
    }
  }


  viewModel.query.subscribe(viewModel.search);
  viewModel.query.subscribe(viewModel.empty);
  ko.applyBindings(viewModel);
}
