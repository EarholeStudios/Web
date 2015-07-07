$(document).ready(function () {
  if (!$('body').hasClass('about')) return;
  
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

   if ($(window).width() > 662) infoWindow.open(map, marker);

   $(window).resize(function () {
     map.panTo(location);

     if ($(this).width() <= 662) {
       infoWindow.close();
     } else {
       infoWindow.open(map, marker);
     }
   });
});
