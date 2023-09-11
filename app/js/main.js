window.onload = function () {
  "use strict";
};


$(function () {
  let width = $(window).width();
  let body = $('.body');


  //js-open-about-email

  const openAboutEmailBtn = $('.js-open-about-email')
  const wrapHeaderLeft = $('#_in-mark')
  const phoneBlockDropdown = $('#phone-block-dropdown')

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


  //click outside

  $(document).mouseup(function (e) {
    if (!openAboutEmailBtn.is(e.target) &&
      openAboutEmailBtn.has(e.target).length === 0 && !phoneBlockDropdown.is(e.target) &&
      phoneBlockDropdown.has(e.target).length === 0) {
      if (phoneBlockDropdown.hasClass('_active')) {
        openAboutEmail()
      }

    }

  });

  //click outside
});