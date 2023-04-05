var elFocus, headH;
function resizeContentHeight() {
    var conH = $("#contents").outerHeight();
    var lnbH = $(".lnb").outerHeight();
    if (conH < lnbH) {
        $("#contents").outerHeight(lnbH);
    } else {
        $("#contents").removeAttr("style");
    }
}
function initMoving(target, position, topLimit, btmLimit) {
    if (!target) return false;

    var obj = target;
    obj.initTop = position;
    obj.topLimit = topLimit;
    obj.bottomLimit = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - btmLimit - obj.offsetHeight;

    obj.style.position = "absolute";
    obj.top = obj.initTop;
    // obj.left = obj.initLeft;

    if (typeof window.pageYOffset == "number") {
        //WebKit
        obj.getTop = function () {
            return window.pageYOffset;
        };
    } else if (typeof document.documentElement.scrollTop == "number") {
        obj.getTop = function () {
            return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        };
    } else {
        obj.getTop = function () {
            return 0;
        };
    }

    if (self.innerHeight) {
        //WebKit
        obj.getHeight = function () {
            return self.innerHeight;
        };
    } else if (document.documentElement.clientHeight) {
        obj.getHeight = function () {
            return document.documentElement.clientHeight;
        };
    } else {
        obj.getHeight = function () {
            return 500;
        };
    }

    obj.move = setInterval(function () {
        if (obj.initTop > 0) {
            pos = obj.getTop() + obj.initTop;
        } else {
            pos = obj.getTop() + obj.getHeight() + obj.initTop;
            //pos = obj.getTop() + obj.getHeight() / 2 - 15;
        }

        if (pos > obj.bottomLimit) pos = obj.bottomLimit;
        if (pos < obj.topLimit) pos = obj.topLimit;

        interval = obj.top - pos;
        obj.top = obj.top - interval / 3;
        obj.style.top = obj.top + "px";
    }, 30);
}

function tabResizing1() {
    //탭 너비 높이 조정
    var tabH = 0;
    $(".tab_list > ul > li > a").removeAttr("style");
    $(".tab_list > ul > li").each(function () {
        if (tabH < $(this).children("a").height()) {
            tabH = $(this).children("a").height();
        }
    });
    $(".tab_list > ul > li > a").height(tabH);
    var tabLength = $(".tab_list > ul > li").length;
    $(".tab_list > ul > li").outerWidth(100 / tabLength + "%");
}
$(document).on("click", ".tab_list > ul > li > a", function (e) {
    //탭 클릭시 active
    var tab = $(this).parent("li");
    var tabIndex = tab.index();
    var tabAll = $(this).parent("li").siblings("li");
    var txt = $(this).text();
    var tabCon = $(this).closest("ul").siblings("ol");
    tabAll.removeClass("active").children("a").removeAttr("title");
    tab.addClass("active").children("a").attr("title", "선택됨");
    $(this).closest(".tab_list").removeClass("active").children("button").text(txt);
    if (tabCon.length) {
        tabCon.children("li").eq(tabIndex).addClass("active").siblings("li").removeClass("active");
    }
    e.preventDefault();
});
$(document).on("click", ".tab_list > button", function (e) {
    var tabBox = $(this).closest(".tab_list");
    if (tabBox.hasClass("active")) {
        tabBox.removeClass("active");
    } else {
        tabBox.addClass("active");
    }
});
//tab_list2
$(document).on("click", ".tab_list2 > ul > li > a", function (e) {
    //탭 클릭시 active
    var tab = $(this).parent("li");
    var tabAll = $(this).parent("li").siblings("li");
    var txt = $(this).text();
    tabAll.removeClass("active").children("a").removeAttr("title");
    tab.addClass("active").children("a").attr("title", "선택됨");
    $(this).closest(".tab_list2").removeClass("active").children("button").text(txt);

    e.preventDefault();
});
$(document).on("click", ".tab_list2 > button", function (e) {
    var tabBox = $(this).closest(".tab_list2");
    if (tabBox.hasClass("active")) {
        tabBox.removeClass("active");
    } else {
        tabBox.addClass("active");
    }
});

