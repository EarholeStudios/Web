$(document).ready(function () {
  if (!$('body').hasClass('index')) return;

  /**
   * Setup
   */
  var samples    = window.samples || []
  ,   soundtrack = window.soundtrack || [];

  /**
   * Map over `samples` and `soundtrack` arrays, and return
   * `buzz.sound` objects.
   */
  samples = samples.map(function (sound) {
    return new buzz.sound('/assets/sounds/samples/' + sound, {
      formats: ['mp3', 'ogg']
    });
  });

  soundtrack = soundtrack.map(function (sound) {
    return new buzz.sound('/assets/sounds/soundtrack/' + sound, {
      formats: ['mp3', 'ogg'],
      loop: true
    });
  });

  /**
   * Build a global events bus.
   */
  var eventBus = {
    state: {
      sampleIndex: 0,
      objectCount: 0,
      activated: false
    },
    init: function () {
      this.defaultState = this.state;
    },
    getState: function (key) {
      return this.state[key];
    },
    setState: function (key, value) {
      this.state[key] = value;
    },
    incrementState: function (key) {
      if ('number' !== this.state[key]) return;
      this.setState(key, (this.state[key] + 1));
    },
    resetState: function (key) {
      if (key) return this.state[key] = this.defaultState[key];
      this.state = this.defaultState;
    },
    addCircle: function () {
      var container = $('.playground')
      ,   element   = $(document.createElement('div'));

      element.addClass('object')
      element.addClass(['object', this.getState('objectCount')].join('-'))
      element.dot(event.pageX, event.pageY, false, true);

      container.append(element);
    },
    fireSample: function (index) {
      index = index || 0;
      if (index > samples.length) index = (samples.length - 1);
      samples[index].play();
    },
    fireSoundtrack: function (index) {
      index = index || 0;
      if (index > soundtrack.length) index = (soundtrack.length - 1);
      if (!this.getState('activated')) return;
      soundtrack[index].play();
      firstClick = false;
    },
    cleanup: function () {
      $('.playground .object').hide().remove();
      $('.controls.close').hide();
    }
  };

  /**
   * Fire events on `click`, delegating events to the `eventsBus`
   */
  $('.playground').click(function (event) {
    event.preventDefault();
    eventBus.addCircle();
    eventBus.fireSoundtrack();
    eventBus.fireSample();
  });

  $('.controls.close').click(function (event) {
    event.preventDefault();
    eventBus.cleanup();
  });
});
