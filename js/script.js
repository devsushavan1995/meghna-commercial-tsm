$(document).ready(function () {
  // $("html").click(function (event) {
  //   if ($(event.target).closest(".categories-collapse ").length !== 0) {
  //     var categoriesCollapse = $("#collapseCategories");
  //     var bsCollapse = new bootstrap.Collapse(categoriesCollapse, {
  //       hide: true
  //     });
  //   }
  // });
  let oldValue = 0;
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
        $(".site-header").addClass("site-header--shrinked");
      } else if (oldValue - newValue > 0) {
        $(".site-header").removeClass("site-header--shrinked");
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

  //Contact Form Validation
  $("#contactForm").validate({
    rules: {
      c_fullname: {
        required: true,
        patternFullname: /^[a-zA-Z\s]*$/,
      },
      c_email: {
        required: true,
        email: true,
      },
      c_phone: {
        required: true,
        patternPhone: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      },
    },
    messages: {
      c_fullname: {
        required: "This field is required.",
      },
      c_email: {
        required: "This field is required.",
        email: "Please enter a valid email address.",
      },
      c_phone: {
        required: "This field is required.",
      },
    },
    submitHandler: function (form, e) {
      e.preventDefault();
      form.reset();
      notificationToastUpdate("success", "Your message has been sent.");
      // form.submit();
    },
  });
  $.validator.addMethod(
    "patternFullname",
    function (value, element, regexp) {
      return this.optional(element) || regexp.test(value);
    },
    "Number can not be included in Full Name."
  );
  $.validator.addMethod(
    "patternPhone",
    function (value, element, regexp) {
      return this.optional(element) || regexp.test(value);
    },
    "Please enter a valid phone number."
  );

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

  // Slick Slider - Speical Slider
  $(".hero-slider").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
    nextArrow: '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
  });

  // Slick Slider - Speical Slider
  $(".products-slider").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
    nextArrow: '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });

  // Slick Slider - Speical Slider
  $(".categories-slick-slider").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
    nextArrow: '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });

  // Product Single Page Thumb slick slider
  $(".product-single-slick-view").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: ".product-single-slick-thumb",
  });
  $(".product-single-slick-thumb").slick({
    vertical: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".product-single-slick-view",
    arrows: false,
    dots: false,
    centerMode: false,
    focusOnSelect: true,
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

  $(".product-single-info-tab .nav-tabs button").click(function () {
    var position = $(this).position();
    var width = $(this).width() + 32;
    $(".product-single-info-tab .nav-link-slider").css({ left: +position.left, width: width });
  });
  var actWidth = $(".product-single-info-tab .nav").find(".active").width() + 32;
  var actPosition = $(".product-single-info-tab .nav-link-slider").position();
  $(".product-single-info-tab .nav-link-slider").css({ left: +actPosition.left, width: actWidth });

  // Product single page accordion
  $(".set > a").on("click", function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this)
        .siblings(".content")
        .slideUp(200);
      $(".set > a i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
    } else {
      $(".set > a i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
      $(this)
        .find("i")
        .removeClass("fa-plus")
        .addClass("fa-minus");
      $(".set > a").removeClass("active");
      $(this).addClass("active");
      $(".content").slideUp(200);
      $(this)
        .siblings(".content")
        .slideDown(200);
    }
  });
});