function pcChk(width) {
    //창크기 768px보다 크면 true 반환
    if ($(window).width() > width) {
        return true;
    } else {
        return false;
    }
}
function mChk(width) {
    //창크기 768px보다 크면 true 반환
    if ($(window).width() > width) {
        return true;
    } else {
        return false;
    }
}
function headLine(arg) {
    if (arg == "on") {
        $(".header").addClass("active");
    } else if (arg == "off") {
        $(".header").removeClass("active");
    }
}
/* function gnb3Open(target) {
  if (pcChk(1000)) {
    var dep2H = $(target).next().outerHeight();
    $('.header')
      .stop()
      .animate({ height: dep2H + headH + 'px' }, 150, function () {
        $(target).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
      });
    headLine('on');
  }
}
function gnb3Close() {
  if (pcChk(1000)) {
    $('.header')
      .stop()
      .animate({ height: headH + 'px' }, 150, function () {
        $('.gnb > ul > li').removeClass('active');
        headLine('off');
      });
  }
}

function openSitemap() {
  //사이트맵 gnb복사 후 열기
  $('.gnb > ul').clone().appendTo('.m_gnb>div');
  $('.m_gnb .dep2_wrap').removeAttr('style');
  $('.m_gnb').stop().fadeIn().attr('tabindex', '0').focus();
  $('.m_gnb > div > ul > li').each(function () {
    $(this).find('.dep3').closest('.dep2_wrap').parent('li').addClass('active2');
    $(this).find('.dep3').closest('li').addClass('active2');
  });
}

function closeSitemap() {
  //사이트맵 닫고 복사한 nav 지우기
  $('.m_gnb')
    .stop()
    .fadeOut(function () {
      $(this).find('ul').remove();
    })
    .removeAttr('tabindex');
} */

function focusLoop() {
    //이벤트가 발생한 요소의 상위 tabindex="0"을 찾아 포커스이동
    $(event.target).closest('[tabindex="0"]').focus();
}

function saveFocus() {
    //이벤트 발생한 요소 elFocus변수에 저장
    return (elFocus = $(event.target));
}
function returnFocus() {
    //저장된 요소로 포커스 이동
    elFocus.focus();
}

function bodyScroll(arg) {
    //인자값에 따른 body 스크롤 on/off
    if (arg == "off") {
        $("body").css("overflow", "hidden");
    } else if (arg == "on") {
        $("body").removeAttr("style");
    }
}
/* function mGnbDrop() {
  $('.m_gnb a').on('click', function () {
    if ($(this).next().length) {
      if ($(this).closest('li').hasClass('active')) {
        $(this).next().stop().slideUp().closest('li').siblings('li').children('a').next().stop().slideUp();
        $(this).closest('li').removeClass('active');
      } else {
        $(this).next().slideDown().closest('li').siblings('li').children('a').next().stop().slideUp();
        $(this).closest('li').addClass('active').siblings('li').removeClass('active');
      }
      return false;
    }
  });
} */

