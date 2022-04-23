import './css/styles.css';
import './css/utilities.css';
import './images/hotel-main.jpg';
import './images/dashboard-icon.png';
import './images/book-icon.png';
import './images/add-icon.png';
import './images/calendar-icon.png';
import './images/one-bed-icon.png';
import './images/two-bed-icon.png';
import apiCalls from './apiCalls';
import { fetchResponse, custFetchResponse } from './apiCalls';
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
bookCardsContainer.addEventListener("click", (event) => {
    let roomNumberToBook = Number(event.target.id);  // returns a string and number is '0' if it's not an actual string number
    if (roomNumberToBook) {
        addNewBooking(roomNumberToBook);
    }
});

const addNewBooking = (roomNumberToBook) => {
    Promise.all([postNewBookingToAPI(roomNumberToBook), getAllBookingsFromAPI()]).then((data) => {
        console.log(data[0]); // Hope for success message

        let tempData = [];
        allBookingsData = []; // reset
        
        // update all bookings data
        tempData = data[1].bookings; 
        tempData.forEach(bookingData => {
            allBookingsData.push(new Booking(bookingData));
        });

        // update every bookings 'this.roomDetails' property
        allBookingsData.forEach(booking => {
            booking.setRoom(allRoomsData);
        });

        // update user's bookings
        currentUser.addAllBookings(allBookingsData);
    })
    .catch((err) => console.log(err));
}

// Functions
// API Functions
const loadData = () => {
    const fetchUsers = custFetchResponse('http://localhost:3001/api/v1/customers', 'GET');
    const fetchBookings = custFetchResponse('http://localhost:3001/api/v1/bookings', 'GET');
    const fetchRooms = custFetchResponse('http://localhost:3001/api/v1/rooms', 'GET');
  
    Promise.all([fetchUsers, fetchBookings, fetchRooms]).then((data) => {
        let tempData = [];

        tempData = data[0].customers; 
        tempData.forEach(userData => {
            allUsersData.push(new User(userData));
        });

        tempData = data[1].bookings; 
        tempData.forEach(bookingData => {
            allBookingsData.push(new Booking(bookingData));
        });
        
        tempData = data[2].rooms; 
        tempData.forEach(roomData => {
            allRoomsData.push(new Room(roomData));
        });

        allBookingsData.forEach(booking => {
            booking.setRoom(allRoomsData);
        });

        loginUser(); // Need to move when implementing login feature
    })
    .catch((err) => console.log(err));
}

const postNewBookingToAPI = (roomNumberToBook) => {
    var url = 'http://localhost:3001/api/v1/bookings';
    var requestType = 'POST';
    var data = { 'userID': currentUser.id, 'date': startDate.value, 'roomNumber': roomNumberToBook }
    return custFetchResponse(url, requestType, data);
}

const getAllBookingsFromAPI = () => {
    var url = 'http://localhost:3001/api/v1/bookings';
    var requestType = 'GET';
    return custFetchResponse(url, requestType);
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
}

const resetBookViewValues = () => {
    roomTypes.value = "all rooms";
    startDate.value = new Date().toISOString().slice(0, 10); // get todays date as default
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
