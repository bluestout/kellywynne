$(document).ready(function () {
    $('.close').on("click", function (e) {
        e.preventDefault()
        $('body').removeClass('stop-scroll');
        $('body').removeClass('blocked-scroll');
        var id = $(this).attr('href');
        if (id == '#mini-cart') {
          $(this).parent().parent().removeClass('active');
        }
        $('.page-wrap').removeClass('block-scroll');
        $(id).hide();
        $(id).removeClass('active');
        $('.dark-bg').removeClass('active');
    });

    $('.cart_btn').on("click", function (e) {
        e.preventDefault();
        $('#mini-cart').toggleClass('active');
        $('.page-wrap').toggleClass('block-scroll');
    })

    $('.js-toggle_btn').on("click", function (e) {
        e.preventDefault();
        $('.js-toggle-content').toggle();
    });
  
  	$('.cst_cart_msgbox_title').on("click", function (e) {
        e.preventDefault();
        $('.cst_cart_msgbox_title').toggleClass('open');
        $('.cst_cart_msgbox_content').toggle();
    });

    $(document).on('click', '.select', function() {
        var is_open = $(this).hasClass("open");
        if (is_open) {
          $(this).removeClass("open");
        } else {
          $(this).addClass("open");
        }
      });
      
      $(document).on('click', '.select li', function() {
      
        var selected_value = $(this).html();
        var id = $(this).data("id");
        $('.add_cart_button').attr('data-id', id);
        $('.ajax_add_cart_button').attr('data-id', id);
        
        var first_li = $(".select li:first-child").html();
      
        $(".select li:first-child").html(selected_value);
        $(this).html(first_li);
      
      });
      
      $(document).mouseup(function(event) {
      
        var target = event.target;
        var select = $(".select");
      
        if (!select.is(target) && select.has(target).length === 0) {
          select.removeClass("open");
        }
      
      });

    $('.signle_product .quantity').change(function () {
       var value = $(this).val();
       console.log(value);
       $('.add_cart_button').attr('data-quantity', value);
    });

    $('.signle_product .add_cart_button').on('click', function (e) {
        e.preventDefault();

    })

    $('body').on('click', '[data-remove-item]', function(e) {
        e.preventDefault();
        var cartItem = {
          lineID: $(this).parents('[data-cart-item]').data('line-id'),
          variantID: $(this).parents('[data-cart-item]').data('variant-id'),
          quantity: 0,
          parentCartForm: $(this).parents('[data-cart-form]'),
          totalDiscount: $(this).parents('[data-cart-form]').data('total-discount'),
          $element : $(this).parents('[data-cart-item]')
        }
        cartItem.$element.addClass('animated fadeOutLeft');
    
        updateCartItemQuantity(cartItem);
    
        if (cartItem.parentCartForm.data('cart-form') === 'cart-template') {
          cartItem.$element.find('input').val('0');
          cartItem.parentCartForm.submit();
        }
    
        if (cartItem.parentCartForm.data('cart-form') === 'mini-cart') {
          cartItem.$element.find('input').val('0');
        }
    });

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

    $('.logo-carousel').lightSlider({
        gallery: false,
        item: 3,
        controls: true,
        adaptiveHeight: true,
        speed: 700,
        auto: true,
        loop: true,
        pause: 5000,
        pager: false,
        responsive : [
            {
                breakpoint:768,
                settings: {
                    item:2,
                    slideMove:1
                  }
            },
            {
                breakpoint:480,
                settings: {
                    item:1,
                    slideMove:1
                  }
            }
        ],
        onSliderLoad: function (el) {
            el.addClass('active');
        }
    });

    if ($(window).width() < 767) {
        $('.featured-product-section .product-loop').lightSlider({
            gallery: false,
            item: 2.5,
            controls: true,
            adaptiveHeight: true,
            speed: 700,
            auto: true,
            loop: true,
            pause: 5000,
            slideMove:1,
            currentPagerPosition: "left",
            responsive : [
                {
                    breakpoint:480,
                    settings: {
                        item:1.7,
                        slideMove:1
                      }
                }
            ],
            onSliderLoad: function (el) {
                el.addClass('active');
            }
        });
        $('.image-Product-section .image-product-slider').lightSlider({
            gallery: false,
            item: 1.5,
            controls: true,
            adaptiveHeight: false,
            speed: 700,
            auto: true,
            loop: false,
            pause: 5000,
            slideMove:1,
            currentPagerPosition: "left",
            onSliderLoad: function (el) {
                el.addClass('active');
            }
        });
    }

    $('.image-Product-section .bottom-action .btn').on('click', function (e) {
        e.preventDefault();
        $('.image-Product-section #single_product #submit').trigger('click');
    })
    $('.add_cart_button').on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var quantity = $(this).data('quantity');
        var postData = {
            "id": id,
            "quantity": quantity
        }
        console.log(postData);
        $.ajax({
            url: '/cart/add.js',
            dataType: 'json',
            cache: false,
            type: 'post',
            data: postData,
            success() {
              $.ajax({
                url: '/cart.js',
                dataType: 'json',
                cache: false,
                success(cart) {
                  location = '/cart';
                }
              });
            },
        });
    })


    $('.ajax_add_cart_button').on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var quantity = $(this).data('quantity');
        var postData = {
            "id": id,
            "quantity": quantity
        }
        console.log(postData);
        $.ajax({
            url: '/cart/add.js',
            dataType: 'json',
            cache: false,
            type: 'post',
            data: postData,
            success() {
              $.ajax({
                url: '/cart.js',
                dataType: 'json',
                cache: false,
                success(cart) {
                    refreshCart(cart);
                }
              });
            },
        });
    })
   

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
    if ($(window).width() > 749) {/*FS 1023*/
        $("nav.primary").stick_in_parent({
            offset_top: 30,
            bottoming: false
        });
    }
    if ($(window).width() < 749) {/*FS 1023*/
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
    if ($(window).width() > 749) {/*FS 1025*/
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
    if ($(window).width() < 749) {/*FS 1025 */
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

function refreshCart(cart) {
    // Bold:PRE
    if(typeof window.BOLD !== 'undefined'
    && typeof window.BOLD.common !== 'undefined'
    && typeof window.BOLD.common.cartDoctor !== 'undefined') {
    // NOTE: "cart" should be the variable containing the cart JSON data
    cart = window.BOLD.common.cartDoctor.fix(cart);
    }
    // Bold:PRE
    
    $(".cart_count").empty();
    $cartBtn = $(".cart_count");
    var value = $cartBtn.text() || '0';
    var cart_items_html = "";
    var cart_discounts_html = "";
    var cart_action_html = "";
    var cart_savings_html = "";
    var $cart_form = $('[data-cart-form]');
    var productHasSale = false;
    var productCompareAtPrice = 0;
    var productFinalPrice = 0;
    var relateProductHtml = $('#mini-cart .relate_product_html').html();
    $cart_form.data('total-discount', cart.total_discount);

    $cartBtn.text(value.replace(/[0-9]+/,cart.item_count));

    if (cart.item_count == 0) {
      $('.js-empty-cart__message').removeClass('hidden');
      $cart_form.addClass('hidden');
    } else {
      $('.js-empty-cart__message').addClass('hidden');
      $cart_form.removeClass('hidden');

      var total_saving = 0; // adding counter variables for total cart savings
      var saving = 0;

      $.each(cart.items, function(index, item) {
        var itemDiscounts = item.discounts;
        var discountMessage = "";

        for (i=0; i < itemDiscounts.length; i++) {
          var amount = Shopify.formatMoney(itemDiscounts[i].amount, $('body').data('money-format'));
          var title = itemDiscounts[i].title;
          discountMessage = '<p class="notification-discount meta">' + title + '</p>';
        }
        var line_id = index + 1;
        
        cart_items_html += '<li class="mini-cart__item clearfix" data-cart-item data-line-id="' + line_id + '" data-variant-id="' + item.id + '">' +
          '<a class="image_link" href="' + item.url +'">';
        if (item.image) {
          cart_items_html += '<div class="cart_image mini-cart__item-image">' +
              '<img src="' + item.image.replace(/(\.[^.]*)$/, "_compact$1").replace('http:', '') + '" alt="' + item.title + '" />' +
            '</div></a>';
        }

        cart_items_html += '<div class="mini-cart__item--content"><a href="/cart/change?line=' + line_id + '&amp;quantity=0" class="js-cart-remove-btn cart__remove-btn" data-line-id="' + line_id + '" data-remove-item="mini-cart"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 26.87 26.87"><g transform="rotate(44.999887 13.43502884 13.43502884)"><path fill="none" stroke="rgb(0,0,0)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.93502884 13.43502884h19"></path><path fill="none" stroke="rgb(0,0,0)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.43502884 3.93502884v19"></path></g></svg></a><div class="mini-cart__item__title"><div class="item_title"><a href="' + item.url + '">' + item.product_title + '</a></div></div>';
        cart_items_html += '<strong class="left price">'+item.quantity+' X ';

        

        if(productHasSale == true) {
          //puts the slash through the old item price
          var itemPrice = Shopify.formatMoney(productFinalPrice, $('body').data('money-format')) + ' </span>';
          cart_items_html += '<span class="money sale">' + itemPrice + '</strong>';

          // Total savings
          saving = (productCompareAtPrice - productFinalPrice) * item.quantity;
          total_saving = saving + total_saving;
        } else {
          if (item.price > item.final_price) {
            //puts the slash through the old item price
            var itemPrice = Shopify.formatMoney(item.final_price, $('body').data('money-format')) + ' </span>';
            cart_items_html += '<span class="money sale">' + itemPrice + '</strong>';
          } else {
            var itemPrice = Shopify.formatMoney(item.price, $('body').data('money-format'));
            cart_items_html += '<span class="money">' + itemPrice + '</span></strong>';
          }
        }
        cart_items_html += '</strong></div></li>';
      });
    }

    
    if (relateProductHtml != undefined ) {
        cart_items_html += `<li class="mini-cart__item relate_product">${relateProductHtml}</li>`;
    }
    
    cart_action_html += '<span>SUBTOTAL</span>'+'<span><span class="money">' + Shopify.formatMoney(cart.total_price, $('body').data('money-format')) + '</span></span>';
    $('.js-cart_items').html(cart_items_html);
    $('.js-cart_subtotal').html(cart_action_html);

    
    $('#mini-cart').addClass('active');
}

function updateCartItemQuantity(cartItem) {
    $.ajax({
      url: '/cart/change.js',
      dataType: 'json',
      cache: false,
      type: 'post',
      data: {
        quantity: cartItem.quantity,
        line: cartItem.lineID
      },
      success: function (data) {
          refreshCart(data);
      }
    });
}

function AddSingleItem(cartItem) {
    $.ajax({
      url: '/cart/add.js',
      dataType: 'json',
      cache: false,
      type: 'post',
      data: cartItem,
      success: function (data) {
          console.log(data);
      }
    });
}