/* $(function () {
  headH = $('.header').outerHeight();
  initMoving(document.getElementById("sc_1"), 200, 50, -3000);//퀵메뉴 스크롤 이동
  $('.gnb >ul > li>a').on({
    mouseenter: function () {
      //검색창이 없을때 실행
      if (!$('.util .btn_search_open').hasClass('active')) gnb3Open(this);
    },
    focusin: function () {
      if (!$('.util .btn_search_open').hasClass('active')) gnb3Open(this);
    },
  });
  $('.gnb > ul').on({
    mouseleave: function () {
      if (!$('.util .btn_search_open').hasClass('active')) gnb3Close();
    },
  });
  $('#gnb .dep2_wrap a')
    .last()
    .on({
      focusout: function () {
        gnb3Close();
      },
    });
  $(document).on('click', '.btn_sitemap_open', function (e) {
    if (!pcChk(720)) {
      openSitemap(); //사이트맵 열기
      saveFocus(); //포커스 요소 저장
      bodyScroll('off');
      mGnbDrop();
      e.preventDefault();
    }
  });
  // 사이트맵 닫기
  $('.btn_sitemap_close').on({
    click: function () {
      closeSitemap(); //사이트맵닫기
      bodyScroll('on');
      returnFocus(); //이전 포커스 요소로 되돌리기
    },
    focusout: function () {
      focusLoop(); //포커스 반복
      bodyScroll('on');
    },
  });



//검색
function openSearch() {
  $('.btn_search_open').addClass('active');
  var schBoxH = $('.search_box').outerHeight(true);
  headLine('on');
  $('.header')
    .stop()
    .animate({ height: headH + schBoxH + 'px' });
  return false;
}

/* function resetSearch() {
  $('.header')
    .stop()
    .animate({ height: headH + 'px' }, function () {
      $('.btn_search_open').removeClass('active');
      headLine('off');
    });
} */
// $(document).on('click', function (e) {
//   if (!$(e.target).closest('.search_box').length) {
//     resetSearch();
//     bodyScroll('off');
//   }
// });
$(function () {
    //radiobox
    $(".radiobox li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

    // 자주묻는질문 드롭다운메뉴
    var faqBtn = $(".list_dropdown dt .table_box > .new");
    faqBtn.on("click", function () {
        if ($(this).closest("dt").hasClass("active")) {
            $(this).closest("dt").removeClass("active");
            $(".list_dropdown dd").slideUp();
        } else {
            $(".list_dropdown dt").removeClass("active");
            $(".list_dropdown dd").slideUp();
            $(this).closest("dt").addClass("active").next().slideDown();
        }
        return false;
    });

    // 모델개발 문의사항
    var qnaBtn = $(".table_box > .new");
    qnaBtn.on("click", function (e) {
        if ($(this).parent().siblings("section").hasClass("active")) {
            $(this).parent().siblings("section").removeClass("active");
            $(this).parent().siblings("section").slideUp();
            $(this).parent().siblings("section").css({ "border-top": "none" });
        } else {
            $(".accd").removeClass("active");
            $(".accd").slideUp();
            $(this).parent().siblings("section").addClass("active");
            $(this).parent().siblings("section").slideDown();
            $(this).parent().siblings("section").css({ "border-top": "1px solid #999" });
        }
        e.preventDefault();
    });

    // $('.btn_search_open').on('click', function () {
    //   if (!$(this).hasClass('active')) {
    //     openSearch();
    //     bodyScroll('off');
    //   } else {
    //     resetSearch();
    //     bodyScroll('on');
    //   }
    //   return false;
    // });

    var time = 3; //자동재생 시간 설정
    var $bar, isPause, tick, percentTime;
    var slide2 = $(".banner .slide");
    isPause = false;
    $bar = $(".progress");
    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;

        tick = setInterval(interval, 10);
    }
    function interval() {
        if (isPause === false) {
            percentTime++;
            $bar.css({
                width: percentTime / time + "%",
            });
            if (percentTime >= 100 * time) {
                percentTime = 100 * time;
                slide2.slick("slickNext");
            }
        }
    }
    function resetProgressbar() {
        $bar.css({
            width: 0 + "%",
        });
        clearTimeout(tick);
    }
    startProgressbar();
    slide2.on("init reInit afterChange", function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $(" .slide_btn .pagination_num").html('<span class="current">' + i + "</span> / " + slick.slideCount);
        startProgressbar();
    });
    slide2.slick({
        autoplay: false,
        autoplaySpeed: 2000,
        cssEase: "ease-in",
        infinite: true,
        dots: true,
        appendDots: $(".slide_btn .pagination_dot"), //dot 설정
        customPaging: function (slide, i) {
            return '<button type="button">0' + (i + 1) + '<span class="hide">슬라이드이동</span></button>';
        },
        prevArrow: $(".prev"), //arrow 설정
        nextArrow: $(".next"), //arrow 설정
    });
    $(".pause").click(function () {
        if ($(this).hasClass("play")) {
            $(this).removeClass("play").children("span").text("자동재생 정지");
            slide2.slick("slickPlay");
            isPause = false;
        } else {
            $(this).addClass("play").children("span").text("자동재생 시작");
            slide2.slick("slickPause");
            isPause = true;
        }
    });
    var slide1 = $(".banner2 .slide");
    slide1.on("init reInit afterChange", function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $(".banner2 .pagination_num").html('<span class="current">' + i + "</span> /&nbsp;  " + slick.slideCount);
    });
    slide1.slick({
        autoplay: false,
        cssEase: "ease-in",
        dots: true,
        appendDots: $(".banner2 .pagination_dot"), //dot 설정
        customPaging: function (slide, i) {
            return '<button type="button">' + (i + 1) + "번째 슬라이드로 이동</button>";
        },
        prevArrow: $(".banner2 .prev"), //arrow 설정
        nextArrow: $(".banner2 .next"), //arrow 설정
    });
    $(".banner2 .pause").click(function () {
        if ($(this).hasClass("play")) {
            $(this).removeClass("play").children("span").text("자동재생 정지");
            slide1.slick("slickPlay");
            isPause = false;
        } else {
            $(this).addClass("play").children("span").text("자동재생 시작");
            slide1.slick("slickPause");
        }
    });

    // $slick_slider = $('.section1 > ul');
    // settings_slider = {
    //   dots: false,
    //   arrows: false,
    //   centerMode: true,
    //   slidesToShow: 1,
    //   variableWidth: true,
    //   infinite: true,
    //   swipeToSlide: true,
    //   touchThreshold: 5,
    //   // responsive: [
    //   //   {
    //   //     breakpoint: 540,
    //   //     settings: {
    //   //       slidesToShow: 1,
    //   //     }
    //   //   },
    //   //   {
    //   //     breakpoint: 430,
    //   //     settings: {
    //   //       slidesToShow: 1,
    //   //     }
    //   //   }
    //   // ]

    // }
    // slick_on_mobile($slick_slider, settings_slider);

    $(".inp_btn.file span, .file button").click(function (e) {
        $(this).siblings("input").click();
    });
});

function changeValue(obj) {
    $(obj).siblings("span").children("em").html(obj.files[0].name);
}

