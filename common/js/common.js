$(window).scroll(function () {
  let scrTop = $(this).scrollTop();
  if (scrTop > 80) {
    $("header").addClass("scrolled");
    // $('header .logowrap h1 img').attr('src','../common/images/header_logo_c_c.png');
  } else {
    $("header").removeClass("scrolled");
    // $('header .logowrap h1 img').attr('src','../common/images/header_logo_c.png');
  }
});

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
  

  $('.gnbwrap > .gnb1dep > li').mouseenter(function(){
    $('.gnb2dep > section').hide();
    $(this).parent().siblings().children('section').eq($(this).index()).stop().slideDown();
    $('.dimm').addClass('active');
    scrollLock();
  })
  
  $('.gnbwrap').mouseleave(function(){
    $('.gnb2dep > section').stop().slideUp(200);
    $('.dimm').removeClass('active');
    scrollRelease();
  })

  function scrollLock(){
    $('body').addClass('dimmed');
  }
  function scrollRelease(){
    $('body').removeClass('dimmed');
  }

  //메인 News탭
  $(".newscon_list > li").first().addClass("active");

  /*  $(".newstab_list > li").on('click' ,function (e) {
      e.preventDefault();
      $(".newscon_list > li").removeClass("active");
      $(".newstab_list > li").removeClass("active");
      $(this).addClass("active");
      $(".newscon_list > li").eq($(this).index()).addClass("active");
  }); */

  //공용 탭
  $(".tab_con_list > div").first().addClass("active");
  $(".tab_list > li").on("click", function (e) {
    e.preventDefault();
    $(".tab_list > li").removeClass("active");
    $(this).addClass("active");
    $(".tab_con_list > div").removeClass("active");
    $(".tab_con_list > div").eq($(this).index()).addClass("active");
  });


  //공용 셀렉트

  pblSel();

  function pblSel(){
    $(".ulsel_btn").on("click", function (e) {
      $(this).parent().siblings().find(".ulsel_btn").removeClass("open");
      $(this).parent().siblings().find(".ulsel_btn").siblings().fadeOut(100);
      e.preventDefault();
      if ($(this).hasClass("open")) {
        $(this).removeClass("open");
        $(this).siblings().fadeOut(100);
      } else {
        $(this).addClass("open");
        $(this).siblings().fadeIn(100);
      }
    });
  }


//외부영역 클릭 시 셀렉트 닫기
$(document).bind('click', function(e) {
  var $clicked = $(e.target);
  if (!$clicked.hasClass("open")){
          $(".ulsel_btn").removeClass('open');
          $(".ulsel_list").fadeOut(100);
      }
});
  
//게시판 옵션 선택 및 선택 후 옵션 숨기기

$(".board .ulsel_btn").each( function (){
  var initVal = $(this).siblings().children().first('li').find('a').attr('value');
  $(this).attr('value', initVal);
  
  $(".board .ulsel_list li a").on('click', function(e) {
    e.preventDefault();
    var text = $(this).html();
    var attr = $(this).attr('value');
    //$(".drop-down .selected a span").html(text);
    //$(".drop-down .options ul").hide();
    
    var $selected = $(this).parents('ul').siblings('.ulsel_btn');
    $selected.html(text);
    $selected.attr('value', attr);
    $selected.removeClass("open");
    $selected.siblings().fadeOut(100);
  }); 
   
  $(".board .sch_tab > ul li a").on('click', function(e) {
    e.preventDefault();
    var text = $(this).html();
    var attr = $(this).attr('value');
    //$(".drop-down .selected a span").html(text);
    //$(".drop-down .options ul").hide();
    
    var $selected = $(this).parents('ul').siblings('.ulsel_btn');
    $selected.html(text);
    $selected.attr('value', attr);
  }); 
})

// 
// $(document).mouseup(function (e) {
//   e.stopPropagation();
//   var selBox = $(".ulsel_list li a");
//   if (selBox.has(e.target).length === 0) {
//     $(".ulsel_btn").removeClass("open");
//     $(".ulsel_list").fadeOut(100);
//   }
// });



  $(window).resize(function () {
    toFunc();
    $('.ulsel_btn').removeClass('open');
    $(".ulsel_list").fadeOut(100);
});

  $(".pagination ul li a").on("click", function (e) {
    e.preventDefault();
    $(".pagination ul li a").removeClass();
    $(this).addClass("active");
  });
// 서브 탭
  $(".sub_tab_list li").on("click", function (e) {
    e.preventDefault();
    let idx = $(this).index();
    $(".sub_tab_list li").removeClass("on");
    $(this).addClass("on");
    /* $('img[usemap]').rwdImageMaps(); */ // 이미지맵 반응형 로드
    $(".sub_con_list .sub_tab_con").stop().hide();
    $(".sub_con_list .sub_tab_con").eq(idx).stop().show();
  });
