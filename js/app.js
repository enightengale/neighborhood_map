function initMap(){

  var map;
  var lansing = {lat: 42.732536, lng: -84.555534};
  //creating a map by giving it a lat and lng above
  var map = new google.maps.Map(document.getElementById("map"), {
    center: lansing,
    zoom: 11,
    mapTypeId: "roadmap"
  });

function AppViewModel(){

  //make a request to yelp reviews
  fetch("https://api.yelp.com/v3/businesses/gary-danko-san-francisco/reviews", {
    headers: {
      Authorization: "Bearer 0W7PDC_nxF9zrWkuPuwLH2yfiCfptMgPhKp9ySfAA5GccWvP7LiCMKG4vHDqMI02OgWi8KngO-DarZrkOxVR6VLbZISD1frYpS-UxWzPU6LnmrYyuZaxLE-p5cVXWnYx"
    },
  }).then(response => response.json()).then(getReview)


  function getReview(data){
    const review = data.reviews[0];
    console.log(review.text);
  }

  //hard coding the locations, giving each a lat and lng
  this.locations = ko.observableArray([
    {title: "Espresso Royale", location: {lat: 42.733857, lng: -84.477448}, img: "https://pbs.twimg.com/profile_images/77346209/866162933_l.jpg"},
    {title: "Strange Matter Coffee", location: {lat: 42.733741, lng: -84.52225}, img: "https://atasteoflansing.files.wordpress.com/2014/08/dsc_0068.jpg"},
    {title: "Blue Owl Coffee", location: {lat: 42.720327, lng: -84.552019}, img: "http://mediad.publicbroadcasting.net/p/wkar/files/styles/x_large/public/201705/BLUEOWL.JPG"},
    {title: "Bloom Roasters Coffee", location: {lat: 42.748565, lng: -84.549241}, img: "http://lansingbusinessnews.com/wordpress/wp-content/uploads/2016/08/Bloom1.jpg"},
    {title: "Iorio's Gelate & Caffé", location: {lat: 42.720089, lng: -84.495629}, img: "https://static1.squarespace.com/static/5188549ce4b0c732a495a649/5642517ee4b0b66656b90c8e/564252d1e4b00b392cc77a7d/1447187166184/12194885_534480993369042_5170890685748847123_o.jpg?format=750w"},
    {title: "Allegro Coffee Company", location: {lat: 42.728180, lng: -84.452994}, img: "http://assets.wholefoodsmarket.com/www/departments/coffee-tea/AllegroCoffeeStand.jpg"}
  ]);

  var marker;



  //loop through locations
  for(let i = 0; i < this.locations().length; i++){




    // when any of the elements in ul are clicked run this function
    this.zoomOnLocation = function(data){
      //zooms in on the location you clicked
      map.setZoom(18);
      map.setCenter(data.location);
    }



    //set icon size and url
    var icon = {
      scaledSize: new google.maps.Size(50, 50),
      url: "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/ultra-glossy-silver-buttons-icons-food-beverage/058902-ultra-glossy-silver-button-icon-food-beverage-drink-coffee-tea1.png"
    }

    //make a marker for each location on the map
    marker = new google.maps.Marker({
      position: this.locations()[i].location,
      map: map,
      img: this.locations()[i].img,
      title: this.locations()[i].title,
      icon: icon,
      animation: google.maps.Animation.DROP
    });

    //create infowindow and give it content
    var infowindow = new google.maps.InfoWindow({
      content: `<h1>${marker.title}</h1><img src=${marker.img}>`,
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
    }
  })(marker));

  }

 }
  //apply knockout
  ko.applyBindings(new AppViewModel());
}
