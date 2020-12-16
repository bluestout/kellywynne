

$(document).ready(function () {
    $('.close').on("click", function (e) {
        e.preventDefault()
        $('body').removeClass('stop-scroll');
        $('body').removeClass('blocked-scroll');
        var id = $(this).attr('href');
        if (id == '#mini-cart') {
          $(this).parent().parent().removeClass('active');
        }
        $('body').removeClass('block-scroll');
        $(id).hide();
        $(id).removeClass('active');
        $('.dark-bg').removeClass('active');
    });

    $('.cart_btn').on("click", function (e) {
        e.preventDefault();
        $('#mini-cart').toggleClass('active');
        $('body').toggleClass('block-scroll');
    })

    $('.js-toggle_btn').on("click", function (e) {
        e.preventDefault();
        $('.js-toggle-content').toggle();
    });

    $('.gift-message .js-toggle_btn').on('click', function (e) {
        e.preventDefault();
        $('#mini-cart').toggleClass('gift_active');
    })
  
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
            "quantity": quantity,
            properties: {
                'upsell-porduct': 'true'
            }
        }
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


    $(document).on('click', '.ajax_add_cart_button',function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var quantity = $(this).data('quantity');
        var postData = {
            "id": id,
            "quantity": quantity,
            properties: {
                'upsell-porduct': 'true'
            }
        }
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
    
    $(document).on('click', '.gift_wrap_status',function (e) {
        e.preventDefault();
        var $gift_button = $(this);
        var id = $(this).data('product-id');
        var line_id = $(this).data('line-id');
        if (line_id == 0) {
            var postData = {
                "id": id,
                "quantity": 1
            }

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
                        if ($('.gift_wrap_status').hasClass('cart-page')) {
                            location = '/cart';
                        } else {
                            refreshCart(cart);
                        }
                    }
                  });
                },
            });
        } else {
            var postData = {
                "line": line_id,
                "quantity": 0
            }

            $.ajax({
                url: '/cart/change.js',
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
                        if ($('.gift_wrap_status').hasClass('cart-page')) {
                            location = '/cart';
                        } else {
                            refreshCart(cart);
                        }
                    }
                  });
                },
            });
        }
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
    }
    if ($(window).width() < 749) {/*FS 1025 */
        $("nav.primary").trigger("sticky_kit:detach");
        $("header.main").stick_in_parent({
            offset_top: 0,
            bottoming: false
        });
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
    
    // $(".cart_count").empty();
    // $cartBtn = $(".cart_count");
    $("cart-items").empty();
    $cartBtn = $(".cart-items");
    
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
    var upsell_status = false;
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
      var item_count = 0;
      var gift_line_id = 0;
      var ccccccccc = '';
      var gift_status = true;
      var recomments = [];
      $.each(cart.items, function(index, item) {
        var itemDiscounts = item.discounts;
        
        for (i=0; i < itemDiscounts.length; i++) {
          var amount = Shopify.formatMoney(itemDiscounts[i].amount, $('body').data('money-format'));
          var title = itemDiscounts[i].title;
          discountMessage = '<p class="notification-discount meta">' + title + '</p>';
        }
        var line_id = index + 1;
        var discountMessage = "";
        if (item.handle == 'gift-wrap') {
            gift_line_id = line_id;
        }
        cart_items_html += '<li class="mini-cart__item clearfix" data-cart-item data-line-id="' + line_id + '" data-variant-id="' + item.id + '">' +
          '<a class="image_link" href="' + item.url +'">';
        if (item.image) {
          cart_items_html += '<div class="cart_image mini-cart__item-image">' +
              '<img src="' + item.image.replace(/(\.[^.]*)$/, "_compact$1").replace('http:', '') + '" alt="' + item.title + '" />' +
            '</div></a>';
        }

        cart_items_html += '<div class="mini-cart__item--content"><div class="mini-cart__item__title"><div class="item_title"><a href="' + item.url + '">' + item.product_title + '</a></div>';

        if (item.properties) {
            var keys = Object.keys(item.properties);
            if (item.properties["upsell-porduct"] == 'true') {
                upsell_status = true;
            }
            if(item.properties != null && item.properties["upsell-porduct"] != 'true') {

                if (keys[0] != undefined) {
                    cart_items_html += `<p class="personalization">${keys[0]} : </span></span> ${item.properties[keys[0]]}<br>`;
                }
                if (keys[1] != undefined) {
                    cart_items_html += `<span>Preview: </span><a target="_blank" href="${item.properties[keys[1]]}" src="${item.properties[keys[1]]}" class="jslghtbx-thmb" data-jslghtbx="" download=""> Click To View Image</a><br>`;
                }
                if (keys[2] != undefined) {
                    cart_items_html += `<span style="display:none;" class="product-personalizer-line-item-prop" data-prop-name="_design_Preview">_design_Preview: ${item.properties[keys[2]]}</span>`;
                }
                if (keys[3] != undefined) {
                    cart_items_html += `<span style="display:none;" class="product-personalizer-line-item-prop" data-prop-name="_pplr_preview">_pplr_preview: ${item.properties[keys[3]]}</span></p>`;
                }
            }
        }
        cart_items_html += '</div><strong class="left price">'+item.quantity+' X ';

        if(productHasSale == true) {
          //puts the slash through the old item price
          var itemPrice = Shopify.formatMoney(productFinalPrice, $('body').data('money-format')) + ' </span>';
          cart_items_html += '<span class="money sale">' + itemPrice + '</strong><a href="/cart/change?line=' + line_id + '&amp;quantity=0" class="js-cart-remove-btn cart__remove-btn" data-line-id="' + line_id + '" data-remove-item="mini-cart">Remove</a>';

          // Total savings
          saving = (productCompareAtPrice - productFinalPrice) * item.quantity;
          total_saving = saving + total_saving;
        } else {
          if (item.price > item.final_price) {
            //puts the slash through the old item price
            var itemPrice = Shopify.formatMoney(item.final_price, $('body').data('money-format')) + ' </span>';
            cart_items_html += '<span class="money sale">' + itemPrice + '</strong><a href="/cart/change?line=' + line_id + '&amp;quantity=0" class="js-cart-remove-btn cart__remove-btn" data-line-id="' + line_id + '" data-remove-item="mini-cart">Remove</a>';
          } else {
            var itemPrice = Shopify.formatMoney(item.price, $('body').data('money-format'));
            if (item.original_price != item.price) {
                var itemOriginalPrice = Shopify.formatMoney(item.original_price, $('body').data('money-format'));
                cart_items_html += '<div class="money-details">'+itemOriginalPrice+'</div><span class="money pre-money">' + itemPrice + '</span></strong><a href="/cart/change?line=' + line_id + '&amp;quantity=0" class="js-cart-remove-btn cart__remove-btn" data-line-id="' + line_id + '" data-remove-item="mini-cart">Remove</a>';
            } else {
                cart_items_html += '<span class="money">' + itemPrice + '</span></strong><a href="/cart/change?line=' + line_id + '&amp;quantity=0" class="js-cart-remove-btn cart__remove-btn" data-line-id="' + line_id + '" data-remove-item="mini-cart">Remove</a>';
            }
          }
        }
        cart_items_html += '</strong></div></li>';
        
        gift_sku_status = true
        $.ajax({
            url: '/products/'+item.handle+'.js',
            dataType: 'json',
            cache: false,
            type: 'get',
            success(data) {
            recommend_products_str = "";
             if (gift_status) {
                $('.gift_wrap_status').data('product-id', 0);
                for (let i = 0; i < data.tags.length; i++) {
                    const tag = data.tags[i];
                    if (tag.indexOf('gift:') > -1) {
                       var gift_sku = tag.replace('gift:', '');
                       var variant_id = $(`.g_variant_${gift_sku}`).val();
                       $('.gift_wrap_status').data('product-id', variant_id);
                       gift_status = false;
                       $('.gift_wrap_status').show();
                    }
                }
             }
             item_count ++;
             for (let i = 0; i < data.tags.length; i++) {
                 const tag = data.tags[i];
                 if (tag.indexOf('upsell:') > -1) {
                    var recommended_str = tag.replace("upsell:", "");
                    if (recommend_products_str.length == 0) {
                        recommend_products_str = recommended_str;
                    }else if (recommended_str.length > 0) {
                        recommend_products_str = recommend_products_str + ',' + recommended_str;
                    } 
                 }
             }
             recomments[line_id-1] = recommend_products_str;
             
            }
        });
        
      });
    }
    var refreshIntervalId = setInterval(() => {
        if (item_count == cart.items.length) {
            var names = [];
            recomments.reverse();
            var recommend_products_str = '';
            for (let index = 0; index < recomments.length; index++) {
                const recommend_str = recomments[index];
                recommend_products_str += recommend_str + ",";
            }
            for (let i = 0; i < cart.items.length; i++) {
                const line_item = cart.items[i];
                var indicator = line_item.handle;
                recommend_products_str =  recommend_products_str.replaceAll(indicator, "");
            }

            recommend_products_str = recommend_products_str.trim();
            names = recommend_products_str.split(",");
            
            var recommend_products = [];
            $.each(names, function(i, el){
                if($.inArray(el, recommend_products) === -1 && el !== "") recommend_products.push(el);
            });
            AppendRecommend(0, recommend_products, upsell_status);
            clearInterval(refreshIntervalId)
        }
        
    }, 100);
    
    
    cart_action_html += '<span>SUBTOTAL</span>'+'<span><span class="money">' + Shopify.formatMoney(cart.total_price, $('body').data('money-format')) + '</span></span>';
    $('.js-cart_items').html(cart_items_html);
    $('.js-cart_subtotal').html(cart_action_html);

    

    if (gift_line_id != 0) {
        $('.gift_wrap_status').data('line-id', gift_line_id);
        $('.gift_wrap_status').addClass('active');
    } else {
        $('.gift_wrap_status').removeClass('active');
        $('.gift_wrap_status').data('line-id', 0);
    }
    
    $('#mini-cart').addClass('active');
}

