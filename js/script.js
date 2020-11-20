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

function createMenuItems() {
    numeredMenu = numberMenu(menu);

    const menuItemTemplate = document.getElementById("menu-item");
    const menuList = document.querySelector(".navigation__list");
    var fragment = new DocumentFragment();

    for (let item of numeredMenu) {
        const menuItem = menuItemTemplate.content.cloneNode(true);
        fragment.appendChild(menuItem);
    }

    menuList.appendChild(fragment);


    

}

createMenuItems();