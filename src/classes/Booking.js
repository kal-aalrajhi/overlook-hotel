import { Room } from './Room';
import { User } from './User';

export class Booking {
    constructor(bookingData) {
        this.id = bookingData.id;
        this.userId = bookingData.userID; 
        this.date = bookingData.date;
        this.roomNumber = bookingData.roomNumber;
        this.roomDetails = ""; // Gets set as a room object from setRoom method
    }

    setRoom(allRoomsData) { 
        const roomToFind = allRoomsData.find(room => room.number === this.roomNumber);
        this.roomDetails = roomToFind;
    }

    // Test w/ sample data | search room details associate with this booking
    // getRoom(allRoomsData) { 
    //     const roomToFind = allRoomsData.find(room => room.number === this.roomNumber);
    //     return new Room(roomToFind);
    // }

    // Test w/ sample data | search for which user made this booking
    getUser(allUsersData) { 
        const userToFind = allUsersData.find(user => user.id === this.userId);
        return new User(userToFind);
    }

    // Test | check if current user made this booking
    isBookedByCurrentUser(currentUser, allUsersData) {
        return getUser(allUsersData) === currentUser;
    }
}