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

    $('.pagination ul li a').on('click',function(){
        $('.pagination ul li a').removeClass()
        $(this).addClass('active')
    })


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

    