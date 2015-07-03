$(document).ready(function () {
  $('.swipebox').swipebox();
});

document.addEventListener('DOMContentLoaded', function () {
  /**
   * Setup
   */
  var mapElement  = document.querySelector('.map')
  ,   infoElement = document.querySelector('.map-info');
  if (!mapElement || !infoElement) return;

  /**
   * Build Map
   */
   var location = new google.maps.LatLng(41.890775, -87.628441);

   var map = new google.maps.Map(mapElement, {
     center: location,
     zoom: 16,
     disableDefaultUI: true,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   });

   var infoWindow = new google.maps.InfoWindow({
     content: infoElement.innerHTML
   });

   var marker = new google.maps.Marker({
     position: location,
     map: map,
     title: 'Earhole Studios',
     animation: google.maps.Animation.DROP
   });

   google.maps.event.addListener(marker, 'click', function () {
     infoWindow.open(map, marker);
   });
});
