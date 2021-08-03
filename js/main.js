var mobileWidth = 992.999;
var windowHeight = $(window).height();
var docHeight = $(document).height();

/* Выставляем высоту для footer и отступ снизу для wrapper */
function footerSet() {
    if ($(window).width() > mobileWidth) {
        var heightFooter = $(".footer").outerHeight(true);
        $(".footer").css("position", "fixed");
        $(".wrapper").css("margin-bottom", heightFooter);
    } else {
        $(".footer").css("position", "relative");
        $(".wrapper").css("margin-bottom", 0);
    }
}

$(document).ready(function(){
    $('.portfolio-one').imagefill();

    $(function () {
        $(".offer__title-text").typed({
            strings: ["Logo design", "Businesscard design", "Websites", "SEO", "iOS and Android apps", "All kinds of design"], // строки выводимые в печать
            typeSpeed: 30,
            showCursor: false,
            loop: true
        });
    });

    /* Анимация увеличения чисел при попадении в экран */
    function animateNumbers(elementAnimnate) {
        var show = true;
        $(window).on("scroll", function(){
            if (!show) {
                return false;
            }

            var w_top = $(window).scrollTop();
            var e_top = $(elementAnimnate).offset().top;

            if(w_top + 200 >= e_top){
                $('.spincrement').spincrement({
                    from: 0,
                    leeway: 1,
                    duration: 3000
                });

                show = false;
            }
        })
    }
    animateNumbers('#numbers');

    /* Выставляем высоту для footer и отступ снизу для wrapper */
    footerSet();
    /* Подцветка элементов при попадании в экран мобильного */
    hovering();

    $('.menu-button').click(function(e){
        $('.sidebar').addClass("sidebar_active");
    });

    $('.menu-button_close').click(function(e){
        $('.sidebar').removeClass("sidebar_active");
    });

    /* СКРОЛЛ СТРАНИЦЫ */
    $(".scrollTo").click(function (e) {
        e.preventDefault();
        $('.sidebar').removeClass("sidebar_active");

        var id = $(this).attr('data-to');
        console.log(id);
        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 2000);
    });

    /* Слайдер 1 */
    $('.people-say-slider').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3,
        appendArrows: $('.people-say-slider__arrows'),
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        infinite: true,
        responsive: [
            {
                breakpoint: mobileWidth,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    /* Слайдер 2 */
    $('.we-work-slider').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 5,
        appendArrows: $('.we-work-slider__arrows'),
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        infinite: true,
        responsive: [
            {
                breakpoint: mobileWidth,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                    centerPadding: '60px'
                }
            }
        ]
    });

});


/* Подцветка элементов при попадании в экран мобильного */
function serviceHover(){
    $('.service').each(function () {
        var self = $(this),
            height;
        if (self.height() >= windowHeight) {
            height = self.offset().top + windowHeight - 100;
        } else {
            height = self.offset().top + self.height();
        }

        var onIf = $(document).scrollTop() + windowHeight;

        if ((onIf >= height) && (onIf <= height + windowHeight)) {
            self.addClass('service_active');
        } else {
            self.removeClass('service_active');
        }
    });
}

function portfolioOneHover(){
    $('.portfolio-one').each(function () {
        var self = $(this),
            height;
        if (self.height() >= windowHeight) {
            height = self.offset().top + windowHeight - 50;
        } else {
            height = self.offset().top + self.height();
        }

        var onIf2 = $(document).scrollTop() + windowHeight;

        if ((onIf2 >= height) && (onIf2 <= height + windowHeight)) {
            self.addClass('portfolio-one_active');
        } else {
            self.removeClass('portfolio-one_active');
        }
    });
}

/* Активация верхних функций если экран мобильного и скролл*/
function hovering(){
    $(document).on('scroll', function () {
        if ($(window).width() < mobileWidth) {
            serviceHover();
            portfolioOneHover();
        }
    });
}

/* Показ меню */
function showMenu(){
    if ($(window).width() > mobileWidth) {
        $('.navigation_darken').hide();
        var wst = $(window).scrollTop();
        if ((wst > 400) && (wst < docHeight - 3000)) {
            $('.navigation_darken').show();
        } else {
            $('.navigation_darken').hide();
        }

        $('.navigation-mobile_darken').hide();
    } else {
        $('.navigation-mobile_darken').hide();
        if ($(window).scrollTop() > 700) {
            $('.navigation-mobile_darken').show();
        } else {
            $('.navigation-mobile_darken').hide();
        }

        $('.navigation_darken').hide();
    }
}




/* Показ меню при скроле */

$(window).scroll(function () {
    showMenu();
});


/* При изменении размера экрана */
$(window).resize(function () {
    /* Выставляем высоту для footer и отступ снизу для wrapper */
    footerSet();
    /* Подцветка элементов при попадании в экран мобильного */
    hovering();

    showMenu();
});