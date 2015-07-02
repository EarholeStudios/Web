document.addEventListener('DOMContentLoaded', function () {
  var mapElement = document.querySelector('.map');

  if (mapElement) {
    var map = new google.maps.Map(mapElement, {
      center: new google.maps.LatLng(41.890775, -87.628441),
      zoom: 16,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  }
});
