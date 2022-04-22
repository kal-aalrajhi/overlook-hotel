// View Control
export const showElement = (element) => {
    element.classList.remove("hidden");
}

export const hideElement = (element) => {
    element.classList.add("hidden");
}

export const clearView = (view) => {
    view.innerHTML = "";
}

// Display Cards
export const displayDashboardCards = (currentUser) => {
    const dashboardCardsContainer = document.querySelector("#dashboardCardsContainer");
    clearView(dashboardCardsContainer);  
    displayCards(dashboardCardsContainer, currentUser);
}

export const displayBookCards = () => {
    const bookCardsContainer = document.querySelector("#bookCardsContainer");
    clearView(bookCardsContainer);
    displayCards(bookCardsContainer);
}

const displayCards = (container, currentUser) => {
    const cards = currentUser.allBookings;
    cards.forEach(card => {
        container.innerHTML += `
            <div class="booking-card card flex">
                <img class="bed-icon" src="./images/one-bed-icon.png" alt="front facing single bed icon">
                <summary class="booking-card-text">
                    <h3>Suite ${card}</h3>
                    <ul>
                        <li class="small"><span>Beds:</span> 1</li>
                        <li class="small"><span>Bed Size:</span> Queen</li>
                        <li class="small"><span>Bidet:</span> Yes</li>
                        <li class="small"><span>Date:</span> ${card.date}</li>
                        <li class="small"><span>Cost/Night:</span> $480.12</li>
                    </ul>
                </summary>
            </div>`
    });
}

// Header Content
export const displayDashboardHeader = (currentUser) => {
    const viewName = `${currentUser.name}`;
    const textDetail1 = `Welcome back!`;
    const textDetail2 = "This is your space to view all the wonderful places you've explored or will explore soon.";
    const iconName = "dashboard";
    const altText = "hotel room icon with double bed, desk lamp, and check mark";
    
    displayHeaderContent(viewName, iconName, textDetail1, textDetail2, altText);
}

export const displayBookHeader = () => {
    const viewName = "Book a Stay";
    const textDetail1 = "Book something new!";
    const textDetail2 = "There are so many wonderful stays for you to book. Whether you're on a budget or looking for luxury, it's all right here.";
    const iconName = "book";
    const altText = "hotel cart icon luggage on the cart";
    
    displayHeaderContent(viewName, iconName, textDetail1, textDetail2, altText);
}

const displayHeaderContent = (viewName, iconName, textDetail1, textDetail2, altText) => {
    const headerContainer = document.querySelector("#headerContainer");
    
    headerContainer.innerHTML = `
        <article class="head-text">
            <h1 class="large">${viewName}</h1>
            <p class="txt-primary">${textDetail1}</p>
            <p class="txt-primary">
                ${textDetail2}
            </p>
        </article>
        <img class="head-icon" src="./images/${iconName}-icon.png" alt=${altText}>`    
}