// slick on mobile
function slick_on_mobile(slider, settings) {
    $(window).on("load resize", function () {
        if ($(window).width() > 720) {
            if (slider.hasClass("slick-initialized")) {
                slider.slick("unslick");
            }
            return;
        }
        if (!slider.hasClass("slick-initialized")) {
            return slider.slick(settings);
        }
    });
}

$(document).ready(function () {
    $(".table_box > li > #chk1").on("click", function () {
        $("#data> .chk1").show();
        $("#data> .chk1").siblings().hide();
    });
    $(".table_box > li > #chk2").on("click", function () {
        $("#data> .chk2").show();
        $("#data> .chk2").siblings().hide();
    });
    $(".table_box > li > #chk3").on("click", function () {
        $("#data> .chk3").show();
        $("#data> .chk3").siblings().hide();
    });
    $(".table_box > li > #chk4").on("click", function () {
        $("#data> .chk4").show();
        $("#data> .chk4").siblings().hide();
    });
});

function gnbAction(breakpoint) {
    //gnb
    var headH;
    function mobile() {
        //중단점 이하 크기에서 true반환
        return $(window).width() <= breakpoint;
    }
    function dep2Height() {
        //dep2 크기에 맞추어 gnb높이 조절
        if (!mobile()) {
            var dep2H = 0;

            $("#gnb .dep2").each(function () {
                if (dep2H < $(this).outerHeight()) {
                    dep2H = $(this).outerHeight();
                }
            });
            headH = gnbReset();
            /*  $('#gnb .dep2').outerHeight(dep2H);  */
            $("#gnb")
                .addClass("active")
                .stop()
                .animate({ height: headH + dep2H + "px" }, 200);
        }
    }
    function gnbReset() {
        //gnb 닫기
        if (!mobile()) {
            var gnbH = $("#gnb").height();
            var gnbH2 = $("#gnb").removeAttr("style").height();
            $("#gnb")
                .css("height", gnbH + "px")
                .stop()
                .animate({ height: gnbH2 + "px" }, 200);
        }
        return gnbH2;
    }

    function gnbInit() {
        //gnb 초기화
        if (mobile()) {
            $("#gnb .dep1 > li").removeAttr("style"); //gnb 너비 조정
            $("#gnb .dep1 a").each(function () {
                // 하위메뉴가 있으면 a태그에 menu_btn클래스 추가
                if ($(this).next().length) {
                    $(this).addClass("menu_btn");
                }
            });
        } else {
            $("#gnb").removeAttr("style"); //gnb 너비 조정
            headH = $("#gnb").outerHeight(); //기본 헤더 높이 전역변수
            var gnbLeng = $("#gnb .dep1 > li").length; //gnb 너비 조정
            $("#gnb .dep1 > li").width(100 / gnbLeng + "%"); //gnb 너비 조정
            $("#gnb .dep1 a").removeClass("menu_btn");
        }
    }
    gnbInit();

    $(window).on("resize", function () {
        //초기화
        gnbInit();
    });

    //pc gnb 사이즈 조절 - 열기
    $("#gnb .dep1 > li > a").on({
        //헤더 높이조절
        mouseenter: function () {
            dep2Height(this);
        },
    });

    //pc gnb 사이즈 조절 - 닫기
    $("#gnb").on("mouseleave", function () {
        gnbReset();
    });

    //모바일 GNB 클릭시 하위메뉴 노출
    $("#gnb .dep1 a").on("click", function () {
        if (mobile()) {
            var innerMenu = $(this).next("ul");
        }
        if (mobile() && innerMenu.length > 0) {
            $(this).closest("li").toggleClass("active").siblings("li").removeClass("active").find("ul").stop().slideUp(200);
            innerMenu.stop().slideToggle(200);
            return false;
        }
    });
    //모바일 dep3 클릭시 하위메뉴 active
    $("#gnb .dep3 a").on("click", function () {
        if (mobile()) {
            $(this).closest("li").addClass("active").siblings("li").removeClass("active");
        }
    });
    //모바일 GNB 클릭시 하위메뉴 노출
    $("#gnb .dep1 a").on("click", function () {
        if (!pcChk(breakPoint)) {
            var innerMenu = $(this).next("ul");
            var innerMenu2 = $(this).next("div");
            if (innerMenu.length > 0 && !pcChk(breakPoint)) {
                $(this).closest("li").toggleClass("active").siblings("li").removeClass("active").find("ul").stop().slideUp(200);
                innerMenu.stop().slideToggle(200);
                return false;
            } else if (innerMenu2.length > 0 && !pcChk(breakPoint)) {
                $(this).closest("li").toggleClass("active").siblings("li").removeClass("active").find("div").stop().slideUp(200).find("li").removeClass("active").find(".dep3").stop().slideUp(200);
                innerMenu2.stop().slideToggle(200);
                return false;
            }
        }
    });
    //모바일 dep3 클릭시 하위메뉴 active
    /*     $('#gnb .dep3 a').on('click', function () {
          if (!pcChk(breakPoint)) {
              $(this).closest('li').addClass('active').siblings('li').removeClass('active');
          }
      }); */
    // 모바일 메뉴 열기
    $(".open_gnb").on("click", function (e) {
        if (mobile()) {
            e.preventDefault();
            $("#gnb").removeAttr("style").fadeIn();
            $("body").css("overflow", "hidden");
        }
    });
    // 모바일 메뉴 닫기
    $(".close_gnb").on("click", function () {
        if (mobile()) {
            $("#gnb").fadeOut();
            $("body").css("overflow", "auto");
            //펼침메뉴 리셋
            $("#gnb .dep1 li").removeClass("active").find("ul,div").removeAttr("style");
        }
    });

    //모바일 GNB 클릭시 하위메뉴 노출(배경)
    $("#gnb .dep1 a").on("click", function () {
        if ($(window).width() <= 1080) {
            var innerMenu = $(this).next("ul");
            var innerMenu2 = $(this).next(".dep2");
        }
        if ($(window).width() <= 1080 && innerMenu.length > 0) {
            $(this).closest("li").toggleClass("active").siblings("li").removeClass("active").find("ul").stop().slideUp(200);
            innerMenu.stop().slideToggle(200);
            return false;
        }
        if ($(window).width() <= 1080 && innerMenu2.length > 0) {
            $(this).closest("li").toggleClass("active").siblings("li").removeClass("active").children("div").stop().slideUp(200).find("li").removeClass("active").find(".dep3").stop().slideUp(200);
            innerMenu2.stop().slideToggle(200);
            return false;
        }
    });
}

