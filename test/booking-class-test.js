import { expect } from 'chai';
import { Room } from '../src/classes/Room';
import { roomsSampleData } from '../src/data/rooms-sample-data';
import { Booking } from '../src/classes/Booking';
import { bookingsSampleData } from '../src/data/bookings-sample-data';

describe('Room', () => {
    let room1, room2, room3;
    let roomData;

    let booking1, booking2, booking3;
    let bookingData;

    beforeEach(() => {
        roomData = roomsSampleData;
        room1 = new Room(roomsSampleData[0]);
        room2 = new Room(roomsSampleData[1]);
        room3 = new Room(roomsSampleData[2]);

        bookingData = bookingsSampleData;
        booking1 = new Booking(bookingsSampleData[0]);
        booking2 = new Booking(bookingsSampleData[1]);
        booking3 = new Booking(bookingsSampleData[2]);
    });


});
