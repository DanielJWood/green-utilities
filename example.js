//COULD CREATE THIS ARRAY WITH A FOR LOOP PULLING FROM THE INDEX
// TRASH! var breakdown = [{"DR":[]},{"DI":[]},{"MP":[]},{"LT":[]},{"DA":[]},{"FD":[]}]

var markers = [];

//build map elements
var map = mapbox.map('map');
    map.addLayer(mapbox.layer().id('grassroots.map-lv8enaf8'));
    map.addLayer(mapbox.layer().id('grassroots.africa-protraction'));
    map.ui.zoomer.add();
    map.centerzoom({
        lat: 28.110749,
        lon: -91.199158
    }, 7);

$(document).ready(function(){

  $.getJSON('combined_2_14.json',  function(data) {

    //Add initial marker variable and marker layer
    var markerLayer = mapbox.markers.layer().features(data.features);
    map.addLayer(markerLayer);  

              //listen for all clicks
    $('#map-ui ul li a').click(function (e) {
      e.preventDefault();

      //Remove original markerLayer (generated before filter, from json)
      map.removeLayer(markerLayer);

      //Remove new marker layer (from last click). Is this necessary?
      map.removeLayer(markerLayernew);

      //clears markers variable each click
      var markers = [];

      //clears markerLayernew each click
      //var markerLayernew = [];
      // or should it be, 
      var markerLayernew = mapbox.markers.layer().features([]);


      //The following four lines turn on or off the "active"
      if (this.className != "active") {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      };      

      //Filters data on each click into the "markers" json object, based on whether or not checkbox is active
      $.each(data.features, function(i) {
          if (data.features[i].properties.key == "DR" && document.getElementById('DR').className == "active") {
          markers.push(data.features[i])
        } else if (data.features[i].properties.key == "DI" && document.getElementById('DI').className == "active") {
          markers.push(data.features[i])
        } else if (data.features[i].properties.key == "MP" && document.getElementById('MP').className == "active") {
          markers.push(data.features[i])
        } else if (data.features[i].properties.key == "LT" && document.getElementById('LT').className == "active") {
          markers.push(data.features[i])
        } else if (data.features[i].properties.key == "DA" && document.getElementById('DA').className == "active") {
          markers.push(data.features[i])
        } else if (data.features[i].properties.key == "FD" && document.getElementById('FD').className == "active"){
          markers.push(data.features[i])
        }
      });
      
      
      // create most recent marker layer from above filtering
      var markerLayernew = mapbox.markers.layer().features(markers);

      //add most recent marker layer to map
      map.addLayer(markerLayernew);    
    });
  });
});