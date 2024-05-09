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

    changeBurgerMenuIcon(".brg-menu-btn", ".collapsible");

    // Define selectors for elements
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const bnrTitles = document.querySelectorAll('.bnr-title');
    const gifWrappers = document.querySelectorAll('.gif-wrapper');
    const leftLine = document.querySelector('.left-line');
    const rightLine = document.querySelector('.right-line');

    // Set initial state
    leftArrow.classList.add('disabled');

    // Function to toggle visibility and arrow state
    function toggleElements() {
        // Toggle hidden class for banner titles
        bnrTitles.forEach(title => {
            title.classList.toggle('hidden');
        });

        // Toggle hidden class for GIF wrappers
        gifWrappers.forEach(wrapper => {
            wrapper.classList.toggle('hidden');
        });

        // Toggle the disabled state and sources of arrows
        if (leftArrow.classList.contains('disabled')) {
            leftArrow.classList.remove('disabled');
            leftArrow.src = 'assets/svgs/left-arrow-normal.svg';
            rightArrow.classList.add('disabled');
            rightArrow.src = 'assets/svgs/right-arrow-disabled.svg';
            leftLine.src = 'assets/svgs/line-enabled.svg';
            rightLine.src = 'assets/svgs/line-disabled.svg';
        } else {
            leftArrow.classList.add('disabled');
            leftArrow.src = 'assets/svgs/left-arrow-disabled.svg';
            rightArrow.classList.remove('disabled');
            rightArrow.src = 'assets/svgs/right-arrow-normal.svg';
            leftLine.src = 'assets/svgs/line-disabled.svg';
            rightLine.src = 'assets/svgs/line-enabled.svg';
        }
    }

    function addHoverListeners(arrow, direction) {
        arrow.addEventListener('mouseenter', function() {
            if (!arrow.classList.contains('disabled')) {
                arrow.src = `assets/svgs/${direction}-arrow-hover.svg`;
            }
        });
    
        arrow.addEventListener('mouseleave', function() {
            if (!arrow.classList.contains('disabled')) {
                arrow.src = `assets/svgs/${direction}-arrow-normal.svg`;
            }
        });
    }

    // Event listeners for arrows
    leftArrow.addEventListener('click', function() {
        if (!leftArrow.classList.contains('disabled')) {
            toggleElements();
        }
    });

    rightArrow.addEventListener('click', function() {
        if (!rightArrow.classList.contains('disabled')) {
            toggleElements();
        }
    });

    addHoverListeners(rightArrow, 'right');
    addHoverListeners(leftArrow, 'left');
});