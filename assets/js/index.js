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
  $('.content-banner > div').css('background-position-y', Math.max(scrollTop, 0) + 'px');
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

})();
