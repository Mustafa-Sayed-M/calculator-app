// Get Elements:
const app = document.querySelector('.app');
const screen = document.querySelector('.app .screen');
// # Arr Of Themes
const arrOfThemes = ['theme-1', 'theme-2', 'theme-3'];
// # Current Theme
let currentThemeIndex = 0;

// # Function update current theme
function updateCurrentTheme() {
    currentThemeIndex = currentThemeIndex !== (arrOfThemes.length - 1) ? currentThemeIndex + 1 : 0;
}
// # Function to change theme
function changeTheme() {
    updateCurrentTheme(); // call update current theme here
    removeAllThemes(arrOfThemes) // call remove all themes from app
    // Add Theme Target
    addThemeTarget(currentThemeIndex);
    sendCurrentThemeIndexToLocalStorage();
}
// # Function to add theme target
function removeAllThemes(arr) {
    arr.forEach(theme => {
        app.classList.remove(theme);
    });
}
// # Function to add theme target
function addThemeTarget(targetTheme) {
    app.classList.add(arrOfThemes[targetTheme]);
}
// # Function to set letter to screen
function setLetter(btn) {
    if (screen.querySelector('p')) {
        screen.querySelector('p').remove();;
    }

    if (screen.textContent.length < 15) {
        screen.textContent += btn.value;
        console.log(btn.value);
    }

    if (screen.classList.contains('resize')) {
        screen.classList.remove('resize');
    }
}
// # Function to reset screen
function deleteLetter() {
    if (screen.querySelector('p')) {
        screen.querySelector('p').remove();
        screen.classList.remove('resize');
    }
    const currentLetter = screen.textContent;
    screen.textContent = currentLetter.slice(0, currentLetter.length - 1)
}
// # Function to reset screen
function resetScreen() {
    screen.textContent = '';
    if (screen.classList.contains('resize')) {
        screen.classList.remove('resize');
    }
}
// # Function to Calc the numbers
function calcNumbers() {
    if (screen.textContent !== '') {
        
        const result = eval(screen.textContent);
        const resultEle = document.createElement('p');
        
        console.log();
        if (Math.trunc(result) === result) {
            resultEle.textContent = result;
        } else {
            resultEle.textContent = result.toFixed(1);
        }

        screen.appendChild(resultEle);

        screen.classList.add('resize');
    }
}
// # Function to send current theme index to local storage
function sendCurrentThemeIndexToLocalStorage() {
    window.localStorage.setItem('current-theme-index', currentThemeIndex)
}
// # When Page Load
function whenPageLoad() {
    if (window.localStorage.getItem('current-theme-index')) {
        removeAllThemes(arrOfThemes); // call remove all themes from app
        addThemeTarget(window.localStorage.getItem('current-theme-index')); // Add Theme Target
        currentThemeIndex = parseInt(window.localStorage.getItem('current-theme-index')) // Update Current Theme Index
    }
}
window.onload = whenPageLoad;