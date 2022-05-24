$(document).ready(function () {
  let oldValue = 0;
  let siteHeader = $(".site-header");
  // let siteHeaderHeight = siteHeader.height();
  // console.log(siteHeaderHeight);
  $(window).scroll(function (e) {
    //navbar shrink
    // if ($(document).scrollTop() > 50) {
    //   $(".site-header").addClass("site-header--shrinked");
    // } else {
    //   $(".site-header").removeClass("site-header--shrinked");
    // }

    // Scroll Top fade in out
    if ($(document).scrollTop() > 200) {
      $(".scroll-to-top-button").addClass("scroll-to-top-button--show");
    } else {
      $(".scroll-to-top-button").removeClass("scroll-to-top-button--show");
    }

    if ($(document).scrollTop() > 200) {
      // Get the new Value
      newValue = window.pageYOffset;

      //Subtract the two and conclude
      if (oldValue - newValue < 0) {
        siteHeader.addClass("site-header--shrinked");
      } else if (oldValue - newValue > 0) {
        siteHeader.removeClass("site-header--shrinked");
      }

      // Update the old value
      oldValue = newValue;
    }
  });

  // Header Dropdown menu
  $("select").niceSelect();

  // mobile search form
  var searchFormSmTriggerBtn = $(".site-header__cta--search");
  var searchFormConainerSm = $(".search-form-container-sm");
  var searchFormCloseBtn = $(".search-form-container-sm__button--close");
  searchFormSmTriggerBtn.on("click", function () {
    searchFormConainerSm.addClass("search-form-container-sm--show");
    $("body").addClass("no-scroll bg-overlay");
  });
  searchFormCloseBtn.on("click", function () {
    if (searchFormConainerSm.hasClass("search-form-container-sm--show")) {
      searchFormConainerSm.removeClass("search-form-container-sm--show");
      $("body").removeClass("no-scroll bg-overlay");
    }
  });
  var hasSubmitted = false;
  var errorText = $(".search-form__input-error-text");
  $(".search-form__button--submit").on("click", function () {
    var getValue = $("#searchFormSmInput").val();
    if (getValue === "" || getValue.length === 0) {
      errorText.removeClass("d-none");
      hasSubmitted = true;
    }
  });

  //Click event to scroll to top
  $(".scroll-to-top-button").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });

  // adding active class to nav links as per page
  var url = window.location.pathname,
    urlRegExp = new RegExp(url == "/" ? window.location.origin + "/?$" : url.replace(/\/$/, ""));
  // now grab every link from the navigation
  $(".site-header nav ul li a").each(function () {
    // and test its normalized href against the url pathname regexp
    if (urlRegExp.test(this.href.replace(/\/$/, ""))) {
      $(this).addClass("active");
    }
  });

  // show password button function
  var showPasswordButtons = $(".form .button--show-password");
  var showPassFlag = false;
  showPasswordButtons.each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      if (!showPassFlag) {
        $(this).siblings("input").attr("type", "text");
        $(this).find("i").removeClass("bi-eye").addClass("bi-eye-slash");
        showPassFlag = true;
      } else {
        $(this).siblings("input").attr("type", "password");
        $(this).find("i").removeClass("bi-eye-slash").addClass("bi-eye");
        showPassFlag = false;
      }
    });
  });

  /* Faqs section search
  var faqsSearchForm = $(".faqs-search-form");
  var faqsSearchFormInput = $("#faqsSearchFormInput");
  var faqsQuestions = $(".faqs-section .set");

  faqsSearchForm.on("submit", function (e) {
    e.preventDefault();
    var inpVal = faqsSearchFormInput.val();
    inpVal = inpVal.toLowerCase();
    if (inpVal.length == 0) {
      faqsQuestions.each(function () {
        $(this).show();
      });
    } else {
      faqsQuestions.each(function () {
        // console.log($(this).find('span').html())
        if ($(this).find("span").text().toLowerCase().indexOf(inpVal) > 1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
  });
  */
  //Contact Form material label control
  var contactFormInputs = $(".contact-form__input");
  contactFormInputs.each(function () {
    $(this).on("focus", function () {
      $(this).prev().addClass("anim-label--shrinked");
    });
    $(this).on("blur", function () {
      if ($(this).val().length === 0) $(this).prev().removeClass("anim-label--shrinked");
    });
  });
  // quanity increment and decrement funciton
  $(".qtyplus").each(function () {
    // Get the field name
    $(this).on("click", function () {
      fieldName = $(this).attr("field");
      // Get its current value
      var currentVal = parseInt($("input[name=" + fieldName + "]").val());
      // If is not undefined
      if (!isNaN(currentVal)) {
        // Increment
        $("input[name=" + fieldName + "]").val(currentVal + 1);
      } else {
        // Otherwise put a 0 there
        $("input[name=" + fieldName + "]").val(0);
      }
    });
  });
  $(".qtyminus").each(function (index, el) {
    $(this).on("click", function () {
      // Get the field name
      fieldName = $(this).attr("field");
      // Get its current value
      var currentVal = parseInt($("input[name=" + fieldName + "]").val());
      // If it isn't undefined or its greater than 0
      if (!isNaN(currentVal) && currentVal > 0) {
        // Decrement one
        $("input[name=" + fieldName + "]").val(currentVal - 1);
      } else {
        // Otherwise put a 0 there
        $("input[name=" + fieldName + "]").val(0);
      }
    });
  });
  //notification toast function for global
  function notificationToastUpdate(msgtype, msg) {
    var toastEl = $("#liveToast");
    toastEl.find(".toast-body__text").html(msg);
    if (msgtype === "success") {
      toastEl.find(".toast-body").addClass("text--primary");
      toastEl.find(".toast-body__icon").html(`<i class="bi bi-check-circle-fill"></i>`);
    } else if (msgtype === "error") {
      toastEl.find(".toast-body").addClass("text--error");
      toastEl.find(".toast-body__icon").html(`<i class="bi bi-x-circle-fill"></i>`);
    } else {
      toastEl.find(".toast-body").addClass("text--para");
    }
    toastEl.toast("show");
  }
  // counter homepage
  $(".counter").counterUp({
    delay: 10,
    time: 1000,
  });

  // Add address on cart page
  $(".address-container__button--add-adress").on("click", function () {
    console.log("clicked");
    $("body").addClass("bg-overlay");
  });
  var addAddressOffCanvas = $("#addAddressOffCanvas");
  addAddressOffCanvas.on("hidden.bs.offcanvas", function () {
    $("body").removeClass("bg-overlay");
  });
  // hero section swiper
  var swiperHero = new Swiper(".hero-slider", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: true,
    pauseOnMouseEnter: true,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderCustom: function (swiper, current, total) {
        var names = [];
        $(".swiper-wrapper .swiper-slide").each(function (i) {
          names.push($(this).data("name"));
        });
        var text = "<ul>";
        for (let i = 1; i <= total; i++) {
          if (current == i) {
            text += `<li class="swiper-pagination-bullet active">${names[i]}</li>`;
          } else {
            text += `<li class="swiper-pagination-bullet">${names[i]}</li>`;
          }
        }
        text += "</ul>";
        return text;
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiperProducts = new Swiper(".products-slider", {
    // Optional parameters
    direction: "horizontal",
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    autoplay: true,
    pauseOnMouseEnter: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      // when window width is >= 480px
      576: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    },
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderCustom: function (swiper, current, total) {
        var names = [];
        $(".swiper-wrapper .swiper-slide").each(function (i) {
          names.push($(this).data("name"));
        });
        var text = "<ul>";
        for (let i = 1; i <= total; i++) {
          if (current == i) {
            text += `<li class="swiper-pagination-bullet active">${names[i]}</li>`;
          } else {
            text += `<li class="swiper-pagination-bullet">${names[i]}</li>`;
          }
        }
        text += "</ul>";
        return text;
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiperCategories = new Swiper(".categories-slider", {
    // Optional parameters
    direction: "horizontal",
    slidesPerView: 5,
    spaceBetween: 12,
    loop: true,
    autoplay: true,
    pauseOnMouseEnter: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      // when window width is >= 480px
      576: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    },
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderCustom: function (swiper, current, total) {
        var names = [];
        $(".swiper-wrapper .swiper-slide").each(function (i) {
          names.push($(this).data("name"));
        });
        var text = "<ul>";
        for (let i = 1; i <= total; i++) {
          if (current == i) {
            text += `<li class="swiper-pagination-bullet active">${names[i]}</li>`;
          } else {
            text += `<li class="swiper-pagination-bullet">${names[i]}</li>`;
          }
        }
        text += "</ul>";
        return text;
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  // Product single page swiper gallery
  var swiperThumb = new Swiper(".product-single-swiper-thumb", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiperThumbView = new Swiper(".product-single-swiper-view", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiperThumb,
    },
  });

  //testimonial section swiper
  var swiperTestimonial = new Swiper(".swiper-testimonial", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
    },
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderCustom: function (swiper, current, total) {
        var names = [];
        $(".swiper-wrapper .swiper-slide").each(function (i) {
          names.push($(this).data("name"));
        });
        var text = "<ul>";
        for (let i = 1; i <= total; i++) {
          if (current == i) {
            text += `<li class="swiper-pagination-bullet active">${names[i]}</li>`;
          } else {
            text += `<li class="swiper-pagination-bullet">${names[i]}</li>`;
          }
        }
        text += "</ul>";
        return text;
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Products Page sub category dropdown menu
  var catItemExpandBtns = $(".category-filter-list .category-filter__item .item__button--expand");

  catItemExpandBtns.each(function () {
    $(this).parent().next().slideUp(0);
    $(this).on("click", function () {
      if (!$(this).hasClass("expanded")) {
        $(".category-filter-list .category-filter__item .item__dropdown-menu").slideUp();
        $(".category-filter-list .category-filter__item .item__button--expand").removeClass("expanded");
        $(this).addClass("expanded");
        $(this).parent().next().slideDown();
      } else {
        $(this).removeClass("expanded");
        $(this).parent().next().slideUp();
      }
    });
  });
  var checkboxes = $(".category-filter__item input.subOption"),
    checkall = $(".category-filter__item .mainOption");

  checkall.each(function () {
    var checkedFlag = false;
    $(this).on("click", function () {
      if (!checkedFlag) {
        $(this).prop("checked", true);
        $(this).parent().parent().find(".subOption").prop("checked", true);
        checkedFlag = true;
      } else {
        $(this).prop("checked", false);
        $(this).parent().parent().find(".subOption").prop("checked", false);
        checkedFlag = false;
      }
    });
  });

  $("#slider-range").slider({
    range: true,
    orientation: "horizontal",
    min: 0,
    max: 10000,
    values: [0, 10000],
    step: 100,

    slide: function (event, ui) {
      if (ui.values[0] == ui.values[1]) {
        return false;
      }

      $("#min_price").val(ui.values[0]);
      $("#max_price").val(ui.values[1]);
    },
  });

  var productListingLayoutViewBtns = $(".product-listing__button-layout-view");
  productListingLayoutViewBtns.each(function () {
    $(this).on("click", function () {
      $(".product-listing__button-layout-view").removeClass("active");
      var getView = $(this).attr("data-view");
      $(this).addClass("active");
      if (getView === "list") {
        $(".product-item-container").addClass("product-item-container--list-view");
      } else {
        $(".product-item-container").removeClass("product-item-container--list-view");
      }
    });
  });

  // Product single page accordion & Faqs page accordion
  $(".set > a").on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).siblings(".content").slideUp(200);
      $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
    } else {
      $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
      $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
      $(".set > a").removeClass("active");
      $(this).addClass("active");
      $(".content").slideUp(200);
      $(this).siblings(".content").slideDown(200);
    }
  });

  $(".product-single-info-tab .nav-tabs button").click(function () {
    var position = $(this).position();
    var width = $(this).width() + 32;
    $(".product-single-info-tab .nav-link-slider").css({ left: +position.left, width: width });
  });
  var actWidth = $(".product-single-info-tab .nav").find(".active").width() + 32;
  var actPosition = $(".product-single-info-tab .nav-link-slider").position();
  $(".product-single-info-tab .nav-link-slider").css({ left: +actPosition.left, width: actWidth });
});
