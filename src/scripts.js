import './css/styles.css';
import './css/utilities.css';
import './images/hotel-main.jpg';
import './images/dashboard-icon.png';
import './images/book-icon.png';
import './images/calendar-icon.png';
import './images/one-bed-icon.png';
import './images/two-bed-icon.png';
import apiCalls from './apiCalls';
import { fetchResponse } from './apiCalls';
import { User } from './classes/User';
import { Booking } from './classes/Booking';
import { Room } from './classes/Room';
import { showElement, hideElement, clearView, displayDashboardCards, displayBookCards,
    displayDashboardHeader, displayBookHeader } from './domUpdates';


// Globals
let allUsersData = [];
let allBookingsData = [];
let allRoomsData = [];
let currentUser = {}; // determine by login

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

// Event Listeners 
window.addEventListener("load", () => loadData());

navHomeBtn.addEventListener("click", () => loadHomeView());
navDashboardBtn.addEventListener("click", () => loadDashboardView());
navBookBtn.addEventListener("click", () => loadBookView());


// Functions
const loadData = () => {
    const fetchUsers = fetchResponse("http://localhost:3001/api/v1/customers");
    const fetchBookings = fetchResponse("http://localhost:3001/api/v1/bookings");
    const fetchRooms = fetchResponse("http://localhost:3001/api/v1/rooms");
  
    Promise.all([fetchUsers, fetchBookings, fetchRooms]).then((data) => {
        let tempData = [];

        // Clear out data incase you need to reload data that has been POSTed
        // allUsersData = []; 
        // allBookingsData = [];
        // allRoomsData = [];

        tempData = data[0].customers; 
        tempData.forEach(userData => {
            allUsersData.push(new User(userData));
        });
        // console.log("users", allUsersData);

        tempData = data[1].bookings; 
        tempData.forEach(bookingData => {
            allBookingsData.push(new Booking(bookingData));
        });
        // console.log("booking", allBookingsData);
        
        tempData = data[2].rooms; 
        tempData.forEach(roomData => {
            allRoomsData.push(new Room(roomData));
        });
        // console.log("rooms", allRoomsData);
    })
    .catch((err) => console.log(err));
}

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
    displayDashboardCards();
    displayDashboardHeader();
}

const loadBookView = () => {
    hideAllElements();
    showElement(bookView);
    showElement(head);
    showElement(subHead);
    showElement(footer);
    displayBookCards();
    displayBookHeader();
}


