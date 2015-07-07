$(document).ready(function () {
  var touchEnabled = 'ontouchstart' in document.documentElement;

  if (!$('body').hasClass('index')) return;
  if (touchEnabled) return;

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

  var utils = {
    copy: function (obj) {
      if (null === obj || 'object' !== typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
    }
  };

  /**
   * Build a global event `Controller`.
   */
  var Controller = {
    state: {
      sampleIndex: 0,
      soundtrackIndex: 0,
      objectCount: 0,
      activated: false
    },

    /**
     * State helpers.
     */
    initialize: function () {
      this.defaultState = utils.copy(this.state);
    },

    getState: function (key) {
      return this.state[key];
    },

    setState: function (key, value) {
      this.state[key] = value;
    },

    incrementState: function (key) {
      if ('number' !== typeof this.state[key]) return;
      this.setState(key, (this.state[key] + 1));
    },

    resetState: function (key) {
      if (key) return this.state[key] = this.defaultState[key];
      this.state = utils.copy(this.defaultState);
    },

    addCircle: function (event) {
      var container = $('.playground')
      ,   element   = $(document.createElement('div'));

      element
        .addClass('object')
        .addClass(['object', this.getState('objectCount')].join('-'))
        .dot(event.pageX, event.pageY, false, true);

      this.incrementState('objectCount');
      container.append(element);
    },

    handleClick: function (event) {
      if (this.getState('soundtrackIndex') > soundtrack.length) {
        this.setState('soundtrackIndex', 0);
      }

      if (this.getState('sampleIndex') > samples.length) {
        this.setState('sampleIndex', 0);
      }

      if (!this.getState('activated')) {
        this.setState('activated', true);
        $('.controls.close').show();
      }

      var backbeat = soundtrack[this.getState('soundtrackIndex')]
      ,   sample   = samples[this.getState('sampleIndex')];

      if (backbeat) backbeat.play();
      if (sample) sample.play();

      if (!this.currentSoundtrack) this.currentSoundtrack = backbeat;

      this.incrementState('soundtrackIndex');
      this.incrementState('sampleIndex');
      this.setState('activated', true);

      this.addCircle(event);
    },

    cleanup: function () {
      if (this.currentSoundtrack) {
        this.currentSoundtrack.stop();
        this.currentSoundtrack = null;
      }

      $('.playground .object').hide().remove();
      $('.controls.close').hide();

      this.resetState();
    }
  };

  /**
   * Initialize `eventbus`
   */
  Controller.initialize();

  /**
   * Fire events on `click`, delegating events to the `eventsBus`
   */
  $('.playground').click(function (event) {
    event.preventDefault();
    Controller.handleClick(event);
  });

  $('.controls.close').click(function (event) {
    event.preventDefault();
    Controller.cleanup();
  });
});
