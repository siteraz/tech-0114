'use strict';

var lastScroll = 0;

//check for browser os
var isMobile = false;
var isiPhoneiPad = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}

if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    isiPhoneiPad = true;
}

/*==============================================================*/
// Menu
/*==============================================================*/

jQuery(document).ready(function(){

  setTimeout(function () {
    jQuery("header").show();
    jQuery(".hidden-menu").show();


  }, 1200); 

	jQuery("#main-menu").navigation({
    mobileBreakpoint: 1000,
    effect: "slide",
    showDuration: 400,
    hideDuration: 400,
    showDelayDuration: 100,
    hideDelayDuration: 100,
    submenuIndicator: false
  });

  jQuery("#minimal-menu").navigation({
    hidden: true
  });


  jQuery(".btn-minimal").click(function(){ 
    jQuery("#minimal-menu").data("navigation").toggleOffcanvas();
  });

  

	jQuery("#hidden-menu").navigation({
    offCanvasSide: "right",
		hidden: true,
    showDuration: 1000,
    hiddenOnMobile: true,
    effect: "slide"
	});
  
	jQuery(".btn-show").click(function(){ 
		jQuery("#hidden-menu").data("navigation").toggleOffcanvas();
	});

});


/*==============================================================*/
// Sticky menu
/*==============================================================*/

var lastScrollTop = 0;
var sticky = document.getElementById("sticky");

if(sticky) {


  var heightHeader = jQuery("header").height() + 1;
  var heightDisplay = $(window).height();

  window.addEventListener("scroll", function(){
    
    if (!jQuery("header").hasClass("white-header")) {
      if (jQuery(window).scrollTop() >= heightDisplay-89.5) {
        jQuery("header").removeClass("color-white");
        jQuery('img.logo-img').attr('src','/public/img/logo-black.png');
      }
      else {
        jQuery("header").addClass("color-white");
      }
    }

    if (jQuery("header").hasClass("transparent")) {
      if (jQuery(window).scrollTop() >= heightDisplay-89.5) {
        jQuery("header").addClass("bg-t-w-8");
        jQuery('img.logo-img').attr('src','/public/img/logo-black.png');
      }
      else {
        jQuery("header").removeClass("bg-t-w-8");
        jQuery('img.logo-img').attr('src','/public/img/logo-white.png');
      }
    }

    if (jQuery("header").hasClass("dark-header")) {
      if (jQuery(window).scrollTop() >= heightDisplay-89.5) {
        jQuery("header").addClass("color-white");
        jQuery('img.logo-img').attr('src','/public/img/logo-white.png');
      }
      else {
        jQuery("header").addClass("color-white");
        jQuery('img.logo-img').attr('src','/public/img/logo-white.png');
      }
    }

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop){
      sticky.style.top = "-" + heightHeader + "px";
    }else{
      sticky.style.top = "0px";
    }
    lastScrollTop = scrollTop;

  })
}


/*==============================================================*/
// Slider
/*==============================================================*/


jQuery(document).ready(function() {

var sliderOwl = jQuery("#slider-1");

sliderOwl.owlCarousel({
  loop:true,
  margin:0,
  items:1,
  autoplay: true,
  autoplayHoverPause:true,
  lazyLoad: true,
  nav: true,
  dots: false,
  navSpeed: 500,
  autoplayTimeout: 60000,
  singleItem: true,
  navText: [
  "<i class='ti-angle-left'></i>",
  "<i class='ti-angle-right'></i>"
  ],
  animateIn: 'pulse'
});


sliderOwl.on('changed.owl.carousel', function(event) {

  var $currentItem = jQuery('.owl-item', sliderOwl).eq(event.item.index);
  var $elemsToanim = $currentItem.find("[data-animation]");

  setAnimation ($elemsToanim);
  setEmpty ($elemsToanim);
})

function setAnimation ( _elem ) {
  var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  _elem.each ( function () {
    var $elem = jQuery(this);
    $elem.removeClass('animated');
    $elem.removeClass($elem.data( 'animation' ));

    var $animationType = 'animated ' + $elem.data( 'animation' );
    var $animationTimeOut = $elem.data( 'timeout' );

    if ($animationTimeOut) {
      window.setTimeout(function(){
        $elem.addClass($animationType);
      }, parseInt($animationTimeOut,10));
    } else {
      $elem.addClass($animationType);
    }
  });
}

function setEmpty ( _elem ) {
  var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  _elem.each ( function () {
    var $elem = jQuery(this);
    
    $elem.addClass('animate');
    $elem.removeClass('animated');
  });
}

});

// ANIMATION ELEMENTS
//================================================================

