(function () {

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


  var blur = 'blur(' + (Math.min(scrollTop, 320) / 320 * 15) + 'px)';
  $('.content-banner > div').css('-webkit-filter', blur);
  $('.content-banner > div').css('-moz-filter', blur);
  $('.content-banner > div').css('-o-filter', blur);
  $('.content-banner > div').css('-ms-filter', blur);
  $('.content-banner > div').css('filter', blur);
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
  $('#subscribe-name').focus();
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
    $('#subscribe-name').val('');
    $('#subscribe-email').val('');
    $('#subscribe-type').val('');
    $('#subscribe').removeClass('active');
    $('#subscribe-done').addClass('active');

    setTimeout(function () {
      $('#subscribe-done').removeClass('active');
    }, 5000);
  });

  return false;
});

})();
