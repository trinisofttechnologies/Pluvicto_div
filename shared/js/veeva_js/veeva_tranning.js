// START check if its Veeva environment or not
var local = false;
try {
	com.veeva.clm.getDataForCurrentObject("User", "ID", getUserID);
}
catch (err) {
	local = true;
}
function getUserID(result) {
	local = !result.success;
}
// END check if its Veeva environment or not

// START Enable Veeva swipe and thumbnail swimlane based on environment
var default_swipe = false;
var web_thumb_nav = false;
if (local) {
	default_swipe = false;
	web_thumb_nav = true;
}
// END Enable Veeva swipe and thumbnail swimlane based on environment

// Navigation swipe order (flow_default)
var flow_default = [
	{
		"title": "Home",
		"slideMediaName": "Home_FA-11383644",
		"presentationID": "FA-11383644",
	},
	{
		"title": "Overview unmet need",
		"slideMediaName": "Overview unmet need_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "Overview PLUVICTO benefits",
		"slideMediaName": "Overview PLUVICTO benefits_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "Patient Types Patient ID",
		"slideMediaName": "Patient Types Patient ID_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "Patient Types Patient Profiles",
		"slideMediaName": "Patient Types Patient Profiles_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "PSMAfore Trial Design",
		"slideMediaName": "PSMAfore Trial Design 1_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "PSMAfore Patient Characteristics",
		"slideMediaName": "PSMAfore Trial Design 2_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "PSMAfore rPFS and OS",
		"slideMediaName": "PSMAfore rPFS_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "PSMAfore OS",
		"slideMediaName": "PSMAfore OS_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "PSMAfore Response Rate 1",
		"slideMediaName": "PSMAfore Response Rate 1_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "PSMAfore Response Rate PSA Decline",
		"slideMediaName": "PSMAfore Response Rate PSA Decline_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "PSMAfore QOL",
		"slideMediaName": "PSMAfore QOL_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "PSMAfore Favorable Safety",
		"slideMediaName": "PSMAfore Favorable Safety_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "PSMAfore Laboratory Abnormalities",
		"slideMediaName": "PSMAfore Laboratory Abnormalities_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "PSMAfore Safety Proven Tolerability",
		"slideMediaName": "PSMAfore Safety Proven Tolerability_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "VISION Trial Design",
		"slideMediaName": "VISION Trial Design _FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "VISION OS",
		"slideMediaName": "VISION OS _FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "VISION ORR",
		"slideMediaName": "VISION Additional End Points ORR_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "VISION PSA Response",
		"slideMediaName": "VISION Additional End Points PSA_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "VISION Quality of Life",
		"slideMediaName": "VISION Quality of Life _FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "VISION Safety",
		"slideMediaName": "VISON Safety_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "PLUVICTO Experience",
		"slideMediaName": "PLUVICTO Experience _FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "Novartis Patient Support",
		"slideMediaName": "Novartis Patient Support _FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "Coverage and Affordability",
		"slideMediaName": "Coverage and Affordability _FA-11383644",
		"presentationID": "FA-11383644_content",
	},

	{
		"title": "NCCN",
		"slideMediaName": "NCCN_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "Plan for pluvicto",
		"slideMediaName": "Plan For PLUVICTO_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "Dosing",
		"slideMediaName": "Dosing _FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "MOA",
		"slideMediaName": "MOA_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
	{
		"title": "Summary",
		"slideMediaName": "Summary_FA-11383644",
		"presentationID": "FA-11383644_content",
	},
];
// Navigation swipe order (for short call/custom flows)
var flow_1 = [flow_default[1], flow_default[2], flow_default[3], flow_default[5], flow_default[6], flow_default[7], flow_default[8], flow_default[9], flow_default[10], flow_default[11], flow_default[12], flow_default[13]];
var flow_2 = [flow_default[14], flow_default[15], flow_default[16], flow_default[17], flow_default[18]];
var flow_3 = [flow_default[19], flow_default[20], flow_default[21], flow_default[22], flow_default[23], flow_default[24]];


var slidesJsonVal = [];

var keyed_json_arr = {
	flow_default: flow_default,
	flow_1: flow_1,
	flow_2: flow_2,
	flow_3: flow_3,

};

function setNavUsingSession() {
	var selected_session = sessionStorage.getItem("selected_flow");
	if (selected_session == undefined || selected_session == null) {
		slidesJsonVal = keyed_json_arr["flow_default"];
		sessionStorage.setItem("selected_flow", "flow_default");
	} else {
		slidesJsonVal = keyed_json_arr[selected_session];
	}
	console.log("selected flow is : " + sessionStorage.getItem("selected_flow"));
}
setNavUsingSession();

//Nav Object
var nav = {
	slides: slidesJsonVal,

	findSlideIndex: function (fileName) {
		for (key in nav.slides) {
			var slideMediaName = nav.slides[key].slideMediaName;
			if (slideMediaName == fileName) {
				return key;
			};
		}
		console.log("Error: wrong file name");
	},

	//use this function to navigate to an HTML slide locally and in Veeva
	navSlide: function (fileName) {
		var fileIndex = nav.findSlideIndex(fileName);

		if (fileIndex == undefined) {
			//change flow
			slidesJsonVal = flow_default;
			nav.slides = slidesJsonVal;

			// call nav.navSlides again
			nav.navSlide(fileName);
		}

		if (local) {
			fileName = "../" + nav.slides[fileIndex].slideMediaName + "/index.html";
			document.location = fileName;
		} else {
			com.veeva.clm.gotoSlide(nav.slides[fileIndex].slideMediaName + ".zip", nav.slides[fileIndex].presentationID);
		}
	}
}
/* ----------------------------------------- Web Thumbnail Navigation ------------------------------- */

$('document').ready(function () {

	// if (web_thumb_nav == true) {
	// 	$('.container').append('<!--Open swim lane--><div id="bottom_thumb_view_trigger" class="up" style="position: absolute;z-index: 10000;top:732.5px;width: 30px;height: 28.5px;background: url(../shared/media/images/swimlane_icon.png) no-repeat;background-size: 30px 28.5px;left: 7px;"></div><!--Close swim lane--><div class="down" id="top_thumb_hide_trigger" style="position: absolute;z-index: 10000;top:732.5px;width: 30px;height: 28.5px;background: url(../shared/media/images/swimlane_icon.png) no-repeat;background-size: 30px 28.5px;left: 7px;display:none;"></div><!--Swim lane container--><div id="bottom_thumb_nav" unselectable="on" onselectstart="return false;"onmousedown="return false;" style="position: absolute;top: 768px;z-index:100000;"><div style="position: relative;z-index: 106;top: 0px;width:1024px;background-color:#333333;overflow:hidden;" id="thumb_viewer"></div></div>');

	// 	$('#thumb_viewer').append('<div id="thumb_container" style="left:0px;position:absolute;"></div><div id="thumb_breadcrumb_container" style="background-color: black;height: 100%;position:relative;top:222px;width:100%;display:inline-block;text-align:center;padding-top: 9px;"></div>');
	// 	try {
	// 		var currentpresentationID = nav.slides[nav.findSlideIndex(document.title)].presentationID;
	// 		var availableKeyMessage = 0;
	// 		for (var i = 0; i < nav.slides.length; i++) {
	// 			slide_name = nav.slides[i].slideMediaName;
	// 			if (nav.slides[i].presentationID == currentpresentationID) {
	// 				availableKeyMessage++;
	// 				$('#thumb_container').append('<div style="margin:30px 6px 0px 0px;width:200px;height:150px;display:inline-block;vertical-align:top;background-image:url(\'../' + slide_name + '/thumb.png\');background-size:200px 150px" class="single_thumb" data-nav="' + slide_name + '"> <div style="text-align:center;width:200px;color:white;position:relative;top:158px;">' + nav.slides[i].title + '</div></div>');
	// 			}
	// 		}
	// 	} catch (e) { }

	// 	for (var i = 0; i < Math.ceil(availableKeyMessage / 5); i++) {
	// 		$('#thumb_breadcrumb_container').append('<div style="display:inline-block;width:5px;height:5px;border-radius:5px;background-color:white;margin:0px 3px;"></div>');
	// 	}
	// 	$('#thumb_container').css('width', (availableKeyMessage * 206) + 'px');
	// 	$('#thumb_breadcrumb_container div').css('backgroundColor', '#333333');

	// 	var timerIdToSlideDown;
	// 	function startInterval2ThumbSlideDown() {
	// 		clearInterval(timerIdToSlideDown)
	// 		timerIdToSlideDown = setInterval(function () { $('#top_thumb_hide_trigger').trigger("click"); clearInterval(timerIdToSlideDown); }, 5000);
	// 	}
	// 	function clearInterval2ThumbSlideDown() {
	// 		clearInterval(timerIdToSlideDown);
	// 	}
	// 	$('#thumb_viewer').bind('swipeleft', function (e) {
	// 		startInterval2ThumbSlideDown()
	// 		e.stopPropagation();

	// 		if ($('#thumb_container').hasClass('animating') || Math.abs($('#thumb_container').position().left) >= $('#thumb_container').width() - 1030)//(Math.floor(nav.slides.length/5)*1030))
	// 			return false;

	// 		$('#thumb_container').addClass('animating');
	// 		$('#thumb_container').animate({ left: "-=1030px" }, function () {
	// 			$('.selected_thumb').css('backgroundColor', '#333333').removeClass('selected_thumb').next().css('backgroundColor', 'white').addClass('selected_thumb');
	// 			$('#thumb_container').removeClass('animating');
	// 		});
	// 	});
	// 	$('#thumb_viewer').bind('swiperight', function (e) {
	// 		startInterval2ThumbSlideDown()
	// 		e.stopPropagation();

	// 		if ($('#thumb_container').hasClass('animating') || $('#thumb_container').position().left >= 0)
	// 			return false;

	// 		$('#thumb_container').addClass('animating');
	// 		$('#thumb_container').animate({ left: "+=1030px" }, function () {
	// 			$('.selected_thumb').css('backgroundColor', '#333333').removeClass('selected_thumb').prev().css('backgroundColor', 'white').addClass('selected_thumb');
	// 			$('#thumb_container').removeClass('animating')
	// 		});
	// 	});

	// 	$('.single_thumb').bind('click', function () {
	// 		clearInterval2ThumbSlideDown();
	// 		var nav = $(this).attr('data-nav');
	// 		document.location.href = "../" + nav + "/index.html";
	// 	});
	// 	$('#bottom_thumb_view_trigger').add($('#top_thumb_hide_trigger')).bind('click', function () {
	// 		if (web_thumb_nav == true) {
	// 			if ($(this).hasClass('up')) {
	// 				startInterval2ThumbSlideDown();
	// 				$('#bottom_thumb_nav').removeClass('up').addClass('down');
	// 				$('#bottom_thumb_nav').css({ '-webkit-transform': 'translate3d(0, -261px, 0)', '-webkit-transition-property': '-webkit-transform', '-webkit-transition-duration': '0.3s', '-webkit-transition-delay': '0s' });
	// 				$('#top_thumb_hide_trigger').show();
	// 				setTimeout(function () {
	// 					$('#top_thumb_hide_trigger, #bottom_thumb_view_trigger').css({ '-webkit-transform': 'translate3d(0, -261px, 0)', '-webkit-transition-property': '-webkit-transform', '-webkit-transition-duration': '0.3s', '-webkit-transition-delay': '0s' });

	// 				}, 0);
	// 				$('#thumb_viewer').height(261);

	// 				$(this).hide();
	// 			}
	// 			if ($(this).hasClass('down')) {
	// 				clearInterval2ThumbSlideDown();
	// 				$('#bottom_thumb_nav').removeClass('down').addClass('up');
	// 				$('#bottom_thumb_nav').css({ '-webkit-transform': 'translate3d(0, 0, 0)', '-webkit-transition-property': '-webkit-transform', '-webkit-transition-duration': '0.3s', '-webkit-transition-delay': '0s' });
	// 				$('#bottom_thumb_view_trigger').show();
	// 				setTimeout(function () {
	// 					$('#top_thumb_hide_trigger, #bottom_thumb_view_trigger').css({ '-webkit-transform': 'translate3d(0, 0, 0)', '-webkit-transition-property': '-webkit-transform', '-webkit-transition-duration': '0.3s', '-webkit-transition-delay': '0s' });
	// 				}, 0);


	// 				$(this).hide();
	// 			}
	// 		}
	// 	});

	// 	var currPres_first_index;
	// 	for (cnt in nav.slides) {
	// 		if (nav.slides[cnt].presentationID == currentpresentationID) {
	// 			currPres_first_index = cnt;
	// 			break;
	// 		}
	// 	}
	// 	breadCrumbPosition = Math.floor((nav.findSlideIndex(slideName) - currPres_first_index) / 5);
	// 	$('#thumb_container').css('left', '-' + (breadCrumbPosition * 1030) + 'px');
	// 	$('#thumb_breadcrumb_container div:nth(' + breadCrumbPosition + ')').addClass('selected_thumb').css('backgroundColor', 'white');

	// }
});