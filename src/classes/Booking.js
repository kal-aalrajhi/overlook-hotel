import { Room } from './Room';
import { User } from './User';

export class Booking {
    constructor(bookingData) {
        this.id = bookingData.id;
        this.userId = bookingData.userID; 
        this.date = bookingData.date;
        this.roomNumber = bookingData.roomNumber;
        this.roomDetails = ""; 
    }

    setRoom(allRoomsData) { 
        const roomToFind = allRoomsData.find(room => room.number === this.roomNumber);
        this.roomDetails = roomToFind;
    }

    getRoomDetails() {
        return this.roomDetails;
    }

    getUser(allUsersData) { 
        const userToFind = allUsersData.find(user => user.id === this.userId);
        return new User(userToFind);
    }

    isBookedByCurrentUser(currentUser, allUsersData) {
        return this.getUser(allUsersData).id === currentUser.id;
    }
}