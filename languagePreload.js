let languageData = {};  // Object to hold the preloaded language data

// Preload all language data
fetch('assets/json/lang.json')
    .then(response => response.json())
    .then(data => {
        languageData = data;  // Store it
        initializeLanguage();
    })
    .catch(error => console.error('Error preloading language data:', error));

function initializeLanguage() {
    const storedLanguage = sessionStorage.getItem('selectedLanguage') ? sessionStorage.getItem('selectedLanguage') : 'en';
    loadLanguage(storedLanguage);
}

function loadLanguage(lang) {
    const data = languageData[lang];
    if (data) {
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (data[key]) {
                elem.innerHTML = data[key];
            }
        });
    }
    const dropdown = document.querySelector('.dropdown-selected');
    dropdown.firstChild.textContent = lang.toUpperCase(); // Display the stored language in the dropdown
}