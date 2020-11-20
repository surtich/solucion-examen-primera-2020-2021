function numberMenu(menu, prefix="") {
    let i = 0;
    return menu.map(function(item) {
        if (Array.isArray(item)) {
            return numberMenu(item, `${prefix}${i}.`)
        } else {
            i++;
            return `${prefix}${i}. ${item}`;
        }
    });
}

function createMenuItems(numeredMenu, level=1, parent) {
    
    var fragment = parent || new DocumentFragment();
    let lastParent;
    let menuItem;
    for (let i = 0; i < numeredMenu.length; i++) {
        const item = numeredMenu[i];
        const nextItem = numeredMenu[i+1];
        if (Array.isArray(item)) {
            createMenuItems(item, level + 1, lastParent);
        } else {
            menuItem = menuItemTemplate.cloneNode(true);
            menuItem.querySelector(".navigation__link").text = item;
            menuItem.querySelector(".navigation__item").className = `navigation__item navigation__item--l${level}`;
            lastParent = menuItem.querySelector(".navigation__sublist");            
            if (Array.isArray(nextItem)) {
            } else {
                menuItem.querySelector(".navigation__toggle").remove();
                menuItem.querySelector(".navigation__sublist").remove();
            }
            fragment.appendChild(menuItem);
        }
    }    
    return fragment;    
}

function printMenu() {
    const numeredMenu = numberMenu(menu);
    const menuItems = createMenuItems(numeredMenu);
    menuList.appendChild(menuItems);
}
function addToggleEvents() {
    const toggles = document.querySelectorAll(".navigation__toggle");
    
    Array.prototype.forEach.call(toggles, function(t) {
        const links = t.querySelectorAll(".navigation__toggle-link");
        const checkbox = t.querySelector(".navigation__checkbox");
        const sublist = t.nextElementSibling;
        links[0].onclick = function() {
            checkbox.checked = true;
            sublist.classList.remove("navigation__sublist--hidden");
        }
        
        links[1].onclick = function() {
            checkbox.checked = false;
            sublist.classList.add("navigation__sublist--hidden");
        }

    })
}

function addMenuItemEvents() {

    const menuItems = document.querySelectorAll(".navigation__link");   
    homeLink.onclick = function() {
        mainTitle.textContent = mainTitleText;
        Array.prototype.forEach.call(document.querySelectorAll(".navigation__link--selected"), t => t.classList.remove("navigation__link--selected"));   
        header.classList.add("u-hidden");
    }
    Array.prototype.forEach.call(menuItems, function(m) {
        m.onclick = function() {
            header.classList.remove("u-hidden");
            mainTitle.textContent = m.text;
            Array.prototype.forEach.call(document.querySelectorAll(".navigation__link--selected"), t => t.classList.remove("navigation__link--selected"));   
            m.classList.add("navigation__link--selected");
            breadcrumb.innerHTML = "";
            showBreadcrumb(m, false);   
        }
        
    });
}

function showBreadcrumb(menuItem, addArrow=true) {
    let newBreadcrumb = `<span class="section-number">${menuItem.textContent}</span>`;
    if (addArrow) {
        newBreadcrumb += '<i class="icon icon-arrows-right"></i>';
    }
    breadcrumb.innerHTML = newBreadcrumb + breadcrumb.innerHTML;
    const parentMenuItem = getParentMenuItem(menuItem);
    if(parentMenuItem) {
        showBreadcrumb(parentMenuItem);
    }
}

function getParentMenuItem(menuItem) {
    const liParent = menuItem.parentNode.parentNode;
    
    if (liParent.classList.contains("navigation__item--l1")) {
        return null;
    }
    return liParent.parentNode.parentNode.querySelector(".navigation__link");
}

const menuItemTemplate = document.getElementById("menu-item-template").content;
const menuList = document.querySelector(".navigation__list");
const header = document.querySelector(".header");

const mainTitle = document.querySelector(".main__title");
const homeLink = document.querySelector(".side-menu__link");
const breadcrumb = document.querySelector(".header__breadcrumb");

const mainTitleText = mainTitle.textContent;




printMenu();
addToggleEvents();
addMenuItemEvents();