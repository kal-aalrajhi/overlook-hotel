import { expect } from 'chai';
import { Room } from '../src/classes/Room';
import { roomsSampleData } from '../src/data/rooms-sample-data';

describe('Room', () => {
    let room1, room2, room3;
    let roomData;

    beforeEach(() => {
        roomData = roomsSampleData;
        room1 = new Room(roomsSampleData[0]);
        room2 = new Room(roomsSampleData[1]);
        room3 = new Room(roomsSampleData[2]);
    });

    it('should be an instance of Room', () => {
        expect(room1).to.be.an.instanceof(Room);
    });

    it('should have a room number', () => {
        expect(room1.number).to.equal(1);
        expect(room2.number).to.equal(2);
        expect(room3.number).to.equal(3);
    });


});
