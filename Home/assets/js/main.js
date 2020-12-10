/**
* Template Name: Selecao - v2.3.0
* Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";
  var selecterServices = [];
  var userServiecesData;
  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Intro carousel
  var heroCarousel = $("#heroCarousel");

  heroCarousel.on('slid.bs.carousel', function(e) {
    $(this).find('h2').addClass('animate__animated animate__fadeInDown');
    $(this).find('p, .btn-get-started').addClass('animate__animated animate__fadeInUp');
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  $(window).on('load', function() {
    aos_init();
  });
  $('#Submit').on('click', function(e) {
    e.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var moblie = $("#mobile").val();
    console.log(name,email,moblie,"moblie")
    if(name && email && moblie){
      $.ajax({
        type: "POST",
        url: "https://localhost:5001/api/Main",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify({
          "Name": name,
          "Mobile":moblie,
          "Email":email
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
          userServiecesData = data;
          selecterServices = [];
          console.log(userServiecesData.services)
          $("#service-buttons-div").empty();
          alert("Saved Successfully");
         for(let i = 0 ; i < userServiecesData.services.length ; i++){
            var r=$('<input/>').attr({
              type: "button",
              id: `servicebuttons${userServiecesData.services[i].serviceId}`,
              class:'buttons-service',
              value: userServiecesData.services[i].serviceName
          });
          r.on('click', function(e) {
            e.preventDefault();
            let ele = $(`#${e.target.id}`);
            let id = e.target.id;
            console.log(e.target.id)
            if(e.target.id.split("-").length == 2){
              console.log('hi1')
              ele.removeClass();
              ele.addClass('buttons-service');
              e.target.id = e.target.id.split("-").join('')
              selecterServices.splice(selecterServices.indexOf(id.split("-").join('').split('s')[id.split("-").join('').split('s').length-1]),1)
            }else{
              ele.removeClass();
              ele.addClass('buttons-service-clicked');
              selecterServices.push(id.split("-").join('').split('s')[id.split("-").join('').split('s').length-1]);
              e.target.id = e.target.id + '-'
            }
          })
          $("#service-buttons-div").append(r)
          }
        },
        error: function(errMsg) {
            console.log(errMsg);
        }
    });
    }
    else{
      alert("required fields")
    }
  });
  $("#SubmitServices").on('click', function(e) {
    e.preventDefault();
    $("#interest-buttons-div").empty();
    if(selecterServices.length != 0){
      $.ajax({
        type: "GET",
        url: "https://localhost:5001/api/Interest",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
          console.log(data)
          for(let i = 0 ; i < data.length ; i++){
            var r=$('<input/>').attr({
              type: "button",
              id: `servicebuttons,${data[i].interestId}`,
              class:'buttons-service',
              value: data[i].interestName
          });
          console.log("userServiecesData",userServiecesData);
          r.on('click', function(e) {
            e.preventDefault();
            var dataToSave = {"UserId":userServiecesData.user.userId,"ServiceIds": selecterServices,"InterestId":e.target.id.split(',')[1]}
            console.log("dataToSave",dataToSave);
            $.ajax({
              type: "POST",
              url: "https://localhost:5001/api/UserSeviceInterest",
              // The key needs to match your method's input parameter (case-sensitive).
              data: JSON.stringify(dataToSave),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                alert("Done")
              },
              error: function(errMsg) {
                  console.log(errMsg);
              }
          });
            console.log(e.target.id)
          })
          $("#interest-buttons-div").append(r)
          }
        },
        error: function(errMsg) {
            console.log(errMsg);
        }
    });
    }else{
      alert("select one service at least")
    }
  })
  $("#SubmitInterest").on('click', function(e) {
    e.preventDefault();
    var name = $("#InterestName").val();
    if(name){
      $.ajax({
        type: "POST",
        url: "https://localhost:5001/api/Interest",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify({
          "InterestName": name,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
          alert("Done")
        },
        error: function(errMsg) {
            console.log(errMsg);
        }
    });

    }else{
      alert('required field');
    }
  })
  $("#SubmitService").on('click', function(e) {
    e.preventDefault();
    var name = $("#ServiceName").val();
    if(name){
      $.ajax({
        type: "POST",
        url: "https://localhost:5001/api/Service",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify({
          "ServiceName": name,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
          alert("Done")
        },
        error: function(errMsg) {
            console.log(errMsg);
        }
    });
    }else{
      alert('required field');
    }
  })
  $.ajax({
    type: "GET",
    url: "https://localhost:5001/api/UserSeviceInterest",
    // The key needs to match your method's input parameter (case-sensitive),
    success: function(data){
      console.log(data);
      for(var i = 0 ; i < data.length ; i++){
        var DivOut = document.createElement('div');
        DivOut.className = "card bg-warning";

        var DivIn = document.createElement('div');
        DivIn.className = "card-body text-center";

        var p = document.createElement('p');
        p.className = "card-text";
        var node = document.createTextNode("Name: "+ data[i].user.name + ", "+" Service: " + data[i].service.serviceName  + ", Interest: " + data[i].interest.interestName);
        p.appendChild(node);
        
        DivIn.append(p);
        DivOut.append(DivIn);
        $("#card-id").append(DivOut);
      }
    },
    error: function(errMsg) {
        console.log(errMsg);
    }
});
})(jQuery)