jQuery(function($) {
  
  var doAnimations = function() {
    
    var offset = $(window).scrollTop() + $(window).height(),
        $animatables = $('.animate');
    
    if ($animatables.length == 0) {
      jQuery(window).off('scroll', doAnimations);
    }
  
    $animatables.each(function(i) {

      var $animatable = jQuery(this); 

      var animationStyle = jQuery(this).data('animation');
      var animationTimeout = jQuery(this).data('timeout');

      if(animationTimeout){
        if (($animatable.offset().top + $animatable.height() - 20) < offset) {
          window.setTimeout(function(){
            $animatable.addClass('animated ' + animationStyle);
          }, parseInt(animationTimeout, 10));
        }
      }else{
        if (($animatable.offset().top + $animatable.height() - 20) < offset) {
          jQuery(this).addClass('animated ' + animationStyle);
          //$animatable.removeClass('animate').addClass('animated'); 
        }
      }
    });
  };
  
  jQuery(window).on('scroll', doAnimations);
  jQuery(window).trigger('scroll');

});


// COUNTDOWN
//================================================================

jQuery(document).ready(function() {

var countdownDate   = '2021/10/10';

jQuery('#small-coundown').countdown(countdownDate, function(event) {

  var $this = $(this).html(event.strftime(''
    + '<ul class="small-countdown">'
    + '<li><span>%D</span> <p>days</p></li>'
    + '<li><span>%H</span> <p>hr</p></li>'
    + '<li><span>%M</span> <p>min</p></li>'
    + '<li><span>%S</span> <p>sec</p></li>'
    + '</ul>'
    ));
});


$('#large-coundown').countdown(countdownDate, function(event) {

  var $this = $(this).html(event.strftime(''
    + '<ul class="large-countdown">'
    + '<li><span>%D</span> <p>days</p></li>'
    + '<li><span>%H</span> <p>hr</p></li>'
    + '<li><span>%M</span> <p>min</p></li>'
    + '<li><span>%S</span> <p>sec</p></li>'
    + '</ul>'
    ));
});

});

// COUNTER
//================================================================

jQuery(document).ready(function($) {
  jQuery('.counter').counterUp({
    delay: 10,
    time: 1000
  });
});

// BG EFFECT
//================================================================

var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 30;

function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  jQuery('.bg-effect').css({
    '-webit-transform': 'translate(' + x + 'px, ' + y + 'px) scale(1.1)',
    '-moz-transform': 'translate(' + x + 'px, ' + y + 'px) scale(1.1)',
    'transform': 'translate(' + x + 'px, ' + y + 'px) scale(1.1)',
  });

  window.requestAnimationFrame(moveBackground);
}

jQuery(window).on('mousemove click', function(e) {

  var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
  lFollowX = (10 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;

});

moveBackground();

// CLIENT
//================================================================

var clients = jQuery("#client-slider");
clients.owlCarousel({
  loop:true,
  lazyLoad: true,
  margin: 30,
  items: 4,
  autoplay: true,
  autoplayTimeout: 60000,
  nav: false,
  dots: false,
  navSpeed: 1400,
  singleItem: true
});

// GALLERY
//================================================================

jQuery(document).ready(function() {

var sliderGallery = jQuery("#gallery-slider");

sliderGallery.owlCarousel({
  loop:true,
  margin: 5,
  items: 3,
  autoplay: true,
  autoplayHoverPause:true,
  lazyLoad: true,
  nav: true,
  dots: false,
  autoplaySpeed: 800,
  navSpeed: 800,
  autoplayTimeout: 3000,
  navText: [
  "<i class='ti-angle-left'></i>",
  "<i class='ti-angle-right'></i>"
  ],
  responsive:{
    0:{
      items: 1
    },
    600:{
      items: 2
    },
    1200:{
      items: 3
    }
  }
});


});

// INSTAGRAM FEED
//================================================================

jQuery('.il-instagram-feed').instagramLite({
  accessToken: '34626526.e03499d.ce25ff5470e246aab7e54dcb22c754c0',
  urls: true,
  limit: 8,
  comments_count: true,
  captions: true,
  likes: true
});

jQuery('.il-instagram-feed-footer').instagramLite({
  accessToken: '1730464.199554e.e561d1b801d74e35a1453110a44a09e8',
  urls: true,
  limit: 6
});

// TESTIMONIAL
//================================================================

var testimonials = jQuery("#testimonial-slider");
testimonials.owlCarousel({
  loop:true,
  margin: 30,
  items: 3,
  autoplay: true,
  autoplayTimeout: 6000,
  nav: false,
  dots: true,
  navSpeed: 1400,
  singleItem: true
});


// SCROLL TO
//================================================================

jQuery('.scroll_to').smoothScroll({
  autoFocus: true,
  speed: 900,
  updateURL: false,
  callbackBefore: function ( toggle, anchor ) {
  },
  callbackAfter: function ( toggle, anchor ) {
    $("a").removeClass('active');
    $(toggle).addClass('active');
  }
});

  jQuery(document).on('click', "a.scroll_to[href^='#']", function(e) {
    e.preventDefault();

    jQuery('a.scroll_to').removeClass('active');
    jQuery(this).addClass('active');
    
  });


// ACCORDION
//================================================================

jQuery(document).ready(function(){

  jQuery(".accordion_list").champ({
    plugin_type :  "accordion"
  });

});

// TAB
//================================================================

jQuery(document).ready(function(){

  jQuery(".simple_tab").champ();

  jQuery(".side_left_tab").champ({
    plugin_type: "tab",
    side: "left",
    active_tab: "1"
  });

});

// 04.FILTER
//================================================================
jQuery(document).ready(function(){

  if ( jQuery( ".filter" ).length ) {

  var filterSingle = jQuery('.filter').filterizr({layout: 'sameWidth'});

  jQuery('ul.simplefilter li').click(function () {
    jQuery('ul.simplefilter li').removeClass('active');
    jQuery(this).addClass('active');
  });
  
  }

});

// ANIMATION
//================================================================

var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: false,
    live: true
});
jQuery(window).imagesLoaded(function () {
    wow.init();
});