// 서브 탭인탭
  $(".sub_tab_list2 li").on("click", function (e) {
    e.preventDefault();
    // siteslidehide();
    // siteslideRenew();
    let idx = $(this).index();
    $(".sub_tab_list2 li").removeClass("on");
    $(this).addClass("on");
    /* $('img[usemap]').rwdImageMaps(); */ // 이미지맵 반응형 로드
    $(".sub_con_list2 .sub_tab_con2").stop().hide();
    $(".sub_con_list2 .sub_tab_con2").eq(idx).stop().show();
  });

  
      //수풀로 공간별보기
      // function siteslidehide(){
      //   $(".spc_idx > li").each(function(){
      //     $('.spc_idx > li').removeClass('on');
      //   })
      //   $('.site_slide').each(function(){
      //     $(this).children('div').hide();
      //   })
      // }
      // function siteslideRenew(){
      //   $(".spc_idx").each(function(){
      //     $(this).children().first().addClass('on');
      //   })
      //   $('.site_slide').each(function(){
      //     $(this).children('div').first().show();
      //   })
      // }
      // siteslideRenew();
      // $(".spc_idx > li").each(function(){
      //   $(".spc_idx > li > a").on('click', function(e){
      //     e.preventDefault();
      //     var siteIdx = $(this).parent('li').index();
      //     console.log(siteIdx);
      //     $('.site_slide').children('div').hide();
      //     $(this).parents('.space_wrap').siblings('.site_slide').children('div').eq(siteIdx).show();
      //   })
      // })


      // 대표님 작업 ----
      // // 수풀로 공간별보기
      //   function siteslidehide1(){
      //     $(".spc_idx > li").each(function(){
      //       $('.spc_idx > li').removeClass('on');
      //     })
      //   }
      // // 이미지 맵 클릭시 이베느 처리
      //   function mapView(indx){
      //     siteslidehide1();
      //     $('.site_slide').children('div').hide();
      //     $("#"+indx).show();
      //     $("#"+indx+"_li").addClass("on");
      //   }
      // -----------------

      $('#usr_site_all > div').on('click', function() {
        var siteIdx = $(this).index();
        console.log(siteIdx);

        $('.site_layerpopwrap').addClass('active');
        scrollLock();
      })

      //외부영역 클릭 시 site layer 닫기
      $('.site_layerpopwrap').bind('click', function(e) {
        var $clicked = $(e.target);
        if ($clicked.hasClass("active")){
                $('.site_layerpopwrap').removeClass('active');
            }
      });
        

  $(".sub_tab_list2_1 li").on("click", function (e) {
    e.preventDefault();
    let idx = $(this).index();
    $(".sub_tab_list2_1 li").removeClass("on");
    $(this).addClass("on");
    $(".sub_con_list2_1 .sub_tab_con2_1").stop().hide();
    $(".sub_con_list2_1 .sub_tab_con2_1").eq(idx).stop().show();
  });
  function call_slideChangeTransitionEnd(
    active_label,
    active_panel_id,
    tab_paneles
  ) {
    //console.log(active_panel_id);
    active_label.addClass("active").siblings().removeClass("active");

    for (let i = 0; i < tab_paneles.length; i++) {
      //console.log(1234);
      let labelledby, activePanel;

      activePanel = tab_paneles.eq(i); //li요소들 : tabPanel들 컨텐츠들
      labelledby = activePanel.attr("aria-labelledby");

      //console.log(labelledby, active_panel_id);
      if (active_panel_id == labelledby) {
        activePanel
          .attr("arria-hidden", "false")
          .addClass("on")
          .siblings()
          .removeClass("on")
          .attr("arria-hidden", "true");
      }
    }
  }

  function showTabActiveArrow(elm, dir, swiper){
    elm.addClass('active').siblings().removeClass('active');
    if(dir){
      swiper.slidePrev();
    }else{
      swiper.slideNext();
    }
    
  }
  
