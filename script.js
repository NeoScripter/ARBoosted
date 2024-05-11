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

        document.querySelectorAll('.top-nav-list-item').forEach(li => {
            li.addEventListener('click', () => {
                burgerMenu.src = 'assets/svgs/br-menu-close.svg';
                popupMenuItems.forEach(item => {
                    item.classList.add('collapsible');
                });
                menuOpen = false;
            });
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
    const titles = document.querySelectorAll('.animated-text-wrapper .animated-title');
    let currentTitleIndex = 0;

    // Function to initiate the animation cycle
    function typeAnimation() {
        const title = titles[currentTitleIndex];
        const originalHTML = title.innerHTML;
        title.innerHTML = ''; 
        title.style.display = 'block'; 

        const parser = new DOMParser();
        const parsedHTML = parser.parseFromString('<div>' + originalHTML + '</div>', 'text/html');
        const nodes = Array.from(parsedHTML.body.firstChild.childNodes);

        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    title.appendChild(span);
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const clone = node.cloneNode(true);
                title.appendChild(clone);
            }
        });

        let charIndex = 0;
        const spans = title.querySelectorAll('span');
        function showNextChar() {
            if (charIndex < spans.length) {
                spans[charIndex].style.opacity = 1;
                charIndex++;
                setTimeout(showNextChar, 60);
            } else {
                setTimeout(() => {
                    title.innerHTML = originalHTML;
                    title.style.display = 'none';
                    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                    typeAnimation(); // Recur for the next title
                }, 500);
            }
        }

        showNextChar(); // Start showing characters
    }

    typeAnimation();

    // Collapsible booking items
    const bookingElements = document.querySelectorAll('.booking-grid-element');

    bookingElements.forEach(element => {
        const bookingUl = element.querySelector('.booking-ul');
        let timeoutId = null; // To manage timeouts between enter and leave

        element.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId); // Ensure no pending hide actions
            bookingUl.style.display = 'block';
            // requestAnimationFrame for smooth visual updates
            requestAnimationFrame(() => {
                bookingUl.style.height = `${bookingUl.scrollHeight}px`;
                bookingUl.style.opacity = '1';
            });
        });

        element.addEventListener('mouseleave', () => {
            clearTimeout(timeoutId); // Clear previous timeouts to prevent conflicts
            bookingUl.style.height = '0';
            bookingUl.style.opacity = '0';
            timeoutId = setTimeout(() => {
                bookingUl.style.display = 'none';
            }, 700);
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
                moveTrack((itemWidth + 25) * currentSlide);
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


    // Emerging wrapper animation
    const emergingElements = document.querySelectorAll('.emerging-element-wrapper');

    let emergingWrapperIndex = 0;
    const intervalDuration = 300; // 0.3 seconds per element

    // Function to reset the opacity of all elements to 0.2
    function resetOpacity() {
        emergingElements.forEach(el => {
            el.style.opacity = '0.2';
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


    // Custom dropdown menu
    const dropdown = document.querySelector('.dropdown-selected');
    const options = document.querySelector('.dropdown-options');

    // Toggle dropdown visibility
    dropdown.addEventListener('click', () => {
        options.classList.toggle('hidden');
    });

    // Listen for option selection
    const allOptions = document.querySelectorAll('.dropdown-option');
    allOptions.forEach(option => {
        option.addEventListener('click', function() {
            const language = this.textContent.trim().toLowerCase();
            loadLanguage(language);
            setTimeout(() => location.reload(), 200);
            sessionStorage.setItem('selectedLanguage', language); // Save to session storage
            dropdown.firstChild.textContent = this.textContent; // Update the displayed language
            options.classList.add('hidden'); // Hide options after selection
        });
    });

    // Function to load and apply the selected language
    function loadLanguage(lang) {
        fetch('assets/json/lang.json') 
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll('[data-key]').forEach(elem => {
                    const key = elem.getAttribute('data-key');
                    if (data[lang][key]) {
                        elem.innerHTML = data[lang][key]; 
                    }
                });
            })
            .catch(error => console.error('Error loading the translation data:', error));
    }
    // Retrieve and load the stored language from session storage
    if (storedLanguage) {
        loadLanguage(storedLanguage);
        dropdown.firstChild.textContent = storedLanguage.toUpperCase(); // Display the stored language in the dropdown
    } else {
        loadLanguage('en'); // Load default language if no session storage value is present
    }
});