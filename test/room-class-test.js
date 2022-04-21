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

    it('should have a room type', () => {
        expect(room1.number).to.equal(1);
        expect(room2.number).to.equal(2);
        expect(room3.number).to.equal(3);
    });

    it('should tell us if it has a bidet or not', () => {
        expect(room1.bidet).to.equal(true);
        expect(room2.bidet).to.equal(false);
        expect(room3.bidet).to.equal(false);
    });

    it('should tell us which bedsize it includes', () => {
        expect(room1.bedSize).to.equal("queen");
        expect(room2.bedSize).to.equal("full");
        expect(room3.bedSize).to.equal("king");
    });

    it('should tell us how many beds it has', () => {
        expect(room1.numBeds).to.equal(1);
        expect(room2.numBeds).to.equal(2);
        expect(room3.numBeds).to.equal(1);
    });

    it('should tell use how much it costs per night', () => {
        expect(room1.costPerNight).to.equal(358.4);
        expect(room2.costPerNight).to.equal(477.38);
        expect(room3.costPerNight).to.equal(491.14);
    });
});
