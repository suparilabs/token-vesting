$(document).ready(function () {
  // Header Scroll
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $(".navbar").addClass("background");
    } else {
      $(".navbar").removeClass("background");
    }
  });

  //AOS.init();

  AOS.init({
    once: true,
    duration: 700,
    delay: 400,
  });
  //$(window).load(function() { setTimeout(function() { AOS.refresh(); }, 5); });
  $(window).on("load", function () {
    setTimeout(function () {
      AOS.refresh();
    }, 5);
  });
});