function sitemapAction() {
    function closeSitemap() {
        $(".sitemap")
            .stop()
            .animate({ top: "50%", opacity: 0 }, 500, function () {
                $(this).removeClass("active");
            });
    }
    //사이트맵 오픈
    $(".btn_sitemap").click(function () {
        $(".sitemap").addClass("active").stop().animate({ top: 0, opacity: 1 }, 500);
    });
    //사이트맵 닫기
    $(".close_sitemap").click(function () {
        closeSitemap();
    });
    $(window).resize(function () {
        $(".sitemap").removeClass("active").removeAttr("style");
    });
}

$(document).ready(function () {
    $(".dropdown .btn").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active").attr("title", "열기").next("ul").stop().slideUp(200);
        } else {
            $(this).addClass("active").attr("title", "닫기").next("ul").stop().slideDown(200);
        }
    });
    $(".dropdown > ul a").click(function () {
        var txt = $(this).text();
        $(this).closest(".dropdown").find(".btn").removeClass("active").attr("title", "열기").text(txt).next("ul").stop().slideUp(200);
    });
});

function accordion() {
    /*  $('.accordion a').each(function(){
     if($(this).next('ol').length>0){
       $(this).addClass('btn');
     }        
   }); */
    $(".accordion a .stts_btn").each(function () {
        if ($(this).parent().next("ul").length > 0) {
            $(this).addClass("btn");
        }
    });
    $(".yoso > div > .accordion > li > ul").each(function () {
        $(this).first().show();
    });

    $(".accordion .dep2 > a > .stts_btn").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active").attr("title", "열기").parent().next("ul").stop().slideUp(200);
        } else {
            $(".accordion .dep2 > ul").slideUp().siblings("a").find(".stts_btn").removeClass("active");
            $(".accordion .dep3 > ul").slideUp().siblings("a").find(".stts_btn").removeClass("active");
            $(this).addClass("active").attr("title", "닫기").parent().next("ul").stop().slideDown(200);
        }
        if ($(this).hasClass("btn")) {
            return false;
        }
    });

    $(".accordion .dep3 > a > .stts_btn").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active").attr("title", "열기").parent().next("ul").stop().slideUp(200);
            $(".accordion .dep3 > ul").slideUp().siblings("a").find(".stts_btn").removeClass("active");
        } else {
            $(this).parents("li").siblings().find("a .stts_btn").removeClass("active").attr("title", "열기").parent().next("ul").stop().slideUp(200);
            $(this).addClass("active").attr("title", "닫기").parent().next("ul").stop().slideDown(200);
        }
        if ($(this).hasClass("btn")) {
            return false;
        }
    });
    /*   $('.accordion >ul >li> a').click(function () {        
      if ($(this).hasClass('active')) {
        $(this).removeClass('active').attr('title', '열기').next('ol').stop().slideUp(200);
      } else {
        $(this).closest('li').siblings('li').children('a').removeClass('active').attr('title', '열기').next('ol').stop().slideUp(200);
        $(this).addClass('active').attr('title', '닫기').next('ol').stop().slideDown(200);
      }      
      if($(this).hasClass('btn')){
        return false;
      }  
    });*/
}

