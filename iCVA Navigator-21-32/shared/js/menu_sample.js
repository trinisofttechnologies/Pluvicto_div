function sample(){
  shared.menuPopup.menuItems.forEach((menuItem) => {
    subNavList[menuItem.name] = "";
    if(menuItem.subMenu){
      subNavList[menuItem.name] = sub_nav_dom_start;
      menuItem.subMenu.forEach((subMenuItem) => {
        subNavList[menuItem.name] += `<div class="sub_nav_item km_nav" data-km="${subMenuItem.nav}">${subMenuItem.name}</div>
        `;
        // if(slideName == subMenuItem.nav || subMenuItem.subMenu){
        if(slideName == subMenuItem.nav){
          subNavLength = menuItem.subMenu.length;
          menu_name = menuItem.name;
          $(".nvs_breadcrumb").html(`<span class="km_nav" data-km="${menuItem.nav}">${menu_name}</span>${breadcrumb_seperator}`);
          $(`.menu_item_vt:contains('${menu_name}')`).addClass("open").removeClass("closed");
          $(`.menu_item_vt:contains('${menu_name}')`).find(".menu_arrow").html(close_arrow);
          $(`.menu_item_vt:contains('${menu_name}')`).siblings().show();
        }
        // for third level of menu START
        if(subMenuItem.subMenu){
          subMenuItem.subMenu.forEach((subMenuItem) => {
            temp_menu += `<div class="sub_nav_item km_nav" data-km="${subMenuItem.nav}">${subMenuItem.name}</div>`;
          });
          subMenuItem.subMenu.forEach((subMenuItem) => {
            if(slideName == subMenuItem.nav) {
              subNavList[menuItem.name] = "";
              subNavList[menuItem.name] = sub_nav_dom_start + temp_menu + sub_nav_dom_end;
              menu_name = menuItem.name;
              $(".nvs_breadcrumb").html(`<span class="km_nav" data-km="${menuItem.nav}">${menu_name}</span>${breadcrumb_seperator}<span class="km_nav" data-km="${subMenuItem.nav}">${subMenuItem.name}</span>${breadcrumb_seperator}`);
              $()
            }
          })
        } 
        // for third level of menu END
      });
      subNavList[menuItem.name] += sub_nav_dom_end;
    }
  });
}