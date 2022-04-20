import './css/styles.css';
import './css/utilities.css';
import './images/hotel-main.jpg';
import './images/hotel-room-icon.png';
import './images/calendar-icon.png';
import './images/one-bed-icon.png';
import './images/two-bed-icon.png';
import apiCalls from './apiCalls';
import { showElement, hideElement, clearView  } from './domUpdates';

// Globals

// Query Selectors
const navHomeBtn = document.querySelector("navHomeBtn");
const navDashboardBtn = document.querySelector("navDashboardBtn");
const navBookBtn = document.querySelector("navBookBtn");

const homeView = document.querySelector("homeView");
const dashboardView = document.querySelector("dashboardView");
const bookView = document.querySelector("bookView");

const head = document.querySelector("head");
const subHead = document.querySelector("subHead");
const footer = document.querySelector("footer");

// Event Listeners 

navHomeBtn.addEventListener("click", loadHomeView);
navDashboardBtn.addEventListener("click", loadDashboardView);
navBookBtn.addEventListener("click", loadBookView);

// Functions
const hideAllElements = () => {
    hideElement(homeView);
    hideElement(dashboardView);
    hideElement(bookView);
    hideElement(head);
    hideElement(subHead);
    hideElement(footer);
}

// Load Views
const loadHomeView = () => {
    hideAllElements();
    showElement(homeView);
}

const loadDashboardView = () => {
    hideAllElements();
    showElement(dashboardView);
    showElement(head);
    showElement(footer);
    // load dashboard head details + corresponding icon
}

const loadBookView = () => {
    hideAllElements();
    showElement(bookView);
    showElement(head);
    showElement(subHead);
    showElement(footer);
    // load book head details + corresponding icon
}


