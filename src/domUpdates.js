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
    bookings.forEach(booking => { // **** THESE ARE BOOKING OBJECTS ****
        container.innerHTML += `
            <div class="booking-card card flex" id="${booking.id}">
                <img class="bed-icon" src="./images/one-bed-icon.png" alt="front facing single bed icon">
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
        bookCardsContainer.innerHTML = `<h1>We're so sorry, but we don't have any available bookings of that kind right now. Please look for other possible booking dates or rooms.</h1>`
    }
    displayAvailableRoomCards(bookCardsContainer, startDate, availableRooms); 
}

const displayAvailableRoomCards = (container, startDate, availableRooms) => {
    availableRooms.forEach(room => { // **** THESE ARE ROOM OBJECTS ****
        container.innerHTML += `
            <div class="booking-card card flex" id="${room.number}">
                <img class="bed-icon" src="./images/one-bed-icon.png" alt="front facing single bed icon">
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
            </div>`
    });
}

export const getAvailableRooms = (startDate, allBookingsData, allRoomsData, roomType) => {
    let bookedRoomNumbers = allBookingsData.filter(booking => booking.date === startDate)
                                           .map(bookedBookings => bookedBookings.roomNumber);
    let availableRooms = allRoomsData.filter(room => !bookedRoomNumbers.includes(room.number));
    let filteredAvailableRooms = filterByRoomType(availableRooms, roomType)
    return filteredAvailableRooms;
}

const filterByRoomType = (rooms, roomType) => {
    if (roomType === "all rooms") {
        return rooms;
    }
    let filteredRooms = rooms.filter(room => room.roomType === roomType);
    return filteredRooms;
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
    return `${yyyy}/${mm}/${dd}`;
    // return `2022/01/21`; // Test past, present, today
}