function goToTab(abs_idx, selecElm){

  if( abs_idx > 0){
    for(let i = 0; i < abs_idx; i++){
      $(selecElm+'_tabArrow_l').trigger('click');
    }
  }else if( abs_idx < 0){
    abs_idx = -abs_idx; 
    for(let i = 0; i < abs_idx; i++){
      $(selecElm+'_tabArrow_r').trigger('click');
    }
  }
}

  /* --------------------- 공단 소식  ----------------- */

  var swiper_news = new Swiper(".news_box", {
    slidesPerView: 3,
    loop: true,
    on: {
      slideChangeTransitionEnd: () => {
        // let active_label, active_panel_id;
        // active_label = $('.swiper-slide-active').next(); //이동이 된 직후, .swiper-slide-active로 활성화되어 있는 요소는 화면에서 보이는 요소 중 첫 번째 요소이다.
        // active_panel_id = active_label.children('a').attr('id');
        // //console.log(active_panel_id);
        // active_label.addClass('active').siblings().removeClass('active');

        // for(let i = 0; i< $('.tabPanels').children().length; i++){
        //   let labeledby, activePanel;
        //   activePanel = $('.tabPanels').children().eq(i); //li요소들 : tabPanel들 컨텐츠들
        //   labeledby = activePanel.attr('aria-labeledby');
        //   //console.log(labeledby, active_panel_id);
        //   if(active_panel_id == labeledby){
        //     activePanel.attr('arria-hidden','false').addClass('on').siblings().removeClass('on').attr('arria-hidden','true');
        //   }
        // } // fon문 End
        let active_label, active_panel_id, tab_paneles;
        active_label = $(".news_box .swiper-slide-active").next(); //이동이 된 직후, .swiper-slide-active로 활성화되어 있는 요소는 화면에서 보이는 요소 중 첫 번째 요소이다.
        active_panel_id = active_label.children("a").attr("id");
        tab_paneles = $(".news_box_outer")
          .next(".list_box")
          .children(".tabPanels")
          .children(); //일반 요소 자식들을 감싸는 ul
        call_slideChangeTransitionEnd(
          active_label,
          active_panel_id,
          tab_paneles
        );
      }, //slideChangeTransitionEnd End
    }, //on End
  }); //swiper_news End

  $(".news_tabArrow_l").on("click", function (e) {
    e.preventDefault();
    let _this, dir;
    _this = $(this);
    dir = true;
    swiper = swiper_news;
    showTabActiveArrow(_this, dir, swiper);
    //m_brandTabInner.slick('slickPrev');
  });
  $(".news_tabArrow_r").on("click", function (e) {
    e.preventDefault();
    let _this, dir;
    _this = $(this);
    dir = false;
    swiper = swiper_news;
    showTabActiveArrow(_this, dir, swiper);
    // m_brandTabInner.slick('slickNext');
  });
  //제목 클릭
  $(".news_box .slide_item").each((i, v) => {
    let _this, active_idx, current_idx, abs_idx;
    _this = $(v);

    _this.click(function (e) {
      e.preventDefault();
      current_idx = _this.index();

      active_idx = $(".news_box .slide_item.active").index();
      // alert(current_idx);
      // alert(active_idx);

      abs_idx = active_idx - current_idx;
      //alert(abs_idx);
      goToTab(abs_idx, ".news");
    });
  });

// sub_01_03_01 주요업무사진
var subConSlideVer2 = new Swiper(".sub_con_slide_ver2", {
  slidesPerView: 2,
  spaceBetween: 30,
  navigation: {
        nextEl: ".swiperwrap1 .swiper-button-next",
        prevEl: ".swiperwrap1 .swiper-button-prev",
      },
});


// sub_01_04_02 slide
  var subConSlide = new Swiper(".sub_con_slide", {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
          nextEl: ".swiperwrap1 .swiper-button-next",
          prevEl: ".swiperwrap1 .swiper-button-prev",
        },
  });

  var subConSlide2 = new Swiper(".sub_con_slide2", {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
          nextEl: ".swiperwrap2 .swiper-button-next",
          prevEl: ".swiperwrap2 .swiper-button-prev",
        },
  });

  var subConSlide3 = new Swiper(".sub_con_slide3", {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
          nextEl: ".swiperwrap3 .swiper-button-next",
          prevEl: ".swiperwrap3 .swiper-button-prev",
        },
  });
