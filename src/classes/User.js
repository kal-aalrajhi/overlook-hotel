export class User {
    constructor(userData) {
        this.id = userData.id;
        this.name = userData.name;
        this.allBookings = []; // test
    }

    // Test w/ sample data
    addBooking(booking) { // should be a booking object
        this.allBookings.push(booking);
    }

    // Test w/ sample data
    removeBooking(booking) {
        // can only remove bookings from current to future dates
        this.allBookings.splice() // find the booking to splice
    }

    addAllBookings(allBookingsData) {
        // Add all bookings that have the current user
        // Check by using booking.isBookedByCurrentUser
    }
}