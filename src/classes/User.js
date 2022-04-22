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

    // Test w/ sample data
    removeBooking(booking) {
        // can only remove bookings from current to future dates
        this.allBookings.splice() // find the booking to splice
    }

    // Test w/ sample data | When a user logs in, add all there booking data to display
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