// sub_01_04_02 공간별보기
  $('.spc_idx li').on('click',function(e){
    e.preventDefault()
    $('.spc_idx li').removeClass('on')
    $(this).addClass('on')
  })

  // sub_01_04_02 아코디언
  $('.program_info>li a').on('click',function(e){
    e.preventDefault()
    let active=$(this).parent('li').hasClass('active');
    if(active){
      $(this).parent('li').removeClass('active')
      $(this).siblings('div').stop().slideUp()
    }else{
      $('.program_info>li a').parent('li').removeClass('active')
      $('.program_info>li a').siblings('div').stop().slideUp()
      $(this).parent('li').addClass('active')
      $(this).siblings('div').stop().slideDown()
  
    }
  })
    // sub_02_02 검색탭
  // $(".sch_tab > ul > li").first().addClass("active");
  $(".sch_tab > ul > li").on("click", function (e) {
    e.preventDefault();
    $(".sch_tab > ul > li").removeClass("active");
    $(this).addClass("active");
  });

  toFunc();

  function toFunc() {
    if ($(window).width() < 720) {
    $('.sch_tab').addClass("ulsel").removeClass('pcef');
    $('.sch_tab .ulsel_btn').removeClass("hide");
    $('.sch_tab').children('ul').removeClass('needflex').addClass('ulsel_list')
  } else {
    $('.sch_tab').removeClass("ulsel").addClass('pcef');
    $('.sch_tab .ulsel_btn').addClass("hide");
    $('.sch_tab').children('ul').removeAttr('style').addClass('needflex').removeClass('ulsel_list')
  }
  }

  $(window).resize(function () {
      toFunc();
  });



    // sub_03_02 자주하는 질문 아코디언
    $('.faq_list .brd_title a').on('click',function(e){
      e.preventDefault()
      let active=$(this).closest('div').hasClass('active');
      if(active){
        $(this).closest('div').removeClass('active')
        $(this).closest('div').siblings('p').stop().slideUp()
      }else{
        $('.faq_list .brd_title a').closest('div').removeClass('active')
        $('.faq_list .brd_title a').closest('div').siblings('p').stop().slideUp()
        $(this).closest('div').addClass('active')
        $(this).closest('div').siblings('p').stop().slideDown()
    
      }
    })

    // 통합검색
    resultView();

    function resultView() {
        // 검색결과 리스트
        $(".resultview > div").each(function () {
            $(this).children().find(".resultview_item").slice(0, 3).show();
        }); // 처음 3개 노출
        $(".redcross").click(function (e) {
            e.preventDefault();
            $(this).parent().siblings().find(".resultview_item:hidden").slice(0, 3).show(); // 다음 3개 노출
            if ($(this).parent().siblings().find(".resultview_item:hidden").length == 0) {
                // 남은 아이템 수 확인
            }
        });
    }

    // 검색결과 탭 작동
    const cloneSlide = $(".resultview_list").html();
    const arraySlide = [];

    $(".resultview_list .resultview").each(function (i, e) {
        arraySlide.push(e);
    });
    $(".sub_tab_list li:first-child").first().addClass("on");
    $(".sub_tab_list li").on("click", function () {
        const type = $(this).children(".data-name").text();

        $(".sub_tab_list li").removeClass("on");
        $(this).addClass("on");
        $(".resultview_list").empty();

        if (type === "전체") {
            $(".resultview_list").append(cloneSlide);
        } else {
            $(arraySlide).each(function (i, e) {
                const exist = $(e).attr("data-type").indexOf(type);

                if (exist >= 0) {
                    $(".resultview_list").append(e);
                }
            });
        }
        resultView();
    });


      // $('.gnbwrap>ul>li').mouseenter(function(){
      //   let smHeight=$(this).find('.sub_menu').innerHeight()
      //   $('header .bg').stop().animate({'height':smHeight},200)
      //   $('.sub_menu').stop().slideUp(100)
      //   $(this).find('.sub_menu').stop().slideDown(300)
      // })
      // $('.gnbwrap>ul>li').mouseleave(function(){
      //   $('header .bg').stop().animate({'height':0},100)
      //   $('.sub_menu').stop().slideUp(100)
      // })
  

      // $('.gnbwrap>ul>li').mouseenter(function(){
      //   let smHeight=$(this).find('.sub_menu').innerHeight()
      //   let hdH=$('header').innerHeight()
      //   $('.sub_menu').stop().slideUp(100)
      //   $(this).find('.sub_menu').stop().slideDown(300)
      //   $('header').stop().animate({'height' : smHeight + hdH},200)
      // })
      // $('.gnbwrap>ul>li').mouseleave(function(){
      //   $('.sub_menu').stop().slideUp(100)
      //   $('header').stop().animate({'height':'80px'},200)
      // })

      // $('.pl_index02 li').on('click',function(){
      //   $('.pl_index02 li').removeClass('active')
      //   $(this).addClass('active')
      // })


      // 푸름이 이동환경교실 운영 scrolltop 탭
      $(".pl_index02 a[href^='#']").click(function(e) {
        e.preventDefault();
        
        var position = $($(this).attr("href")).offset().top;
      
        $("body, html").animate({
          scrollTop: position - 120
        } /* speed */ );
      });

       // 개인정보처리방침 idlink scrolltop
       $(".privacywrap a[href^='#']").click(function(e) {
        e.preventDefault();
        
        var position = $($(this).attr("href")).offset().top;
      
        $("body, html").animate({
          scrollTop: position - 100
        }, 100);
      });





});

