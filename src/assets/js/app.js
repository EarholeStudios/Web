$(document).ready(function () {
  /**
   * Kickoff Swipebox
   */
  $('.swipebox').swipebox();

  /**
   * Detect touch devices, and add .touch classes where needed.
   */
  var touchEnabled = 'ontouchstart' in document.documentElement;

  if (touchEnabled && $('.video').length) {
    $('.video').addClass('touch');
  }
});