function AppendRecommend(index, recommend_products, status) {
    if (!status) {
        var recommend_status = true;
        const pro_handle = recommend_products[index];
        var i = index;
        if (pro_handle != undefined) {
            $.ajax({
                url: '/products/'+pro_handle+'.js',
                dataType: 'json',
                cache: false,
                type: 'get',
                success(product) {
                    if (recommend_status) {
                        if (product.available) {
                            relateProductHtml = `<li class="mini-cart__item relate_product">
                                                <script type="application/json" class="bold-product-json">${ JSON.stringify(product) }</script>
                                                    <a class="image_link" href="${product.url}">
                                                        <div class="cart_image mini-cart__item-image">
                                                            <img src="${product.featured_image}" alt="${product.title}" class="lazyload">
                                                        </div>
                                                    </a>
                                    
                                                    <div class="mini-cart__item--content">
                                                        <span>You may like this too</span>
                                                        <div class="mini-cart__item__title">
                                                            <div class="item_title">
                                                                <a href="${product.url}">${product.title}</a>
                                                            </div>
                                                        </div>
        
                                                        <div class="control-pannel">
                                                            <strong class="left price"> 1 X <span class="money price" data-product-id="${product.id}" itemprop="price">${Shopify.formatMoney(product.price, $('body').data('money-format'))}</span></strong> 
                                                            <a class="btn btn-small ajax_add_cart_button" data-id="${product.variants[0].id}" data-quantity="1">ADD</a>
                                                        </div>
                                                    </div>
                                                </li>`;
                            $('#mini-cart .js-cart_items').append(relateProductHtml);  
                            recommend_status = false;
                        } else {
                            i++;
                            AppendRecommend(i, recommend_products)
                        }   
                    }         
                },
                error: function (error) {
                    i++;
                    AppendRecommend(i, recommend_products)
                }
            });
        }
    }
    
    
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