function lnbInit() {
    //로컬내비게이션 초기화
    $(".yoso_detailB ul > li").each(function () {
        if ($(this).children("ol").length) {
            $(this).children("a").attr("title", "하위메뉴 닫힘").addClass("menu_btn");
            if ($(this).hasClass("active")) {
                $(this).children("a").attr("title", "하위메뉴 열림");
            }
        }
        if ($(this).find(".selected").length) {
            $(this).children("a").attr("title", "하위메뉴 열림");
            $(this).children("ol").show();
            $(this).find(".selected").children("a").attr("title", "현재 페이지");
        } else if ($(this).hasClass("selected")) {
            $(this).children("a").attr("title", "현재 페이지");
        }
    });
}

function closeLnb() {
    //lnb dep3 닫힘
    $(".yoso_detailB ul > li.active ol").stop().slideUp().prev().attr("title", "하위메뉴 닫힘");
    $(".yoso_detailB ul> li.active").removeClass("active");
}
function resetLnb() {
    //선택페이지 제거
    $(".yoso_detailB ul > li.selected ol").stop().slideUp();
    $(".yoso_detailB ul li.selected").removeClass("selected").children("a").removeAttr("title");
}

$(function () {
    //lnb
    $(".yoso_detailB ul > li > a").click(function (e) {
        if ($(this).parent().hasClass("active")) {
            closeLnb();
            e.preventDefault();
        } else if ($(this).parent().hasClass("selected")) {
            e.preventDefault();
        } else if ($(this).hasClass("menu_btn")) {
            closeLnb();
            $(this)
                .attr("title", "하위메뉴 열림")
                .next()
                .stop()
                .slideDown(function () {
                    resizeContentHeight();
                });
            $(this).parent().addClass("active");
            e.preventDefault();
        } else {
            closeLnb();
            resetLnb();
            $(this).parent().addClass("active");
        }
    });

    $(".yoso_detailB ul > li > a").click(function () {
        resetLnb();
        $(this).parent().addClass("active").siblings("li").removeClass("active");
    });

    function tabColumn() {
        //active li의 높이를 구하고 tab_box 높이 설정
        var tabConH = $(".tab_col").find(".active > div").outerHeight();
        $(".tab_col").css({ minHeight: tabConH + "px", boxSizing: "content-box" });
    }
    $(".tab_col > li > button").on("click", function () {
        $(this).closest("li").addClass("active").closest("li").siblings("li").removeClass("active");
        tabColumn();
    });
    $(window).on("resize load", function () {
        tabColumn();
    });

    /*   if($('.img_slide').length){// slickslider 실행
      $('.img_slide').slick();
    } */
    tabColumn();
    lnbInit();
    accordion();
    gnbAction(1080);
    // progressBar();
    resizeContentHeight();
    // schAction(1063);
    //sitemapAction();
    //pagination();
    // popup();
    //imageHide();
    //mobileOnlyTab(".section1", false, false, 1080);
});

$(document).ready(function () {
    $(".tab_con_list > div").first().addClass('active')
    $(".tab_list > li").on('click' ,function (e) {
        e.preventDefault();
        $(".tab_list > li").removeClass("active");
        $(this).addClass("active");
        $(".tab_con_list > div").removeClass("active");
        $(".tab_con_list > div").eq($(this).index()).addClass("active");
    });

    $(".qline").click(function () {
        if ($(this).hasClass("opened")) {
            $(this).removeClass("opened");
            $(this).siblings().slideUp();
        } else {
            $(".aline").slideUp();
            $(".qline").removeClass("opened");
            $(this).addClass("opened");
            $(this).siblings().slideDown();
        }
    });
});

