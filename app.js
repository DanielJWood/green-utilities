/*create array:*/
var marker = new Array();

//Create empty variable to store "this" DOM element in
var t;

function buildMap() {

//create empty array to push into
	var raw = [];
//create array of numbers (in push below) where you attach the numbers to generate the icons
	var iconname = [];
//create array of values
	var iconvalue = [];
	var o;
if (t != undefined) {
//for each point, push if it is the right type and if that has been clicked
	for (var i = 0; i < geoJson[0].features.length; i++) {
		if (t.id === "b1" && geoJson[0].features[i].properties.sales_rank != null) {
			raw.push(geoJson[0].features[i])
			iconname.push(geoJson[0].features[i].properties.sales_rank);
			iconvalue.push(geoJson[0].features[i].properties.sales);
			o = " MWh/year"
		} 
		else if (t.id === "b2" && geoJson[0].features[i].properties.cust_rank != null) {
			raw.push(geoJson[0].features[i])
			iconname.push(geoJson[0].features[i].properties.cust_rank);
			iconvalue.push(geoJson[0].features[i].properties.customers);
			o = " Customers"
		}
		else if (t.id === "b3" && geoJson[0].features[i].properties.part_rate_ != null) {
			raw.push(geoJson[0].features[i])
			iconname.push(geoJson[0].features[i].properties.part_rate_);
			iconvalue.push(geoJson[0].features[i].properties.part_rate);
			o = "% of Customers Participating"
		}
		else if (t.id === "b4" && geoJson[0].features[i].properties.perc_load_ != null) {
			raw.push(geoJson[0].features[i])
			iconname.push(geoJson[0].features[i].properties.perc_load_);
			iconvalue.push(geoJson[0].features[i].properties.perc_load);
			o = "% of Sales"
		}
		else if (t.id === "b5" && geoJson[0].features[i].properties.net_prem_1 != null) {
			raw.push(geoJson[0].features[i])
			iconname.push(geoJson[0].features[i].properties.net_prem_1);
			iconvalue.push(geoJson[0].features[i].properties.net_premiu);
			o = " cents/kWh"
		}
		else if (t.id === "b6" && geoJson[0].features[i].properties.perc_sol_1 != null) {
			raw.push(geoJson[0].features[i])
			iconname.push(geoJson[0].features[i].properties.perc_sol_1);
			iconvalue.push(geoJson[0].features[i].properties.perc_solar);
			o = "% Solar"

		};
	};
} else {
	for (var i = 0; i < geoJson[0].features.length; i++) {
		//for the first load, load the first set of information
		if (geoJson[0].features[i].properties.sales_rank != null) {
			raw.push(geoJson[0].features[i])
			iconname.push(geoJson[0].features[i].properties.sales_rank);
			iconvalue.push(geoJson[0].features[i].properties.sales);
						o = " MWh/year"

		};
	};
};
     

    var oms = new OverlappingMarkerSpiderfier(map);

	for (var i = 0; i < raw.length; i++) {
	 //create a the "iconic" url for the icon, from the mapbox api.
	  var iconic;

	  if (iconname[i] != 10) {iconic="http://api.tiles.mapbox.com/v3/marker/pin-m-"+ iconname[i] +"+71bc4e.png"} else{
	  	iconic = 'icons/ten.png'	
	  };

console.log(o);
	  // Create custom popup content
        var popupContent =  '<div class=\'popHeader\'><h2>' + raw[i].properties.utility + '</h2></div>' +
        '<p>' + raw[i].properties.location + '</p>' +
        '<p>' + iconvalue[i] + o +'</p></div>'; 

	  /*pushing items into array each by each and then add markers*/
	  var LamMarker = new L.marker([raw[i].geometry.coordinates[1],raw[i].geometry.coordinates[0]], {
	    icon: L.icon({
	        iconUrl: iconic,
	        iconSize:     [30, 70], // size of the icon
	        iconAnchor:   [15, 35], // point of the icon which will correspond to marker's location
	        popupAnchor:  [0, -35]  // point from which the popup should open relative to the iconAnchor
		    })
		}).bindPopup(popupContent, {closeButton:false });
		  marker.push(LamMarker);
		  map.addLayer(marker[i]);
		          oms.addMarker(marker[i]);

	};
};

function removal() {
	for (var i = 0; i < marker.length; i++) {
    	map.removeLayer(marker[i]);
	};
	marker = [];
};

(function ($) {

	$(document).ready(function() { 
			buildMap();				


		$('.button').click(function (e) {
	      $('.button').removeClass('active');
	      $(this).addClass('active');
			removal();
			t = this;
			buildMap();
		});

	//turn on off pull tab
$('a#tably').click(function (e) {
       e.preventDefault();
       $('a#tably').removeClass('active');
       $('.about-data').addClass('active');
       $('a.closed').addClass('active');
   });

$('a.closed').click(function (e) {
       e.preventDefault();
       $('.about-data').removeClass('active');
       $('a.closed').removeClass('active');
       $('a#tably').addClass('active');
   });       
	});

}(jQuery));