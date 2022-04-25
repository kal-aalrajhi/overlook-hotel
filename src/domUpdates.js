// View Control
export const showElement = (element) => {
    element.classList.remove("hidden");
}

export const hideElement = (element) => {
    element.classList.add("hidden");
}

const clearView = (view) => {
    view.innerHTML = "";
}

// Login validation
export const displayValidationMessage = (message) => {
    const validationMsg = document.querySelector("#validationMsg");
    validationMsg.innerText = message;
}

// Display Dashboard
export const displayDashboardCards = (bookings) => {
    clearView(dashboardCardsContainer);  
    if (!bookings.length) {
        dashboardCardsContainer.innerHTML = `<h1>Sorry, no bookings of this type are available.</h1>`
    } else {
        displayBookedCards(dashboardCardsContainer, bookings);
    }
    displayBookingsCost(bookings);
}

const displayBookedCards = (container, bookings) => {
    bookings.forEach(booking => { 
        container.innerHTML += `
            <div class="booking-card card flex" tabindex="0" id="${booking.id}">
                <img class="bed-icon" src="./images/bed-${booking.roomDetails.numBeds}-icon.png" alt="front facing ${booking.roomDetails.numBeds}-bed icon">
                <summary class="booking-card-text">
                    <h3>room ${booking.roomDetails.number}</h3>
                    <h3>${booking.roomDetails.roomType}</h3>
                    <ul>
                        <li class="small"><span>beds:</span> ${booking.roomDetails.numBeds}</li>
                        <li class="small"><span>bed size:</span> ${booking.roomDetails.bedSize}</li>
                        <li class="small"><span>bidet:</span> ${booking.roomDetails.bidet}</li>
                        <li class="small"><span>date:</span> ${booking.date}</li>
                        <li class="small"><span>cost/night:</span> $${booking.roomDetails.costPerNight.toFixed(2)}</li>
                    </ul>
                </summary>
            </div>`
    });
}

const displayBookingsCost = (bookings) => {
    const bookingTotalCost = bookings.reduce((acc, booking) => {
        acc += booking.roomDetails.costPerNight;
        return acc;
    }, 0);
    const totalCost = document.querySelector("#totalCost");
    totalCost.innerText = `$${bookingTotalCost.toFixed(2)}`;
}

// Display Available Booking Cards
export const displayAvailableBookingCards = (startDate, availableRooms) => {
    clearView(bookCardsContainer);
    if (!availableRooms.length) {
        bookCardsContainer.innerHTML = `<h1>We're so sorry, but we don't have any available bookings of that kind right now.</h1>`
    }
    displayAvailableRoomCards(bookCardsContainer, startDate, availableRooms); 
}

const displayAvailableRoomCards = (container, startDate, availableRooms) => {
    availableRooms.forEach(room => { 
        container.innerHTML += `
            <div class="booking-card card card-no-pad flex">
                <img class="bed-icon" src="./images/bed-${room.numBeds}-icon.png" alt="front facing ${room.numBeds}-bed icon">
                <summary class="booking-card-text">
                    <h3>room ${room.number}</h3>
                    <h3>${room.roomType}</h3>
                    <ul>
                        <li class="small"><span>beds:</span> ${room.numBeds}</li>
                        <li class="small"><span>bed size:</span> ${room.bedSize}</li>
                        <li class="small"><span>bidet:</span> ${room.bidet}</li>
                        <li class="small"><span>date available:</span> ${startDate}</li>
                        <li class="small"><span>cost/night:</span> $${room.costPerNight.toFixed(2)}</li>
                    </ul>
                </summary>
                <button class="add-icon sub-link" id="${room.number}">book</button>
            </div>`
    });
}

// Header Content
export const displayDashboardHeader = (currentUser) => {
    const viewName = `${currentUser.name}`;
    const textDetail = "Welcome back! This is your space to view all the wonderful places you've explored or will explore soon.";
    const iconName = "dashboard";
    const altText = "hotel room icon with double bed, desk lamp, and check mark";
    
    displayHeaderContent(viewName, iconName, textDetail, altText);
}

export const displayBookHeader = () => {
    const viewName = "Book a Stay";
    const textDetail = "Book something new! There are so many wonderful stays for you to book. Whether you're on a budget or looking for luxury, it's all right here.";
    const iconName = "book";
    const altText = "hotel cart icon luggage on the cart";
    
    displayHeaderContent(viewName, iconName, textDetail, altText);
}

const displayHeaderContent = (viewName, iconName, textDetail, altText) => {
    const headerContainer = document.querySelector("#headerContainer");
    
    headerContainer.innerHTML = `
        <article class="head-text">
            <h1 class="large">${viewName}</h1>
            <p class="txt-primary">Today's Date: ${getCurrentDate()}</p>
            <p class="txt-primary">
                ${textDetail}
            </p>
        </article>
        <img class="head-icon" src="./images/${iconName}-icon.png" alt=${altText}>`    
}

export const getCurrentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if(dd < 10) {
        mm = `0${mm}`
    }
    if(mm < 10) {
        mm = `0${mm}`
    }
    return `${yyyy}/${mm}/${dd}`;
}

// Manager
export const displayManagerDashboard = (roomsAvailable, bookedRooms, totalRev) => {
    let roomsAvailableCount = roomsAvailable.length;
    let roomsOccupiedPercent = (bookedRooms.length / 25) * 100;

    managerBookingHistoryCard.innerHTML = `
        <h2 class="margin-y3 text-center">${getCurrentDate} Stats</h2>
        <h2 class="margin-y2 underline">Rooms Available</h2>
        <p>${roomsAvailableCount}</p>
        <h2 class="margin-y2 underline">Rooms Occupied</h2>
        <p>${roomsOccupiedPercent}%</p>
        <h2 class="margin-y2 underline">Total Revenue</h2>
        <p>${totalRev}</p>
        <ul class="booking-history-options" id="bookingHistoryOptions">
            <li aria-setsize="1" aria-posinset="1"><button class="sub-link" id="searchUser">Search User</button></li>
        </ul>`
}

// I can use viewBookingsBy to display dashboard cards of todays bookings

