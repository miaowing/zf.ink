document.addEventListener('DOMContentLoaded', function() {
  /**
   * Search - DISABLED
   */
  // var inputs = document.querySelectorAll('.search');
  //
  // for (var i = 0; i < inputs.length; i++) {
  //   new Search({
  //     el: inputs[i],
  //     url: inputs[i].getAttribute('rel')
  //   });
  // }

  /**
   * Popup links
   */
  var popups = document.querySelectorAll('.popup');

  for (var i = 0; i < popups.length; i++) {
    popups[i].addEventListener('click', function(event) {
      event.preventDefault();
      var url = this.getAttribute('href');
      this.removeAttribute('target');
      window.open(url, 'newwindow', 'width=500,height=360');
      return false;
    });
  }

  /**
   * Triggers
   */
  var triggers = document.querySelectorAll('.trigger');
  var triggerTimes = 0;

  function showOverlay(overlay) {
    overlay.classList.add('active');
    document.body.classList.add('with-overlay');
    // trackViewPage(overlay);
    return false;
  }

  for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener('click', function(event) {
      if (event.target.classList.contains('trigger-once')) {
        if (triggerTimes > 0) {
          return;
        }
        triggerTimes = triggerTimes + 1;
      }
      var target = document.getElementById(this.getAttribute('rel'));
      return showOverlay(target);
    });
  }

  /**
   * Overlays
   */

    // Closing elements
  var overlays = document.querySelectorAll('.overlay');

  for (var i = 0; i < overlays.length; i++) {
    overlays[i].addEventListener('click', function(event) {
      if ((event.target.classList.contains('close')) || (event.target.parentNode.classList.contains('close'))) {
        this.classList.remove('active');
        document.body.classList.remove('with-overlay');
      }
    });
  }

  // Close overlays & dialogs with escape key
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      var overlays = document.querySelectorAll('.overlay');

      for (var i = 0; i < overlays.length; i++) {
        overlays[i].classList.remove('active');
      }

      document.body.classList.remove('with-overlay');
    }
  };

  /**
   * Popup on scroll
   */
  function annoyingPopup() {
    if (localStorage.getItem('popup-follow') != 'displayed') {
      localStorage.setItem('popup-follow', 'displayed');
      var overlay = document.getElementById('overlay-follow');
      if (overlay !== null) return showOverlay(overlay);
    }
  }

  window.onscroll = function(e) {
    var s = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var body = document.body;
    var html = document.documentElement;
    var d = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    var c = window.innerHeight;
    var position = (s / (d - c)) * 100;
    if (position > 66) {
      return annoyingPopup();
    }
  };

  setTimeout(annoyingPopup, 60000);
});

$(function() {
  /**
   * Autosize textareas
   */

  function resize(event) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  }

  // 0-timeout to get the already changed text
  function delayedResize(event) {
    window.setTimeout(resize, 0, event);
  }

  var textareas = document.querySelectorAll('.autosize');

  for (var i = 0, l = textareas.length; i < l; ++i) {
    var el = textareas.item(i);
    el.addEventListener('change', resize, false);
    el.addEventListener('cut', delayedResize, false);
    el.addEventListener('paste', delayedResize, false);
    el.addEventListener('drop', delayedResize, false);
    el.addEventListener('keydown', delayedResize, false);
  }

  // Header menu
  $('#header .toggle').click(function() {
    $(this).next('.menu').toggleClass('active');
  });

  $('#header .close').click(function() {
    $(this).parent().parent().toggleClass('active');
  });

  // Filtered lists
  $('.filters a').click(function(e, history = true) {
    var list = $(this).parent().attr('data-target');
    $('.filters a').removeClass('active');
    $(this).addClass('active');
    var filter = $(this).attr('data-filter');
    $('#' + list + ' li').removeClass('hidden');
    if (filter != 'all') {
      $('#' + list + ' li').filter(function() {
        return !($(this).attr('data-filters').indexOf(filter) > -1);
      }).addClass('hidden');
    }
    collapse();
    if (history) window.history.pushState({ urlPath: window.location.pathname }, '', '?filter=' + filter);
  });

  var defaultFilter = new RegExp('[\?&]filter=([^&#]*)').exec(window.location.href);
  if (defaultFilter && defaultFilter[1]) $('.filters a[data-filter=' + defaultFilter[1] + ']').trigger('click', false);

  collapse();

  // Collapsing lists
  // TODO: CLEAN THIS CODE (SUBPAR IMPLEMENTATION)
  function collapse(limit = 10) {
    if ($('.list.collapsible li:not(.hidden)').length > limit) {
      $('.list.collapsible').addClass('collapsed');
    } else {
      $('.list.collapsible').removeClass('collapsed');
    }
    $('.list.collapsible li:not(.hidden)').removeClass('collapsed').slice(limit).addClass('collapsed');
    $('.list.collapsible + .toggle').click(function() {
      $(this).prev('.collapsible').removeClass('collapsed');
    });
  }

  /**
   * Hello geeks
   */
  var message = '';
  message += 'Well hello there! Looks like we have some kind of nerd on our hands.' + '\n\n';
  message += 'Stop staring at the console and go check out our open positions in Berlin and Shanghai:' + '\n';
  message += 'https://wiredcraft.com/jobs/' + '\n\n';
  message += 'Wanna get a job your mom would be proud of? Send us your resume at job@wiredcraft.com.' + '\n';
  console.log(message);
});
