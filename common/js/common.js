$(document).ready(function () {
  $(".tab_con_list > div").first().addClass("active");
  $(".tab_list > li").on("click", function (e) {
    e.preventDefault();
    $(".tab_list > li").removeClass("active");
    $(this).addClass("active");
    $(".tab_con_list > div").removeClass("active");
    $(".tab_con_list > div").eq($(this).index()).addClass("active");
  });
  
  //공용 셀렉트
  $(".ulsel_btn").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).siblings().fadeOut(100);
    } else {
      $(this).addClass("open");
      $(this).siblings().fadeIn(100);
    }
  });
});

// 회원탈퇴 팝업열기
$(document).on("click", ".exp_btn", function (e) {
  var target = $(".popup_wrap");
  $(target).parent().addClass("poped");
  $(".wrapper").addClass("modaled");
});

$(".btn_close").on("click", function () {
  $(".popup_modal").removeClass("poped");
  $(".wrapper").removeClass("modaled");
});
