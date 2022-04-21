export class Booking {
    constructor(bookingData) {
        this.id = bookingData.id;
        this.userId = bookingData.userID; 
        this.date = bookingData.date;
        this.roomNumber = bookingData.roomNumber;
    }

    getRoomDetails(allRoomsData) {
        // search for the room by room number
        // return a room as a Room object
    }

    getUserDetails(allUsersData) {
        // search for which user made this booking
        // return the user as a User object
    }
}