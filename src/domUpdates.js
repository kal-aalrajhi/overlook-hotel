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

// Display Cards
export const displayDashboardCards = (bookings) => {
    const dashboardCardsContainer = document.querySelector("#dashboardCardsContainer");
    clearView(dashboardCardsContainer);  
    displayCards(dashboardCardsContainer, bookings);
    displayBookingsCost(bookings);
}

export const displayBookCards = () => {
    const bookCardsContainer = document.querySelector("#bookCardsContainer");
    clearView(bookCardsContainer);
    displayCards(bookCardsContainer); // MUST DISPLAY ALL AVAILABLE BOOKINGS (and bookings you haven't booked)
}

const displayCards = (container, bookings) => {
    bookings.forEach(booking => {
        container.innerHTML += `
            <div class="booking-card card flex">
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
    // return `${yyyy}/${mm}/${dd}`;
    return `2022/01/21`; // Test past, present, today
}

