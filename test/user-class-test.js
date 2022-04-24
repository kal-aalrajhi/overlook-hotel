import { expect } from 'chai';
import { Room } from '../src/classes/Room';
import { roomsSampleData } from '../src/data/rooms-sample-data';
import { User } from '../src/classes/User';
import { usersSampleData } from '../src/data/users-sample-data';
import { Booking } from '../src/classes/Booking';
import { bookingsSampleData } from '../src/data/bookings-sample-data';

describe('User', () => {
    let roomData;
    let bookingData;
    let user1, user2;
    let userData;

    beforeEach(() => {
        roomData = roomsSampleData.map(room => new Room(room));
        bookingData = bookingsSampleData.map(booking => new Booking(booking));
        bookingData.forEach(booking => {
            booking.setRoom(roomData);
        });
    
        userData = usersSampleData;
        user1 = new User(usersSampleData[0]);
        user2 = new User(usersSampleData[1]);
    });

    it('should be an instance of User', () => {
        expect(user1).to.be.an.instanceof(User);
    });

    it('should have a user id', () => {
        expect(user1.id).to.equal(1);
        expect(user2.id).to.equal(2);
    });

    it('should have a full name', () => {
        expect(user1.name).to.equal("Leatha Ullrich");
        expect(user2.name).to.equal("Rocio Schuster");
    });

    it('should start with no bookings', () => {
        expect(user1.allBookings).to.deep.equal([]);
        expect(user2.allBookings).to.deep.equal([]);
    });

    it('should contain all saved bookings', () => {
        user1.addAllBookings(bookingData);
        user2.addAllBookings(bookingData);

        expect(user1.allBookings).to.deep.equal([
            {
              id: '5fwrgu4i7k55hl6t8',
              userId: 1,
              date: '2022/02/05',
              roomNumber: 12,
              roomDetails: {
                number: 12,
                roomType: 'single room',
                bidet: false,
                bedSize: 'twin',
                numBeds: 2,
                costPerNight: 172.09
              }
            },
            {
              id: '5fwrgu4i7k55hl6tq',
              userId: 1,
              date: '2022/02/03',
              roomNumber: 12,
              roomDetails: {
                number: 12,
                roomType: 'single room',
                bidet: false,
                bedSize: 'twin',
                numBeds: 2,
                costPerNight: 172.09
              }
            }
          ]);

        expect(user2.allBookings).to.deep.equal([
            {
              id: '5fwrgu4i7k55hl6tu',
              userId: 2,
              date: '2022/01/29',
              roomNumber: 6,
              roomDetails: {
                number: 6,
                roomType: 'junior suite',
                bidet: true,
                bedSize: 'queen',
                numBeds: 1,
                costPerNight: 397.02
              }
            },
            {
              id: '5fwrgu4i7k55hl6tx',
              userId: 2,
              date: '2022/01/18',
              roomNumber: 17,
              roomDetails: {
                number: 17,
                roomType: 'junior suite',
                bidet: false,
                bedSize: 'twin',
                numBeds: 2,
                costPerNight: 328.15
              }
            },
            {
              id: '5fwrgu4i7k55hl6u1',
              userId: 2,
              date: '2022/02/15',
              roomNumber: 21,
              roomDetails: {
                number: 21,
                roomType: 'single room',
                bidet: false,
                bedSize: 'full',
                numBeds: 2,
                costPerNight: 429.32
              }
            }
          ]);
    });

    it('should start with no costs', () => {
        expect(user1.totalCost).to.equal(0);
        expect(user2.totalCost).to.equal(0);
    });

    it('should have a total cost based on all the users bookings', () => {
        user1.addAllBookings(bookingData);
        user2.addAllBookings(bookingData);

        user1.updateTotalCost();
        user2.updateTotalCost();

        expect(user1.totalCost).to.equal(344.18);
        expect(user2.totalCost).to.equal(1154.49);
    });
});
