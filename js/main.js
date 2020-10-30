
function main() {

  (function () {
    'use strict';
    
      $('a.page-scroll').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top - 40
              }, 900);
              return false;
            }
          }
        });

    
      // Show Menu on Book
      $(window).bind('scroll', function() {
          var navHeight = $(window).height() - 500;
          if ($(window).scrollTop() > navHeight) {
              $('.navbar-default').addClass('on');
          } else {
              $('.navbar-default').removeClass('on');
          }
      });

      $('body').scrollspy({ 
          target: '.navbar-default',
          offset: 80
      });

    // Hide nav on click
    $(".navbar-nav li a").click(function (event) {
      // check if window is small enough so dropdown is created
      var toggle = $(".navbar-toggle").is(":visible");
      if (toggle) {
        $(".navbar-collapse").collapse('hide');
      }
    });
    
      // Portfolio isotope filter
      $(window).load(function() {
          var $container = $('.portfolio-items');
          $container.isotope({
              filter: '*',
              animationOptions: {
                  duration: 750,
                  easing: 'linear',
                  queue: false
              }
          });
          $('.cat a').click(function() {
              $('.cat .active').removeClass('active');
              $(this).addClass('active');
              var selector = $(this).attr('data-filter');
              $container.isotope({
                  filter: selector,
                  animationOptions: {
                      duration: 750,
                      easing: 'linear',
                      queue: false
                  }
              });
              return false;
          });

      });
    

      // Nivo Lightbox 
      $('.portfolio-item a').nivoLightbox({
              effect: 'slideDown',  
              keyboardNav: true,                            
          });
  

  }());
  (function($) {

    $(document).ready(function() {
      setupFade();
      setupClickToScroll();
      setupPostAnimation();
      setupScrollToTop();
       enableScrollAbortion();
  
      // Trigger window.scroll, this will initiate some of the scripts
      $(window).scroll();
    });
    
    
    // Allow user to cancel scroll animation by manually scrolling
    function enableScrollAbortion() {
      var $viewport = $('html, body');
      $viewport.on('scroll mousedown DOMMouseScroll mousewheel keyup', function(e) {
          if ( e.which > 0 || e.type === 'mousedown' || e.type === 'mousewheel') {
               $viewport.stop();
          }
      });
    }
  
    function setupScrollToTop() {
      var scrollSpeed = 750;
      $('.trigger-scroll-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, scrollSpeed);
      });
    }
  
  
    function setupPostAnimation() {
      var posts = $('.post-wrapper .post');
      $(window).on('scroll resize', function() {
  
        var currScroll = $(window).scrollTop() > $(document).scrollTop() ? $(window).scrollTop() : $(document).scrollTop(),
          windowHeight = $(window).height(), // Needs to be here because window can resize
          overScroll = Math.ceil(windowHeight*.20),
          treshhold = (currScroll + windowHeight) - overScroll;
  
        posts.each(function() {
  
          var post = $(this),
            postScroll = post.offset().top
  
          if(postScroll > treshhold) {
            post.addClass('hidden');
          } else {
            post.removeClass('hidden');
          }
  
        });
  
      });
    }
  
    function setupFade() {
  
      var posts = $('.post-wrapper .post').reverse(),
        stemWrapper = $('.stem-wrapper'),
        halfScreen = $(window).height() / 2;
  
      $(window).on('scroll resize', function() {
  
        delay(function() {
  
          var currScroll = $(window).scrollTop() > $(document).scrollTop() ? $(window).scrollTop() : $(document).scrollTop(),
            scrollSplit = currScroll + halfScreen;
  
          posts.removeClass('active').each(function() {
  
            var post = $(this),
              postOffset = post.offset().top;
  
            if(scrollSplit > postOffset) {
  
              // Add active class to fade in
              post.addClass('active')
  
              // Get post color
              var color = post.data('stem-color') ? post.data('stem-color') : null,
                allColors = 'color-green color-yellow color-white'
  
              stemWrapper.removeClass(allColors);
  
              if(color !== null) {
                stemWrapper.addClass('color-' + color);
              }
  
              return false;
            }
  
          });
        }, 20);
  
      });
  
    }
  
  
    function setupClickToScroll(post) {
  
      var scrollSpeed = 750;
  
      $('.post-wrapper .post .stem-overlay .icon').click(function(e) {
        e.preventDefault();
  
        var icon = $(this),
          post = icon.closest('.post'),
          postTopOffset = post.offset().top,
          postHeight = post.height(),
          halfScreen = $(window).height() / 2,
          scrollTo = postTopOffset - halfScreen + (postHeight/2);
  
        $('html, body').animate({
          scrollTop: scrollTo
        }, scrollSpeed);
      });
  
    }
  
  })(jQuery);


}
main();

var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 4000); // Change image every 2 seconds
}