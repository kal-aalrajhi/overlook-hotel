import './css/styles.css';
import './css/utilities.css';
import './images/hotel-main.jpg';
import './images/dashboard-icon.png';
import './images/book-icon.png';
import './images/add-icon.png';
import './images/calendar-icon.png';
import './images/bed-1-icon.png';
import './images/bed-2-icon.png';
import apiCalls from './apiCalls';
import Swal from 'sweetalert2';
import { custFetchResponse } from './apiCalls';
import { User } from './classes/User';
import { Booking } from './classes/Booking';
import { Room } from './classes/Room';
import { showElement, hideElement, displayDashboardCards, displayAvailableBookingCards,
    displayDashboardHeader, displayBookHeader, getCurrentDate, displayValidationMessage,
    displayManagerDashboard } from './domUpdates';


// Globals
let allUsersData = [];
let allBookingsData = [];
let allRoomsData = [];
let currentUser = "";
let manager = new User({
    id: 0,
    name: "Space Cowboy"
});

// Query Selectors
const navHomeBtn = document.querySelector("#navHomeBtn");
const navDashboardBtn = document.querySelector("#navDashboardBtn");
const navBookBtn = document.querySelector("#navBookBtn");

const homeView = document.querySelector("#homeView");
const dashboardView = document.querySelector("#dashboardView");
const bookView = document.querySelector("#bookView");
const logoutView = document.querySelector("#logoutView");
const loginView = document.querySelector("#loginView");

const head = document.querySelector("#head");
const subHead = document.querySelector("#subHead");
const footer = document.querySelector("#footer");

const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const currentUsername = document.querySelector("#currentUsername");
const currentPassword = document.querySelector("#currentPassword");

const dashboardCardsContainer = document.querySelector("#dashboardCardsContainer");
const bookCardsContainer = document.querySelector("#bookCardsContainer");
const customerBookingHistoryCard = document.querySelector("#customerBookingHistoryCard");
const managerBookingHistoryCard = document.querySelector("#managerBookingHistoryCard");

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
bookCardsContainer.addEventListener("click", (event) => {
    let roomNumberToBook = Number(event.target.id);  // returns a string and number is '0' if it's not an actual string number
    if (roomNumberToBook) {
        addNewBooking(roomNumberToBook);
    }
});
bookSearchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    displayAvailableBookings(getStartDateValue(), roomTypes.value);
});
loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if(validateUser(currentUsername.value, currentPassword.value)) {
        loginUser();
    }
    loginView.reset();
});
logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    logoutUser();
});

// Login/Logout Functions
const loginAlert = () => {
    Swal.fire({
        title: 'Please login to view this page.',
        text: 'We can\'t book it without knowing who you are first!',
        icon: 'warning',
        confirmButtonText: 'Go to login page'
    });
}

const validateUser = (username, password) => {
    let userId = Number(username.substring(8));

    if(username === "manager" && password === "overlook2021") {
        currentUser = manager;
        displayValidationMessage(`You've successfully logged in, ${currentUser.name}.`);
        return true; 
    }

    if ((username.length > 10)  
        || (userId < 1 || userId > 50)
        || (userId === NaN)
        || (username.substring(0, 8) !== "customer")) {
        displayValidationMessage("Invalid username.");
        return false;
    } else if (password !== "overlook2021") {
        displayValidationMessage("Invalid password.");
        return false;
    }

    assignCurrentUser(userId);
    displayValidationMessage(`You've successfully logged in as ${currentUser.name}.`);
    return true; 
}

const assignCurrentUser = (userId) => {
    currentUser = allUsersData.find(user => user.id === userId);
    currentUser.addAllBookings(allBookingsData);
}

const loginUser = () => {
    hideElement(loginView);
    showElement(logoutView);
    loadDashboardView();
}

const logoutUser = () => {
    currentUser = "";
    hideElement(logoutView);
    showElement(loginView);
    displayValidationMessage("You're successfully logged out.");
}

// API Functions
const loadData = () => {
    const getUsersResponse = custFetchResponse('http://localhost:3001/api/v1/customers', 'GET');
    const getBookingsResponse = custFetchResponse('http://localhost:3001/api/v1/bookings', 'GET');
    const getRoomsResponse = custFetchResponse('http://localhost:3001/api/v1/rooms', 'GET');
  
    Promise.all([getUsersResponse, getBookingsResponse, getRoomsResponse]).then((data) => {
        let tempData = [];

        tempData = data[0].customers; 
        tempData.forEach(userData => { // MAP
            allUsersData.push(new User(userData));
        });

        tempData = data[1].bookings; 
        tempData.forEach(bookingData => { // MAP
            allBookingsData.push(new Booking(bookingData));
        });
        
        tempData = data[2].rooms; 
        tempData.forEach(roomData => { // MAP
            allRoomsData.push(new Room(roomData));
        });

        allBookingsData.forEach(booking => { // MAP
            booking.setRoom(allRoomsData);
        });
    })
    .catch((err) => console.log(err));
}

const postNewBookingToAPI = (roomNumberToBook) => {
    let url = 'http://localhost:3001/api/v1/bookings'; 
    let requestType = 'POST';
    let date = getStartDateValue();
    let data = { 'userID': currentUser.id, 'date': date, 'roomNumber': roomNumberToBook }
    return custFetchResponse(url, requestType, data);
}

