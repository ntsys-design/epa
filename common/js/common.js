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
  // 외부영역 클릭 시 셀렉트 닫기
  $(document).mouseup(function (e) {
    e.stopPropagation();
    var selBox = $(".ulsel");
    if (selBox.has(e.target).length === 0) {
      $(".ulsel_btn").removeClass("open");
      $(".ulsel_list").fadeOut(100);
    }
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
    $(".sub_con_list .sub_tab_con").stop().hide();
    $(".sub_con_list .sub_tab_con").eq(idx).stop().show();
  });
// 서브 탭인탭
  $(".sub_tab_list2 li").on("click", function (e) {
    e.preventDefault();
    let idx = $(this).index();
    $(".sub_tab_list2 li").removeClass("on");
    $(this).addClass("on");
    $(".sub_con_list2 .sub_tab_con2").stop().hide();
    $(".sub_con_list2 .sub_tab_con2").eq(idx).stop().show();
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
      $(this).siblings('div').slideUp()
    }else{
      $('.program_info>li a').parent('li').removeClass('active')
      $('.program_info>li a').siblings('div').slideUp()
      $(this).parent('li').addClass('active')
      $(this).siblings('div').slideDown()
  
    }
  })

});

