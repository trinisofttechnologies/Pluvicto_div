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
  scale_element = document.getElementsByTagName("body")[0];
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
  }
  scale_element.style.transform = "scale(" + scale + ")";
  scale_element.style.transformOrigin = "0% 0%";
  scale_element.style.position = "absolute";
  $("body").css({ overflow: "hidden", position: "absolute" });
}
// END of responsive code

// global elements
var shared = {
  isiContent: `
  <div class="indication_wrapper">
    <p class="isi_header">Indication</p>
    <section class="indi_section_1">
      <p class="isi_text">PLUVICTO® (lutetium Lu 177 vipivotide tetraxetan) is indicated for the treatment of adult patients with prostate-specific membrane antigen <nobr>(PSMA)-positive</nobr> metastatic castration-resistant prostate cancer (mCRPC) who have been treated with androgen receptor pathway inhibition (ARPI) therapy, and </p>
      <ul class="isi_list">
        <li>are considered appropriate to delay taxane-based chemotherapy, or</li>
        <li>have received prior taxane-based chemotherapy</li>
      </ul>  
    </section>
  </div>
  <div class="isi_wrapper">
    <p class="isi_header">IMPORTANT SAFETY INFORMATION</p>
    <section class="isi_section_1">
     <p class="isi_sub_header">Risk From Radiation Exposure</p>
      <p class="isi_text">PLUVICTO contributes to a patient’s long-term cumulative radiation exposure, which is associated with an increased risk for cancer.</p>
      <p class="isi_text">Minimize radiation exposure to patients, medical personnel, and others during and after treatment with PLUVICTO consistent with institutional practices, patient treatment procedures, Nuclear Regulatory Commission patient-release guidance, and instructions to the patient for follow-up radiation protection.</p>
      <p class="isi_text">Ensure patients increase oral fluid intake and advise them to void as often as possible to reduce bladder radiation.</p>
      <p class="isi_text">To minimize radiation exposure to others, advise patients to limit close contact (less than <nobr>3 feet)</nobr> with household contacts for 2 days or with children and pregnant women for <nobr>7 days</nobr>, to refrain from sexual activity for 7 days, and to sleep in a separate bedroom from household contacts for 3 days, from children for 7 days, or from pregnant women for <nobr>15 days.</nobr></p>
      
    </section>

     <section class="isi_section_2">
     <p class="isi_sub_header">Myelosuppression</p>
      <p class="isi_text">PLUVICTO can cause severe and life-threatening myelosuppression. In the PSMAfore study, grade 3 or 4 decreased hemoglobin (7%), decreased leukocytes (4.4%), decreased neutrophils (3.5%), and decreased platelets (2.7%) occurred in patients treated with PLUVICTO. One death occurred due to bone marrow failure during long-term follow-up in a patient who received PLUVICTO. In the VISION study, 4 myelosuppression-related deaths occurred. </p>
      <p class="isi_text">Perform complete blood counts before and during treatment with PLUVICTO. Withhold, reduce dose, or permanently discontinue PLUVICTO based on severity of myelosuppression.</p>
      
      </section>

      <section class="isi_section_3">
     <p class="isi_sub_header">Renal Toxicity</p>
      <p class="isi_text">PLUVICTO can cause severe renal toxicity. In the PSMAfore study, grade 3 or 4 acute kidney injury (1.3%) occurred in patients treated with PLUVICTO.</p>
      <p class="isi_text">Advise patients to remain well hydrated and to urinate frequently before and after administration of PLUVICTO. Perform kidney function laboratory tests, including serum creatinine and calculated creatinine clearance (CrCl), before and during treatment. Withhold, reduce dose, or permanently discontinue PLUVICTO based on severity of renal toxicity.</p>
      
      </section>

      <section class="isi_section_4">
     <p class="isi_sub_header">Embryo-Fetal Toxicity</p>
      <p class="isi_text">The safety and efficacy of PLUVICTO have not been established in females. Based on its mechanism of action, PLUVICTO can cause fetal harm. No animal studies using lutetium Lu 177 vipivotide tetraxetan have been conducted to evaluate its effect on female reproduction and embryo-fetal development; however, radioactive emissions, including those from PLUVICTO, can cause fetal harm. Advise males with female partners of reproductive potential to use effective contraception during treatment with PLUVICTO and for 14 weeks after the last dose.</p>
      
      
      </section>

      <section class="isi_section_4">
     <p class="isi_sub_header">Infertility</p>
      <p class="isi_text">The recommended cumulative dose of 44.4 GBq of PLUVICTO results in a <nobr>radiation-absorbed</nobr> dose to the testes within the range where PLUVICTO may cause temporary or permanent infertility.</p>
      
      
      </section>

      <section class="isi_section_4">
     <p class="isi_sub_header">Adverse Reactions and Laboratory Abnormalities</p>
      <p class="isi_text">In the pooled safety population for the PSMAfore and VISION studies (N=756), the most common (≥20%) adverse reactions, including laboratory abnormalities, were decreased lymphocytes (83%), decreased hemoglobin (65%), fatigue (49%), dry mouth (46%), decreased platelets (40%), decreased estimated glomerular filtration rate (37%), nausea (35%), decreased neutrophils (31%), decreased calcium (29%), decreased sodium (27%), increased aspartate aminotransferase (26%), increased alkaline phosphatase (24%), arthralgia (22%), decreased appetite (21%), increased potassium (21%), constipation (21%), and back pain (21%).</p>
      
      <p><b>
Please see full <a href="https://www.novartis.com/us-en/sites/novartis_us/files/pluvicto.pdf">Prescribing Information</a>.</b>

<div>
			<img id="novartisLogo" src="../shared/media/images/Novartis_logo_VM_page.png" alt=""/></p>
	
		
			<img id="pluvicto_logo" src="../shared/media/images/brand_logo1.png" alt=""/>
		
	</div>

<p class="isi_text_section"><span class="fi_rst"><b>Novartis Pharmaceuticals Corporation</b><br>East Hanover, New Jersey 07936-1080</span> <span class="isi_year">©2025 Novartis</span><span class="isi_date">6/25</span><span class="isi_contentid">FA-11383644</span></p>

      </section>
  </div>`,
  footer: {
    footer_nav_links: [
      { name: "Overview", type: "footer_nav", nav: "Overview unmet need_FA-11383644" },
      { name: "Patient Types", type: "footer_nav", nav: "Patient Types Patient ID_FA-11383644" },
      /* { name: "Component", type: "footer_nav", nav: "IMUS_Master_iCVA_CC_Tile" }, */
      { name: "PSMAfore", type: "footer_nav", nav: "PSMAfore Trial Design 1_FA-11383644" },
      { name: "VISION", type: "footer_nav", nav: "VISION Trial Design _FA-11383644" },
      { name: "Experience & Support", type: "footer_nav", nav: "PLUVICTO Experience _FA-11383644" },

      { name: "Dosing", type: "footer_nav", nav: "Dosing _FA-11383644" },
      { name: "MOA", type: "footer_nav", nav: "MOA_FA-11383644" },
      { name: "Summary", type: "footer_nav", nav: "Summary_FA-11383644" },
    ],
    footer_popup_links: [
      // { name: "Feedback", type: "popup_open", nav: "feedback_popup", icon: "rate_review" },
      // { name: "Email", type: "popup_open", nav: "", icon: "email" },
      // { name: "Objection", type: "popup_open", nav: "objection_popup", icon: "front_hand" },
      // { name: "Short Call", type: "popup_open", nav: "flows_popup", icon: "note_stack" },
      // { name: "Footnotes", type: "popup_open", nav: "footnotes_popup", icon: "list" },
      { name: "Resources", type: "popup_open", nav: "footnotes_popup", icon: "note_stack" },
      { name: "References", type: "popup_open", nav: "ref_popup", icon: "quick_reference" },
      { name: "PI", type: "popup_open", nav: "", icon: "prescriptions" },
      { name: "Home", type: "popup_open", nav: "", icon: "home_outline" },
    ]
  },
  menuPopup: {
    heading: "Menu",
    type: "ht", /* vt or ht - vertical or horizontal */
    menuItems: [
      {
        name: "Home", nav: "Home_FA-11383644",
        subMenu: [
          { name: "Home", nav: "Home_FA-11383644" },
        ]
      },
      {
        name: "Overview", nav: "Overview unmet need_FA-11383644",
        subMenu: [
          { name: "Unmet need", nav: "Overview unmet need_FA-11383644" },
          { name: "PLUVICTO benefits", nav: "Overview PLUVICTO benefits_FA-11383644" },
        ]
      },
      {
        name: "Patient Types", nav: "Patient Types Patient ID_FA-11383644",
        subMenu: [
          { name: "Patient ID", nav: "Patient Types Patient ID_FA-11383644" },
          { name: "Patient profiles", nav: "Patient Types Patient Profiles_FA-11383644" },
        ]
      },
      {
        name: "PSMAfore", nav: "PSMAfore Trial Design_FA-11383644",
        subMenu: [
          { name: "Trial design", nav: "PSMAfore Trial Design 1_FA-11383644" },
          { name: "Trial patients", nav: "PSMAfore Trial Design 2_FA-11383644" },
          { name: "rPFS", nav: "PSMAfore rPFS_FA-11383644" },
          { name: "OS", nav: "PSMAfore OS_FA-11383644" },
          { name: "ORR", nav: "PSMAfore Response Rate 1_FA-11383644" },
          { name: "PSA", nav: "PSMAfore Response Rate PSA Decline_FA-11383644" },
          { name: "Quality of life", nav: "PSMAfore QOL_FA-11383644" },
          { name: "Safety", nav: "PSMAfore Favorable Safety_FA-11383644" },
          { name: "Lab abnormalities", nav: "PSMAfore Laboratory Abnormalities_FA-11383644" },
          { name: "Tolerability", nav: "PSMAfore Safety Proven Tolerability_FA-11383644" },
        ]
      },
      {
        name: "VISION", nav: "VISION Trial Design _FA-11383644",
        subMenu: [
          { name: "Trial design", nav: "VISION Trial Design _FA-11383644" },
          { name: "OS", nav: "VISION OS _FA-11383644" },
          { name: "ORR", nav: "VISION Additional End Points ORR_FA-11383644" },
          { name: "PSA decline", nav: "VISION Additional End Points PSA_FA-11383644" },
          { name: "Quality of life", nav: "VISION Quality of Life _FA-11383644" },
          { name: "Safety", nav: "VISON Safety_FA-11383644" },
        ]
      },
      {
        name: "Experience & Support", nav: "PLUVICTO Experience _FA-11383644",
        subMenu: [
          { name: "PLUVICTO experience", nav: "PLUVICTO Experience _FA-11383644" },
          { name: "Novartis Patient Support&trade;", nav: "Novartis Patient Support _FA-11383644" },
          { name: "Coverage & affordability", nav: "Coverage and Affordability _FA-11383644" },
          { name: "NCCN", nav: "NCCN_FA-11383644" },
          { name: "Plan for Pluvicto", nav: "Plan For PLUVICTO_FA-11383644" },
          { name: "<span class='pink_bracket'>[</span>Local Coverage<span class='pink_bracket'>]</span>", nav: "" },
        ]
      },

      {
        name: "Dosing & MOA", nav: "Dosing _FA-11383644",
        subMenu: [
          { name: "Dosing", nav: "Dosing _FA-11383644" },
          { name: "MOA", nav: "MOA_FA-11383644" },
        ]
      },
      // { name: "MOA", nav: "MOA_FA-11383644", 
      //   subMenu: [

      //   ] 
      // },
      {
        name: "Summary", nav: "Summary_FA-11383644",
        subMenu: [
          { name: "Summary", nav: "Summary_FA-11383644" },
        ]
      },
    ],
    menuItems_flow_1: [
      // { name: "Splash Layouts", nav: "IMUS_Master_iCVA_SpLa_Splash_01", 
      //   subMenu: [
      //     { name: "Splash_01", nav: "IMUS_Master_iCVA_SpLa_Splash_01" },
      //   ]
      // },
      // { name: "Detail Layouts", nav: "IMUS_Master_iCVA_DeLa_Detail_03", 
      //   subMenu: [
      //     { name: "Detail_03", nav: "IMUS_Master_iCVA_DeLa_Detail_03" },
      //     { name: "Detail_04", nav: "IMUS_Master_iCVA_DeLa_Detail_04" },
      //   ]
      // },
      // { name: "Summary Layouts", nav: "IMUS_Master_iCVA_SuLa_Summary_01",
      //   subMenu: [
      //     { name: "Summary_01", nav: "IMUS_Master_iCVA_SuLa_Summary_01" },
      //     { name: "Resources_01", nav: "IMUS_Master_iCVA_SuLa_Resources_01" },
      //   ]
      // },
      // { name: "Content Components", nav: "IMUS_Master_iCVA_Page_Layout", 
      //   subMenu: [
      //     { name: "Page Layout", nav: "IMUS_Master_iCVA_Page_Layout"}, 
      //   ]
      // },
    ],
    menuItems_flow_2: [
      // { name: "Splash Layouts", nav: "IMUS_Master_iCVA_SpLa_Splash_02", 
      //   subMenu: [
      //     { name: "Splash_02", nav: "IMUS_Master_iCVA_SpLa_Splash_02" },
      //   ]
      // },
      // { name: "Summary Layouts", nav: "IMUS_Master_iCVA_SuLa_Summary_02",
      //   subMenu: [
      //     { name: "Summary_02", nav: "IMUS_Master_iCVA_SuLa_Summary_02" },
      //     { name: "Resources_01", nav: "IMUS_Master_iCVA_SuLa_Resources_01" },
      //   ]
      // },
      // { name: "Content Components", nav: "IMUS_Master_iCVA_CC_Tile", 
      //   subMenu: [
      //     { name: "Tile", nav: "IMUS_Master_iCVA_CC_Tile"}, 
      //     { name: "Fancy list", nav: "IMUS_Master_iCVA_CC_Fancy_list"},
      //   ] 
      // },
    ],
    menuItems_flow_3: [
      // { name: "Splash Layouts", nav: "IMUS_Master_iCVA_SpLa_Splash_01", 
      //   subMenu: [
      //     { name: "Splash_01", nav: "IMUS_Master_iCVA_SpLa_Splash_01" },
      //   ]
      // },
      // { name: "Summary Layouts", nav: "IMUS_Master_iCVA_SuLa_Summary_03",
      //   subMenu: [
      //     { name: "Summary_03", nav: "IMUS_Master_iCVA_SuLa_Summary_03" },
      //     { name: "Resources_01", nav: "IMUS_Master_iCVA_SuLa_Resources_01" },
      //   ]
      // },
      // { name: "Functional Components", nav: "IMUS_Master_iCVA_FC_CTA",
      //   subMenu: [
      //     { name: "CTA", nav: "IMUS_Master_iCVA_FC_CTA"},
      //     { name: "Popup", nav: "IMUS_Master_iCVA_FC_Popup"},
      //   ]
      // },
    ],
    menuItems_flow_4: [
      // { name: "Splash Layouts", nav: "IMUS_Master_iCVA_SpLa_Splash_02", 
      //   subMenu: [
      //     { name: "Splash_02", nav: "IMUS_Master_iCVA_SpLa_Splash_02" },
      //   ]
      // },
      // { name: "Focus Layouts", nav: "IMUS_Master_iCVA_FoLa_Focus_01",
      //   subMenu: [
      //     { name: "Focus_01", nav: "IMUS_Master_iCVA_FoLa_Focus_01" },
      //   ]
      // },
      // { name: "Detail Layouts", nav: "IMUS_Master_iCVA_DeLa_Detail_01", 
      //   subMenu: [
      //     { name: "Detail_01", nav: "IMUS_Master_iCVA_DeLa_Detail_01" },
      //     { name: "Detail_02", nav: "IMUS_Master_iCVA_DeLa_Detail_02" },
      //   ]
      // },
      // { name: "Summary Layouts", nav: "IMUS_Master_iCVA_SuLa_Summary_01",
      //   subMenu: [
      //     { name: "Summary_03", nav: "IMUS_Master_iCVA_SuLa_Summary_03" },
      //     { name: "Resources_01", nav: "IMUS_Master_iCVA_SuLa_Resources_01" },
      //   ]      
      // },
    ],
  },
  // footnotes: ["&ast;", "&dagger;", "&Dagger;", "&sect;", "&parallel;", "&para;", "&num;"],
  footnotes: ["&ast;", "&dagger;", "&Dagger;", "&sect;", "&vert;&vert;", "&para;", "&num;"],
  flowsPopup: {
    heading: "Flows",
    flows: [
      { flowName: "Default", flowSession: "flow_default" },
      { flowName: "Flow 1", flowSession: "flow_1" },
      { flowName: "Flow 2", flowSession: "flow_2" },
      { flowName: "Flow 3", flowSession: "flow_3" },
      { flowName: "Flow 4", flowSession: "flow_4" },
    ],
  },
  objectionPopup: [
    // { name: "Objection 1", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    // { name: "Objection 2", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    // { name: "Objection 3", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    // { name: "Objection 4", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  ],
};

$(function () {
  document.addEventListener("touchmove", function (e) {
    e.preventDefault();
  });
  getSlideName();
  createglobal();
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

  var portrait = window.matchMedia("(orientation: portrait)");
  portrait.addEventListener("change", function (e) {
    if (e.matches) {
      //alert("Portrait condition");
      sessionStorage.setItem("prev_km", slideName);
      nav.navSlide("Summary_FA-11383644");
    } else {
      //alert("Landscape condition");
      prev_km = sessionStorage.getItem("prev_km");
      sessionStorage.removeItem("prev_km");
      nav.navSlide(prev_km);
    }
  });
  setTimeout(function () {
    $(".page_isi_content").show();
  }, 100);

});

function createglobal() {
  // page ISI content
  $(`<!-- page isi -->
    <div class="page_isi">
      <div class="page_isi_content_wrapper">
        <div class="page_isi_content">
        ${shared.isiContent}
        </div>
      </div>
      <div id="open_isi" class="nvs_link popup_open" data-nav="isi_popup">
        <span class="nvs_link_text">View more</span>
        <svg width="24" height="24" viewBox="0 0 24 24" class="icon_svg">
          <use href="#svg_icons_icon_launch_modal"/>
        </svg>
      </div>
    </div>
  `).insertAfter(".page_content");
  /* setTimeout(function(){
    page_isi_scroll = new IScroll($(`.page_isi_content_wrapper`)[0], scroll_properties);
    page_isi_scroll.scrollTo(0, isiScrollTo);
  }, 200); */

  // footer content
  var footerPopupLinks = "";
  shared.footer.footer_popup_links.forEach((footerPopupItem) => {
    footerPopupLinks += `<div id='open_${footerPopupItem.name.toLowerCase().replace(" ", "_")}' class='footer_icons ${footerPopupItem.type}' data-nav='${footerPopupItem.nav}'>
     <svg width="${svg_icon_size}" height="${svg_icon_size}" viewBox="0 0 ${svg_icon_size} ${svg_icon_size}" class="icon_svg">
       <use href="#svg_icons_${footerPopupItem.icon}"/>
     </svg>
     <p>${footerPopupItem.name}</p>
   </div>`;
  });
  var footerNavLinks = "";
  shared.footer.footer_nav_links.forEach((footerNavItem) => {
    footerNavLinks += `<div class='footer_text ${footerNavItem.type}' data-km='${footerNavItem.nav}'>
     <span>${footerNavItem.name}</span>
   </div>`;
  });

  $(`<!-- footer -->
   <div id='footer'>
     <div id='brand_logo' class='brand_logo footer_content'></div>
     <div id='open_menu' class='footer_content'>
       <div class='footer_icons'>
        <svg width="${svg_icon_size}" height="${svg_icon_size}" viewBox="0 0 ${svg_icon_size} ${svg_icon_size}" class="icon_svg">
					<use style="fill: #FFA168" href="#svg_icons_menu_open"/>
				</svg>
        <p style="color: #1D4289">MENU</p>
       </div>
     </div>
     <div id='nav_arrows' class='footer_content'>
       <div id='prev_arrow' class='footer_icons'>
         <svg width="${svg_icon_size}" height="${svg_icon_size}" viewBox="0 0 ${svg_icon_size} ${svg_icon_size}" class="icon_svg">
             <use href="#svg_icons_arrow_back"/>
         </svg>
         <p>Prev</p>
       </div>
       <div id='next_arrow' class='footer_icons'>
         <svg width="${svg_icon_size}" height="${svg_icon_size}" viewBox="0 0 ${svg_icon_size} ${svg_icon_size}" class="icon_svg">
             <use href="#svg_icons_arrow_forward"/>
         </svg>
         <p>Next</p>
       </div>
     </div>
     <div id='footer_popup_links_wrapper' class='footer_content'>
       ${footerPopupLinks}
     </div>
     <div id='footer_divider' class='footer_content'>
       <div class='divider_line'></div>
     </div>
     <div id='footer_nav_links_wrapper' class='footer_content'>
       ${footerNavLinks}
     </div>
   </div>
   <!-- Main slide ENDS -->`
  ).insertAfter(".page_isi");

  // email button functionality
  $(document).on(tarEvent, ".send_email", function () {
    var template_details = $(this).attr("data-template");
    var fragment_details = $(this).attr("data-frag") == "" ? [] : $(this).attr("data-frag").split(",");

    clickstream_obj.Track_Element_Id_vod__c = $(this).text().trim();
    clickstream_obj.Track_Element_Type_vod__c = "Email";
    clickstream_obj.Track_Element_Description_vod__c = `Approved Email sent from iCVA`;
    clickstream_obj.Selected_Items_vod__c = "Button";
    clickstream_obj.Usage_Start_Time_vod__c = new Date().toISOString();
    clickstream_obj.Usage_Duration_vod__c = 0;
    // clickstream tracking - data, callback function
    handleClickstreamTracking(clickstream_obj, function () {
      get_ae_details(template_details, fragment_details);
    });

  });

  // footer functionality
  $("#brand_logo").bind(tarEvent, function () {
    setFlow("flow_default", "Brand logo", "Image");
  });
  $("#open_home").bind(tarEvent, function () {
    setFlow("flow_default", "Brand logo", "Image");
  });
  $("#open_summary").bind(tarEvent, function () {
    nav.navSlide($(this).attr("Summary_FA-11383644"));
  });
  $(".footer_nav").each(function () {
    ($(this).attr("data-km") == slideName) ? $(this).addClass("active") : "";
  });
  $('#footer_nav_links_wrapper .footer_nav').last().bind(tarEndEvent, function () {
    var title_page = document.title;
    //alert(title_page);
    sessionStorage.setItem("parentPIslide", title_page);
    com.veeva.clm.gotoSlide("km_name.zip", "access genius presentation id");
  });

  // ISI popup content
  $(".container").append(`<!-- isi popup-->
    <div id="isi_popup" class='popup'>
      <div id="isi_overlay" class="popup_overlay"></div>
      <div id="isi_bg" class="popup_bg">
        <!-- <div class="popup_header">IMPORTANT SAFETY INFORMATION</div> -->
        <div id="isi_content_wrapper" class="popup_content_wrapper popup_scroll_props">
          <div id="isi_content" class="popup_scroll_content">
            ${shared.isiContent}
          </div>
        </div>
        <div id="isi_close" class="popup_close">
          <svg viewBox="0 0 24 24" class="icon_svg popup_close_svg">
            <use href="#svg_icons_menu_close"/>
          </svg>
        </div>
      </div>
    </div>
  `);

  //on page load, set animation toggle state based on session storage value
  if (sessionStorage.getItem("isAnimationEnabled") == null) {
    isAnimationEnabled = true;
    sessionStorage.setItem("isAnimationEnabled", isAnimationEnabled);
    $("#toggle_btn_active_mer").show();
    $("#toggle_btn_inactive_mer").hide();
  } else {
    isAnimationEnabled = (sessionStorage.getItem("isAnimationEnabled").toLowerCase() === 'true'); //parse string to boolean
    if (isAnimationEnabled == true) {
      $("#toggle_btn_active_mer").show();
      $("#toggle_btn_inactive_mer").hide();
    } else {
      $("#toggle_btn_inactive_mer").show();
      $("#toggle_btn_active_mer").hide();
    }
  }


  // animation button toggle functionality
  $("#animation_emp").on("click", function () {
    //alert("ok")

    if (isAnimationEnabled == true) {
      isAnimationEnabled = false;
      sessionStorage.setItem("isAnimationEnabled", isAnimationEnabled);
      $("#toggle_btn_active_mer").hide();
      $("#toggle_btn_inactive_mer").show();
    } else {
      isAnimationEnabled = true;
      sessionStorage.setItem("isAnimationEnabled", isAnimationEnabled);
      $("#toggle_btn_inactive_mer").hide();
      $("#toggle_btn_active_mer").show();
    }
    location.reload(true);
  });

  // menu popup content
  var menuItems = "";
  var menuType = shared.menuPopup.type;
  function createMenu(menuArray) {
    menuArray.forEach((menuItem) => {
      if (menuType == "vt") {
        if (menuItem.subMenu) {
          menuItems += `<div class='menu_sections_${menuType}'>
                         <div class='menu_item_${menuType} menu_dropdown closed' data-km='${menuItem.nav}'>
                           <span>${menuItem.name}</span>
                           <svg viewBox="0 0 24 24" class="icon_svg menu_arrow">
                             <use href="#svg_icons_expand_more"/>
                           </svg>
                         </div>
                         <div class='sub_menu_wrapper_${menuType}'>`;
          menuItem.subMenu.forEach((subMenuItem) => {
            menuItems += `<div class='sub_menu_item_${menuType} menu_nav' data-km='${subMenuItem.nav}'>${subMenuItem.name}</div>`;
          });
          menuItems += `</div></div>`;
        } else {
          menuItems += `<div class='menu_sections_${menuType}'>
                           <div class='menu_item_${menuType} menu_nav' data-km='${menuItem.nav}'>
                             <span>${menuItem.name}</span>
                           </div>
                         </div>`;
        }
      } else if (menuType == "ht") {
        menuItems += `<div class='menu_sections_${menuType}'>
                         <div class='menu_item_${menuType}'>
                           <span>${menuItem.name}</span></div>`;
        if (!menuItem.subMenu) {
          menuItems += `<div class='sub_menu_item_${menuType} menu_nav' data-km='${menuItem.nav}'>${menuItem.name}</div>`;
        } else {
          menuItem.subMenu.forEach((subMenuItem) => {
            menuItems += `<div class='sub_menu_item_${menuType} menu_nav' data-km='${subMenuItem.nav}'>${subMenuItem.name}</div>`;
          });
        }
        menuItems += `</div>`;
      }
    });
  }
  if (active_flow == "flow_default" || active_flow == undefined) {
    createMenu(shared.menuPopup.menuItems);
  } else {
    createMenu(shared.menuPopup[`menuItems_${active_flow}`]);
  }

  $('.container').append(`<!-- menu popup -->
     <div id='menu_popup_${menuType}' class='menu_popup'>
       <div id='menu_wrapper_${menuType}'>
         ${menuItems}
       </div>
     </div>
   `);
  // menu functionality
  $("#open_menu").bind(tarEvent, function () {
    $("#open_menu").toggleClass("active");
    if (menuType == "ht") {
      if ($("#menu_popup_ht").css("display") == "block") {
        $("#menu_popup_ht").slideUp(150);
      } else {
        $("#menu_popup_ht").slideDown(200);
      }
    } else if (menuType == "vt") {
      if ($("#menu_popup_vt").css("right") == "0px") {
        $("#menu_popup_vt").animate({ "right": "-20%" }, 150);
      } else {
        $("#menu_popup_vt").animate({ "right": "0%" }, 200);
      }
    }
  });

  // close menu popup on click outside
  $(document).bind(tarEvent, function (e) {
    var clickarea = $("#open_menu");
    var container = $("#menu_popup_" + menuType);
    // if((e.target.id != 'menu_popup_'+menuType) && (e.target.id != 'open_menu')) {
    if (!clickarea.is(e.target) && clickarea.has(e.target).length === 0 && !container.is(e.target) && container.has(e.target).length === 0 && ($("#menu_popup_ht").css("display") == "block" || $("#menu_popup_vt").css("right") == "0px")) {
      $("#menu_popup_ht").slideUp(150);
      $("#menu_popup_vt").animate({ "right": "-20%" }, 150);
      $("#open_menu").removeClass("active");
    }
  });

  $(".menu_dropdown").bind(tarEvent, function () {
    if ($(this).hasClass("closed")) {
      // if this has closed class, remove it and add open class
      $(".menu_dropdown").removeClass("open").addClass("closed");
      $(this).removeClass("closed").addClass("open");
      // find the arrow and change it
      $(".menu_arrow").html(open_arrow);
      $(this).find(".menu_arrow").html(close_arrow);
      // find the sibling content and show it
      $(".sub_menu_wrapper_vt").hide();
      /* scroll START, comment/uncomment as needed */
      /* Max Height is wrapper padding-top + 10 menu items x its (padding top, bottom, font size) */
      var menuMaxHeight = 14 + 10 * (10 + 10 + 12);
      var subMenuHeight = $(this).siblings().height();
      if (subMenuHeight > menuMaxHeight) {
        $(this).siblings().css({ "max-height": menuMaxHeight + "px", "overflow-y": "scroll" });
      }
      /* scroll END, comment/uncomment as needed */
      $(this).siblings().show();
    } else {
      $(".menu_dropdown").removeClass("open").addClass("closed");
      $(".menu_arrow").html(open_arrow);
      $(".sub_menu_wrapper_vt").hide();
    }
  });


  // create sub nav and breadcrumb using shared.menuPopup
  var subNavList = "";
  var breadcrumbList = [];
  var breadcrumb_seperator = `<svg width="${svg_icon_size}" height="${svg_icon_size}" viewBox="0 0 ${svg_icon_size} ${svg_icon_size}" class="icon_svg nvs_breadcrumb_separator"><use href="#svg_icons_arrow_right"/></svg>`;

  var selectedSubNav = [];
  function checkSubMenu(arrayInput, parentInfo) {
    arrayInput.forEach(function (value) {
      parentInfo = parentInfo || []
      if (value.subMenu) {
        var initLength = selectedSubNav.length;
        checkSubMenu(value.subMenu, parentInfo);
        if (initLength != selectedSubNav.length) {
          selectedSubNav.unshift(value.name + ';' + value.nav);
        }
      } else {
        if (value.nav == slideName) {
          selectedSubNav.unshift(value.name + ';' + value.nav);
          subNavs(arrayInput);
          breadcrumb(arrayInput);
        }
      }
    });
    if (selectedSubNav && selectedSubNav.length > 0) {
      breadcrumbList = selectedSubNav
      breadcrumb()
    }
  }

  function subNavs(arrayInput) {

    // create sub nav 
    if (arrayInput.length > 1) {
      arrayInput.forEach(function (subNav) {
        subNavList += `<div class="sub_nav_item km_nav" data-km="${subNav.nav}">${subNav.name}</div>`;
      });
      $(".page_content").append(`<div class="sub_nav"><div class="sub_nav_wrapper">${subNavList}</div></div>`);
      $(".sub_nav_item[data-km='" + slideName + "']").addClass("active");
    }
  }

  function breadcrumb() {

    // create breadcrumb
    $(".nvs_breadcrumb").html("");
    breadcrumbList.slice(0, -1).forEach(function (value, index) {
      var breadcrumb_text = value.split(";")[0];
      var breadcrumb_link = value.split(";")[1];
      if (index == breadcrumbList.length) {
        $(".nvs_breadcrumb").append(`<span>${breadcrumb_text}</span>`);
      } else {
        $(".nvs_breadcrumb").append(`<span class="nvs_breadcrumb_link km_nav" data-km="${breadcrumb_link}">${breadcrumb_text}</span>`);
      }
      $(".nvs_breadcrumb").append(breadcrumb_seperator);
    })
  }

  if (active_flow == "flow_default" || active_flow == undefined) {
    checkSubMenu(shared.menuPopup.menuItems);
  } else {
    checkSubMenu(shared.menuPopup[`menuItems_${active_flow}`]);
  }
  // feedback popup content
  function feedback(topicName) {
    var topicData = "";
    topicData += `<div id="${topicName}" class="nvs_checkbox_group">`;
    shared.menuPopup.menuItems.forEach((topic, index) => {
      topicData += `
      <div class="nvs_checkbox_item">
        <div class="nvs_checkbox_icon"></div>
        <div class="nvs_checkbox_label">${topic.name}</div>
      </div>`;
    });
    topicData += `</div>`;
    return topicData;
  }

  $(".container").append(`<!-- feedback popup -->
    <div id='feedback_popup' class='popup'>
      <div id="feedback_overlay" class="popup_overlay"></div>
      <div id="feedback_bg" class="popup_bg">
        <p class="popup_header">Feedback/bridging to the next call</p>
        <div id="feedback_content_wrapper" class="popup_content_wrapper">
          <div id="feedback_content" class="popup_scroll_content">
            <p class="feedback_qn" for="covered_topics">Today we have discussed:</p>
            ${feedback("coveredTopics")}
            <p class="feedback_qn" for="next_topics">Next time shall we discuss:</p>
            ${feedback("nextTopics")}
            <p class="feedback_qn" >Provide any additional comments:</p>
            <textarea id="feedback_comment" rows="6"></textarea>
            <div id="submit_feedback" class="nvs_btn nvs_btn_primary">
              Submit 
              <svg width="24" height="24" viewBox="0 0 24 24" class="icon_svg nvs_white">
								<use href="#svg_icons_arrow_forward"/>
              </svg>
            </div>
          </div>
        </div>
        <div id="feedback_close" class="popup_close">
          <svg viewBox="0 0 24 24" class="icon_svg popup_close_svg">
            <use href="#svg_icons_menu_close"/>
          </svg>
        </div>
      </div>
    </div>`);
  // feedback popup functionality
  $("#coveredTopics .nvs_checkbox_item").bind(tarEvent, function () {
    var selectedTopic = $(this).find(".nvs_checkbox_label").html();
    if ($(this).hasClass("active")) {
      $("#nextTopics .nvs_checkbox_label").each(function () {
        if ($(this).html() === selectedTopic) {
          $(this).siblings(".nvs_checkbox_icon").removeClass("disabled");
        }
      });
    } else {
      $("#nextTopics .nvs_checkbox_label").each(function () {
        if ($(this).html() === selectedTopic) {
          $(this).siblings(".nvs_checkbox_icon").addClass("disabled");
        }
      });
    }
  });

  $("#nextTopics .nvs_checkbox_item").bind(tarEvent, function () {
    var selectedTopic = $(this).find(".nvs_checkbox_label").html();
    if ($(this).hasClass("active")) {
      $("#coveredTopics .nvs_checkbox_label").each(function () {
        if ($(this).html() === selectedTopic) {
          $(this).siblings(".nvs_checkbox_icon").removeClass("disabled");
        }
      });
    } else {
      $("#coveredTopics .nvs_checkbox_label").each(function () {
        if ($(this).html() === selectedTopic) {
          $(this).siblings(".nvs_checkbox_icon").addClass("disabled");
        }
      });
    }
  });

  $("#submit_feedback").bind(tarEvent, function () {
    var text = $("#feedback_comment").val();
    var coveredTopics = [];
    var nextTopics = [];
    $("#coveredTopics .nvs_checkbox_item").each(function () {
      if ($(this).hasClass("active")) {
        coveredTopics.push($(this).find(".nvs_checkbox_label").html());
      }
    });
    $("#nextTopics .nvs_checkbox_item").each(function () {
      if ($(this).hasClass("active")) {
        nextTopics.push($(this).find(".nvs_checkbox_label").html());
      }
    });

    clickstream_obj.Track_Element_Id_vod__c = "Submit";
    clickstream_obj.Track_Element_Type_vod__c = "Feedback popup";
    clickstream_obj.Track_Element_Description_vod__c = `Covered Topics: ${coveredTopics.join(", ")}; Next Topics: ${nextTopics.join(", ")}; Additional Comments: ${text}`
    clickstream_obj.Selected_Items_vod__c = "Button";
    clickstream_obj.Usage_Start_Time_vod__c = new Date().toISOString();
    clickstream_obj.Usage_Duration_vod__c = 0;
    // clickstream tracking - data, callback function
    handleClickstreamTracking(clickstream_obj, function () {
      alert("saved successfully");
    });
  });

  // objection popup content
  var objectionData = "";
  shared.objectionPopup.forEach((objectionItem, index) => {
    objectionData += `<div class="objection_item">
      <p class="objection_name">Q: ${objectionItem.name}</p>
      <p class="objection_text">A: ${objectionItem.text}</p>
    </div>`;
  });

  $(".container").append(`<!-- objection popup -->
    <div id='objection_popup' class='popup'>
      <div id="objection_overlay" class="popup_overlay"></div>
      <div id="objection_bg" class="popup_bg">
        <p class="popup_header">Objection Handling</p>
        <div id="objection_content_wrapper" class="popup_content_wrapper">
          <div id="objection_content" class="popup_scroll_content">
            ${objectionData}
          </div>
        </div>
        <div id="objection_close" class="popup_close">
          <svg viewBox="0 0 24 24" class="icon_svg popup_close_svg">
            <use href="#svg_icons_menu_close"/>
          </svg>
        </div>
      </div>
    </div>`);

  // short call popup content
  var flowsData = "";
  shared.flowsPopup.flows.forEach((flowItem, index) => {
    flowsData += `<div class="flow_item" data-flow="${flowItem.flowSession}">
      <p class="flow_name">${flowItem.flowName}</p>
      <svg width="24" height="24" viewBox="0 0 24 24" class="icon_svg">
        <use href="#svg_icons_arrow_forward"></use>
      </svg>
    </div>
    `;
  });

  $(".container").append(`<!-- flows popup -->
    <div id='flows_popup' class='popup'>
      <div id="flows_overlay" class="popup_overlay"></div>
      <div id="flows_bg" class="popup_bg popup_bg_small_v2">
        <p class="popup_header">Short call flows</p>
        <div id="flows_content_wrapper" class="popup_content_wrapper">
          <div id="flows_content" class="popup_scroll_content">
            ${flowsData}
          </div>
        </div>
        <div id="flows_close" class="popup_close">
          <svg viewBox="0 0 24 24" class="icon_svg popup_close_svg">
            <use href="#svg_icons_menu_close"/>
          </svg>
        </div>
      </div>
    </div>`
  );
  $(".flow_item[data-flow='" + active_flow + "']").addClass("active");

  // short call popup functionality
  $(".flow_item").bind(tarEvent, function () {
    setFlow($(this).attr("data-flow"), $(this).text().trim(), "Button");
  });

  // footnotes popup content
  $(".container").append(`<!-- footnotes popup -->
    <div id='footnotes_popup' class='popup'>
      <div id="footnotes_overlay" class="popup_overlay"></div>
      <div id="footnotes_bg" class="popup_bg video_popup_bg popup_bg_small_v2">
        <p class="popup_header"></p>
        <div id="footnotes_content_wrapper" class="popup_content_wrapper">
          <div id="footnotes_content" class="popup_scroll_content">
            <div id="videos_header" class="resources_header">
								<svg viewBox="0 0 24 24" class="icon_svg" id="video_icon_svg">
									<use href="#svg_icons_ondemand_video"/>
								</svg>
								<p class="resources_section_header">Videos</p>
							</div>
							<div class="videos_wrapper">
								<!-- Added via JS file -->
							</div>
							<div id="docs_header" class="resources_header">
								<svg viewBox="0 0 24 24" class="icon_svg" id="doc_icon_svg">
									<use href="#svg_icons_text_snippet"/>
								</svg>
								<p class="resources_section_header">Documents</p>
							</div>
							<div class="docs_wrapper">
								<!-- Added via JS file -->
							</div>
							<div id="email_btn_wrapper">
								<div id="email_resources" class="nvs_btn nvs_btn_primary disabled">
									Email
									<svg viewBox="0 0 24 24" class="icon_svg nvs_white">
										<use href="#svg_icons_email"/>
									</svg>
          </div>
          <div class="res_QR"></div>
        </div>
        <div id="footnotes_close" class="popup_close">
          <svg viewBox="0 0 24 24" class="icon_svg popup_close_svg">
            <use href="#svg_icons_menu_close"/>
          </svg>
        </div>
      </div>
    </div>`);


  $(".container").append(`<div id="video_popup" class="popup">
		<video id="resource_video" class="" controls>
			<source id="video_src" src="" type="video/mp4">
		</video>
		<div id="video_close" class="popup_close popup_close_btn video_popup_close_btn">
			<svg viewBox="0 0 24 24" class="icon_svg popup_close_svg">
				<use href="#svg_icons_menu_close"/>
			</svg>
		</div>
	</div> `);

  // ref popup content
  $(".container").append(`<!-- ref popup -->
    <div id='ref_popup' class='popup'>
         <div id="ref_overlay" class="popup_overlay"></div>
       <div id="ref_bg" class="popup_bg">
        <p class="popup_header"></p>
        <div id="ref_content_wrapper" class="popup_content_wrapper">
          <div id="ref_content" class="popup_scroll_content">
            <ol></ol>
          </div>
        </div>
        <div id="ref_close" class="popup_close">
          <svg viewBox="0 0 24 24" class="icon_svg popup_close_svg">
            <use href="#svg_icons_menu_close"/>
          </svg>
        </div>
      </div>
    </div>`);

  // pi functionality
  $("#open_pi").bind(tarEvent, function () {
    document.location.href = "../shared/media/pdfs/pi_pluvicto.pdf";
  });

  // footer arrows functionality
  $("#prev_arrow").bind(tarEvent, function () {
    navigateToPrevSlide();
  });
  $("#next_arrow").bind(tarEvent, function () {
    navigateToNextSlide();
  });

  // slide navigation functionality
  $(".km_nav, .menu_nav, .footer_nav").bind(tarEndEvent, function () {
    km_name = $(this).attr("data-km");
    if (km_name != "" && slideName != km_name) {
      clickstream_obj.Track_Element_Id_vod__c = $(this).text().trim();
      clickstream_obj.Track_Element_Type_vod__c = "CTA navigation";
      clickstream_obj.Track_Element_Description_vod__c = "CTA that links to other slide";
      clickstream_obj.Selected_Items_vod__c = km_name;
      clickstream_obj.Usage_Start_Time_vod__c = new Date().toISOString();
      clickstream_obj.Usage_Duration_vod__c = 0;
      // clickstream tracking - data, callback function
      handleClickstreamTracking(clickstream_obj, function () {
        nav.navSlide(km_name);
      }
      );
    }
  });

  // popup functionality
  $(".popup_open").bind(tarEvent, function () {
    popup_name = $(this).attr("data-nav");
    if (popup_name != "" && !$(this).hasClass("disabled")) {
      clickstream_obj.Track_Element_Id_vod__c = $(this).text().trim();
      clickstream_obj.Track_Element_Type_vod__c = "Popup";
      clickstream_obj.Track_Element_Description_vod__c = "CTA that opens popup";
      clickstream_obj.Selected_Items_vod__c = "Button";
      clickstream_obj.Usage_Start_Time_vod__c = new Date().toISOString();
      clickstream_obj.Usage_Duration_vod__c = 0;
      // clickstream tracking - data, callback function
      handleClickstreamTracking(clickstream_obj, function () {
        // show the popup
        $("#" + popup_name).fadeIn(150);
        // check and add scroll if needed
        var wrapper_height = $(`#${popup_name} .popup_content_wrapper`).height();
        var content_height = $(`#${popup_name} .popup_scroll_content`).height();
        if (content_height > wrapper_height) {
          $(`#${popup_name} .popup_content_wrapper`).addClass("popup_scroll_props");
          popup_scroll = new IScroll($(`#${popup_name} .popup_content_wrapper`)[0], scroll_properties);
        }
      });
    }
  });

  $(document).on(tarEvent, ".popup_close,.popup_overlay", function () {
    // $(".popup_close").bind(tarEvent, function () {
    popup_name = $(this).attr("id").split("_")[0];
    $("#" + popup_name + "_popup").fadeOut(150);
    if (popup_scroll) popup_scroll.destroy();
  });

  // accordion component functionality
  $(".nvs_accordion_item").bind(tarEvent, function (e) {
    if (!$(this).hasClass("open")) {
      // if this isn't open, add open class and remove from siblings
      $(this).siblings().removeClass("open");
      $(this).addClass("open");

      // find the sibling content and show it
      var accHeight = $(this).find(".nvs_accordion_body_wrap")[0].offsetHeight;

      $(this).siblings().find(".nvs_accordion_body").animate({ "height": 0 }, 200);
      $(this).find(".nvs_accordion_body").animate({ "height": accHeight + "px" }, 200);

      // find the arrow and change it
      $(this).siblings().find(".acc_arrow").html(open_arrow);
      $(this).find(".acc_arrow").html(close_arrow);
    } else {
      // ensure accordion header is clicked, not accordion body
      if ($(".nvs_accordion_body").has(e.target).length == 0) {
        $(this).removeClass("open");
        $(this).find(".nvs_accordion_body").animate({ "height": 0 }, 200);
        $(this).find(".acc_arrow").html(open_arrow);
      }
    }
  });

  // tabbed content functionality
  var tab_active, tab_height, tab_content_height;
  $(".nvs_tab_btn").bind(tarEvent, function () {
    var tab_index = $(this).index();
    var tab_content_wrapper = $(this).parent().next();

    // highlight selected tab button
    $(this).siblings().removeClass("active");
    $(this).addClass("active");

    // show selected tab content
    tab_content_wrapper.find(".nvs_tab_content").each(function (index) {
      (index == tab_index) ? $(this).addClass("active") : $(this).removeClass("active");
    });

    // if scroll is needed in any of the tabs
    tab_height = tab_content_wrapper.find(".nvs_tab_content").height();
    tab_active = tab_content_wrapper.find(".nvs_tab_content.active").css("display") == "block" ? true : false;
    tab_content_height = tab_content_wrapper.find(".nvs_tab_content.active .nvs_tab_content_container").height();

    if (tab_active && tab_height < tab_content_height) {
      tab_content_wrapper.find(".nvs_tab_content.active").addClass("page_scroll_props");
      if (tab_content_wrapper.find(".nvs_tab_content.active").find(".iScrollVerticalScrollbar").length == 0) {
        new IScroll(tab_content_wrapper.find(".nvs_tab_content.active")[0], scroll_properties);
      }
    }

    clickstream_obj.Track_Element_Id_vod__c = $(this).text().trim();
    clickstream_obj.Track_Element_Type_vod__c = "Tabbed Content";
    clickstream_obj.Track_Element_Description_vod__c = "CTA that switches between tabbed content";
    clickstream_obj.Selected_Items_vod__c = "Button";
    clickstream_obj.Usage_Start_Time_vod__c = new Date().toISOString();
    clickstream_obj.Usage_Duration_vod__c = 0;
    // clickstream tracking - data, callback function
    handleClickstreamTracking(clickstream_obj, function () {
    });
  });

  // custom rating functionality
  $(".nvs_rating_item").bind(tarEvent, function () {
    var parent = $(this).parent();
    var selected_rating = parseInt($(this).attr("data-num"));

    $(".nvs_rating_item").removeClass("selected");
    $(this).addClass("selected");

    parent.find(".nvs_rating_icon").removeClass("active");
    parent.find(".nvs_rating_item").each(function (index) {
      if (index <= selected_rating) {
        $(this).find(".nvs_rating_icon").addClass("active");
      }
    });
  });

  // custom checkbox functionality
  // $(".nvs_checkbox_item").bind(tarEvent, function () {
  $(document).on(tarEvent, ".nvs_checkbox_item", function () {
    $(this).toggleClass("active");
    var checkbox = $(this).find(".nvs_checkbox_icon");
    if (!checkbox.hasClass("disabled")) {
      if (checkbox.hasClass("active")) {
        checkbox.html("");
        checkbox.removeClass("active");
      } else {
        checkbox.html("&check;");
        checkbox.addClass("active");
      }
    }
  });

  // custom radio button functionality
  $(".nvs_radio_item").bind(tarEvent, function () {
    var parent = $(this).parent();
    var radio = $(this).find(".nvs_radio_icon");
    if (!radio.hasClass("disabled")) {
      if (radio.hasClass("selected")) {
        radio.removeClass("selected");
      } else {
        parent.find(".nvs_radio_icon").removeClass("selected").html("");
        radio.addClass("selected");
      }
    }
  });

  // Slider/ranger functionality - To avoid page swipe in drag area
  $(".nvs_slider").on("swipeleft swiperight", function () {
    return false;
  });

  // Card flip functionality
  $(".nvs_card_flip_btn").bind(tarEvent, function () {
    $(this).parents(".nvs_card_flip").toggleClass("nvs_card_flipped");
  });

  // Carousel functionality
  var carousel_parent, carousel_id, carousel_length;
  $(".carousel_indicators, .carousel_indicators_labelled").bind(tarEvent, function () {
    carousel_parent = $(this).parents(".carousel");
    carousel_id = $(this).attr("data-id");
    updateCarousel(carousel_parent, carousel_id);
  });

  $(".carousel_left").bind(tarEvent, function () {
    carousel_parent = $(this).parents(".carousel");
    carousel_length = carousel_parent.find(".carousel_item").length;
    carousel_parent.find(".carousel_item").each(function () {
      if ($(this).hasClass("active")) {
        carousel_id = parseInt($(this).attr("data-id"));
      }
    })
    if (carousel_id == 1) {
      updateCarousel(carousel_parent, carousel_length)
    } else {
      updateCarousel(carousel_parent, carousel_id - 1);
    }
  });

  $(".carousel_right").bind(tarEvent, function () {
    carousel_parent = $(this).parents(".carousel");
    carousel_length = carousel_parent.find(".carousel_item").length;
    carousel_parent.find(".carousel_item").each(function () {
      if ($(this).hasClass("active")) {
        carousel_id = parseInt($(this).attr("data-id"));
      }
    })
    if (carousel_id == carousel_length) {
      updateCarousel(carousel_parent, 1);
    } else {
      updateCarousel(carousel_parent, carousel_id + 1);
    }
  });

  function updateCarousel(carousel_parent, carousel_index) {
    carousel_parent.find(".carousel_item").hide().removeClass("active");
    carousel_parent.find(`.carousel_item:nth-child(${carousel_index})`).show().addClass("active");
    carousel_parent.find(".carousel_indicators, .carousel_indicators_labelled").removeClass("active");
    carousel_parent.find(`.carousel_indicators:nth-child(${carousel_index}),.carousel_indicators_labelled:nth-child(${carousel_index})`).addClass("active");
  }
}

// Check the height and scroll if needed
var page_scroll;
function addScrollToPage() {
  $(".grid_layout").addClass("grid_layout_scroll_padding");
  $(".grid_layout_content_wrapper").addClass("page_scroll_props");
  page_scroll = new IScroll($(".grid_layout_content_wrapper")[0], scroll_properties);
}

$(document).ready(function () {
  (function createPageRef() {
    var pageRefData = "";
    if (pageRef) {
      $("#ref_popup .popup_header").html(pageRef.length == 1 ? "Reference:" : "References:");
      pageRef.forEach((pageRefItem, index) => {
        pageRefData += `
          <li>${pageRefItem}</li>`;
      });
      $("#ref_content ol").append(pageRefData);
    } else {
      $("#open_references").addClass("disabled");
    }
  })();

  (function createPageFootnotes() {
    var pageFootnotesData = "";
    if (pageFootnotes) {
      $("#footnotes_popup .popup_header").html(pageFootnotes.length == 1 ? "Resources" : "Resources");
      pageFootnotes.forEach((pageFootnoteItem, index) => {
        if (index < pageFootnotes.length) {
          pageFootnotesData += `
            <tr>
              <td class="footnote_symbol">${pageFootnoteItem[0] == "" ? shared.footnotes[index] : pageFootnoteItem[0]}</td>
              <td class="footnote_text">${pageFootnoteItem[1]}</td>
            </tr>`;
        } else {
          pageFootnotesData += `
            <tr>
              <td>${shared.footnotes[index - pageFootnotes.length]}${shared.footnotes[index - pageFootnotes.length]}</td>
              <td class="footnote_text">${pageFootnoteItem}</td>
            </tr>`;
        }
      });
      $("#footnotes_content table").append(pageFootnotesData);
    } else {
      $("#open_footnotes").addClass("disabled");
    }
  })();

  (function createPageEmail() {
    if (pageEmailDetails) {
      if (pageEmailDetails.length == 1) {
        $("#open_email").addClass("send_email").attr("data-template", pageEmailDetails[0].templateID).attr("data-frag", pageEmailDetails[0].fragmentIDs);
      } else {
        var pageEmailData = "";
        pageEmailDetails.forEach((emailDetail, index) => {
          pageEmailData += `<p class="email_item send_email" data-template="${emailDetail.templateID}" data-frag="${emailDetail.fragmentIDs}">${emailDetail.name}</p>`;
        });

        $(".container").append(`
          <!-- email Popup -->
          <div id='email_popup' class='popup'>
            <div id="email_overlay" class="popup_overlay"></div>
            <div id="email_bg" class="popup_bg popup_bg_small_v2">
              <p class="popup_header">Select template</p>
              <div id="email_content_wrapper" class="popup_content_wrapper">
                <div id="email_content" class="popup_scroll_content">
                  ${pageEmailData}
                </div>
              </div>
              <div id="email_close" class="popup_close">
                <svg viewBox="0 0 24 24" class="icon_svg popup_close_svg">
                  <use href="#svg_icons_menu_close"/>
                </svg>
              </div>
            </div>
          </div>
        `);

        $("#open_email").attr("data-nav", "email_popup");
      }

    } else {
      $("#open_email").addClass("disabled");
    }
  })();

  (function addWaterMark() {
    $(".container").append(`<p id="wm_1" class="watermark">Internal Use Only</p>
      <p id="wm_2" class="watermark">Feedback Purposes Only</p>
      <p id="wm_3" class="watermark">Screenshots or Recording of Content is Not Allowed</p>`);
  })();
})






function setFlow(selectedFlowName, track_id, track_item) {
  $(".flow_item").removeClass("active");
  $(this).addClass("active");
  selected_flow = selectedFlowName;

  if (selected_flow != "") {
    clickstream_obj.Track_Element_Id_vod__c = track_id;
    clickstream_obj.Track_Element_Type_vod__c = "Flow Navigation";
    clickstream_obj.Track_Element_Description_vod__c = `Selected flow: ${selected_flow}`;
    clickstream_obj.Selected_Items_vod__c = track_item;
    clickstream_obj.Usage_Start_Time_vod__c = new Date().toISOString();
    clickstream_obj.Usage_Duration_vod__c = 0;

    // clickstream tracking - data, callback function
    handleClickstreamTracking(clickstream_obj, function () {
      sessionStorage.setItem("selected_flow", selected_flow);
      setNavUsingSession();
      nav.navSlide(slidesJsonVal[0].slideMediaName);
    });
  }
}

$(document).ready(function () {
  function pinkBracket(text) {
    return text.replace('[', '<span class="pink_bracket">[</span>').replace(']', '<span class="pink_bracket">]</span>');
  }
  let lastItem = $('#footer_nav_links_wrapper .footer_nav').last();
  let span = lastItem.find('span');
  let spanText = span.text().trim();
  if (spanText.includes('[') && spanText.includes(']')) {
    span.html(pinkBracket(spanText));
  }
  let fifthItem = $('.menu_sections_ht').eq(6);
  let lastItemMenu = fifthItem.children().last();
  let text_item = lastItemMenu.text().trim();
  if (text_item.includes('[') && text_item.includes(']')) {
    lastItemMenu.html(pinkBracket(text_item));
  }
  let subLastItem = $('.sub_nav_wrapper .sub_nav_item').last();
  let subText = subLastItem.text().trim();
  console.log(subText)
  if (subText.includes('[') && subText.includes(']')) {
    subLastItem.html(pinkBracket(subText));
  }
})

// function to access CSS variables in JS files
var r = document.querySelector(':root');
var rs;
(function myFunction_get() {
  rs = getComputedStyle(r);
})();

function handleClickstreamTracking(clickstreamData, callbackFunction) {
  var clickstream_final_obj = {};
  clickstream_final_obj = { ...clickstreamData }
  if (local) {
    console.log(clickstream_final_obj);
    callbackFunction();
  } else {
    com.veeva.clm.createRecord(
      "Call_Clickstream_vod__c",
      clickstream_final_obj,
      function (result) {
        clickstream_obj = {};
        callbackFunction();
      }
    );
  }
}

// launch RTE API functions START ----------------------------------------------------
var environment = "dev"; // dev, prod
var vaultUrl,
  template,
  frag_vault_arr = [],
  fragmentsArr = [],
  fragmentCount = 0;
function get_ae_details(template, fragArr) {
  if (environment == "dev") {
    vaultUrl = "https://vv-agency-pls-novartis.veevavault.com";
  } else if (environment == "prod") {
    vaultUrl = "https://novartis-oncore.veevavault.com";
  }
  frag_vault_arr = fragArr;
  if (local) {
    alert("Please use Veeva iRep via account to launch approved email");
  } else {
    GetTemplateID(template);
  }
}
function GetTemplateID(template) {
  com.veeva.clm.getApprovedDocument(vaultUrl, template, storeTemplateID);
}
function storeTemplateID(result) {
  template = result.Approved_Document_vod__c.ID; //16 digit salesforce ID
  GetFragmentID();
}
function GetFragmentID() {
  if (frag_vault_arr.length == 0) {
    fragmentsArr = [];
    launchAE();
  } else {
    com.veeva.clm.getApprovedDocument(
      vaultUrl,
      frag_vault_arr[fragmentCount],
      storeFragmentsInArr
    );
  }
}
function storeFragmentsInArr(result) {
  fragmentsArr.push(result.Approved_Document_vod__c.ID); //16 digit salesforce ID

  fragmentCount++;

  if (fragmentCount < frag_vault_arr.length) {
    GetFragmentID();
  } else {
    launchAE();
  }
}
function launchAE() {
  com.veeva.clm.launchApprovedEmail(template, fragmentsArr, finalCall);
}
function finalCall() {
  // reset selected resources
  fragmentCount = 0;
  frag_vault_arr = [];
  fragmentsArr = [];
  $("#fragmentsTotal").hide().html(fragmentCount);
}
// launch RTE API functions END ----------------------------------------------------

function getSlideName() {
  slideName = document.title;
  currentSlide = slideName;
  return slideName;
}
/*************************************** Popup events in page ************************/
var touchStartPos = null;
function setPopupEvent(targetObj, callBackFn) {
  targetObj
    .unbind(tarEvent)
    .bind(tarEvent, function (e) {
      touchStartPos = 0;
      touchStartPos = getPageXVal(e);
    })
    .bind(tarEndEvent, function (e) {
      var self = this;
      var distance = touchStartPos - getPageXVal(e);
      if (!(distance > 20 || distance < -20)) {
        callBackFn.call(self);
      }
    });
}
function getPageXVal(e) {
  var x = 0;
  if (e.type == "touchstart" || e.type == "touchmove" || e.type == "touchend" || e.type == "touchcancel") {
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    x = touch.pageX;
  } else if (e.type == "mousedown" || e.type == "mouseup" || e.type == "mousemove" || e.type == "mouseover" || e.type == "mouseout" || e.type == "mouseenter" || e.type == "mouseleave") {
    x = e.pageX;
  }
  return x;
}
/*************************************** END Popup events in page ********************/

/********************** Mandatory Method to apply events to all the objects.
@: tagetObj : It is a target div and  event applied to this div object.
@: eventType: It is a normal JQUERY events. i.e. 'mousedown','click','mouseup' etc...
@: callBKFn: It is a callback button of the target div. All the manipulation/action should come inside this function. This function should be available in the page level js file.
@: isRemoveEvent: Boolean True/False. If it is TRUE, it will remove previous eventtype and keep only the given event.
***********************/
var verifyMetaData = this["captureEvent"];

function setObjectEvent(targetObj, eventType, callBKFn, isRemoveEvent) {
  if (eventType === MOUSE_DOWN) eventType = tarEvent;
  if (isRemoveEvent) targetObj.off(eventType);
  targetObj.on(eventType, function () {
    if (!slidingpopupopened) {
      callBKFn.call($(this));
    }
  });
}
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

$(document).ready(function () {
  var resources = {
    videos: [
      {
        video_image: "skin_video.png",
        video_title: "PASI Video Update",
        video_target: "video_sample.mp4",
        video_email: true,
        video_fragmentID: "7204"
      },

    ],
    docs: [
      {
        doc_title: "Monitoring Brochure",
        doc_target: "sample_301217.pdf",
        doc_email: true,
        doc_fragmentID: "7204"
      },
      {
        doc_title: "Experience Brochure",
        doc_target: "sample_301217.pdf",
        doc_email: true,
        doc_fragmentID: "7204"
      },
      {
        doc_title: "Treatment Guide",
        doc_target: "sample_301217.pdf",
        doc_email: true,
        doc_fragmentID: "7203"
      },
    ]
  }

  var videoContent = "", docContent = "";
  // Add video resources to the HTML DOM
  resources.videos.forEach((videoItem) => {
    videoContent += `<div class="video_resource">
      <div class="video_thumbnail preview_btn" data-type="video" data-target="${videoItem.video_target}">
        <div class="img-popup"></div>
        <svg viewBox="0 0 24 24" class="icon_svg video_play_icon">
          <use href="#svg_icons_play_arrow"/>
        </svg>
      </div>
      <div>MOA</div>
      <div class="nvs_checkbox_item" data-frag="${videoItem.video_fragmentID}">
        <div class="nvs_checkbox_icon ${videoItem.video_email == true ? '' : 'disabled'}"></div>
      </div>
    </div>`
  })
  $(".videos_wrapper").append(videoContent);

  // Add PDF resources to the HTML DOM
  resources.docs.forEach((docItem) => {
    docContent += `<div class="doc_resource" >
      <div class="resource_detail">   
        <p class="nvs_link preview_btn" data-type="pdf" data-target="${docItem.doc_target}">
          <span class="nvs_link_text">${docItem.doc_title}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" class="icon_svg">
            <use href="#svg_icons_launch"/>
          </svg>
        </p>
        <div class="nvs_checkbox_item" data-frag="${docItem.doc_fragmentID}">
          <div class="nvs_checkbox_icon ${docItem.doc_email == true ? '' : 'disabled'}"></div>
        </div>
      </div>
    </div>`
  })
  $(".docs_wrapper").append(docContent);

  // Check the height and scroll if needed
  var wrapper_height, content_height, resources_scroll;
  wrapper_height = $(".grid_layout_content_wrapper").height();
  content_height = $(".grid_layout_content").height();
  if (content_height > wrapper_height) {
    $(".grid_layout").addClass("grid_layout_scroll_padding");
    $(".grid_layout_content_wrapper").addClass("page_scroll_props");
    resources_scroll = new IScroll($(".grid_layout_content_wrapper")[0], scroll_properties);
  }

  // preview the resources
  var fileType;
  $(".preview_btn").bind(tarEvent, function () {
    fileType = $(this).attr("data-type");
    if (fileType == "pdf") {
      document.location.href =
        "media/docs/" + $(this).attr("data-target");
    } else if (fileType == "video") {
      video_ele = document.getElementById("resource_video");
      global_swipe = false;
      video_src.src = "media/videos/" + $(this).attr("data-target");
      $("#video_popup").css("display", "flex");
      $("#resource_video").show();
      video_ele.load();
      /* setTimeout(function () {
        video_ele.addEventListener("webkitfullscreenchange", close_video);
      }, 1000); */
      video_ele.play();
      // video_ele.webkitEnterFullScreen();
    } else if (fileType == "html") {
      com.veeva.clm.gotoSlide($(this).attr("data-target"), $(this).attr("data-pres"));
    } else {
    }
  });

  $("#video_close").bind(tarEvent, function () {
    $("#video_popup,#resource_video").hide();
    video_ele.pause();
    global_swipe = true;
    // video_ele.removeEventListener("webkitfullscreenchange", close_video);
  });

  // enable or disable the email button based on resources selected
  var count = 0;
  $(".nvs_checkbox_icon").bind(tarEvent, function () {
    if ($(this).hasClass("active")) {
      count--
    } else {
      count++
    }
    (count == 0) ? $("#email_resources").addClass("disabled") : $("#email_resources").removeClass("disabled");
  });

  // on submit open email 
  var frag_vault_arr = [];
  setPopupEvent($("#email_resources"), collectFragments);
  function collectFragments() {
    if (!$(this).hasClass("disabled")) {
      $(".nvs_checkbox_item").each(function () {
        if ($(this).hasClass("active")) {
          frag_vault_arr.push($(this).attr("data-frag"));
        }
      });
      get_ae_details("7201", frag_vault_arr);
    }
  }


  // preview the resources
  var fileType;
  $(".preview_btn").bind(tarEvent, function () {
    fileType = $(this).attr("data-type");
    if (fileType == "pdf") {
      document.location.href =
        "media/docs/" + $(this).attr("data-target");
    } else if (fileType == "video") {
      video_ele = document.getElementById("resource_video");
      global_swipe = false;
      video_src.src = "../shared/media/videos/" + $(this).attr("data-target");
      $("#video_popup").css("display", "flex");
      $("#resource_video").show();
      //video_ele.load();
      /* setTimeout(function () {
        video_ele.addEventListener("webkitfullscreenchange", close_video);
      }, 1000); */
      video_ele.play();
      // video_ele.webkitEnterFullScreen();
    } else if (fileType == "html") {
      com.veeva.clm.gotoSlide($(this).attr("data-target"), $(this).attr("data-pres"));
    } else {
    }
  });

  $("#video_close").bind(tarEvent, function () {
    $("#video_popup,#resource_video").hide();
    video_ele.pause();
    global_swipe = true;
    // video_ele.removeEventListener("webkitfullscreenchange", close_video);
  });

});
