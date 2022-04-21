import './css/styles.css';
import './css/utilities.css';
import './images/hotel-main.jpg';
import './images/hotel-room-icon.png';
import './images/calendar-icon.png';
import './images/one-bed-icon.png';
import './images/two-bed-icon.png';
import apiCalls from './apiCalls';
import { showElement, hideElement, clearView } from './domUpdates';

// Globals

// Query Selectors
const navHomeBtn = document.querySelector("#navHomeBtn");
const navDashboardBtn = document.querySelector("#navDashboardBtn");
const navBookBtn = document.querySelector("#navBookBtn");

const homeView = document.querySelector("#homeView");
const dashboardView = document.querySelector("#dashboardView");
const bookView = document.querySelector("#bookView");

const head = document.querySelector("#head");
const subHead = document.querySelector("#subHead");
const footer = document.querySelector("#footer");

// Card Containers
const dashboardCardsContainer = document.querySelector("#dashboardCardsContainer");
const bookCardsContainer = document.querySelector("#bookCardsContainer");

// Event Listeners 
navHomeBtn.addEventListener("click", () => loadHomeView());
navDashboardBtn.addEventListener("click", () => loadDashboardView());
navBookBtn.addEventListener("click", () => loadBookView());

// Functions
var hideAllElements = () => {
    hideElement(homeView);
    hideElement(dashboardView);
    hideElement(bookView);
    hideElement(head);
    hideElement(subHead);
    hideElement(footer);
}

// Load Views
var loadHomeView = () => {
    console.log('HOME')
    hideAllElements();
    showElement(homeView);
}

var loadDashboardView = () => {
    console.log('DB')
    hideAllElements();
    showElement(dashboardView);
    showElement(head);
    showElement(footer);
    // load dashboard head details + corresponding icon
}

var loadBookView = () => {
    console.log('BOOK')
    hideAllElements();
    showElement(bookView);
    showElement(head);
    showElement(subHead);
    showElement(footer);
    // load book head details + corresponding icon
}


