import { expect } from 'chai';
import { Room } from '../src/classes/Room';
import { roomsSampleData } from '../src/data/rooms-sample-data';
import { User } from '../src/classes/User';
import { usersSampleData } from '../src/data/users-sample-data';
import { Booking } from '../src/classes/Booking';
import { bookingsSampleData } from '../src/data/bookings-sample-data';

describe('Booking', () => {
    let roomData;

    let booking1, booking2, booking3;
    let bookingData;

    let user1, user2;
    let userData;

    beforeEach(() => {
        roomData = roomsSampleData.map(room => new Room(room));

        bookingData = bookingsSampleData;
        booking1 = new Booking(bookingsSampleData[0]);
        booking2 = new Booking(bookingsSampleData[1]);
        booking3 = new Booking(bookingsSampleData[2]);

        userData = usersSampleData;
        user1 = new User(usersSampleData[8]);
        user2 = new User(usersSampleData[9]);
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

    it('room details should start off empty', () => {
        expect(booking1.roomDetails).to.equal("");
    });

    it('should set room details based off the room number', () => {
        expect(booking1.roomDetails).to.equal("");
        expect(booking2.roomDetails).to.equal("");

        booking1.setRoom(roomData);
        booking2.setRoom(roomData);

        expect(booking1.roomDetails).to.deep.equal({
            number: 15,
            roomType: 'residential suite',
            bidet: false,
            bedSize: 'full',
            numBeds: 1,
            costPerNight: 294.56
        });

        expect(booking2.roomDetails).to.deep.equal({
            number: 24,
            roomType: 'suite',
            bidet: false,
            bedSize: 'queen',
            numBeds: 1,
            costPerNight: 327.24
        });
    });

    it('room details should be set to a room object', () => {
        booking1.setRoom(roomData);
        booking2.setRoom(roomData);
        expect(booking1.roomDetails).to.be.an.instanceof(Room);
        expect(booking2.roomDetails).to.be.an.instanceof(Room);

    });

    it('should be able to get room details once they\'re set', () => {
        expect(booking1.roomDetails).to.equal("");
        expect(booking2.roomDetails).to.equal("");

        booking1.setRoom(roomData);
        booking2.setRoom(roomData);

        expect(booking1.getRoomDetails()).to.deep.equal({
            number: 15,
            roomType: 'residential suite',
            bidet: false,
            bedSize: 'full',
            numBeds: 1,
            costPerNight: 294.56
        });

        expect(booking2.getRoomDetails()).to.deep.equal({
            number: 24,
            roomType: 'suite',
            bidet: false,
            bedSize: 'queen',
            numBeds: 1,
            costPerNight: 327.24
        });
    });

    it('should be able to get the User details based on who made the booking', () => {
        expect(booking1.getUser(userData)).to.deep.equal({
             id: 9, 
             name: 'Faustino Quitzon', 
             allBookings: [], 
             totalCost: 0 
        });

        expect(booking2.getUser(userData)).to.deep.equal({ 
            id: 43, 
            name: 'Earline Hamill', 
            allBookings: [], 
            totalCost: 0 
        });
    });

    it('should be able to check if the current User made the booking', () => {
        expect(booking1.isBookedByCurrentUser(user1, userData)).to.equal(true);
        expect(booking2.isBookedByCurrentUser(user2, userData)).to.equal(false);
    });
});
