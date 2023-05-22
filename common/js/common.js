
$(window).scroll(function () {
  let scrTop = $(this).scrollTop()
  if (scrTop > 80) {
    $('header').addClass("scrolled");
    // $('header .logowrap h1 img').attr('src','../common/images/header_logo_c_c.png');
  } else {
    $('header').removeClass("scrolled");
    // $('header .logowrap h1 img').attr('src','../common/images/header_logo_c.png');
  }
})

$(document).ready(function () {
  // 헤더 scrolled
  // var headerTop = $('header').scrollTop();
  
  // $(window).scroll(function() {
  //   var window = $(this).scrollTop();

  //   if(headerTop <= window) {
  //     $('header').addClass("scrolled");
  //   } else {
  //     $('header').removeClass("scrolled");
  //   }
  // })


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
    $(this).parent().siblings().find('.ulsel_btn').removeClass("open");
    $(this).parent().siblings().find('.ulsel_btn').siblings().fadeOut(100);
    e.preventDefault();
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).siblings().fadeOut(100);
    } else {
      $(this).addClass("open");
      $(this).siblings().fadeIn(100);
    }
  });
    // 외부영역 클릭 시 셀렉트 닫기
  $(document).mouseup(function (e){
    e.stopPropagation();
    var selBox = $(".ulsel");
    if(selBox.has(e.target).length === 0){
      $(".ulsel_btn").removeClass("open");
      $(".ulsel_list").fadeOut(100);
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