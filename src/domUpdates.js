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
export const displayDashboardCards = (currentUser) => {
    const dashboardCardsContainer = document.querySelector("#dashboardCardsContainer");
    clearView(dashboardCardsContainer);  
    displayCards(dashboardCardsContainer, currentUser);
    displayTotalCost(currentUser);
}

export const displayPastDashboardCards = (currentUser) => {
    const dashboardCardsContainer = document.querySelector("#dashboardCardsContainer");
    clearView(dashboardCardsContainer);  
    const pastBookings = currentUser.allBookings.filter(booking => booking.date < getCurrentDate());
    console.log("past bookings", pastBookings);
    console.log("all bookings", currentUser.allBookings);
    displayCards(dashboardCardsContainer, currentUser);
    displayTotalCost(currentUser);
}

export const displayBookCards = () => {
    const bookCardsContainer = document.querySelector("#bookCardsContainer");
    clearView(bookCardsContainer);
    displayCards(bookCardsContainer); // MUST DISPLAY ALL AVAILABLE BOOKINGS (and bookings you haven't booked)
}

const displayCards = (container, currentUser) => {
    const cards = currentUser.allBookings;
    cards.forEach(card => {
        container.innerHTML += `
            <div class="booking-card card flex">
                <img class="bed-icon" src="./images/one-bed-icon.png" alt="front facing single bed icon">
                <summary class="booking-card-text">
                    <h3>room ${card.roomDetails.number}</h3>
                    <h3>${card.roomDetails.roomType}</h3>
                    <ul>
                        <li class="small"><span>beds:</span> ${card.roomDetails.numBeds}</li>
                        <li class="small"><span>bed size:</span> ${card.roomDetails.bedSize}</li>
                        <li class="small"><span>bidet:</span> ${card.roomDetails.bidet}</li>
                        <li class="small"><span>date:</span> ${card.date}</li>
                        <li class="small"><span>cost/night:</span> $${card.roomDetails.costPerNight.toFixed(2)}</li>
                    </ul>
                </summary>
            </div>`
    });
}

const displayTotalCost = (currentUser) => {
    const totalCost = document.querySelector("#totalCost");
    totalCost.innerText = `$${currentUser.totalCost.toFixed(2)}`;
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

const getCurrentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    // return `${yyyy}/${mm}/${dd}`;
    return `2022/01/21`; // PAST TEST
}