const getAllBookingsFromAPI = () => {
    let url = 'http://localhost:3001/api/v1/bookings';
    let requestType = 'GET';
    return custFetchResponse(url, requestType);
}

const addNewBooking = (roomNumberToBook) => {
    Promise.all([postNewBookingToAPI(roomNumberToBook)]).then((postResponseData) => {
        console.log(postResponseData[0]); // Hope for success message
        
        Promise.all([getAllBookingsFromAPI()]).then((getResponseData) => {
            let tempData = [];
            allBookingsData = []; 
            
            // update all bookings data
            tempData = getResponseData[0].bookings;
            tempData.forEach(bookingData => {
                allBookingsData.push(new Booking(bookingData));
            });
    
            // update every bookings 'this.roomDetails' property
            allBookingsData.forEach(booking => {
                booking.setRoom(allRoomsData);
            });
    
            // update user's bookings
            currentUser.addAllBookings(allBookingsData);
    
            displayAvailableBookings(getStartDateValue(), roomTypes.value);
        }).catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

// Functions
const hideAllElements = () => {
    hideElement(homeView);
    hideElement(dashboardView);
    hideElement(customerBookingHistoryCard);
    hideElement(managerBookingHistoryCard);
    hideElement(bookView);
    hideElement(loginView);
    hideElement(logoutView);
    hideElement(head);
    hideElement(subHead);
    hideElement(footer);
}

// Load Views
const loadHomeView = () => {
    hideAllElements();
    showElement(homeView);
    if(currentUser === "") {
        showElement(loginView);
    } else {
        showElement(logoutView);
    }
}

const loadDashboardView = () => {
    if (currentUser === "") {
        loginAlert();
    } else if (currentUser === manager) {
        hideAllElements();
        showElement(dashboardView);
        showElement(managerBookingHistoryCard);
        showElement(head);
        showElement(footer);
        getAvailableRooms();
        displayManagerDashboard(getAvailableRooms(getCurrentDate(), "All rooms"), getBookedRooms(), getTotalRevenue(date));
        displayDashboardHeader(currentUser);
    } 
    else {
        hideAllElements();
        showElement(dashboardView);
        showElement(customerBookingHistoryCard);
        showElement(head);
        showElement(footer);
        displayDashboardCards(currentUser.allBookings);
        displayDashboardHeader(currentUser);
    }
}

const loadBookView = () => {
    if (currentUser === "") {
        loginAlert();
    } else {
        hideAllElements();
        showElement(bookView);
        showElement(head);
        showElement(subHead);
        showElement(footer);
        resetBookViewValues();
        displayAvailableBookings(getCurrentDate(), roomTypes.value);
        displayBookHeader();
    }
}

const resetBookViewValues = () => {
    roomTypes.value = "all rooms";
    startDate.value = getCurrentDate().replaceAll("/", "-");
}

const viewBookingsBy = (event) => {
    if(event.target.id === "allBookings") {
        displayDashboardCards(currentUser.allBookings);
    } else if (event.target.id === "pastBookings") {
        const pastBookings = currentUser.allBookings.filter(booking => booking.date < getCurrentDate());
        displayDashboardCards(pastBookings);
    } else if (event.target.id === "todaysBookings") {
        const todaysBookings = currentUser.allBookings.filter(booking => {
            return booking.date === getCurrentDate()
        });
        displayDashboardCards(todaysBookings);
    } else if (event.target.id === "futureBookings") {
        const futureBookings = currentUser.allBookings.filter(booking => booking.date > getCurrentDate());
        displayDashboardCards(futureBookings);
    }
}

// Customer Dashboard Utilities
const displayAvailableBookings = (startDate, roomType) => {
    let availableBookings = getAvailableRooms(startDate, roomType);
    displayAvailableBookingCards(startDate, availableBookings);
}

const getAvailableRooms = (startDate, roomType) => {
    let bookedRoomNumbers = allBookingsData.filter(booking => booking.date === startDate)
                                           .map(bookedBookings => bookedBookings.roomNumber);
    let availableRooms = allRoomsData.filter(room => !bookedRoomNumbers.includes(room.number));
    let filteredAvailableRooms = filterByRoomType(availableRooms, roomType);
    return filteredAvailableRooms;
}

const filterByRoomType = (rooms, roomType) => {
    if (roomType === "all rooms") {
        return rooms;
    }
    let filteredRooms = rooms.filter(room => room.roomType === roomType);
    return filteredRooms;
}

// Manager Dashboard Utilities (put into manager class?)
const getBookedRooms = (startDate) => { // returns a booking object
    let todaysBookings = allBookingsData.filter(booking => booking.date === startDate)
    return todaysBookings;
}

const getTotalRevenue = (startDate) => {
    let bookedRooms = getBookedRooms(startDate, allBookingsData);
    let totalRev = bookedRooms.reduce((sum, booking) => {
        sum += booking.roomDetails.costPerNight;
        return sum;
    }, 0);
    return totalRev;
}

// Other
const getStartDateValue = () => {
    if (!startDate.value) {
        return getCurrentDate();
    }
    return startDate.value.replaceAll("-", "/");
}