/* 메인 추가 */
$(document).ready(function () {
    var li1 = $(".section1 ul > li");

    toFunc();

    function toFunc() {
        if ($(window).width() > 1080) {
            li1.parent().addClass("on");
            upFunc();
        } else {
            li1.parent().removeClass("on");
        }
    }

    $(window).resize(function () {
        toFunc();
    });

    function upFunc() {
        li1.mouseenter(function () {
            $(this).addClass("up");
            $(this).siblings().addClass("down");
        }).mouseleave(function () {
            $(this).removeClass("up");
            $(this).siblings().removeClass("down");
        });
    }

    /* lnb */

    lnbDd();

    function lnbDd() {
        $(".lnb_btn.lnbopen").click(function () {
            if ($(".lnbdropdown").hasClass("on")) {
                $(".lnbdropdown *").remove();
                $(".lnbdropdown").removeClass("on");
                $(".lnb_btn.lnbopen").removeClass("opened");
            } else {
                $(".lnb").clone().appendTo(".lnbdropdown");
                $(".lnbdropdown li").show();
                $(".lnbdropdown li.active").hide();
                $(".lnbdropdown").addClass("on");
                $(".lnb_btn.lnbopen").addClass("opened");
            }

            // if($('.lnb > li').hasClass('active')) {
            //   $('.lnb >li').siblings().slideToggle();
            // }
        });
    }

    function lnbDdW() {
        if ($(window).width() > 0) {
            $(".lnbdropdown").removeClass("on");
            $(".lnbdropdown *").remove();
        }
    }

    $(window).resize(function () {
        lnbDdW();
    });

    // 댓글 정렬 버튼
    $(".replytab > li")
        .off()
        .on("click", function () {
            if ($(this).hasClass("active")) {
            } else {
                $(".replytab > li").removeClass("active");
                $(this).addClass("active");
            }
        });

    // 댓글의 추가메뉴 버튼
    $(".btn_more")
        .off()
        .on("click", function () {
            $(this).siblings("div").toggleClass("opened");
        });

    // 댓글의 플러스마이너스 버튼
    $(".btn_pm").addClass("minus");
    $(".btn_pm")
        .off()
        .on("click", function () {
            var openPanel = $(this).parent().siblings();

            // $(this).parents().find('dt').siblings().toggleClass('opened');
            if (openPanel.hasClass("opened")) {
                openPanel.removeClass("opened");
                $(this).removeClass("plus").addClass("minus");
            } else {
                openPanel.addClass("opened");
                $(this).removeClass("minus").addClass("plus");
            }
        });

    // 댓글의 답글 버튼
    $(".rplrpl")
        .off()
        .on("click", function () {
            $(this).closest("dl").siblings().toggleClass("opened");
        });

    // 댓글 더보기 버튼
    $(".userreply_item").slice(0, 3).show(); // 처음 3개 노출

    $(".btn_morereply").click(function (e) {
        e.preventDefault();
        $(".userreply_item:hidden").slice(0, 3).show(); // 다음 3개 노출
        if ($(".userreply_item:hidden").length == 0) {
            // 남은 아이템 수 확인
        }
    });

    // 검색창 열기
    $(document).on("click", ".btn_search_open", function (e) {
        var target = $(".search_popwrap");
        $(target).parent().addClass("poped");
        $(".wrapper").addClass("modaled");
    });

    $(".popup_modal.on").parent().addClass("modaled");

    // 외부영역 클릭 시 검색창 닫기
    $(document).mouseup(function (e) {
        var nonTarget = $(".search_modal");
        if (nonTarget.has(e.target).length === 0) {
            nonTarget.removeClass("poped");
            $(".wrapper").removeClass("modaled");
        }
    });

    // 프로젝트참여 팝업열기
    $(document).on("click", ".prtcpt", function (e) {
        var target = $(".popup_wrap");
        $(target).parent().addClass("poped");
        $(".wrapper").addClass("modaled");
    });

    $(".btn_close").on("click", function () {
        $(".popup_modal").removeClass("poped");
        $(".wrapper").removeClass("modaled");
    });
    // 책임자 변경 팝업열기
    $(document).on("click", ".btn_add_pm", function (e) {
        var target = $(".popup_wrap");
        $(".popup_con_wrap.add_rqm").hide();
        $(".popup_con_wrap.add_pm").show();
        $(target).parent().addClass("poped");
        $(".wrapper").addClass("modaled");
    });

    $(".btn_close").on("click", function () {
        $(".popup_con_wrap.add_pm").hide();
        $(".popup_modal").removeClass("poped");
        $(".wrapper").removeClass("modaled");
    });
    // 요구사항추가 팝업열기
    $(".th7 li a").on("click", function (e) {
        e.preventDefault();
    });
    $(document).on("click", ".spbtn.pls.blue", function (e) {
        var target = $(".popup_wrap");
        $(".popup_con_wrap.add_pm").hide();
        $(".popup_con_wrap.add_rqm").show();
        $(target).parent().addClass("poped");
        $(".wrapper").addClass("modaled");
    });

    $(".btn_close").on("click", function () {
        $(".popup_con_wrap.add_rqm").hide();
        $(".popup_modal").removeClass("poped");
        $(".wrapper").removeClass("modaled");
    });

    // 외부영역 클릭 시 검색창 닫기
    $(document).mouseup(function (e) {
        var nonTarget = $(".popup_modal");
        if (nonTarget.has(e.target).length === 0) {
            nonTarget.removeClass("poped");
            $(".wrapper").removeClass("modaled");
        }
    });

    resultView();

    function resultView() {
        // 검색결과 리스트
        $(".resultview > div").each(function () {
            $(this).children().find(".resultview_item").slice(0, 3).show();
        }); // 처음 3개 노출
        $(".rp .redcross").click(function (e) {
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
    $(".result_tab ul li:first-child").first().addClass("active");
    $(".result_tab ul li").on("click", function () {
        const type = $(this).children(".data-name").text();

        $(".result_tab ul li").removeClass("active");
        $(this).addClass("active");
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

    // Requirement Pool step
    $(".yodep2 > li > a").on("click", function (e) {
        e.preventDefault();
        $(".yodep2_con").show();
        $(".yodep3_con").hide();
        $(".yodep4_con").hide();
    });
    $(".yodep3 > li > a").on("click", function (e) {
        e.preventDefault();
        $(".yodep2_con").hide();
        $(".yodep3_con").show();
        $(".yodep4_con").hide();
    });
    $(".yodep4 > li > a").on("click", function (e) {
        e.preventDefault();
        $(".yodep2_con").hide();
        $(".yodep3_con").hide();
        $(".yodep4_con").show();
    });

    //각 yodep 에 open 시 노출

    $(".yodep1 > li > a > .stts_btn").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("minus")) {
            $(this).removeClass("minus").parent().siblings("ol").slideUp();
        } else {
            $(".yodep1 > li > a > .stts_btn").removeClass("minus").parent().siblings("ol").slideUp();
            $(".yodep2 > li > a > .stts_btn").removeClass("minus").parent().siblings("ol").slideUp();
            $(".yodep3 > li > a > .stts_btn").removeClass("minus").parent().siblings("ol").slideUp();
            $(".yodep4 > li > a > .stts_btn").removeClass("minus").parent().siblings("ol").slideUp();
            $(this).addClass("minus").parent().siblings("ol").slideDown();
        }
    });
    $(".yodep2 > li > a > .stts_btn").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("minus")) {
            $(this).removeClass("minus").parent().siblings("ol").slideUp();
        } else {
            $(".yodep2 > li > a > .stts_btn").removeClass("minus").parent().siblings("ol").slideUp();
            $(".yodep3 > li > a > .stts_btn").removeClass("minus").parent().siblings("ol").slideUp();
            $(".yodep4 > li > a > .stts_btn").removeClass("minus").parent().siblings("ol").slideUp();
            $(this).addClass("minus").parent().siblings("ol").slideDown();
        }
    });
    $(".yodep3 > li > a > .stts_btn").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("minus")) {
            $(this).removeClass("minus").parent().siblings("ol").slideUp();
        } else {
            $(".yodep3 > li > a > .stts_btn").removeClass("minus").parent().siblings("ol").slideUp();
            $(".yodep4 > li > a > .stts_btn").removeClass("minus").parent().siblings("ol").slideUp();
            $(this).addClass("minus").parent().siblings("ol").slideDown();
        }
    });

    // 유저프로필 클릭시 메뉴호출
    $(".log_idtf .usrpf").on("click", function (e) {
        e.preventDefault();
        $(".usrmn").toggleClass("poped");
    });

    // 신뢰성검증 문의사항
    $(".board_list.diag span.new").on("click", function (e) {
        e.preventDefault();
        $(this).parents("ul.board_list.diag").next("section.accd").slideToggle();
    });

    // 공유버튼 클릭시 메뉴호출
    $(".share_list").first().hide();
    $(".btn_share").on("click", function (e) {
        e.preventDefault();
        $(".share_list").toggle();
    });

    // 230324 추가
    // 외부영역 클릭 시 공유 메뉴 닫기
    $(document).mouseup(function (e) {
        var nonTarget = $(".btn_share");
        if (nonTarget.has(e.target).length === 0) {
            nonTarget.siblings().hide();
        }
    });

    //
    $(".chrt_tab.ver1 > li").first().addClass("on");
    $(".chrt_listitem.ver1 > div").hide();
    $(".chrt_listitem.ver1 > div").first().show();
    $(".chrt_tab.ver1 > li").click(function () {
        $(".chrt_tab.ver1 > li").removeClass("on");
        $(this).addClass("on");
        $(".chrt_listitem.ver1 > div").hide();
        $(".chrt_listitem.ver1 > div").eq($(this).index()).show();
    });
    $(".chrt_tab.ver2 > li").first().addClass("on");
    $(".chrt_listitem.ver2 > div").hide();
    $(".chrt_listitem.ver2 > div").first().show();
    $(".chrt_tab.ver2 > li").click(function () {
        $(".chrt_tab.ver2 > li").removeClass("on");
        $(this).addClass("on");
        $(".chrt_listitem.ver2 > div").hide();
        $(".chrt_listitem.ver2 > div").eq($(this).index()).show();
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
});
