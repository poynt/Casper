(function () {

var ls = window.localStorage || {};
ls.referer = ls.referer || document.referrer || '';

var scrollBanner = function () {
  var scrollTop = $(window).scrollTop();

  if (scrollTop > 80) {
    $('#nav').addClass('scrolled');
  } else {
    $('#nav').removeClass('scrolled');
  }

  if (scrollTop > 160) {
    $('#nav').addClass('active');
  } else {
    $('#nav').removeClass('active');
  }

  if (scrollTop > 480) {
    if (!$('#subscribe-slider').hasClass('scrolled')) {
      setTimeout(function () { $('#subscribe-slider-form-email').focus(); }, 1000);
    }
    $('#subscribe-slider').addClass('scrolled');
  } else {
    $('#subscribe-slider').removeClass('scrolled');
  }
};

if ($('.content-banner').length) {
  $(window).scroll(scrollBanner);
  scrollBanner();
}

$('.subscribe-button').click(function () {
  if (typeof ga !== 'undefined' && ga) {
    ga('send', 'event', 'subscribe-open', 'click', $(this).data('location'), {
      type    : $(this).data('type'),
      referer : ls.referer
    });
  }
  $('html,body').css('overflow', 'hidden');
  $('#subscribe').addClass('active');
  $('#subscribe-firstname').focus();
});

$('#subscribe').click(function () {
  $('html,body').css('overflow', 'auto');
  $('#subscribe').removeClass('active');
});

$('#subscribe-done').click(function () {
  $('html,body').css('overflow', 'auto');
  $('#subscribe-done').removeClass('active');
});

$('#subscribe > div').click(function (e) {
  e.stopPropagation();
});

$('#subscribe-form').submit(function (e) {
  e.preventDefault();

  $.getJSON(this.action + '?callback=?', $(this).serialize(), function (data) {
    if (data.Status !== 200) {
      $('#subscribe-error').text(data.Message).slideDown();
      return;
    }
    $('#subscribe-error').text('').slideUp();
    $('#subscribe-firstname').val('');
    $('#subscribe-lastname').val('');
    $('#subscribe-email').val('');
    $('#subscribe-type').val('');
    $('#subscribe').removeClass('active');
    $('#subscribe-done').addClass('active');
    ls.subscribed = true;

    setTimeout(function () {
      $('#subscribe-done').removeClass('active');
    }, 5000);
  });

  return false;
});

$('#subscribe-slider-form').submit(function (e) {
  e.preventDefault();

  $.getJSON(this.action + '?callback=?', $(this).serialize(), function (data) {
    $('#subscribe-slider-thanks').css('display', 'inline-block');
    $('#subscribe-slider-form').hide();
    ls.subscribed = true;

    setTimeout(function () {
      $('#subscribe-slider').addClass('hidden');
    }, 5000);
  });

  return false;
});

if (ls.subscribed) {
  $('#subscribe-slider').addClass('hidden');
}

})();
