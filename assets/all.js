$(document).ready(function () {
    
    /* Preloader */
    $('#status').delay(100).fadeOut();
    $('#preloader').delay(200).fadeOut('slow', function () {
        // $(this).detach();
        
        /* For banner display */
        $( "body.product .banner.bundle:has(.tdf_bundle_content)" ).addClass( "active" );
    });
    
    
    /* Bundles */
    setTimeout(function () {
        $('.tdf_money.money').each(function () {
            $(this).html($(this).html().split(".00").join(""));
        });
        $('.tdf_money.money').each(function () {
            $(this).addClass('active');
        });
        $('.accordion .meta').each(function () {
            $(this).delay(800).fadeIn();
        });
     }, 1200);
    
    
    /* v1 Lazyloading images */
    /*
    $(function () {
        var loadedElements = 0;
        $('.lazy').lazy({
            bind: 'event',
            threshold: 500
        });
    });
    */
    
    /* v2 Lazyload images */
    /* via lazyload.js */
    (function () {
        function logElementEvent(eventName, element) {
            console.log(Date.now(), eventName, element.getAttribute('data-src'));
        }

        var callback_enter = function (element) {
            logElementEvent('lazyload entered', element);
        };
        var callback_exit = function (element) {
            logElementEvent('lazyload exited', element);
        };
        var callback_reveal = function (element) {
            logElementEvent('lazyload revealed', element);
        };
        var callback_loaded = function (element) {
            logElementEvent('lazyload loaded 👍', element);
        };
        var callback_error = function (element) {
            logElementEvent('lazyload error 💀 ', element);
            element.src = 'https://via.placeholder.com/440x560/?text=Error+Placeholder';
        };
        var callback_finish = function () {
            logElementEvent('lazyload finished ✔️', document.documentElement);
        };

        var lazyLoadInstance = new LazyLoad({
            elements_selector: '.lazy',
            threshold: 0,
            // Assign the callbacks defined above
            // callback_enter: callback_enter,
            // callback_exit: callback_exit,
            // callback_reveal: callback_reveal,
            // callback_loaded: callback_loaded,
            // callback_error: callback_error,
            callback_finish: callback_finish
        });

    })();

    /* Sliders */
    $('.alert').lightSlider({
        gallery: false,
        item: 1,
        mode: 'fade',
        controls: false,
        adaptiveHeight: false,
        speed: 700,
        auto: true,
        loop: true,
        pause: 5000,
        pager: false,
        onSliderLoad: function (el) {
            el.addClass('active');
        }
    });

    /* Mobile menu */

    $(".menu-toggle").on("click", function (e) {
        e.preventDefault();
        //$("body, nav.primary").toggleClass('open');
        $("nav.primary").slideToggle();
        /*$("nav.primary").animate({
            height: "toggle",
            opacity: "toggle"
        }, 600);*/
        $(this).toggleClass("collapsed");
    });

    /* Accordian openers */
    
    if ($(window).width() > 1023) {
        $("li a.parent").on("click", function (e) {
            e.preventDefault();
        });

        $("li.nest a.nestparent").on("click", function (e) {
            e.preventDefault();
        });
    }
    
    if ($(window).width() < 1023) {
        $("li a.parent").on("click", function (e) {
            e.preventDefault();
            $(this).toggleClass("open");
            $(this).parent().find("ul.child").slideToggle();
        });

        $("li.nest a.nestparent").on("click", function (e) {
            e.preventDefault();
            $(this).toggleClass("open");
            $(this).parent().find("ul.grandchild").slideToggle();
        });
    }

    /* Sticky nav */
    if ($(window).width() > 1023) {
        $("nav.primary").stick_in_parent({
            offset_top: 30,
            bottoming: false
        });
    }
    if ($(window).width() < 1024) {
        $("header.main").stick_in_parent({
            offset_top: 0,
            bottoming: false
        });

        // $(".addtocart").stick_in_parent({
        //     offset_top: 90,
        //     bottoming: false,
        //     parent: '.page-wrap'
        // });
    }

    /* Play video on hover */
    $(".grid-item").each(function () {
        if ($(".imagery", this).find("video").length) {
            var vid = $(".imagery", this).children("video")[0];
            $(this).hover(function () {
                vid.play();
                console.log("Video play");

            }, function () {
                vid.pause();
                console.log("Video pause");
            });
        }
    });
  
  $(document).on({
      mouseenter: function() {
          if ($(this).children("video").length > 0 ){
              var vid = $(this).children("video")[0];
              vid.play();
          }
      },
      mouseleave: function() {
           if ($(this).children("video").length > 0 ){
              var vid = $(this).children("video")[0];
              vid.pause();
           }
      }
  	},'.grid-item .imagery');

    /* Collection product title style */
    $("li.grid-item h3").each(function () {

        // wrap the subtitle
        var string = $(this).text(),
            start = string.indexOf(" in "),
            finish = string.length,
            select = $(this).text().substring(start, finish);
        $(this).highlight(select, {
            element: 'span',
            className: 'subtitle'
        });

        // wrap the word "in "

        $(".subtitle:contains(' in ')").html(function (_, html) {
            return html.replace(/( in )/, '<span class="hidden"> in </span>');
        });

    });

    /* Description view all */
    $("div.view-all a").on("click", function (e) {
        e.preventDefault();

        $(this).closest(".description").toggleClass("open");

        var text = $('div.view-all a').text();
        $('div.view-all a').text(
            text == "View less" ? "View more" : "View less");
    });

    /* ! Retailers */
    /* ======================================================= */
    if ($("#retailers").length) {
        // Make all the thumbnails the same height
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;

        $('.span4 .body').each(function () {

            $el = $(this);
            topPostion = $el.position().top;

            if (currentRowStart != topPostion) {

                // we just came to a new row.  Set all the heights on the completed row
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }

                // set the variables for the new row
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);

            } else {

                // another div on the current row.  Add it to the list and check if it's taller
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);

            }

            // do the last row
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }

        });
    }


}); // end document.ready


$(window).resize(function () {
    if ($(window).width() > 1025) {
        $("nav.primary").trigger("sticky_kit:detach");
        $("nav.primary").stick_in_parent({
            offset_top: 30,
            bottoming: false
        });

        /*$("li a.parent").on("click", function (e) {
            e.preventDefault();
        });

        $("li.nest a.nestparent").on("click", function (e) {
            e.preventDefault();
        });*/
        //console.log("> 1023");
    }
    if ($(window).width() < 1025) {
        $("nav.primary").trigger("sticky_kit:detach");
        $("header.main").stick_in_parent({
            offset_top: 0,
            bottoming: false
        });

        /*$("li a.parent").on("click", function (e) {
            e.preventDefault();
            $(this).toggleClass("open");
            $(this).parent().find("ul.child").slideToggle();
        });

        $("li.nest a.nestparent").on("click", function (e) {
            e.preventDefault();
            $(this).toggleClass("open");
            $(this).parent().find("ul.grandchild").slideToggle();
        });*/
        //console.log("< 1023");
    }
});