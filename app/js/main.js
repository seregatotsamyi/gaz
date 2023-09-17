window.onload = function () {
  "use strict";
  //pop-up start
  const popupLinks = document.querySelectorAll('.popup--link');
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.lock--padding');
  const lockPaddingItem = document.querySelectorAll('.lock--padding--item');
  const lockPaddingValue = window.innerWidth - document.querySelector('.body').offsetWidth + 'px';

  let unlock = true;

  const timeOut = 500;

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const curentPopup = document.getElementById(popupName);
        popupOpen(curentPopup);
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll('.popup--close');
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    }
  }

  function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock) {
    if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock === undefined) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.body').offsetWidth + 'px';
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('_fixed');
    unlock = false;
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    setTimeout(function () {
      unlock = true;
    }, timeOut);
  };

  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      if (lockPaddingItem.length > 0) {
        for (let index = 0; index < lockPaddingItem.length; index++) {
          const el = lockPaddingItem[index];
          let currentValue = parseInt(getComputedStyle(el).right);
          let finalValue = currentValue - parseInt(lockPaddingValue) + 'px';
          el.style.right = finalValue;
        }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('_fixed');
    }, timeOut);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeOut);
  }
  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelectorAll('.popup.open');
      popupClose(popupActive);
    }
  });
  //pop-up end
};


