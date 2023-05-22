$(document).ready(function () {
    $(".tab_con_list > div").first().addClass('active')
    $(".tab_list > li").on('click' ,function (e) {
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

  


    
    $('.pagination ul li a').on('click',function(e){
        e.preventDefault();
        $('.pagination ul li a').removeClass()
        $(this).addClass('active')
    })

    $('.sub_tab_list li').on('click',function(e){
        e.preventDefault();
        let idx=$(this).index()
        $('.sub_tab_list li').removeClass('on')
        $(this).addClass('on')
        $('.sub_con_list .sub_tab_con').stop().hide()
        $('.sub_con_list .sub_tab_con').eq(idx).stop().show()
    })
    
});