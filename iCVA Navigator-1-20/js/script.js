var app = {};
$(document).ready(function () {
    var ipad_route = ["iCVA Navigator-1-20", "iCVA Navigator-21-32","iCVA Navigator-33-53"];
    var presentationID = "FA-11383644_content";

    app.debug = false;
    try {
        com.veeva.clm.getDataForCurrentObject("User", "ID", getUserID);
    }
    catch (err) {
        app.debug = true;
    }

    function getUserID(result) {
        app.debug = !result.success;
    }

    function routing_to(index) {
        if (app.debug) {
            fileName = "../" + ipad_route[index] + "/index.html";
            document.location = fileName;
        } else {
            com.veeva.clm.gotoSlide(ipad_route[index] + ".zip", presentationID);
        }
    }

    // if (com.veeva.clm.getAppVersion().success) {
    //     app.debug = false;
    // } else {
    //     app.debug = true;
    // }
    // alert("com.veeva.clm.getAppVersion().success " + com.veeva.clm.getAppVersion().success)
    // alert("not ipad " + app.debug)
    var mousemoveFlag = 'OFF';
    const laserBtn = document.getElementById('ipad_button_marker');
    const page_contents1 = document.getElementById('page_content_20');
    const page_contents2 = document.getElementById('page_content_52');
    const touchCursor = document.getElementById('touchCursor');

    var skipslide = [43, 44, 49]
    function loadPageDynamic(slide, swipe) {
        // console.log(slide, swipe);
        if ((slide == 52 && mousemoveFlag == "ON") || (slide == 20 && mousemoveFlag == "ON")) {

        } else if (swipe == "swipeleft") {
            var nextSlide = slide + 1;
            if (slide == 99) {

            } else if (skipslide.indexOf(nextSlide) == -1) {
                loadPage(nextSlide, swipe)
            } else {
                loadPageDynamic(nextSlide, swipe)
            }
        } else if (swipe == "swiperight") {
            var prevSlide = slide - 1;
            if (skipslide.indexOf(prevSlide) == -1) {
                loadPage(prevSlide, swipe)
            } else {
                loadPageDynamic(prevSlide, swipe)
            }
        }
    }


    var touch_pointer = false;
    var $body = $('body');
    var detectMouse = function (e) {
        if (e.type === 'mousedown') {
            touch_pointer = false;
        }
        else if (e.type === 'touchstart') {
            touch_pointer = true;
        }
        // remove event bindings, so it only runs once
        $body.off('mousedown touchstart', detectMouse);
    }
    // attach both events to body
    $body.on('mousedown touchstart', detectMouse);

    $('.container').bind("swipeleft swiperight", function (event) {
        var currentSelectedSlide = $('.page_content[style*="display: block"]')[0];
        if (currentSelectedSlide) {
            var currentSelectedSlide = parseInt($(currentSelectedSlide).attr("slideid")); //43, 44, 49, 71, 72, 73, 75, 80, 81, 82,
            loadPageDynamic(currentSelectedSlide, event.type);
        }

    });

    $(".btn").bind(tarEvent, function () {
        var pageNo = $(this).attr("data-trng");
        if (pageNo == 23) {
            $(".sonar-wrappernative").css({ "display": "none" });
        }
        loadPage(pageNo);
    });

    $("#ipad_button_back").bind(tarEvent, function () {
        history.back();
    });

    function enable_disable_Laser(flag, div) {
        // if (touch_pointer) {
        if (flag == true && div) {
            mousemoveFlag = 'ON';
            touchCursor.style.display = 'none';
            // page_contents.style.cursor = 'none';
            $(".ipad_image_menu").attr("src", "./media/images/VeevaMenuLaser.png")
        } else if (flag == false && div) {
            mousemoveFlag = 'OFF';
            touchCursor.style.display = 'none';
            // page_contents.style.cursor = 'none';
            $(".ipad_image_menu").attr("src", "./media/images/VeevaMenu.png");
        } else {
            mousemoveFlag = 'OFF';
            $("#page_content_20").removeClass('red_cursor');
            $("#page_content_52").removeClass('red_cursor');
            $(".ipad_image_menu").attr("src", "./media/images/VeevaMenu.png");
        }
        // } else {
        //     if (flag == true && div) {
        //         mousemoveFlag = 'ON';
        //         // $("#" + div + "").css({ "cursor": "url(./media/images/myBall.cur), auto" });
        //         $(".ipad_image_menu").attr("src", "./media/images/VeevaMenuLaser.png")
        //         $("#" + div + "").addClass('red_cursor');
        //     } else if (flag == false && div) {
        //         mousemoveFlag = 'OFF';
        //         $("#" + div + "").removeClass('red_cursor');
        //         $("#" + div + "").css({ "cursor": "default" });
        //         $(".ipad_image_menu").attr("src", "./media/images/VeevaMenu.png");
        //     } else {
        //         $("#page_content_20").css({ "cursor": "default" });
        //         $("#page_content_52").css({ "cursor": "default" });
        //         $(".ipad_image_menu").attr("src", "./media/images/VeevaMenu.png");
        //     }
        // }
    }

    document.addEventListener('mousedown', function (event) {
        // Show the laser dot when the mouse button is pressed
        event.preventDefault();
        if (mousemoveFlag == 'ON') {
            $("#page_content_20").addClass('red_cursor');
            $("#page_content_52").addClass('red_cursor');
        } else {
            return;
        }
    });

    document.addEventListener('mouseup', function (event) {
        // Hide the laser dot when the mouse button is released
        if (mousemoveFlag == 'ON') {
            touchCursor.style.display = 'none';
            $("#page_content_20").removeClass('red_cursor');
            $("#page_content_52").removeClass('red_cursor');
        } else {
            return;
        }
    });

    document.addEventListener('touchmove', function (event) {
        // Update the position of the laser dot to follow the mouse cursor
        event.preventDefault();
        if (mousemoveFlag == 'ON') {
            updateCursorPosition(event.touches[0].clientX, event.touches[0].clientY);
        } else {
            return;
        }
    });

    document.addEventListener('touchstart', function (event) {
        // Show the laser dot when the mouse button is pressed
        event.preventDefault();
        if (mousemoveFlag == 'ON') {
            updateCursorPosition(event.touches[0].clientX, event.touches[0].clientY);
            touchCursor.style.display = 'block';
        } else {
            return;
        }
    });

    document.addEventListener('touchend', function (event) {
        // Hide the laser dot when the mouse button is released
        if (mousemoveFlag == 'ON') {
            touchCursor.style.display = 'none';
        } else {
            return;
        }
    });

    function updateCursorPosition(x, y) {
        touchCursor.style.left = `${x}px`;
        touchCursor.style.top = `${y}px`;
    }

    // setTimeout(function(){

    // },20000)

    laserBtn.addEventListener('click', trackingLaser);
    function trackingLaser() {
        console.log("ipad_button_marker activate");
        if ($($(".page_content[slideId='19']")[0]).css("display") == "block") {
            enable_disable_Laser(true, "page_content_20");
            loadPage(20);
        } else if ((($($(".page_content[slideId='20']")[0]).css("display") == "block")) && (mousemoveFlag == 'ON')) {
            enable_disable_Laser(false, "page_content_20");
        } else if ((($($(".page_content[slideId='20']")[0]).css("display") == "block")) && (mousemoveFlag == 'OFF')) {
            enable_disable_Laser(true, "page_content_20");
        } else if ((($($(".page_content[slideId='52']")[0]).css("display") == "block")) && (mousemoveFlag == 'ON')) {
            enable_disable_Laser(false, "page_content_52");
        } else if (($($(".page_content[slideId='52']")[0]).css("display") == "block") && (mousemoveFlag == 'OFF')) {
            enable_disable_Laser(true, "page_content_52");
        }

    }

    $("#ipad_button_menu").click(function () {
        if ($($(".page_content[slideId='35']")[0]).css("display") == "block") {
            if ($(".ThreeDotsMenu_img_s35").css("opacity") == 1) {
                setTimeout(function () {
                    loadPage(36);
                }, 500);
            }
            $(".note2_img_s35").animate({ opacity: "0" }, 100);
            $(".note1_img_s35").animate({ opacity: "1", left: "250px" }, 1500);
            $(".sonar-wrappernative").css({ "display": "none" });
            $(".ThreeDotsMenu_img_s35").css({ "opacity": "1" });
            flag_1 = true;
            setTimeout(function () {
                $(".note1_img_s35").animate({ opacity: "0", left: "0px" }, 500);
            }, 5000);
            // checkFlag();
        } else if ($($(".page_content[slideId='18']")[0]).css("display") == "block") {
            var ThreeDots = localStorage.getItem("ThreeDotsMenu");
            if (ThreeDots == "true") {
                localStorage.setItem("ThreeDotsMenu", "false");
                $(".ThreeDotsMenu_img_s18").css({ "opacity": "0" });
            } else {
                localStorage.setItem("ThreeDotsMenu", "true");
                $(".ThreeDotsMenu_img_s18").css({ "opacity": "1" });
            }
        }
    });

    var routing_flag = true;

    $("#ipad_button_blue").bind(tarEvent, function () {
        if ($($(".page_content[slideId='22']")[0]).css("display") == "block") {
            $(".btn_positive_s22").animate({ opacity: "1", left: "40px" }, 1000);
            if (routing_flag) {
                routing_flag = false;
                setTimeout(function () {
                    routing_flag = true;
                }, 2000);
            }
        } else if ($($(".page_content[slideId='53']")[0]).css("display") == "block") {
            $(".btn_positive_s53").animate({ opacity: "1", left: "40px" }, 1000);
            if (routing_flag) {
                routing_flag = false;
                setTimeout(function () {
                    routing_flag = true;
                }, 3000);
            }
        }
    });

    $("#ipad_button_white").bind(tarEvent, function () {
        if ($($(".page_content[slideId='22']")[0]).css("display") == "block") {
            $(".btn_netural_s22").animate({ opacity: "1", left: "40px" }, 1000);
            if (routing_flag) {
                routing_flag = false;
                setTimeout(function () {
                    routing_flag = true;
                }, 3000);
            }
        } else if ($($(".page_content[slideId='53']")[0]).css("display") == "block") {
            $(".btn_netural_s53").animate({ opacity: "1", left: "40px" }, 1000);
            if (routing_flag) {
                routing_flag = false;
                setTimeout(function () {
                    routing_flag = true;
                }, 3000);
            }
        }
    });

    $("#ipad_button_red").bind(tarEvent, function () {
        if ($($(".page_content[slideId='22']")[0]).css("display") == "block") {
            $(".btn_negative_s22").animate({ opacity: "1", left: "40px" }, 1000);
            if (routing_flag) {
                routing_flag = false;
                setTimeout(function () {
                    routing_flag = true;
                }, 3000);
            }
        } else if ($($(".page_content[slideId='53']")[0]).css("display") == "block") {
            $(".btn_negative_s53").animate({ opacity: "1", left: "40px" }, 1000);
            if (routing_flag) {
                routing_flag = false;
                setTimeout(function () {
                    routing_flag = true;
                }, 3000);
            }
        }
    });

    // preview the resources
    var fileType;
    $(".preview_btn").bind(tarEvent, function () {
        fileType = $(this).attr("data-type");
        if (fileType == "pdf") {
            // document.location.href = "media/docs/" + $(this).attr("data-target");
            locUrl = "./media/pdfs/" + $(this).attr("data-target");
            console.log(locUrl);
            window.open(locUrl, "_blank", "noopener,noreferrer");
        } else if (fileType == "video") {
            video_element.pause()
            video_ele = document.getElementById("resource_video");
            global_swipe = false;
            video_src.src = "shared/media/videos/" + $(this).attr("data-target");
            console.log(video_src);
            popModal = $(this).attr("pop-modal");
            console.log(popModal);
            if (popModal == "pop29") {
                $("#video_popup").css("display", "flex");
                $("#resource_video").show();
                video_ele.play();
            } else if (popModal == "pop51") {
                $("#video_popup_51").css("display", "flex");
                $("#resource_video").show();
                video_ele.play();
            }
        } else if (fileType == "html") {
            com.veeva.clm.gotoSlide($(this).attr("data-target"), $(this).attr("data-pres"));
        } else {
        }
    });

    $("#video_close_29").bind(tarEvent, function () {
        $("#video_popup").hide();
        $("#resource_video").hide();
        video_ele.pause();
        global_swipe = true;
        loadPage(30);
    });

    $("#video_close_51").bind(tarEvent, function () {
        $("#video_popup_51").hide();
        $("#resource_video").hide();
        video_ele.pause();
        global_swipe = true;
    });

    if (app.debug) {
        $("#ipad_div_menu").css({ "opacity": "1" })
    } else {
        $("#ipad_div_menu").css({ "opacity": "0" })
    }

    var flag_1 = false;
    var flag_2 = false;
    function checkFlag() {
        if (flag_1 == true && flag_2 == true) {
            setTimeout(function () {
                loadPage(36);
            }, 6000);
        }
    }

    var video_element, video_ele;
    function loadPage(pageNo) {
        $(".page_content").css({ "display": "none" });
        if (!pageNo)
            pageNo = 1;

        if (video_element)
            video_element.pause();
        if (video_ele)
            video_ele.pause();

        if (pageNo < 12) {
            $("#ipad_div_menu").css({ "opacity": "0" });
        } else {
            if (app.debug) {
                $("#ipad_div_menu").css({ "opacity": "1" });
            }
        }
        if (pageNo == 39) {
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/Slide-39.png) no-repeat", "background-size": "100%", "display": "block" });
        } else if (pageNo > 32 && pageNo < 55) {
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/FrontSlide.png) no-repeat", "background-size": "100%", "display": "block" });
        } else if (pageNo > 54 && pageNo < 57) {
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/Slide-55-56.png) no-repeat", "background-size": "100%", "display": "block" });
        } else if (pageNo > 56 && pageNo < 59) {
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/Slide-57-58.png) no-repeat", "background-size": "100%", "display": "block" });
        } else if (pageNo > 61 && pageNo < 64) {
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/Slide-62-63.png) no-repeat", "background-size": "100%", "display": "block" });
        } else if (pageNo > 63 && pageNo < 66) {
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/Slide-64-65.png) no-repeat", "background-size": "100%", "display": "block" });
        } else if (pageNo == 66 || pageNo == 68) {
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/Slide-66_68.png) no-repeat", "background-size": "100%", "display": "block" });
        } else if (pageNo > 76 && pageNo < 78) {
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/Slide-77_79.png) no-repeat", "background-size": "100%", "display": "block" });
        } else if (pageNo > 78 && pageNo < 80) {
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/Slide-77_79.png) no-repeat", "background-size": "100%", "display": "block" });
        } else if (pageNo > 84 && pageNo < 87) {
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/Slide-85-86.png) no-repeat", "background-size": "100%", "display": "block" });
        } else if (pageNo > 95 && pageNo < 98) {
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/FrontSlide.png) no-repeat", "background-size": "100%", "display": "block" });
        } else {
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/Slide-" + pageNo + ".png) no-repeat", "background-size": "100%", "display": "block" });
        }
        if (pageNo == 1) {
            // video_element = document.getElementsByClassName('speaker_img_s1')[0];
            // video_element.play();
            $(".speaker_img_s1").animate({ opacity: "1" }, 1500);
            setTimeout(function () {
                $(".message_img_s1").animate({ opacity: "1", left: "200px" }, 1500);
            }, 1000);

            setTimeout(function () {
                $(".audiobtn_img_s1").animate({ opacity: "1" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".button_img_s1").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);

            var timer = true;
            $(".audiobtn_img_s1").bind('click', function () {
                // document.getElementById("my_audio_s1").play();
                video_element = document.getElementsByClassName('speaker_img_s1')[0];
                video_element.play();
                // if (timer) {
                //     timer = false;
                // }
            });
        } else if (pageNo == 2) {
            video_element = document.getElementsByClassName('speaker_img_s2')[0];
            video_element.play();
            $(".speaker_img_s2").animate({ opacity: "1" }, 1500);
            setTimeout(function () {
                $(".message_img_s2").animate({ opacity: "1", left: "440px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);

            setTimeout(function () {
                $(".button_img_s2").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 3) {
            video_element = document.getElementsByClassName('speaker_img_s3')[0];
            video_element.play();
            $(".speaker_img_s3").animate({ opacity: "1" }, 1500);
            setTimeout(function () {
                $(".message_img_s3").animate({ opacity: "1", left: "240px" }, 1500);
            }, 1000);

            setTimeout(function () {
                $(".button_img_s3").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);

            // var timer = true;
            // if (timer) {
            //     document.getElementById("my_audio_s3").play();
            //     timer = false;
            // }
        } else if (pageNo == 4) {
            $(".speaker_img_s4").animate({ opacity: "1" }, 1500);
            video_element = document.getElementsByClassName('speaker_img_s4')[0];
            video_element.play();
            setTimeout(function () {
                $(".message_img_s4").animate({ opacity: "1", left: "240px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
            setTimeout(function () {
                $(".button_img_s4").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 5) {
            $(".speaker_img_s5").animate({ opacity: "1" }, 1500);
            video_element = document.getElementsByClassName('speaker_img_s5')[0];
            video_element.play();
            setTimeout(function () {
                $(".message_img_s5").animate({ opacity: "1", right: "100px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
            setTimeout(function () {
                $(".button_img_s5").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 6) {
            video_element = document.getElementsByClassName('speaker_round_img_s6')[0];
            video_element.play();
            $(".speaker_round_img_s6").animate({ opacity: "1", left: "167px" }, 1500);
            setTimeout(function () {
                $(".message_img_s6").animate({ opacity: "1", left: "30px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
            setTimeout(function () {
                $(".button_img_s6").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 7) {
            video_element = document.getElementsByClassName('speaker_img_s7')[0];
            video_element.play();
            $(".speaker_img_s7").animate({ opacity: "1" }, 1500);
            setTimeout(function () {
                $(".message_img_s7").animate({ opacity: "1", right: "150px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
            setTimeout(function () {
                $(".button_img_s7").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 8) {
            video_element = document.getElementsByClassName('speaker_round_img_s8')[0];
            video_element.play();
            $(".speaker_round_img_s8").animate({ opacity: "1", left: "167px" }, 1500);
            setTimeout(function () {
                $(".message_img_s8").animate({ opacity: "1", left: "40px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);

            setTimeout(function () {
                $(".button_img_s8").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 9) {
            video_element = document.getElementsByClassName('speaker_img_s9')[0];
            video_element.play();
            $(".speaker_img_s9").animate({ opacity: "1" }, 1500);
            setTimeout(function () {
                $(".message_img_s9").animate({ opacity: "1", left: "300px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);

            setTimeout(function () {
                $(".button_img_s9").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 10) {
            video_element = document.getElementsByClassName('speaker_img_s10')[0];
            video_element.play();
            $(".speaker_img_s10").animate({ opacity: "1" }, 1500);
            setTimeout(function () {
                $(".message_img_s10").animate({ opacity: "1", left: "580px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
            setTimeout(function () {
                $(".button_img_s10").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 11) {
            video_element = document.getElementsByClassName('speaker_img_s11')[0];
            video_element.play();
            $(".speaker_img_s11").animate({ opacity: "1" }, 1500);
            setTimeout(function () {
                $(".message_img_s11").animate({ opacity: "1", left: "400px" }, 1500);
            }, 1000);
            setTimeout(function () {
                $(".button_img_s11").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 12) {
            video_element = document.getElementsByClassName('speaker_img_s12')[0];
            video_element.play();
            $(".speaker_img_s12").animate({ opacity: "1" }, 1500);
            setTimeout(function () {
                $(".message_img_s12").animate({ opacity: "1", left: "70px" }, 1500);
            }, 1000);

            function swapC() {
                $(".button_img_s12").animate({ "left": '38px', opacity: "1" }, 2000, function () {
                    $(".button_img_s12").animate({ opacity: "0" }, 1000);
                });
                window.setTimeout(function () {
                    $(".button_img_s12").css({ "left": '238px' });
                    swapC()
                }, 3100)
            }
            setTimeout(function () {
                swapC()
            }, 2500);
        } else if (pageNo == 13) {
            video_element = document.getElementsByClassName('speaker_img_s13')[0];
            video_element.play();
            $(".speaker_img_s13").animate({ opacity: "1" }, 1500);
            $(".sonar-wrapper1").css({ "top": "730px", "left": "780px" });
            $(".sonar-wrapper2").css({ "top": "730px", "left": "930px" });
            setTimeout(function () {
                $(".message_img_s13").animate({ opacity: "1", left: "150px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
        } else if (pageNo == 14) {
            video_element = document.getElementsByClassName('speaker_img_s14')[0];
            video_element.play();
            $(".speaker_img_s14").animate({ opacity: "1" }, 1500);
            $(".sonar-wrapper1").css({ "top": "730px", "left": "100px" });
            setTimeout(function () {
                $(".message_img_s14").animate({ opacity: "1", left: "130px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
        } else if (pageNo == 15) {
            video_element = document.getElementsByClassName('speaker_img_s15')[0];
            video_element.play();
            $(".speaker_img_s15").animate({ opacity: "1" }, 1500);
            $(".sonar-wrapper1").css({ "top": "720px", "left": "5px" });
            $(".sonar-wrapper2").css({ "top": "725px", "left": "835px" });
            setTimeout(function () {
                $(".message_img_s15").animate({ opacity: "1", left: "110px" }, 2000);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
        } else if (pageNo == 16) {
            $(".sonar-wrapper16").css({ "display": "none" });
            video_element = document.getElementsByClassName('speaker_img_s16')[0];
            video_element.play();
            $(".speaker_img_s16").animate({ opacity: "1" }, 1500);
            setTimeout(function () {
                $(".message_img_s16").animate({ opacity: "1", left: "150px" }, 2500);
            }, 2000);

            setTimeout(function () {
                $(".sonar-wrapper16").css({ "top": "533px", "left": "23px", "display": "block" });
            }, 3500);

            setTimeout(function () {
                $(".NavigatorImg_img_s16").animate({ opacity: "1", bottom: "-500px" }, 2000);
            }, 1000);

            $(".menu_button_img_s16").bind(tarEvent, function () {
                loadPage(17);
            });
        } else if (pageNo == 17) {
            video_element = document.getElementsByClassName('speaker_img_s17')[0];
            video_element.play();
            $(".speaker_img_s17").animate({ opacity: "1" }, 1500);
            $(".sonar-wrapper2").css({ "top": "721px", "left": "833px" });
            setTimeout(function () {
                $(".message_img_s17").animate({ opacity: "1", left: "150px" }, 1500);
            }, 3000);

            setTimeout(function () {
                $(".button_img").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);

            $(".menu_button_img_s17").bind(tarEvent, function () {
                $(".NavigatorImg_img_s17").animate({ opacity: "1", top: "66%" }, 1500);
            });

            $(".NavigatorImg_img_s17").bind(tarEvent, function () {
                loadPage(18);
            });
            $(".sonar-wrappernative").css({ "display": "none" });
        } else if (pageNo == 18) {
            video_element = document.getElementsByClassName('speaker_img_s18')[0];
            video_element.play();
            $(".speaker_img_s18").animate({ opacity: "1" }, 1500);
            $(".sonar-wrappernative").css({ "top": "0px", "left": "-10px", "display": "block" });
            setTimeout(function () {
                $(".message_img_s18").animate({ opacity: "1", left: "130px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
            setTimeout(function () {
                $(".button_img_s18next").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 8000);
        } else if (pageNo == 19) {
            enable_disable_Laser();
            // $(".sonar-wrappernative").css({ "display": "none" });
            video_element = document.getElementsByClassName('speaker_img_s19')[0];
            video_element.play();
            $(".speaker_img_s19").animate({ opacity: "1" }, 1500);

            setTimeout(function () {
                $(".message_img_s19").animate({ opacity: "1", left: "150px" }, 1500);
                var leftcount = parseInt($("#ipad_button_marker").css("left"));
                console.log(leftcount);
                $(".sonar-wrappernative").css({ "top": "0px", "left": leftcount, "display": "block" });
                $(".button_img_s18next").animate({ opacity: "1", bottom: "80px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
        } else if (pageNo == 20) {
            // video_element = document.getElementsByClassName('speaker_img_s20')[0];
            // video_element.play();
            var leftcount = parseInt($("#ipad_button_marker").css("left"));
            $(".sonar-wrappernative").css({ "top": "0px", "left": leftcount, "display": "block" });
            $(".speaker_img_s20").animate({ opacity: "1" }, 1500);
            // $(".sonar-wrapper1").css({ "top": "15px", "left": "50px" });
            setTimeout(function () {
                $(".button_img_s20").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 21) {
            routing_to(1);
            // enable_disable_Laser(false, "page_content_20");
            // $(".sonar-wrappernative").css({ "display": "none" });
            // video_element = document.getElementsByClassName('speaker_img_s21')[0];
            // video_element.play();
            // $(".speaker_img_s21").animate({ opacity: "1" }, 1500);
            // setTimeout(function () {
            //     var popup_name = "isi_popup";
            //     $("#" + popup_name).fadeIn(150);
            //     // check and add scroll if needed
            //     var wrapper_height = $(`#${popup_name} .popup_content_wrapper`).height();
            //     var content_height = $(`#${popup_name} .popup_scroll_content`).height();
            //     if (content_height > wrapper_height) {
            //         $(`#${popup_name} .popup_content_wrapper`).addClass("popup_scroll_props");
            //         popup_scroll = new IScroll($(`#${popup_name} .popup_content_wrapper`)[0], scroll_properties);
            //     }
            //     $(".message_img_s21").animate({ opacity: "1", right: "122px" }, 2000);
            //     $(".sonar-wrapper21").css({ "top": "82px", "right": "0px" });
            // }, 1000);

            // $("#isi_content_wrapper").bind(tarEvent, function () {
            //     $(".sonar-wrapper21").animate({ opacity: "0" }, 1500);
            // });
        } else if (pageNo == 22) {
            video_element = document.getElementsByClassName('speaker_img_s22')[0];
            video_element.play();
            $(".speaker_img_s22").animate({ opacity: "1" }, 1500);
            $(".sonar-wrappernative").css({ "top": "50px", "left": "-15px", "display": "block" });
            setTimeout(function () {
                $(".message_img_s22").animate({ opacity: "1", left: "140px" }, 1000);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
            if (app.debug == true) {
                setTimeout(function () {
                    $(".button_img_s22").animate({ opacity: "1", bottom: "80px" }, 1500);
                }, 6000);
            } else {
                $(".btn_positive_s22").animate({ opacity: "1", left: "40px" }, 1000);
                $(".btn_netural_s22").animate({ opacity: "1", left: "40px" }, 1500);
                $(".btn_negative_s22").animate({ opacity: "1", left: "40px" }, 2000);
                setTimeout(function () {
                    $(".button_img_s22").animate({ opacity: "1", bottom: "80px" }, 1500);
                }, 2500);
            }


        } else if (pageNo == 23) {
            video_element = document.getElementsByClassName('speaker_img_s23')[0];
            video_element.play();
            $(".speaker_img_s23").animate({ opacity: "1" }, 1500);
            $(".sonar-wrapper1").css({ "top": "730px", "left": "240px" });
            setTimeout(function () {
                $(".message_img_s23").animate({ opacity: "1", left: "140px" }, 1500);
            }, 1000);

            $(".menu_button_img_s23").bind(tarEvent, function () {
                loadPage(24);
            });
        } else if (pageNo == 24) {
            video_element = document.getElementsByClassName('speaker_img_s24')[0];
            video_element.play();
            $(".speaker_img_s24").animate({ opacity: "1" }, 1500);
            $(".sonar-wrapper1").css({ "top": "625px", "left": "90px" });
            setTimeout(function () {
                $(".message_img_s24").animate({ opacity: "1", left: "140px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
        } else if (pageNo == 25) {
            video_element = document.getElementsByClassName('speaker_img_s25')[0];
            video_element.play();
            $(".speaker_img_s25").animate({ opacity: "1" }, 1500);
            $(".sonar-wrapper1").css({ "top": "230px", "left": "430px" });
            setTimeout(function () {
                $(".message_img_s25").animate({ opacity: "1", left: "460px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);

            $(".toggle_button_img_s25").bind(tarEvent, function () {
                loadPage(26);
            });
        } else if (pageNo == 26) {
            video_element = document.getElementsByClassName('speaker_img_s26')[0];
            video_element.play();
            $(".speaker_img_s26").animate({ opacity: "1" }, 1500);
            $(".sonar-wrapper1").css({ "top": "625px", "left": "260px" });
            setTimeout(function () {
                $(".message_img_s26").animate({ opacity: "1", right: "250px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);

            $(".popbutton_button_img_s26").bind(tarEvent, function () {
                loadPage(27);
            });
        } else if (pageNo == 27) {
            video_element = document.getElementsByClassName('speaker_img_s27')[0];
            video_element.play();
            $(".speaker_img_s27").animate({ opacity: "1" }, 1500);
            $(".sonar-wrapper1").css({ "top": "240px", "left": "340px" });
            setTimeout(function () {
                $(".message_img_s27").animate({ opacity: "1", left: "460px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);

            $(".ppJames_button_img_s27").bind(tarEvent, function () {
                loadPage(28);
            });
        } else if (pageNo == 28) {
            video_element = document.getElementsByClassName('speaker_img_s28')[0];
            video_element.play();
            $(".speaker_img_s28").animate({ opacity: "1" }, 1500);
            $(".sonar-wrapper1").css({ "top": "625px", "left": "330px" });
            setTimeout(function () {
                $(".message_img_s28").animate({ opacity: "1", left: "450px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
        } else if (pageNo == 29) {
            video_element = document.getElementsByClassName('speaker_img_s29')[0];
            video_element.play();
            $(".speaker_img_s29").animate({ opacity: "1" }, 1500);
            setTimeout(function () {
                $(".message_img_s29").animate({ opacity: "1", right: "180px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
        } else if (pageNo == 30) {
            video_element = document.getElementsByClassName('speaker_img_s30')[0];
            video_element.play();
            $(".speaker_img_s30").animate({ opacity: "1" }, 1500);
            $(".sonar-wrapper1").css({ "top": "247px", "left": "405px" });
            setTimeout(function () {
                $(".message_img_s30").animate({ opacity: "1", right: "180px" }, 1500);
            }, 1000);
        } else if (pageNo == 31) {
            video_element = document.getElementsByClassName('speaker_img_s31')[0];
            video_element.play();
            $(".container").css({ "background-color": "rgb(0 0 0 / 85%)", "z-index": "0" });
            $(".speaker_img_s31").animate({ opacity: "1" }, 1500);
            $(".sonar-wrapper1").css({ "top": "140px", "left": "827px" });
            setTimeout(function () {
                $(".message_img_s31").animate({ opacity: "1", right: "265px" }, 1500);
            }, 1000);
        } else if (pageNo == 32) {
            video_element = document.getElementsByClassName('speaker_img_s32')[0];
            video_element.play();
            $(".speaker_img_s32").animate({ opacity: "1" }, 1500);
            setTimeout(function () {
                $(".message_img_s32").animate({ opacity: "1", left: "440px" }, 1500);
            }, 1000);

            setTimeout(function () {
                $(".button_img_s32").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 33) {
            com.veeva.clm.gotoSlide("Paragard-iVis v2.zip", "FA-11383644_content");
            video_element = document.getElementsByClassName('speaker_img_s33')[0];
            video_element.play();
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/FrontSlide.png) no-repeat", "background-size": "100%", "display": "block" });
            $(".speaker_img_s33").animate({ opacity: "1" }, 2500);
            setTimeout(function () {
                $(".message_img_s33").animate({ opacity: "1", left: "20px" }, 1500);
            }, 1000);

            setTimeout(function () {
                $(".button_img_s33").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 34) {
            video_element = document.getElementsByClassName('speaker_img_s34')[0];
            video_element.play();
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/FrontSlide.png) no-repeat", "background-size": "100%", "display": "block" });
            $(".speaker_img_s34").animate({ opacity: "1" }, 2500);
            setTimeout(function () {
                $(".message_img_s34").animate({ opacity: "1", left: "20px" }, 1500);
            }, 1000);
            setTimeout(function () {
                $(".button_img_s34").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
            $(".sonar-wrappernative").css({ "display": "none" });
        } else if (pageNo == 35) {
            video_element = document.getElementsByClassName('speaker_img_s35')[0];
            video_element.play();
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/FrontSlide.png) no-repeat", "background-size": "100%", "display": "block" });
            $(".speaker_img_s35").animate({ opacity: "1" }, 2500);
            flag_1 = false;
            flag_2 = false;

            $(".sonar-wrappernative").css({ "top": "0px", "left": "-10px", "display": "block" });
            $(".sonar-wrapper2").css({ "top": "35px", "left": "137px", "display": "none" });
            setTimeout(function () {
                $(".message_img_s35").animate({ opacity: "1", right: "210px" }, 1500);
                $(".note1_img_s35").animate({ opacity: "1", left: "1px" }, 1500);
                $(".note2_img_s35").animate({ opacity: "1", left: "188px" }, 1500);
            }, 1000);



            $(".sonar-wrapper2").bind(tarEvent, function () {
                $(".note1_img_s35").animate({ opacity: "0" }, 100);
                $(".note2_img_s35").animate({ opacity: "1", left: "100px" }, 1500);
                $(".sonar-wrapper2").animate({ opacity: "0" }, 500);
                flag_2 = true;
                setTimeout(function () {
                    $(".note2_img_s35").animate({ opacity: "0", left: "0px" }, 500);
                }, 5000);
                // checkFlag();
            });

            setTimeout(function () {
                $(".button_img_s35").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 5000);

        } else if (pageNo == 36) {
            video_element = document.getElementsByClassName('speaker_img_s36')[0];
            video_element.play();
            $(".sonar-wrappernative").css({ "display": "none" });
            $(".speaker_img_s36").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "670px", "left": "740px" });
            setTimeout(function () {
                $(".message_img_s36").animate({ opacity: "1", left: "50px" }, 1500);
            }, 1000);

            setTimeout(function () {
                $(".button_img_s36").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 37) {
            video_element = document.getElementsByClassName('speaker_img_s37')[0];
            video_element.play();
            $(".speaker_img_s37").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "730px", "left": "830px" });
            setTimeout(function () {
                $(".message_img_s37").animate({ opacity: "1", right: "250px" }, 1500);
            }, 1000);
        } else if (pageNo == 38) {
            video_element = document.getElementsByClassName('speaker_img_s38')[0];
            video_element.play();
            $(".speaker_img_s38").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "730px", "left": "830px" });
            setTimeout(function () {
                $(".message_img_s38").animate({ opacity: "1", left: "50px" }, 1500);
            }, 1000);

            setTimeout(function () {
                $(".note1_img_s38").animate({ opacity: "1", right: "-10px" }, 1500);
            }, 2000);
        } else if (pageNo == 39) {
            video_element = document.getElementsByClassName('speaker_img_s39')[0];
            video_element.play();
            $(".speaker_img_s39").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "730px", "left": "830px" });
            setTimeout(function () {
                $(".message_img_s39").animate({ opacity: "1", left: "70px" }, 1500);
            }, 1000);
        } else if (pageNo == 40) {
            video_element = document.getElementsByClassName('speaker_img_s40')[0];
            video_element.play();
            $(".speaker_img_s40").animate({ opacity: "1" }, 2500);
            setTimeout(function () {
                $(".message_img_s40").animate({ opacity: "1", left: "20px" }, 1500);
            }, 1000);
        } else if (pageNo == 41) {
            video_element = document.getElementsByClassName('speaker_img_s41')[0];
            video_element.play();
            $(".speaker_img_s41").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "685px", "left": "900px" });
            setTimeout(function () {
                $(".message_img_s41").animate({ opacity: "1", left: "40px" }, 1500);
            }, 1000);
        } else if (pageNo == 42) {
            video_element = document.getElementsByClassName('speaker_img_s42')[0];
            video_element.play();
            $(".speaker_img_s42").animate({ opacity: "1" }, 2500);
            $(".speaker_img_s44").animate({ opacity: "0" }, 1500);
            $(".message_img_1_s42").animate({ opacity: "0", right: "100px" }, 1500);
            $(".sonar-wrapper1").css({ "top": "200px", "left": "885px" });
            $(".sonar-wrapper2").css({ opacity: "0" });
            setTimeout(function () {
                $(".message_img_s42").animate({ opacity: "1", left: "70px" }, 1500);
            }, 1000);

            setTimeout(function () {
                $(".note1_img_s42").animate({ opacity: "1", right: "90px" }, 1500);
            }, 2000);

            var popup_name = "isi_popu_s42";
            $("#" + popup_name).fadeIn(150);
            // check and add scroll if needed
            var wrapper_height = $(`#${popup_name} .popup_content_wrapper`).height();
            var content_height = $(`#${popup_name} .popup_scroll_content`).height();
            if (content_height > wrapper_height) {
                $(`#${popup_name} .popup_content_wrapper`).addClass("popup_scroll_props");
                popup_scroll = new IScroll($(`#${popup_name} .popup_content_wrapper`)[0], scroll_properties);
            }
            if (content_height > wrapper_height) {
                popup_scroll.on('scrollEnd', function () {
                    $(".sonar-wrapper1").css({ opacity: "0" });
                    $(".message_img_s42").animate({ opacity: "0", left: "-50px" }, 1500);
                    $(".note1_img_s42").animate({ opacity: "0", right: "-70px" }, 500);
                    $(".speaker_img_s42").animate({ opacity: "0" }, 1000);
                    video_element.pause();
                    setTimeout(function () {
                        $(".sonar-wrapper2").css({ "top": "10px", "left": "892px", opacity: "1" });
                        $(".message_img_1_s42").animate({ opacity: "1", right: "200px" }, 1500);
                        $(".speaker_img_s44").animate({ opacity: "1" }, 1500);
                        video_element = document.getElementsByClassName('speaker_img_s44')[0];
                        video_element.play();
                    }, 2000);
                });

            }
        } else if (pageNo == 43) {

        } else if (pageNo == 44) {

            $(".sonar-wrapper2").css({ opacity: "0" });
        } else if (pageNo == 45) {
            video_element = document.getElementsByClassName('speaker_img_s45')[0];
            video_element.play();
            $(".speaker_img_s45").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper45").css({ "top": "727px", "left": "744px" });
            $(".ipad_image_menu").css({ "display": "block" });
            $(".ipad_native_button").css({ "display": "block" });
            setTimeout(function () {
                $(".message_img_s45").animate({ opacity: "1", left: "50px" }, 1500);
            }, 1000);

            setTimeout(function () {
                $(".note1_img_s45").animate({ opacity: "1", right: "205px" }, 1500);
            }, 2000);

            $(".button_img_s45").bind(tarEvent, function () {
                loadPage(46);
            });

        } else if (pageNo == 46) {
            $("#ipad_div_menu").css({ "opacity": "0" });
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/PI-Slide-46.png) no-repeat", "background-size": "100%", "display": "block" });
            $(".sonar-wrapper2").css({ "top": "10px", "left": "20px", "opacity": "1" });
            $(".ipad_image_menu").css({ "display": "none" });
            $(".ipad_native_button").css({ "display": "none" });
            $(".button_close_s45").bind(tarEvent, function () {
                $("#ipad_div_menu").css({ "opacity": "1" });
                loadPage(47);
            });
            video_element = document.getElementsByClassName('speaker_img_s46')[0];
            video_element.play();
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/PI-Slide-46.png) no-repeat", "background-size": "100%", "display": "block" }); $(".speaker_img_s46").animate({ opacity: "1" }, 2500);
            setTimeout(function () {
                $(".message_img_s46").animate({ opacity: "1", left: "10px" }, 1500);
            }, 1000);
        } else if (pageNo == 47) {
            $(".ipad_image_menu").css({ "display": "block" });
            $(".ipad_native_button").css({ "display": "block" });
            video_element = document.getElementsByClassName('speaker_img_s47')[0];
            video_element.play();
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/FrontSlide.png) no-repeat", "background-size": "100%", "display": "block" });
            $(".speaker_img_s47").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "725px", "left": "692px", "opacity": "1" });
            setTimeout(function () {
                $(".message_img_s47").animate({ opacity: "1", left: "30px" }, 1500);
            }, 1000);
        } else if (pageNo == 48) {
            video_element = document.getElementsByClassName('speaker_img_s48')[0];
            video_element.play();
            $(".page_content[slideId='" + pageNo + "']").css({ "background": "url(./media/images/FrontSlide.png) no-repeat", "background-size": "100%", "display": "block" });
            $(".speaker_img_s48").animate({ opacity: "1" }, 2500);
            setTimeout(function () {
                $(".message_img_s48").animate({ opacity: "1", right: "180px" }, 1500);
            }, 1000);

            var popup_name = "ref_popup";
            $("#" + popup_name).fadeIn(150);
            // check and add scroll if needed
            var wrapper_height = $(`#${popup_name} .popup_content_wrapper`).height();
            var content_height = $(`#${popup_name} .popup_scroll_content`).height();
            if (content_height > wrapper_height) {
                $(`#${popup_name} .popup_content_wrapper`).addClass("popup_scroll_props");
                popup_scroll = new IScroll($(`#${popup_name} .popup_content_wrapper`)[0], scroll_properties);
                $(".sonar-wrapper1").css({ "top": "210px", "left": "890px", "z-index": "101" });
                popup_scroll.on('scrollEnd', function () {
                });

            }
        } else if (pageNo == 49) {

        } else if (pageNo == 50) {
            $(".sonar-wrapper1").css({ "z-index": "1", opacity: "1" });
            video_element = document.getElementsByClassName('speaker_img_s50')[0];
            video_element.play();
            $(".speaker_img_s50").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "725px", "left": "626px" });
            setTimeout(function () {
                $(".message_img_s50").animate({ opacity: "1", left: "30px" }, 1500);
            }, 1000);
        } else if (pageNo == 51) {
            enable_disable_Laser();
            video_element = document.getElementsByClassName('speaker_img_s51')[0];
            video_element.play();
            $(".speaker_img_s51").animate({ opacity: "1" }, 2500);
            setTimeout(function () {
                $(".message_img_s51").animate({ opacity: "1", right: "230px" }, 1500);
            }, 1000);

            setTimeout(function () {
                $(".note1_img_s51").animate({ opacity: "1", left: "200px" }, 1500);
            }, 2000);
            $(".sonar-wrappernative").css({ "display": "none" });
        } else if (pageNo == 52) {
            video_element = document.getElementsByClassName('speaker_img_s52')[0];
            video_element.play();
            $(".speaker_img_s52").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "0px", "left": "10px" });
            setTimeout(function () {
                $(".message_img_s52").animate({ opacity: "1", right: "50px" }, 1500);
                var leftcount = parseInt($("#ipad_button_marker").css("left"));
                console.log(leftcount);
                $(".sonar-wrappernative").css({ "top": "0px", "left": leftcount, "display": "block" });
            }, 1000);

            setTimeout(function () {
                $(".note1_img_s52").animate({ opacity: "1", left: "11px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".button_img_s52").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 53) {
            enable_disable_Laser();
            video_element = document.getElementsByClassName('speaker_img_s53')[0];
            video_element.play();
            $(".speaker_img_s53").animate({ opacity: "1" }, 2500);
            $(".sonar-wrappernative").css({ "top": "70px", "left": "-15px", "display": "block" });
            setTimeout(function () {
                $(".message_img_s53").animate({ opacity: "1", right: "80px" }, 1500);
            }, 1000);

            setTimeout(function () {
                $(".note1_img_s53").animate({ opacity: "1", left: "186px" }, 1500);
            }, 2000);

            if (app.debug == true) {
                setTimeout(function () {
                    $(".button_img_s53").animate({ opacity: "1", bottom: "80px" }, 1500);
                }, 6000);
            } else {
                setTimeout(function () {
                    $(".button_img_s53").animate({ opacity: "1", bottom: "80px" }, 1500);
                }, 2500);
            }
        } else if (pageNo == 54) {
            video_element = document.getElementsByClassName('speaker_img_s54')[0];
            video_element.play();
            $(".speaker_img_s54").animate({ opacity: "1" }, 2500);
            $(".sonar-wrappernative").css({ "display": "none" });
            $(".sonar-wrapper1").css({ "top": "727px", "left": "80px" });
            setTimeout(function () {
                $(".message_img_s54").animate({ opacity: "1", right: "220px" }, 1500);
            }, 1000);
        } else if (pageNo == 55) {
            video_element = document.getElementsByClassName('speaker_img_s55')[0];
            video_element.play();
            $(".speaker_img_s55").animate({ opacity: "1" }, 2500);

            setTimeout(function () {
                $(".message_img_s55").animate({ opacity: "1", right: "210px" }, 1500);
            }, 1000);

            setTimeout(function () {
                $(".note1_img_s55").animate({ opacity: "1", left: "11px" }, 1500);
            }, 2000);

            $(".sonar-wrapper1").css({ "top": "720px", "left": "5px", "display": "block" });
            $(".sonar-wrapper2").css({ "top": "670px", "left": "440px", "display": "block" });

            $(".button_img_s55").bind(tarEvent, function () {
                $(".sliderViewer_s55").animate({ opacity: "1", bottom: "20px" }, 1500);
            });
            $(".button_img_s55_3").bind(tarEvent, function () {
                $(".sliderViewer_s55").animate({ opacity: "0", bottom: "-100px" }, 1500);
            });
        } else if (pageNo == 56) {
            $(".speaker_img_s56").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "720px", "left": "5px" });
            $(".sonar-wrapper2").css({ "top": "670px", "left": "440px" });
            setTimeout(function () {
                $(".message_img_s56").animate({ opacity: "1", right: "300px" }, 1500);
                $(".sliderViewer_s56").animate({ opacity: "1", bottom: "20px" }, 1500);
            }, 1000);

            setTimeout(function () {
                $(".note1_img_s56").animate({ opacity: "1", left: "11px" }, 1500);
            }, 2000);
        } else if (pageNo == 57) {
            $(".sonar-wrapper1").css({ "top": "750px", "left": "90px" });
            $(".sonar-wrapper2").css({ "top": "670px", "left": "380px" });

            setTimeout(function () {
                $(".note1_img_s57").animate({ opacity: "1", left: "270px" }, 1500);
                $(".note2_img_s57").animate({ opacity: "1", left: "-9px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".button_img_s57_4").animate({ opacity: "1", bottom: "68px" }, 1500);
            }, 3500);
        } else if (pageNo == 58) {
            video_element = document.getElementsByClassName('speaker_img_s58')[0];
            video_element.play();
            $(".speaker_img_s58").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "730px", "left": "165px" });
            setTimeout(function () {
                $(".message_img_s58").animate({ opacity: "1", right: "165px" }, 1500);
                // $(".message_img").animate({ left: "34vh" }, 1000);
            }, 1000);
        } else if (pageNo == 59) {
            video_element = document.getElementsByClassName('speaker_img_s59')[0];
            video_element.play();
            $(".speaker_img_s59").animate({ opacity: "1" }, 2500);
            $(".message_img_s59").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "50px", "left": "115px" });
            $(".sonar-wrapper2").css({ "top": "670px", "left": "380px" });
            setTimeout(function () {
                $(".message_img-s59").animate({ opacity: "1", right: "110px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".note1_img-s59").animate({ opacity: "1", left: "150px" }, 1500);
                $(".note2_img-s59").animate({ opacity: "1", left: "240px" }, 1500);
                $(".note3_img-s59").animate({ opacity: "1", left: "-10px" }, 1500);
            }, 3000);
        } else if (pageNo == 60) {
            video_element = document.getElementsByClassName('speaker_img_s60')[0];
            video_element.play();
            $(".speaker_img_s60").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "265px", "left": "302px" });
            setTimeout(function () {
                $(".message_img_s60").animate({ opacity: "1", right: "10px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".note1_img_s60").animate({ opacity: "1", left: "65px" }, 1500);
            }, 3000);
        } else if (pageNo == 61) {
            video_element = document.getElementsByClassName('speaker_img_s61')[0];
            video_element.play();
            $(".speaker_img_s61").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "730px", "left": "240px" });
            setTimeout(function () {
                $(".message_img_s61").animate({ opacity: "1", right: "-11px" }, 1500);
            }, 2000);
        } else if (pageNo == 62) {
            video_element = document.getElementsByClassName('speaker_img_s62')[0];
            video_element.play();
            $(".speaker_img_s62").animate({ opacity: "1" }, 2500);
            setTimeout(function () {
                $(".message_img_s62").animate({ opacity: "1", right: "-11px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".note1_img_s62").animate({ opacity: "1", left: "40px" }, 1500);
            }, 3000);

        } else if (pageNo == 63) {
            video_element = document.getElementsByClassName('speaker_img_s63')[0];
            video_element.play();
            $(".speaker_img_s63").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "670px", "left": "190px" });
            setTimeout(function () {
                $(".message_img_s63").animate({ opacity: "1", right: "-11px" }, 1500);
            }, 2000);
        } else if (pageNo == 64) {
            video_element = document.getElementsByClassName('speaker_img_s64')[0];
            video_element.play();
            $(".speaker_img_s64").animate({ opacity: "1" }, 2500);
            setTimeout(function () {
                $(".message_img_s64").animate({ opacity: "1", right: "-11px" }, 1500);
            }, 2000);
            setTimeout(function () {
                loadPage(65);
            }, 10000);
        } else if (pageNo == 65) {
            video_element = document.getElementsByClassName('speaker_img_s65')[0];
            video_element.play();
            $(".speaker_img_s65").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "670px", "left": "260px" });
            setTimeout(function () {
                $(".message_img_s65").animate({ opacity: "1", right: "-11px" }, 1500);
            }, 2000);
        } else if (pageNo == 66) {
            video_element = document.getElementsByClassName('speaker_img_s66')[0];
            video_element.play();
            $(".speaker_img_s66").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "295px", "left": "526px" });
            setTimeout(function () {
                $(".message_img_s66").animate({ opacity: "1", right: "567px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".note1_img_s66").animate({ opacity: "1", left: "510px" }, 1500);
            }, 3000);
        } else if (pageNo == 67) {
            video_element = document.getElementsByClassName('speaker_img_s67')[0];
            video_element.play();
            $(".speaker_img_s67").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "131px", "left": "815px" });
            setTimeout(function () {
                $(".message_img_s67").animate({ opacity: "1", right: "707px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".note1_img_s67").animate({ opacity: "1", left: "510px" }, 1500);
            }, 3000);
        } else if (pageNo == 68) {
            video_element = document.getElementsByClassName('speaker_img_s68')[0];
            video_element.play();
            $(".speaker_img_s68").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "670px", "left": "304px" });
            setTimeout(function () {
                $(".message_img_s68").animate({ opacity: "1", right: "624px" }, 1500);
            }, 2000);
        } else if (pageNo == 69) {
            video_element = document.getElementsByClassName('speaker_img_s69')[0];
            video_element.play();
            $(".speaker_img_s69").animate({ opacity: "1" }, 2500);
            setTimeout(function () {
                $(".message_img_s69").animate({ opacity: "1", right: "-11px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".note1_img_s69").animate({ opacity: "1", left: "50px" }, 1500);
            }, 3000);
        } else if (pageNo == 70) {
            video_element = document.getElementsByClassName('speaker_img_s70')[0];
            video_element.play();
            $(".speaker_img_s70").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "670px", "left": "430px" });
            setTimeout(function () {
                $(".message_img_s70").animate({ opacity: "1", right: "-11px" }, 1500);
            }, 2000);
        } else if (pageNo == 71) {

        } else if (pageNo == 72) {

        } else if (pageNo == 73) {

        } else if (pageNo == 74) {
            video_element = document.getElementsByClassName('speaker_img_s74')[0];
            video_element.play();
            $(".speaker_img_s74").animate({ opacity: "1" }, 2500);
            setTimeout(function () {
                $(".message_img_s74").animate({ opacity: "1", right: "5px" }, 1500);
            }, 2000);
        } else if (pageNo == 75) {
            $(".sonar-wrapper1").css({ "top": "730px", "left": "298px" });
        } else if (pageNo == 76) {
            video_element = document.getElementsByClassName('speaker_img_s76')[0];
            video_element.play();
            $(".speaker_img_s76").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "670px", "left": "316px" });
            setTimeout(function () {
                $(".message_img_s76").animate({ opacity: "1", right: "10px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".note1_img_s76").animate({ opacity: "1", left: "180px" }, 1500);
                $(".note2_img_s76").animate({ opacity: "1", left: "110px" }, 1500);
            }, 3000);
        } else if (pageNo == 77) {
            video_element = document.getElementsByClassName('speaker_img_s77')[0];
            video_element.play();
            $(".speaker_img_s77").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "170px", "left": "501px" });
            setTimeout(function () {
                $(".message_img_s77").animate({ opacity: "1", right: "80px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".note1_img_s77").animate({ opacity: "1", left: "205px" }, 1500);
            }, 3000);
        } else if (pageNo == 78) {
            video_element = document.getElementsByClassName('speaker_img_s78')[0];
            video_element.play();
            $(".speaker_img_s78").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "131px", "left": "815px" });
            setTimeout(function () {
                $(".message_img_s78").animate({ opacity: "1", right: "697px" }, 1500);
            }, 2000);
        } else if (pageNo == 79) {
            video_element = document.getElementsByClassName('speaker_img_s79')[0];
            video_element.play();
            $(".speaker_img_s79").animate({ opacity: "1" }, 2500);
            setTimeout(function () {
                $(".message_img_s79").animate({ opacity: "1", right: "-11px" }, 1500);
            }, 2000);
        } else if (pageNo == 80) {
        } else if (pageNo == 81) {
        } else if (pageNo == 82) {
        } else if (pageNo == 83) {
            video_element = document.getElementsByClassName('speaker_img_s83')[0];
            video_element.play();
            $(".speaker_img_s83").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "730px", "left": "380px" });
            setTimeout(function () {
                $(".message_img_s83").animate({ opacity: "1", right: "60px" }, 1500);
            }, 1000);
        } else if (pageNo == 84) {
            video_element = document.getElementsByClassName('speaker_img_s84')[0];
            video_element.play();
            $(".speaker_img_s84").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "610px", "left": "680px" });
            setTimeout(function () {
                $(".message_img_s84").animate({ opacity: "1", right: "600px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".note1_img_s84").animate({ opacity: "1", left: "455px" }, 1500);
                $(".note2_img_s84").animate({ opacity: "1", left: "520px" }, 1500);
            }, 3000);
        } else if (pageNo == 85) {
            video_element = document.getElementsByClassName('speaker_img_s85')[0];
            video_element.play();
            $(".speaker_img_s85").animate({ opacity: "1" }, 2500);
            // $(".sonar-wrapper1").css({ "top": "220px", "left": "733px" });
            setTimeout(function () {
                $(".message_img_s85").animate({ opacity: "1", right: "755px" }, 1500);
                $(".button_img_s85").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 2000);
        } else if (pageNo == 86) {
            video_element = document.getElementsByClassName('speaker_img_s86')[0];
            video_element.play();
            $(".speaker_img_s86").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "46px", "left": "6px" });
            $(".sonar-wrapper2").css({ "top": "220px", "left": "733px" });
            setTimeout(function () {
                $(".message_img_s86").animate({ opacity: "1", right: "630px" }, 1500);
            }, 2000);

        } else if (pageNo == 87) {
            video_element = document.getElementsByClassName('speaker_img_s87')[0];
            video_element.play();
            $(".speaker_img_s87").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "670px", "left": "237px" });
            setTimeout(function () {
                $(".message_img_s87").animate({ opacity: "1", right: "634px" }, 1500);
            }, 2000);
        } else if (pageNo == 88) {
            video_element = document.getElementsByClassName('speaker_img_s88')[0];
            video_element.play();
            $(".speaker_img_s88").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "670px", "left": "400px" });
            setTimeout(function () {
                $(".message_img_s88").animate({ opacity: "1", right: "630px" }, 1500);
            }, 2000);
        } else if (pageNo == 89) {
            video_element = document.getElementsByClassName('speaker_img_s89')[0];
            video_element.play();
            $(".speaker_img_s89").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "204px", "left": "711px" });
            setTimeout(function () {
                $(".message_img_s89").animate({ opacity: "1", right: "721px" }, 1500);
            }, 2000);

        } else if (pageNo == 90) {
            $(".sonar-wrapper1").css({ "top": "720px", "left": "733px" });
        } else if (pageNo == 91) {
            video_element = document.getElementsByClassName('speaker_img_s91')[0];
            video_element.play();
            $(".speaker_img_s91").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "670px", "left": "703px" });
            setTimeout(function () {
                $(".message_img_s91").animate({ opacity: "1", right: "25px" }, 1500);
            }, 2000);
        } else if (pageNo == 92) {
            video_element = document.getElementsByClassName('speaker_img_s92')[0];
            video_element.play();
            $(".speaker_img_s92").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "730px", "left": "479px" });
            setTimeout(function () {
                $(".message_img_s92").animate({ opacity: "1", right: "51px" }, 1500);
            }, 2000);
        } else if (pageNo == 93) {
            video_element = document.getElementsByClassName('speaker_img_s93')[0];
            video_element.play();
            $(".speaker_img_s93").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "669px", "left": "428px" });
            setTimeout(function () {
                $(".message_img_s93").animate({ opacity: "1", right: "160px" }, 1500);
            }, 2000);
        } else if (pageNo == 94) {
            video_element = document.getElementsByClassName('speaker_img_s94')[0];
            video_element.play();
            $(".speaker_img_s94").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "730px", "left": "550px" });
            setTimeout(function () {
                $(".message_img_s94").animate({ opacity: "1", right: "220px" }, 1500);
            }, 2000);
        } else if (pageNo == 95) {
            video_element = document.getElementsByClassName('speaker_img_s95')[0];
            video_element.play();
            $(".speaker_img_s95").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "730px", "left": "550px" });
            setTimeout(function () {
                $(".message_img_s95").animate({ opacity: "1", right: "370px" }, 1500);
            }, 2000);
            setTimeout(function () {
                $(".button_img_s96").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 96) {
            video_element = document.getElementsByClassName('speaker_img_s96')[0];
            video_element.play();
            $(".speaker_img_s96").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "220px", "left": "733px" });
            setTimeout(function () {
                $(".message_img_s96").animate({ opacity: "1", right: "370px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".button_img_s96").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 97) {
            video_element = document.getElementsByClassName('speaker_img_s97')[0];
            video_element.play();
            $(".speaker_img_s97").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "220px", "left": "733px" });
            setTimeout(function () {
                $(".message_img_s97").animate({ opacity: "1", right: "540px" }, 1500);
            }, 2000);
            setTimeout(function () {
                $(".button_img_s97").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 98) {
            video_element = document.getElementsByClassName('speaker_img_s98')[0];
            video_element.play();
            $(".speaker_img_s98").animate({ opacity: "1" }, 2500);
            setTimeout(function () {
                $(".message_img_s98").animate({ opacity: "1", right: "50px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".button_img_s98").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        } else if (pageNo == 99) {
            video_element = document.getElementsByClassName('speaker_img_s99')[0];
            video_element.play();
            $(".speaker_img_s99").animate({ opacity: "1" }, 2500);
            $(".sonar-wrapper1").css({ "top": "220px", "left": "733px" });
            setTimeout(function () {
                $(".message_img_s99").animate({ opacity: "1", right: "370px" }, 1500);
            }, 2000);

            setTimeout(function () {
                $(".button_img_s99").animate({ opacity: "1", bottom: "80px" }, 1500);
            }, 3500);
        }
    }
    loadPage(1);
});
