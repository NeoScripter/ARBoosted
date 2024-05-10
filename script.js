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

    // Function to add hover listeners to arrows (kind of self-explanatory function name)
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

    // Animated title in the intro section 
    const animatedTitles = document.querySelectorAll('.animated-title');
    let currentTitleIndex = 0;

    function initAnimation() {
        // Initially hide all titles and set paragraphs opacity to 0.5
        animatedTitles.forEach(title => {
            title.style.display = 'none';
            const prgs = title.querySelectorAll('p');
            prgs.forEach(prg => prg.style.opacity = '0.5');
        });

        // Start animation with the first title
        cycleTitles();
    }

    function cycleTitles() {
        const currentTitle = animatedTitles[currentTitleIndex];
        currentTitle.style.display = 'block'; // Show the current title

        makeParagraphsVisible(currentTitle, () => {
            // After all paragraphs are visible
            setTimeout(() => {
                fadeOutTitle(currentTitle, () => {
                    // Move to the next title
                    currentTitleIndex = (currentTitleIndex + 1) % animatedTitles.length;
                    cycleTitles();
                });
            }, 1500); // Wait for 1.5 seconds before fading out and moving to the next title
        });
    }

    function makeParagraphsVisible(title, callback) {
        const prgs = title.querySelectorAll('p');
        let delay = 1500;

        prgs.forEach((prg, index) => {
            setTimeout(() => {
                prg.style.opacity = '1';
                if (index === prgs.length - 1) {
                    // If it's the last paragraph, call the callback after it's fully visible
                    setTimeout(callback, 1500);
                }
            }, delay);
            delay += 1500; // Increment delay for each paragraph
        });
    }

    function fadeOutTitle(title, callback) {
        const prgs = title.querySelectorAll('p');
        prgs.forEach(prg => prg.style.opacity = '0.5');
        title.style.display = 'none';
            callback();
    }

    // Start the initial animation setup
    initAnimation();


    // Find all elements that will trigger the expand/collapse behavior
    const bookingIcons = document.querySelectorAll('.icon-booking');

    // Iterate over each booking icon and add a click event listener
    bookingIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            // Find the associated `booking-ul` element within the same `booking-grid-element`
            const parentElement = icon.closest('.booking-grid-element');
            const bookingUl = parentElement.querySelector('.booking-ul');

            // Toggle the display and sliding effect
            if (bookingUl.style.display === 'block') {
                // Slide up to hide
                bookingUl.style.height = '0';
                bookingUl.style.opacity = '0';
                setTimeout(() => {
                    bookingUl.style.display = 'none';
                }, 700);

                // Change the icon to "close"
                icon.src = 'assets/svgs/booking-element-close.svg';
            } else {
                // Slide down to show
                bookingUl.style.display = 'block';
                setTimeout(() => {
                    bookingUl.style.height = `${bookingUl.scrollHeight}px`;
                    bookingUl.style.opacity = '1';
                }, 20);

                // Change the icon to "open"
                icon.src = 'assets/svgs/booking-element-open.svg';
            }
        });
    });

    // Reviews carousel
    const carouselViewports = document.querySelectorAll('.carousel-viewport');
    
    carouselViewports.forEach(carouselContainer => {
        setupCarousel(carouselContainer);
    });

    function setupCarousel(carouselContainer) {
        const track = carouselContainer.querySelector('.carousel-track');
        const items = Array.from(track.children);
        const btnContainer = carouselContainer.nextElementSibling;
        const nextButton = btnContainer.querySelector('.next-btn');
        const prevButton = btnContainer.querySelector('.prev-btn');
        const itemWidth = items[0].getBoundingClientRect().width;
        let currentSlide = 0;
        let startX;

        nextButton.addEventListener('click', () => moveSlide(1));
        prevButton.addEventListener('click', () => moveSlide(-1));

        track.addEventListener('touchstart', handleTouchStart, { passive: false });
        track.addEventListener('touchmove', handleTouchMove, { passive: false });
        track.addEventListener('touchend', handleTouchEnd);

        function moveSlide(direction) {
            const newPosition = currentSlide + direction;
            if (newPosition >= 0 && newPosition < items.length) {
                currentSlide = newPosition;
                moveTrack((itemWidth + 24) * currentSlide);
            }
        }

        function moveTrack(position) {
            track.style.transform = `translateX(-${position}px)`;
        }

        function handleTouchStart(e) {
            startX = e.touches[0].clientX;
        }

        function handleTouchMove(e) {
            const moveX = e.touches[0].clientX - startX;
            if (Math.abs(moveX) > 5) {
                e.preventDefault();
            }
        }

        function handleTouchEnd(e) {
            const moveX = e.changedTouches[0].clientX - startX;
            if (moveX > 50) {
                moveSlide(-1);
            } else if (moveX < -50) {
                moveSlide(1);
            }
        }
    }


    const emergingElements = document.querySelectorAll('.emerging-element-wrapper');

    let emergingWrapperIndex = 0;
    const intervalDuration = 1500; // 1.5 seconds per element

    // Function to reset the opacity of all elements to 0.4
    function resetOpacity() {
        emergingElements.forEach(el => {
            el.style.opacity = '0.4';
        });
    }

    // Function to gradually increase opacity of the current element
    function updateOpacity() {
        // Only reset opacity if it's the start of a new round
        if (emergingWrapperIndex === 0) {
            resetOpacity();
        }

        // Set the opacity of the current element to 1
        emergingElements[emergingWrapperIndex].style.opacity = '1';

        // Move to the next index, looping back to the start
        emergingWrapperIndex = (emergingWrapperIndex + 1) % emergingElements.length;
    }

    // Set an interval to update the opacity every 1.5 seconds
    setInterval(updateOpacity, intervalDuration);
});