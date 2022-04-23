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
import { showElement, hideElement, displayDashboardCards, displayAvailableBookingCards,
    displayDashboardHeader, displayBookHeader, getCurrentDate, getAvailableRooms } from './domUpdates';


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

const dashboardCardsContainer = document.querySelector("#dashboardCardsContainer");
const bookCardsContainer = document.querySelector("#bookCardsContainer");

const bookingHistoryOptions = document.querySelector("#bookingHistoryOptions");
const startDate = document.querySelector("#startDate");
const roomTypes = document.querySelector("#roomTypes");
const bookSearchBtn = document.querySelector("#bookSearchBtn");

// Event Listeners 
window.addEventListener("load", () => loadData());

navHomeBtn.addEventListener("click", () => loadHomeView());
navDashboardBtn.addEventListener("click", () => loadDashboardView());
navBookBtn.addEventListener("click", () => loadBookView());
bookingHistoryOptions.addEventListener("click", (event) => viewBookingsBy(event));
bookSearchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    displayAvailableBookings(getStartDateValue(), roomTypes.value);
});

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
        
        tempData = data[2].rooms; 
        tempData.forEach(roomData => {
            allRoomsData.push(new Room(roomData));
        });
        // console.log("rooms", allRoomsData);

        // Populate each booking with roomDetails property with room objects
        allBookingsData.forEach(booking => {
            booking.setRoom(allRoomsData);
        });
        // console.log(allBookingsData);

        loginUser(); // Need to move when implementing login feature
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
    displayDashboardCards(currentUser.allBookings);
    displayDashboardHeader(currentUser);
}

const loadBookView = () => {
    hideAllElements();
    showElement(bookView);
    showElement(head);
    showElement(subHead);
    showElement(footer);
    resetBookViewValues();
    displayAvailableBookings(getCurrentDate(), roomTypes.value);
    displayBookHeader();
    
    // What happens when a card is selected?
    // Card should disappear, booking confirmation message, POST booking
    

    
    
    var url = 'http://localhost:3001/api/v1/bookings';
    var requestType = 'POST';
    var data = { 'userID': 48, 'date': '2019/09/23', 'roomNumber': 4 }
    // custFetch(url, requestType, data);
}

const resetBookViewValues = () => {
    roomTypes.value = "all rooms";
    startDate.value = new Date().toISOString().slice(0, 10); // get todays date as default
}


const custFetch = (url, requestType, data) => { // data is optional param, it's just for POST and PUT requests
    fetch(url, {
        method: requestType,
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            console.log('HTTP request unsuccessful');
            throw new Error(`status ${response.status} at URL: ${response.url}`);
        } else {
            console.log('HTTP request successful');
        }
        return response;
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}









// Needs to be more robust
const loginUser = () => {
    currentUser = allUsersData[12]; // Temporarily assign a user
    currentUser.addAllBookings(allBookingsData);
    // console.log("Current User: ", currentUser);
}

const viewBookingsBy = (event) => {
    if(event.target.id === "allBookings") {
        displayDashboardCards(currentUser.allBookings);
    } else if (event.target.id === "pastBookings") {
        const pastBookings = currentUser.allBookings.filter(booking => booking.date < getCurrentDate());
        displayDashboardCards(pastBookings);
    } else if (event.target.id === "todaysBookings") {
        const todaysBookings = currentUser.allBookings.filter(booking => booking.date === getCurrentDate());
        displayDashboardCards(todaysBookings);
    } else if (event.target.id === "futureBookings") {
        const futureBookings = currentUser.allBookings.filter(booking => booking.date > getCurrentDate());
        displayDashboardCards(futureBookings);
    }
}

const displayAvailableBookings = (startDate, roomType) => {
    let availableBookings = getAvailableRooms(startDate, allBookingsData, allRoomsData, roomType);
    displayAvailableBookingCards(startDate, availableBookings);
}

const getStartDateValue = () => {
    if (!startDate.value) {
        return getCurrentDate();
    }
    let startDateValueSplit = startDate.value.split('-');
    let yyyy = startDateValueSplit[0];
    let mm = startDateValueSplit[1];
    let dd = startDateValueSplit[2];
    
    let startDateValueFormatted = `${yyyy}/${mm}/${dd}`;
    return startDateValueFormatted;
}
