import './css/styles.css';
import './css/utilities.css';
import './images/hotel-main.jpg';
import './images/dashboard-icon.png';
import './images/book-icon.png';
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
    displayManagerDashboard, displaySearchMessage, displayManagerSearchMessage } from './domUpdates';


// Globals
let allUsersData = [];
let allBookingsData = [];
let allRoomsData = [];
let currentUser = "";
let currentManager = "";

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
const customerSearchInput = document.querySelector("#customerSearchInput");
const customerSearchBtn = document.querySelector("#customerSearchBtn");

// Event Listeners 
window.addEventListener("load", () => loadData());
navHomeBtn.addEventListener("click", () => loadHomeView());
navDashboardBtn.addEventListener("click", () => loadDashboardView());
navBookBtn.addEventListener("click", () => loadBookView());
bookingHistoryOptions.addEventListener("click", (event) => viewBookingsBy(event));
bookCardsContainer.addEventListener("click", (event) => {
    let roomNumberToBook = Number(event.target.id);  
    if (roomNumberToBook) {
        addNewBooking(roomNumberToBook);
    }
});

dashboardCardsContainer.addEventListener("click", (event) => {
    let bookingId = event.target.id; 
    if (!(getBookingDate(bookingId) >= getCurrentDate())) {
        displaySearchMessage("You cannot delete past bookings.")
    }
    if (bookingId && (getBookingDate(bookingId) >= getCurrentDate())) { 
        deleteBooking(bookingId);
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

customerSearchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    currentUser = getCustomerUserData(customerSearchInput.value);
    if(!currentUser) {
        displaySearchMessage("Not a valid customer name.");
        currentUser = "";
    }
    loadDashboardView();
    customerSearchInput.value = "";
});

// Functions
const loginError = (title, text, buttonText) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        confirmButtonText: buttonText
    });
}

const getCustomerUserData = (customerName) => {
    let customerUser = allUsersData.find(user => user.name === customerName);
    if(!customerUser){
        return false;
    }
    customerUser.addAllBookings(allBookingsData);
    return customerUser;
}

