export class Booking {
    constructor(bookingData) {
        this.id = bookingData.id;
        this.userId = bookingData.userID; // should be a User class
        this.date = bookingData.date;
        this.roomNumber = bookingData.roomNumber;
    }
}