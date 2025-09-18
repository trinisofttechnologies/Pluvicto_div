var tarEndEvent = detectEndEventType();
var tarMoveEvent = detectMoveEventType();
var tarEvent = detectEventType();
var slideName;
var slidingpopupopened;
var popup_name, pageRef, pageFootnotes, pageEmailDetails, selected_flow;
var prev_km, isAnimationEnabled;
var active_flow = sessionStorage.getItem("selected_flow");
var popup_scroll, page_isi_scroll, isiScrollTo = 0;;
var clickstream_obj = {};
var scroll_properties = {
    scrollbars: true,
    mouseWheel: true,
    interactiveScrollbars: true,
    shrinkScrollbars: "scale",
    fadeScrollbars: false,
    bounce: false,
};
var svg_icon_size = 24;
var open_arrow = '<use href="#svg_icons_expand_more"/>';
var close_arrow = '<use href="#svg_icons_expand_less"/>';

// START of responsive code
var scale, scale_element, window_height, window_width;
var content_height = 768,
    content_width = 1024,
    scaled_content_width,
    scaled_content_height;
function scale_content() {
    window_height = window.innerHeight;
    window_width = window.innerWidth;
    // scale_element = document.getElementsByTagName("body")[0];
    scale_element = document.getElementsByClassName("container")[0];
    var scale_menu = document.getElementById("ipad_div_menu");
    //landscape
    if (window_width > window_height) {

        prev_km = sessionStorage.getItem("prev_km");
        if (prev_km != null) {
            console.log(prev_km)
            sessionStorage.removeItem("prev_km");
            nav.navSlide(prev_km);
        }
        if (slideName == "Summary_FA-11383644") {
            //alert("landscape new");
            content_height = 768;
            content_width = 1024;
            $(".container").css({ "width": content_width, "height": content_height });
        }

        scale = window_height / content_height;
        scaled_content_width = content_width * scale;
        margin_val = (window_width - scaled_content_width) / 2;
        scale_element.style.left = margin_val + "px";
        // console.log(margin_val, window_width, scaled_content_width, window_height, content_height);
        if (margin_val < 0.70) {
            var menu_scale = scale * scale;
            var menu_left = (19 * menu_scale);
            var menu_top = (9 * scale);
            // console.log(menu_left, scaled_content_width, scale, margin_val);
            if (scale_menu) {
                scale_menu.style.left = menu_left + "px";
                scale_menu.style.top = menu_top + "px";
            }
        } else {
            if (scale_menu) {
                scale_menu.style.left = 51 * scale + "px";
            }
        }
        scale_element.style.top = "0";
    }
    //portrait
    else if (window_height > window_width) {


        if (slideName != "Summary_FA-11383644") {
            sessionStorage.setItem("prev_km", slideName);
            nav.navSlide("Summary_FA-11383644");

            //alert("portraite nav new");
        }
        if (slideName == "Summary_FA-11383644") {

            //alert("portraite new");
            content_height = 1024;
            content_width = 768;
            $(".container").css({ "width": content_width, "height": content_height });
        }

        scale = window_width / content_width;
        scaled_content_height = content_height * scale;
        margin_val = (window_height - scaled_content_height) / 2;
        scale_element.style.top = margin_val + "px";
        scale_element.style.left = "0";
        if (scale_menu) {
            scale_menu.style.left = "114px";
        }

    }

    setTimeout(function () {
        ipad_image_menu = $(".ipad_image_menu").css("height");
        var ipad_image_menu = parseInt(ipad_image_menu);
        var div_scale = ipad_image_menu / 5;
        var div_scale_top = ipad_image_menu / 12;
        console.log("div_scale : " + ipad_image_menu + ", " + div_scale)
        $(".ipad_native_button").css({ "height": div_scale, "width": div_scale });
        // $("#ipad_button_menu").css({ "top": div_scale_top * 0.8 });
        $("#ipad_button_marker").css({ "left": div_scale_top * 2 });
        $("#ipad_button_back").css({ "left": div_scale_top * 5 });
        $("#ipad_button_blue").css({ "top": div_scale_top * 4 });
        $("#ipad_button_white").css({ "top": div_scale_top * 7 });
        $("#ipad_button_red").css({ "top": div_scale_top * 10 });
    }, 1000);

    // scale_menu.style.height = ipad_image_menu;
    // console.log()
    scale_element.style.transform = "scale(" + scale + ")";
    scale_element.style.transformOrigin = "0% 0%";
    scale_element.style.position = "absolute";
    // $("body").css({ overflow: "hidden", position: "absolute" });
    $(".container").css({ overflow: "hidden", position: "absolute" });
    if (scale_menu) {
        scale_menu.style.transform = "scale(" + scale + ")";
    }
}
// END of responsive code

function getSlideName() {
    slideName = document.title;
    currentSlide = slideName;
    return slideName;
}

$(function () {
    document.addEventListener("touchmove", function (e) {
        e.preventDefault();
    });
    getSlideName();
    console.log("scale_content")
    //   createglobal();
    // For responsive HTML
    scale_content();
    $(window).resize(function () {
        scale_content();
        // if(local){
        //   scale_content();
        // }
    });
    /* The below code for image load problem */
    var hiddenDiv = $("div:hidden, span:hidden, img:hidden");
    hiddenDiv.each(function (index) {
        if ($(this).css("display") == "none") {
            var left = $(this).css("left");
            var opacity = $(this).css("opacity");
            $(this).css("left", "-5000px");
            $(this).css("opacity", 0);
            $(this).show();
            $(this).hide();
            $(this).css("opacity", 1);
            $(this).css("left", left);
            if (opacity != 1) {
                $(this).css("opacity", opacity);
            }
        }
    });
    
    //To disable swipe in page level
    /* $('.container').bind("swipeleft swiperight", function(){
          return false;
    }); */

    //   var portrait = window.matchMedia("(orientation: portrait)");
    //   portrait.addEventListener("change", function (e) {
    //     if (e.matches) {
    //       //alert("Portrait condition");
    //       sessionStorage.setItem("prev_km", slideName);
    //       nav.navSlide("Summary_FA-11383644");
    //     } else {
    //       //alert("Landscape condition");
    //       prev_km = sessionStorage.getItem("prev_km");
    //       sessionStorage.removeItem("prev_km");
    //       nav.navSlide(prev_km);
    //     }
    //   });
    //   setTimeout(function () {
    //     $(".page_isi_content").show();
    //   }, 100);

});

/**************************** DETECT EVENT TYPE *********************************/
function detectEventType() {
    var ua = navigator.userAgent,
        event = ua.match(/iPhone/i) || ua.match(/iPad/i) || (ua.match(/Macintosh/i) && navigator.maxTouchPoints > 1) ? "touchstart" : "click"; // mousedown
    return event;
}

function detectEndEventType() {
    var ua = navigator.userAgent,
        event = ua.match(/iPhone/i) || ua.match(/iPad/i) || (ua.match(/Macintosh/i) && navigator.maxTouchPoints > 1) ? "touchend" : "click"; //mouseup
    return event;
}

function detectMoveEventType() {
    var ua = navigator.userAgent,
        event = ua.match(/iPhone/i) || ua.match(/iPad/i) || (ua.match(/Macintosh/i) && navigator.maxTouchPoints > 1) ? "touchmove" : "click"; //mousemove
    return event;
}

function appendScript(pathToScript, tarid) {
    var head = document.getElementsByTagName("head")[0];
    var js = document.createElement("script");
    js.id = tarid;
    js.type = "text/javascript";
    js.src = pathToScript;
    head.appendChild(js);
}

/**************************** DETECT EVENT TYPE *********************************/