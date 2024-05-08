document.addEventListener("DOMContentLoaded", function() {
    // Burger menu animation
    function changeBurgerMenuIcon(iconName, popupMenuItemNames) {
        const burgerMenu = document.querySelector(iconName);
        const popupMenuItems = document.querySelectorAll(popupMenuItemNames);
        let menuOpen = false;  // Track whether the menu is open or closed

        burgerMenu.addEventListener('click', () => {
            if (!menuOpen) {
                // Open the menu
                burgerMenu.src = 'assets/svgs/br-menu-open.svg';
                popupMenuItems.forEach(item => {
                    item.classList.remove('collapsible');
                });
                menuOpen = true;
            } else {
                // Close the menu
                burgerMenu.src = 'assets/svgs/br-menu-close.svg';
                popupMenuItems.forEach(item => {
                    item.classList.add('collapsible');
                });
                menuOpen = false;
            }
        });
    }

    // Correct the function call with a proper CSS selector
    changeBurgerMenuIcon(".brg-menu-btn", ".collapsible");

});