const validateUser = (username, password) => {
    let userId = Number(username.substring(8));

    if(username === "manager" && password === "overlook2021") {
        currentManager = new User({
            id: 0,
            name: "Space Cowboy"
        });
        displayValidationMessage(`You've successfully logged in, ${currentManager.name}.`);
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
    currentManager = "";
    displaySearchMessage("");
    hideElement(logoutView);
    showElement(loginView);
    displayValidationMessage("You're successfully logged out.");
}

const loadData = () => {
    const getUsersResponse = custFetchResponse('http://localhost:3001/api/v1/customers', 'GET');
    const getBookingsResponse = custFetchResponse('http://localhost:3001/api/v1/bookings', 'GET');
    const getRoomsResponse = custFetchResponse('http://localhost:3001/api/v1/rooms', 'GET');
  
    Promise.all([getUsersResponse, getBookingsResponse, getRoomsResponse]).then((data) => {
        allUsersData = data[0].customers.map(userData => new User(userData));
        allBookingsData = data[1].bookings.map(bookingData => new Booking(bookingData));
        allRoomsData = data[2].rooms.map(roomData => new Room(roomData));
        
        allBookingsData.map(booking => booking.setRoom(allRoomsData));
    })
    .catch((err) => {
        displayValidationMessage(`${err} \n We apologize, our servers might be down.`);
        console.log(err);
    });
}

const getAllBookingsFromAPI = () => {
    let url = 'http://localhost:3001/api/v1/bookings';
    let requestType = 'GET';

    Promise.all([custFetchResponse(url, requestType)]).then((getResponseData) => {
        allBookingsData = []; 
        allBookingsData = getResponseData[0].bookings.map(bookingData => new Booking(bookingData));
        allBookingsData.map(booking => booking.setRoom(allRoomsData));

        currentUser.addAllBookings(allBookingsData);
        
        displayManagerDashboard(getAvailableRooms(getCurrentDate(), "all rooms"), getBookedRooms(), getTotalRevenue());
        displayDashboardCards(currentUser.allBookings, false);
        displayAvailableBookings(getStartDateValue(), roomTypes.value);
    })
    .catch((err) => {
        displayValidationMessage(`${err} \n We apologize, but we can't get your booking data right now.`);
        console.log(err);
    });
}

const postNewBookingToAPI = (roomNumberToBook) => {
    let url = 'http://localhost:3001/api/v1/bookings'; 
    let requestType = 'POST';
    let date = getStartDateValue();
    let data = { 'userID': currentUser.id, 'date': date, 'roomNumber': roomNumberToBook }
    return custFetchResponse(url, requestType, data);
}

const addNewBooking = (roomNumberToBook) => {
    Promise.all([postNewBookingToAPI(roomNumberToBook)]).then((postResponseData) => {
        console.log(postResponseData[0]); 
        getAllBookingsFromAPI();
    })
    .catch((err) => {
        displayValidationMessage(`${err} \n We apologize, but we were unable to add your booking right now.`);
        console.log(err);
    });
}

const deleteBookingFromAPI = (bookingToDelete) => {
    let url = `http://localhost:3001/api/v1/bookings/${bookingToDelete}`; 
    let requestType = 'DELETE';
    return custFetchResponse(url, requestType);
}

const deleteBooking = (bookingToDelete) => {
    Promise.all([deleteBookingFromAPI(bookingToDelete)]).then((deleteResponseData) => {
        console.log(deleteResponseData[0]); 
        getAllBookingsFromAPI();
    })
    .catch((err) => {
        displayValidationMessage(`${err} \n We apologize, but we were unable to delete this booking right now.`);
        console.log(err);
    });
}

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

const loadHomeView = () => {
    hideAllElements();
    showElement(homeView);
    if(!currentUser && !currentManager) {
        showElement(loginView);
    } else {
        showElement(logoutView);
    }
}

const loadDashboardView = () => {
    if (!currentUser && !currentManager) {
        loginError("Please login to view this page.", "We can't book without knowing who you are first!", "Go to login");
    } else if (currentManager !== "") {
        hideAllElements();
        showElement(dashboardView);
        showElement(managerBookingHistoryCard);
        showElement(head);
        showElement(footer);
        displayManagerDashboard(getAvailableRooms(getCurrentDate(), "all rooms"), getBookedRooms(), getTotalRevenue());
        displayDashboardHeader(currentManager);
        
        if (currentUser !== "") {
            displaySearchMessage(`Now viewing bookings for ${currentUser.name}. \n They've spent $${(currentUser.totalCost).toFixed(2)} in bookings.`);
            displayDashboardCards(currentUser.allBookings, false);
        } else {
            displayManagerSearchMessage("Use 'Find Customer' search below to Display a Customer's Bookings");
        }
    } 
    else {
        hideAllElements();
        showElement(dashboardView);
        showElement(customerBookingHistoryCard);
        showElement(head);
        showElement(footer);
        displayDashboardHeader(currentUser);
        displayDashboardCards(currentUser.allBookings);
    }
}

const loadBookView = () => {
    if (!currentUser && !currentManager) {
        loginError("Please login to view this page.", "We can't book without knowing who you are first!", "Go to login");
    } else if (!currentUser) {
        loginError("Please search a customer first", "We need to know which customer you want to book for", "Back to dashboard");
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

const getBookedRooms = (startDate = getCurrentDate()) => { // returns a booking object
    let todaysBookings = allBookingsData.filter(booking => booking.date === startDate)
    return todaysBookings;
}

const getTotalRevenue = (startDate = getCurrentDate()) => {
    let bookedRooms = getBookedRooms(startDate, allBookingsData);
    let totalRev = bookedRooms.reduce((sum, booking) => {
        sum += booking.roomDetails.costPerNight;
        return sum;
    }, 0);
    return totalRev.toFixed(2);
}

const getBookingDate = (bookingId) => {
    let bookingToFind = allBookingsData.find(booking => booking.id === bookingId);
    return bookingToFind.date;
}

const getStartDateValue = () => {
    if (!startDate.value) {
        return getCurrentDate();
    }
    return startDate.value.replaceAll("-", "/");
}

