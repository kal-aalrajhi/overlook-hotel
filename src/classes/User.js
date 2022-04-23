import { Room } from "./Room";

export class User {
    constructor(userData) {
        this.id = userData.id;
        this.name = userData.name;
        this.allBookings = []; // test
        this.totalCost = 0;
    }

    // Test w/ sample data
    addBooking(booking) { // should be a booking object
        this.allBookings.push(booking);
        this.updateTotalCost();
    }

    addAllBookings(allBookingsData) {
        this.allBookings = allBookingsData.filter(booking => booking.userId === this.id);
        this.updateTotalCost();
    }

    updateTotalCost() {
        this.totalCost = 0;
        this.allBookings.forEach(booking => {
            this.totalCost += booking.roomDetails.costPerNight;
        });
    }
}