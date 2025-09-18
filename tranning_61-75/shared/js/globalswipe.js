var global_swipe = true;
var SWIPE_LEFT="swipeleft";
var SWIPE_RIGHT="swiperight";
var NEXT="next";
var PREV="prev";
var MOUSE_DOWN="mousedown";
var currentPageCnt=0;
var isSubPageAvailable=false;
var isNavOrderAvailable=false;
var currentSlide="";
var refCurrentIndex = null;
var supPageContainer;
var isSubPageArrAvail =  [];
var subPageCounterVal = 0;
/******* ROUTE is used to set the navigation flow for entire presentation. It has a lot of paramaters to control the presentation. Parameters are,
@next : instant param to change the next slide. 
@prev : instant param to change the prev slide. 
@hideElements : used to hide the unwanted elements of the slide
@subpages: used to determine your subpages list. All the sub pages should have seperate html file and which will be loaded in the same parent slide. Subpage.html contains only the content. It has multiple parameters,
	@navOrder: used to control the sub page navigation order. It has 3 parameters,
		@R: Based on your swipe direction, sub page will be loaded. Ex: If you navigate from prev slide then the last sub page will get loaded.
		@O: used to change the sub page flow navigation. It has again 2 params,
			@next : instant param to change the next slide. 
			@prev : instant param to change the prev slide. 
		@N: Normal sub page flow.
*******/


$(function () {
	isNavOrderAvailable = findNavOrder();
	setIdentificationNodes();
	getCurrentPageCnt();
	if(global_swipe == true){
			setObjectEvent(window.$(document),SWIPE_LEFT,navigateToNextSlide);
			setObjectEvent(window.$(document),SWIPE_RIGHT,navigateToPrevSlide);
		
	}
});
function navigateToNextSlide(){
	if(default_swipe == true){
		com.veeva.clm.nextSlide();
	}else{
		if(nav.slides[currentPageCnt].noswipe_allowed != 'left')
			findCurrentSlide(NEXT);
	}
}
function navigateToPrevSlide(){
	if(default_swipe == true){
		com.veeva.clm.prevSlide();
	}else{
		if(nav.slides[currentPageCnt].noswipe_allowed != 'right')
			findCurrentSlide(PREV); 
	}
}
/******* Used to hide the global elements mentioned in the route object *******/
function hideGlobalElements(){
	var globalElements=nav.slides[currentPageCnt].hideElements;
	if(globalElements!=undefined) globalElements=globalElements.split(",");
	for(var elem in globalElements) $(globalElements[elem]).hide();
}
function setIdentificationNodes(){
	for( key in nav.slides ){	
		var slideMediaName=nav.slides[key].slideMediaName;
		nav.slides[slideMediaName]={};
		var nextKey=Number(key)+1;
		var prevKey=Number(key)-1;
		if(nav.slides[nextKey]!=undefined) nav.slides[slideMediaName].next=nav.slides[nextKey].slideMediaName;
		if(nav.slides[prevKey]!=undefined) nav.slides[slideMediaName].prev=nav.slides[prevKey].slideMediaName;
	}
}
function findCurrentSlide(dir){
	if(global_swipe){
		doSubPageCnt(dir);
		if(isSubPageAvailable){
			//alert('inside isSubPageAvailable')
			displaySubPages(dir);
		}else{
			//alert('inside isSubPageAvailable else')
			for( key in nav.slides ){
				var slideMediaName=nav.slides[key].slideMediaName;
				 if ( slideMediaName == currentSlide ){
					var tarPage=checkForTarPage(dir,key);
					if(tarPage==undefined) tarPage=nav.slides[currentPageCnt].slideMediaName;
				} 
			}
			enableSessionStorage(dir);
			if(tarPage!=currentSlide) {
				//alert('inside tarPage if')
				window.navigateToTarSlide(tarPage);
			}
		}
	}
}
function checkForTarPage(dir,key){
	if(dir==NEXT){
		var tarPage=nav.slides[key].next;
		if(tarPage==undefined && currentPageCnt<(nav.slides.length-1)) currentPageCnt=++key;
	}
	if(dir==PREV){
		var tarPage=nav.slides[key].prev;
		if(tarPage==undefined && currentPageCnt>0) currentPageCnt=--key;
	}
	return tarPage;
}
function updateCurrentPageCnt(dir){
	if(dir==NEXT)	if(currentPageCnt<(nav.slides.length-1)) currentPageCnt++;
	if(dir==PREV)	if(currentPageCnt>0) currentPageCnt--;
}
/************* Code related to handle a subpage concept *************/
function getCurrentPageCnt(){
	for( key in nav.slides ){        
		var slideMediaName=nav.slides[key].slideMediaName;               
		if (slideMediaName == currentSlide){           
			currentPageCnt=key
		};
		// console.log("currentPageCnt--"+currentPageCnt);
	}
	if(nav.slides[currentPageCnt].subPagesIds != undefined){
		isSubPageArrAvail = nav.slides[currentPageCnt].subPagesIds;
	}     
	checkForSubPage();
}
function checkForSubPage(){
	var subPages=nav.slides[currentPageCnt].subPages;
	if(subPages!=undefined){
		isSubPageAvailable=true;
		doSubPageCnt();
		displaySubPages();
	}
}
function displaySubPages(dir){
	var getLastDir=sessionStorage.direction;
	var subPages=nav.slides[currentPageCnt].subPages;
	console.log("subPages >>>>>> "+subPages);
	var navOrder=nav.slides[currentPageCnt].navOrder;
	if(navOrder=="R"){
		if(getLastDir!=undefined){
			if(sessionStorage.direction==PREV) {
				nav.slides[currentPageCnt].cnt=subPages.split(",").length-1;
				sessionStorage.direction=undefined;
			}
		}	
	}else if(navOrder == "O"){
		//Condition used to handle the navOrder type 'O'. It will check for NEXT/PREV slides based on that it will move to the next page.
		if(dir==NEXT) var tarPage=nav.slides[currentPageCnt].next;
		if(dir == PREV) var tarPage=nav.slides[currentPageCnt].prev;
		if(tarPage!=undefined)	nav.navigateToTarSlide(tarPage);
	}
	var fileName=subPages.split(",")[nav.slides[currentPageCnt].cnt];
	//console.log("nav.slides[currentPageCnt].cnt >> "+nav.slides[currentPageCnt].cnt);
	var curSubPageId = nav.slides[currentPageCnt].cnt;
	setMetaDataTag(META_BTN,"root_track_"+curSubPageId*10);
	pageNameContainer.html(fileName);
	checkSubPageLoadType(fileName+".html");
}
function doSubPageCnt(dir){
	var subPages=nav.slides[currentPageCnt].subPages;
	if(subPages!=undefined){
		var navOrder=nav.slides[currentPageCnt].navOrder;
		if(navOrder=="O"){
			if(dir==NEXT) var tarPage=nav.slides[currentPageCnt].next;
			if(dir==PREV) var tarPage=nav.slides[currentPageCnt].prev;
			if(tarPage==undefined){
				isSubPageAvailable=false;
				return;
			}
		}
		var subPagesLen=nav.slides[currentPageCnt].subPages.split(",").length-1;
		//alert("CNT >>>> "+nav.slides[currentPageCnt].cnt);
		if(nav.slides[currentPageCnt].cnt==undefined) nav.slides[currentPageCnt].cnt=0;
		else{
			// Conditions used to verify the sub page count, based on the sub page count it will navigate to the respective pages.
			if(dir==NEXT){
				if(nav.slides[currentPageCnt].cnt<subPagesLen) nav.slides[currentPageCnt].cnt++;
				else isSubPageAvailable=false;
			}else if(dir==PREV){
				if(nav.slides[currentPageCnt].cnt>0)	nav.slides[currentPageCnt].cnt--;
				else isSubPageAvailable=false;
			}else{
				if(nav.slides[currentPageCnt].cnt<subPagesLen) nav.slides[currentPageCnt].cnt++;
				else isSubPageAvailable=false;
			}
		}
	}
}
function findNavOrder(){
	for( key in nav.slides ){
		var navOrder=nav.slides[key].navOrder;
		if(navOrder!=undefined) return true;
	}
	return false;
}
var subPageLoadType="load";

