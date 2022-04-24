import { Room } from './Room';
import { Booking } from './Booking';

export class User {
    constructor(userData) {
        this.id = userData.id;
        this.name = userData.name;
        this.allBookings = []; 
        this.totalCost = 0;
    }

    addAllBookings(allBookingsData) {
        this.allBookings = [];
        this.allBookings = allBookingsData.filter(booking => Number(booking.userId) === Number(this.id));
        this.updateTotalCost();
    }

    updateTotalCost() {
        this.totalCost = 0;
        this.allBookings.forEach(booking => {
            this.totalCost += booking.roomDetails.costPerNight;
        });
    }
}