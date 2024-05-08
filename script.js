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


     // Define selectors for all toggle-able elements and control elements
     const controls = {
        arrows: {
            left: document.querySelector('.left-arrow'),
            right: document.querySelector('.right-arrow')
        },
        lines: {
            left: document.querySelector('.left-line'),
            right: document.querySelector('.right-line')
        }
    };

    const elements = {
        bnrTitles: document.querySelectorAll('.bnr-title'),
        gifWrappers: document.querySelectorAll('.gif-wrapper')
    };

    // Initialize disabled states for controls
    updateControls('init');

    // Function to update the state of controls based on action
    function updateControls(action) {
        const { left, right } = controls.arrows;
        const { left: lineLeft, right: lineRight } = controls.lines;

        const leftEnabled = action === 'right';
        
        left.classList.toggle('disabled', !leftEnabled);
        left.src = `assets/svgs/left-arrow-${leftEnabled ? 'normal' : 'disabled'}.svg`;
        lineLeft.src = `assets/svgs/line-${leftEnabled ? 'enabled' : 'disabled'}.svg`;

        right.classList.toggle('disabled', leftEnabled);
        right.src = `assets/svgs/right-arrow-${leftEnabled ? 'disabled' : 'normal'}.svg`;
        lineRight.src = `assets/svgs/line-${leftEnabled ? 'disabled' : 'enabled'}.svg`;
    }

    // Function to toggle visibility of elements
    function toggleElements() {
        Object.values(elements).forEach(group => {
            group.forEach(item => item.classList.toggle('hidden'));
        });

        // Determine direction based on hidden state of the first banner title
        updateControls(elements.bnrTitles[0].classList.contains('hidden') ? 'right' : 'left');
    }

    // Add event listeners for arrows
    Object.values(controls.arrows).forEach(arrow => {
        arrow.addEventListener('click', function() {
            if (!arrow.classList.contains('disabled')) {
                toggleElements();
            }
        });
    });
});