/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* ====================
Create global application to store original data and input form.
===================== */
var appState = {
  "markers": undefined,
  "data": undefined,
  "URL": undefined,
  "LAT": undefined,
  "LNG": undefined
};

$(document).ready(function() {

  // Create Input text
  $("#main-heading").text('Philadelphia Bike Crashes');
  $("#text-label1").text('Data URL');
  $("#text-label2").text('Latitude');
  $("#text-label3").text('Lontitude');


  // Set default value to input form
  $("#text-input1").val('https://raw.githubusercontent.com/CPLN-692-401/datasets/master/json/philadelphia-bike-crashes-snippet.json');
  $("#text-input2").val('LAT');
  $("#text-input3").val('LNG');

  // Enable input form
  $('#text-input1').prop('disabled', false)
  $('#text-input2').prop('disabled', false)
  $('#text-input3').prop('disabled', false)

  // Use funtions created in Week4 < Lab2 < Part 2
  var parseData = function(data) {return JSON.parse(data);};

  var makeMarkers = function(parsed) {
    return  _.map (parsed, function(dat) { return L.marker([dat[appState.LAT] , dat[appState.LNG]]);});
  };

  var plotMarkers = function(data) {return _.map(data, function(mark){return mark.addTo(map)})};

  var removeMarkers = function(data) {return _.each(data, function(mark){map.removeLayer(mark)})};

  // Initiate button
  $('#my-button').click(function(e) {
    appState.URL = $('#text-input1').val();
    console.log("URL", appState.URL);

    appState.LAT = $('#text-input2').val();
    console.log("Latitude", appState.LAT);

    appState.LNG = $('#text-input3').val();
    console.log("Lontitude", appState.LNG);
    removeMarkers(appState.markers);

    var originaldata = $.ajax(appState.URL)

    originaldata.done(function(data) {
      var parsed = parseData(data);
      console.log(parsed);
      markers = makeMarkers(parsed);
      appState.markers = markers;
      console.log(markers);
      plotMarkers(markers);
      console.log("Attaching " + markers.length + " markers to the map");
    });
  });
});
