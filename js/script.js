function numberMenu(menu, prefix="") {
    let i = 0;
    return menu.map(function(item) {
        if (Array.isArray(item)) {
            return numberMenu(item, `${i}.`)
        } else {
            i++;
            return `${prefix}${i}. ${item}`;
        }
    });
}

function createMenuItems(parentNode) {
    numeredMenu = numberMenu(menu);

    const menuItemTemplate = document.getElementById("menu-item");
    var fragment = new DocumentFragment();    
    for (let i in numeredMenu) {
        const item = numeredMenu[i];
        let menuItem;
        if (Array.isArray(item)) {

        } else {
            menuItem = menuItemTemplate.content.cloneNode(true);
            menuItem.querySelector(".navigation__link").text = item;
            fragment.appendChild(menuItem);
        }
        
    }
    
    parentNode.appendChild(fragment);
    
    
    
    
}

const menuList = document.querySelector(".navigation__list");
createMenuItems(menuList);