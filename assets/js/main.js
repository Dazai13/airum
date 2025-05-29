$(document).ready(function(){
  $('.banner__slider').slick({
    arrows:false,
    infinite: true,
    autoplay: true, 
    autoplaySpeed:7000,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    adaptiveHeight: true
  });
});