jQuery(document).on('load', function () {
  var hash = window.location.hash.substr(1);
  if (hash != "") {
    setTimeout(function () {
      jQuery(document).imagesLoaded(function () {
        var scrollAnimationTime = 1200,
                scrollAnimation = 'easeInOutExpo';
        var target = '#' + hash;
        if ($(target).length > 0) {

          jQuery('html, body').stop()
            .animate({
                'scrollTop': $(target).offset().top
            }, scrollAnimationTime, scrollAnimation, function () {
                window.location.hash = target;
            });
        }
      });
    }, 500);
  }

  fullScreenHeight();
});


// JUSTIFIED GALLERY
//================================================================

jQuery("#product_photos").justifiedGallery({
  rowHeight : 130,
  margins : 15
});

// ADD BUTTON
//================================================================

jQuery(document).ready(function($){

jQuery('form.cart').on( 'click', 'button.plus, button.minus', function() {

  // Get current quantity values
  var qty = jQuery( this ).closest( 'form.cart' ).find( '.qty' );
  var val = parseFloat(qty.val());
  var max = parseFloat(qty.attr( 'max' ));
  var min = parseFloat(qty.attr( 'min' ));
  var step = parseFloat(qty.attr( 'step' ));

  // Change the value if plus or minus
  if ( jQuery( this ).is( '.plus' ) ) {
  if ( max && ( max <= val ) ) {
  qty.val( max );
  }
  else {
  qty.val( val + step );
  }
  }
  else {
  if ( min && ( min >= val ) ) {
  qty.val( min );
  }
  else if ( val > 1 ) {
  qty.val( val - step );
  }
  }

  });

});

// SEARCH BLOG
//================================================================


$('.nav-search-custom-btn').on('click', function(e) {
  $(".nav-search-custom-form > form").css("display", "block")
});

$('.nav-search-close-custom').on('click', function(e) {
  $(".nav-search-custom-form > form").css("display", "none")
});


// SCROLL TOP
//================================================================


jQuery(window).scroll(function () {

  var e = jQuery(this).scrollTop();
  var t = jQuery(this).height();
  var n;
  if (e > 0) {
    n = e + t / 2
  } else {
    n = 1
  }
  if (n < 1e3) {
    jQuery('.scrollup').fadeOut(1000);
  } else {
    jQuery('.scrollup').fadeIn(1000);
  }

});

jQuery(document).on('click', '.scrollup',  function(){
  jQuery("html, body").animate({
    scrollTop: 0
  }, "slow");
  return false;
});

// VALIDATION
//================================================================

$("form#callme").validate({
  rules: {
    name: "required",
    phone: "required"
  },
  messages: {
    name: "Ваше имя - обязательное поле",
    phone: "Ваш телефон - обязательное поле"
  },
  submitHandler: function(form) {
    $.ajax({
      url: "send.php",
      type: "POST",
      data: $("form#callme").serialize(),
      //cache: false,
      success: function() {
        $('.form-block').prepend( "<div class='alert alert-success alert-dismissable'>Ваше сообщение оправлено.<br> Мы свяжемся с вами в ближайшее время!</div>" );             
        $('form#callme').trigger("reset");
      },
      error: function() {
      },
    })
  }
});




$("form#contact-form").validate({
  rules: {
    name: "required",
    phone: "required"
  },
  messages: {
    name: "Ваше имя - обязательное поле",
    phone: "Ваш телефон - обязательное поле"
  },
  submitHandler: function(form) {
    $.ajax({
      url: "send.php",
      type: "POST",
      data: $("form#contact-form").serialize(),
      //cache: false,
      success: function() {
        $('.form-block').prepend( "<div class='alert alert-success alert-dismissable'>Ваше сообщение оправлено.<br> Мы свяжемся с вами в ближайшее время!</div>" );             
        $('#contact-form').trigger("reset");
      },
      error: function() {
      },
    })
  }
});