function checkSubPageLoadType(fileName){
	if(subPageLoadType=="load") {
		console.log(">>> "+fileName);
		if($("#subpagecontainer").attr("id") == undefined)	$("body").append("<div id='subpagecontainer'></div>");
		loadSubPages(fileName,$("#subpagecontainer"));
	}
}
function loadSubPages(fileName,containerObj){
	containerObj.load( fileName, function( response, status, xhr ) {
		if(status=="success"){
			/*******This method should be available inside the sub pages. 
			Each and every subpage js file, we need to have this method. 
			We should not write any code directly inside document.ready() instead of this please place all the code inside the "initPage()" method.
			*********/
			var callInit=this["initPage"];
			if(callInit !=undefined) callInit();
		}
	  if (status == "error") {
		var msg = "Sorry but there was an error: ";
	  	console.log( msg + xhr.status + " " + xhr.statusText );
	  }
	});
}
/************* End of code related to handle a subpage concept *************/
/*Method used to deactivate the swipes of the argument objects*/
function deActivateSwipeTo(){
	for(var i in arguments){
		var targetObj=arguments[i];
		targetObj.on(SWIPE_LEFT,function(){
			return false;
		});
		targetObj.on(SWIPE_RIGHT,function(){
			return false;
		});
	}
}
function enableSessionStorage(dir){
	if(isNavOrderAvailable)	getSetNavDir(dir);
}
function getSetNavDir(dir){
	if(dir!=undefined)	sessionStorage.direction=dir;
}
//Code is used to change the navigation flow of the presentation based on the array passed to this method
var getPageNavFlowArr;
var curPageNext;
var curPagePrev;
var pageOrderArr=["20.00","30.00","50.10","51.20"];
function controlPageNavOrder(navFlowArr){
	if(navFlowArr!=undefined){
		getPageNavFlowArr=navFlowArr.slice(0);
		findNextPrevPage();
		if(curPageNext!=undefined) setObjectEvent(window.$(document),SWIPE_LEFT,moveNextPage,true);
		if(curPagePrev!=undefined) setObjectEvent(window.$(document),SWIPE_RIGHT,movePrevPage,true);
	}
}
function moveNextPage(){
	navigateToTarSlide(curPageNext);
}
function movePrevPage(){
	navigateToTarSlide(curPagePrev);
}
function findNextPrevPage(){
	for(var i=0;i<getPageNavFlowArr.length;i++){
		if(getPageNavFlowArr[i]==currentSlide){
			curPageNext=getPageNavFlowArr[i+1];
			curPagePrev=getPageNavFlowArr[i-1];
		}
	}
}
function navigateToTarSlide(pageID){
	//alert("<<<<< navigateToTarSlide called >>>>"+pageID);	
	nav.navSlide(pageID);
}