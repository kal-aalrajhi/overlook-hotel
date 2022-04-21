import { expect } from 'chai';
import { Room } from '../src/classes/Room';
import { roomsSampleData } from '../src/data/rooms-sample-data';
import { Booking } from '../src/classes/Booking';
import { bookingsSampleData } from '../src/data/bookings-sample-data';

describe('Booking', () => {
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

    it('should be an instance of Booking', () => {
        expect(booking1).to.be.an.instanceof(Booking);
    });

    it('should have a booking id', () => {
        expect(booking1.id).to.equal("5fwrgu4i7k55hl6sz");
        expect(booking2.id).to.equal("5fwrgu4i7k55hl6t5");
        expect(booking3.id).to.equal("5fwrgu4i7k55hl6t6");
    });

    it('should have an associated user who made the booking', () => {
        expect(booking1.userId).to.equal(9);
        expect(booking2.userId).to.equal(43);
        expect(booking3.userId).to.equal(13);
    });

    it('should have a date that the booking was made', () => {
        expect(booking1.date).to.equal("2022/04/22");
        expect(booking2.date).to.equal("2022/01/24");
        expect(booking3.date).to.equal("2022/01/10");
    });

    it('should have a room number associated with the booking', () => {
        expect(booking1.roomNumber).to.equal(15);
        expect(booking2.roomNumber).to.equal(24);
        expect(booking3.roomNumber).to.equal(12);
    });




});