$(function () {
  let width = $(window).width();
  let body = $('.body');

  //header-fix
  let headerFix = $('#header-fix')
  $(window).scroll(function (event) {
    let scroll = $(window).scrollTop();
    if (scroll > 400) {
      headerFix.addClass('_open')
      headerFix.removeClass('_close')
    } else {
      headerFix.removeClass('_open')
      headerFix.addClass('_close')
      if (wrapHeaderLeft.hasClass('_active')) {
        openAboutEmail()
      }
    }
  });
  //header-fix

  //js-open-about-email

  const openAboutEmailBtn = $('.js-open-about-email')
  const wrapHeaderLeft = $('#_in-mark')
  const phoneBlockDropdown = $('.phone-block-dropdown')

  openAboutEmailBtn.on('click', openAboutEmail)

  function openAboutEmail() {
    wrapHeaderLeft.toggleClass('_active')
    phoneBlockDropdown.toggleClass('_active')
    openAboutEmailBtn.toggleClass('_active')
  }

  //js-open-about-email


  //select2

  function formatResult(state) {
    if (!state.id) return state.text; // optgroup
    let result = "<img class='city-block__icon' src='images/icon/location.svg'/>" + "<span class='result-select'>" + state.text + "</span>"
    return result
  }

  $('.js-city-select').select2({
    templateSelection: formatResult,
    enoughRoomBelow: true,
    enoughRoomAbove: false,
    escapeMarkup: function (m) {
      return m;
    }
  });

  $('.js-city-select').on('select2:open', function (e) {
    $('.select2-search__field').attr('placeholder', 'Найти город');
    $('.city-block').addClass('_active')
    $('.select2-container:not(.select2)').addClass('_city-select');
    if (!$(".select2-dropdown p").length) {
      $('.select2-dropdown').prepend('<p class="text _added-text-city">Выберите город</p>')
    }
  })

  $('.js-city-select').on('select2:close', function (e) {
    $('.city-block').removeClass('_active')
  })

  //select2


  //mob-menu
  const mobMenu = $('#mobMenu')
  const toggleMobMenuBtns = $('.js-toggle-mob-menu')
  toggleMobMenuBtns.on('click', toggleMibMenu)

  function toggleMibMenu() {
    mobMenu.toggleClass('_open')
    body.toggleClass('_fixed')
  }

  //mob-menu


  //search-toggle
  const searchToggleBtns = $('.js-search-toggle')
  const searchBlock = $('#search-block')
  searchToggleBtns.on('click', searchToggle)

  function searchToggle() {
    searchBlock.toggleClass('_open')
    body.toggleClass('_fixed')
  }
  //search-toggle

  //slinky js
  const slinky = $(".js-mob-navigation").slinky({
    title: true
  })
  //slinky js

  //btn-hover
  const btns = document.querySelectorAll('.button')

  btns.forEach(el => {
    el.addEventListener('mouseover', function (e) {
      const
        size = Math.max(this.offsetWidth, this.offsetHeight),
        x = e.offsetX - size / 2,
        y = e.offsetY - size / 2,
        wave = document.createElement('span')

      // Create a new wave
      wave.className = 'wave'
      wave.style.cssText = `width:${size}px;height:${size}px;top:${y}px;left:${x}px`
      this.appendChild(wave)

      // Remove element after animation ends
      setTimeout(() => wave.remove(), 700)
    })
  })
  //btn-hover

  //promo-slider
  const promoSlider = new Swiper('.js-promo-slider', {
    loop: true,
    navigation: {
      nextEl: '.promo-slider__arrow_next',
      prevEl: '.promo-slider__arrow_prev',
    },
    pagination: {
      el: '.promo-slider__pagination',
      type: 'bullets',
      clickable: true
    },
  });
  //promo-slider


  //promo-info-slider
  const promoInfoSlider = new Swiper('.js-promo-info-slider', {
    slidesPerView: 1,
    pagination: {
      el: '.promo-info-slider__pagination',
      type: 'bullets',
    },
    breakpoints: {
      577: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1025: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
    }
  });

  //promo-info-slider

  //js-slider-services
  const servicesSlider = new Swiper('.js-slider-services', {

    slidesPerView: 1,
    spaceBetween: 20,

    pagination: {
      el: '.services__pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.services__arrow_next',
      prevEl: '.services__arrow_prev',
    },
    breakpoints: {
      577: {
        slidesPerView: 2,
        spaceBetween: 20,
        grid: {
          rows: 1,
        },
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 30,
        grid: {
          rows: 1,
        },
      },
      1025: {
        slidesPerView: 4,
        spaceBetween: 0,
        grid: {
          rows: 2,
        },
      },
    }
  });

  //js-slider-services

  //js-recommendation-slider
  const recommendationSlider = new Swiper('.js-recommendation-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      769: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1025: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    },
    navigation: {
      nextEl: '.recommendation__arrow_next',
      prevEl: '.recommendation__arrow_prev',
    },

  });
  //js-recommendation-slider

  //spoiler
  $(document).on('click', '.questions__btn', function (e) {
    e.preventDefault()
    $(this).parents('.questions__item').toggleClass("_active").find('.questions__text').slideToggle();
  })
  //spoiler

  //js-reviews-slider
  const reviewsSlider = new Swiper('.js-reviews-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
    breakpoints: {
      769: {
        slidesPerView: 2,
        spaceBetween: 0,
        autoHeight: false,
      },
    },
    navigation: {
      nextEl: '.reviews__arrow_next',
      prevEl: '.reviews__arrow_prev',
    },

  });

  //js-reviews-slider


  //js-contacts-map




  let myMap = new ymaps.Map("map", {
    center: [55.698112, 37.708410],
    zoom: 10
  });

  let createMark = (coordinates, iconCaption, balloonContent) => {
    myMap.geoObjects.add(new ymaps.Placemark(coordinates, {
      iconCaption: iconCaption,
      balloonContent: balloonContent
    }, {
      preset: 'islands#yellowFuelStationIcon'
    }))
  }

  let zoomMark = (coordinates) => {
    myMap.setCenter(coordinates, 14, {
      checkZoomRange: true
    });
  }

  $('.js-contact-btn').each((i, e) => {
    const stringOfCoordinates = $(e).attr('data-coordinates')
    const iconCaption = $(e).attr('data-text')
    const balloonContent = $(e).attr('data-bullun')
    const coordinates = JSON.parse(stringOfCoordinates);
    createMark(coordinates, iconCaption, balloonContent)
  })
  //js-contacts-map

  //spoiler-contact
  $(document).on('click', '.js-contact-btn', function (e) {
    e.preventDefault()

    if ($(this).hasClass('_active')) {
      $(this).removeClass("_active")
      $(this).parents('.contacts__slide').toggleClass("_active").find('.contacts__bottom-wrap').slideToggle();
      const coordinates = JSON.parse($(this).attr('data-coordinates'))
      zoomMark(coordinates)

    } else {
      $('.js-contact-btn').removeClass('_active')
      $(this).addClass("_active")
      $('.js-contact-btn').parents('.contacts__slide').removeClass("_active").find('.contacts__bottom-wrap').slideUp();
      $(this).parents('.contacts__slide').addClass("_active").find('.contacts__bottom-wrap').slideDown();
      const coordinates = JSON.parse($(this).attr('data-coordinates'))
      zoomMark(coordinates)
    }
  })
  //spoiler-contact

  //contact-list



  const contactListWrap = $('.contacts__list-wrap')
  const contactList = $('.contacts__list')
  let scrollPos = contactList.position().top;
  contactListWrap.on("scroll", function () {
    scrollPos = contactList.position().top;
  });

  $(document).on('click', '.contacts__arrow_prev', function (e) {
    scrollPos = contactList.position().top;
    scrollPos = scrollPos + 100
    contactListWrap.animate({
      scrollTop: ((-1) * scrollPos)
    });
  })
  $(document).on('click', '.contacts__arrow_next', function (e) {
    scrollPos = contactList.position().top;
    scrollPos = scrollPos - 100
    contactListWrap.animate({
      scrollTop: ((-1) * scrollPos)
    });
  })
  //contact-list

  //js-toggle-fly-basket
  const btnsFlyTogle = $('.js-toggle-fly-basket')
  const basketFly = $('#basket-fly')
  $(document).on('click', '.js-toggle-fly-basket', function (e) {
    basketFly.toggleClass('_open')
  })

  //js-toggle-fly-basket

  //click outside

  $(document).mouseup(function (e) {
    if (!openAboutEmailBtn.is(e.target) &&
      openAboutEmailBtn.has(e.target).length === 0 && !phoneBlockDropdown.is(e.target) &&
      phoneBlockDropdown.has(e.target).length === 0) {
      if (phoneBlockDropdown.hasClass('_active')) {
        openAboutEmail()
      }
    }

    const searchWrap = $('.search__wrap')
    if (!searchWrap.is(e.target) &&
      searchWrap.has(e.target).length === 0 && !searchToggleBtns.is(e.target) &&
      searchToggleBtns.has(e.target).length === 0) {
      if (searchBlock.hasClass('_open')) {
        searchToggle()
      }
    }

    const basketFly2 = $('#basket-fly')
    if (basketFly2.hasClass('_open')) {
      console.log(1)
      if (!basketFly.is(e.target) &&
        basketFly.has(e.target).length === 0 && !btnsFlyTogle.is(e.target) &&
        btnsFlyTogle.has(e.target).length === 0) {
        basketFly.removeClass('_open')
      }
    }



  });

  //click outside

});